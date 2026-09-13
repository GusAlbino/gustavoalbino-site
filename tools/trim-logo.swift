// trim-logo.swift — recorta a margem vazia de um logo e regrava em PNG.
//
// uso: trim-logo <entrada> <saida.png> [dimensaoMax] [--dry] [--chave-branco]
//
// Detecta "tinta" por alfa quando a imagem tem transparencia real; caso
// contrario, por distancia do branco. Imprime sempre a bbox medida, a
// ocupacao e o brilho medio da tinta (para flagrar logo branco em fundo
// transparente, que some no papel claro do site).
//
// macOS puro: CoreGraphics + ImageIO. Nao depende de ImageMagick/Pillow.

import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let argv = CommandLine.arguments
guard argv.count >= 3 else {
    FileHandle.standardError.write("uso: trim-logo <entrada> <saida.png> [dimensaoMax] [--dry]\n".data(using: .utf8)!)
    exit(2)
}
let inPath = argv[1]
let outPath = argv[2]
let dry = argv.contains("--dry")
// --chave-branco: peca extraida de arte impressa vem sobre papel branco. Sem
// isso o logo entra no site como um retangulo branco sobre o papel creme.
let chaveBranco = argv.contains("--chave-branco")
let maxDim = argv.dropFirst(3).compactMap { Int($0) }.first ?? 0

guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: inPath) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
    FileHandle.standardError.write("erro: nao consegui decodificar \(inPath)\n".data(using: .utf8)!)
    exit(1)
}

let w = img.width, h = img.height
var buf = [UInt8](repeating: 0, count: w * h * 4)
guard let ctx = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8,
                          bytesPerRow: w * 4, space: CGColorSpaceCreateDeviceRGB(),
                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))

// A imagem tem transparencia de verdade, ou o canal alfa so existe no arquivo?
var temAlfaReal = false
for i in stride(from: 3, to: buf.count, by: 4) where buf[i] < 240 { temAlfaReal = true; break }

@inline(__always) func ehTinta(_ p: Int) -> Bool {
    let a = Int(buf[p + 3])
    if temAlfaReal { return a > 16 }
    if a < 16 { return false }
    let r = Int(buf[p]), g = Int(buf[p + 1]), b = Int(buf[p + 2])
    return (255 - r) + (255 - g) + (255 - b) > 30   // longe do branco
}

var minX = w, minY = h, maxX = -1, maxY = -1
var somaBrilho = 0.0, nTinta = 0
for y in 0..<h {
    let linha = y * w * 4
    for x in 0..<w {
        let p = linha + x * 4
        guard ehTinta(p) else { continue }
        if x < minX { minX = x }; if x > maxX { maxX = x }
        if y < minY { minY = y }; if y > maxY { maxY = y }
        // desfaz o premultiply para medir a cor real da tinta
        let a = Double(buf[p + 3]) / 255.0
        if a > 0.5 {
            somaBrilho += (Double(buf[p]) * 0.2126 + Double(buf[p + 1]) * 0.7152 + Double(buf[p + 2]) * 0.0722) / a
            nTinta += 1
        }
    }
}

guard maxX >= minX, maxY >= minY else {
    print("\(URL(fileURLWithPath: inPath).lastPathComponent)\tVAZIA — nenhum pixel de tinta")
    exit(3)
}

let cw = maxX - minX + 1, ch = maxY - minY + 1
let ocupW = Double(cw) / Double(w) * 100, ocupH = Double(ch) / Double(h) * 100
let brilho = nTinta > 0 ? somaBrilho / Double(nTinta) : -1
let nome = URL(fileURLWithPath: inPath).lastPathComponent
print(String(format: "%@\t%dx%d\tbbox %d,%d %dx%d\tocupa %.0f%%/%.0f%%\tbrilho tinta %.0f\t%@",
             nome, w, h, minX, minY, cw, ch, ocupW, ocupH, brilho,
             temAlfaReal ? "alfa" : "branco"))
if dry { exit(0) }

// recorta e, se pedido, reduz mantendo proporcao
var destW = cw, destH = ch
if maxDim > 0, max(cw, ch) > maxDim {
    let k = Double(maxDim) / Double(max(cw, ch))
    destW = max(1, Int((Double(cw) * k).rounded()))
    destH = max(1, Int((Double(ch) * k).rounded()))
}
guard let corte = img.cropping(to: CGRect(x: minX, y: minY, width: cw, height: ch)) else { exit(1) }

// Papel branco vira transparencia (ver flood fill abaixo).
var fonte = corte
if chaveBranco {
    var px = [UInt8](repeating: 0, count: cw * ch * 4)
    guard let kctx = CGContext(data: &px, width: cw, height: ch, bitsPerComponent: 8,
                               bytesPerRow: cw * 4, space: CGColorSpaceCreateDeviceRGB(),
                               bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { exit(1) }
    kctx.draw(corte, in: CGRect(x: 0, y: 0, width: cw, height: ch))
    // Flood fill a partir da borda: so o papel que ENCOSTA na margem vira
    // transparencia. Branco cercado por arte — o miolo do sol da Auroraeco, o
    // contra-forma de uma letra — e parte do desenho e fica opaco. Um key
    // global de branco comeria os dois sem distinguir.
    @inline(__always) func claro(_ i: Int) -> Bool {
        return min(px[i], min(px[i + 1], px[i + 2])) > 228
    }
    var papel = [Bool](repeating: false, count: cw * ch)
    var fila = [Int]()
    for x in 0..<cw { for y in [0, ch - 1] { let k = y * cw + x
        if !papel[k], claro(k * 4) { papel[k] = true; fila.append(k) } } }
    for y in 0..<ch { for x in [0, cw - 1] { let k = y * cw + x
        if !papel[k], claro(k * 4) { papel[k] = true; fila.append(k) } } }
    var cabeca = 0
    while cabeca < fila.count {
        let k = fila[cabeca]; cabeca += 1
        let x = k % cw, y = k / cw
        for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)] {
            let nx = x + dx, ny = y + dy
            guard nx >= 0, nx < cw, ny >= 0, ny < ch else { continue }
            let nk = ny * cw + nx
            if !papel[nk], claro(nk * 4) { papel[nk] = true; fila.append(nk) }
        }
    }
    // Borda do papel ganha alfa proporcional para nao serrilhar o antialiasing:
    // o pixel meio-claro vizinho de papel entra meio transparente.
    for k in 0..<(cw * ch) {
        let i = k * 4
        if papel[k] { px[i + 3] = 0; continue }
        let escuro = Double(min(px[i], min(px[i + 1], px[i + 2])))
        var vizinhoPapel = false
        let x = k % cw, y = k / cw
        for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)] {
            let nx = x + dx, ny = y + dy
            if nx >= 0, nx < cw, ny >= 0, ny < ch, papel[ny * cw + nx] { vizinhoPapel = true; break }
        }
        guard vizinhoPapel, escuro > 200 else { px[i + 3] = 255; continue }
        let a = min(255.0, (255.0 - escuro) * 4.6)
        guard a > 4 else { px[i + 3] = 0; continue }
        let k2 = 255.0 / a
        px[i]     = UInt8(max(0, min(255, (Double(px[i])     - (255 - a)) * k2)))
        px[i + 1] = UInt8(max(0, min(255, (Double(px[i + 1]) - (255 - a)) * k2)))
        px[i + 2] = UInt8(max(0, min(255, (Double(px[i + 2]) - (255 - a)) * k2)))
        px[i + 3] = UInt8(a)
    }
    guard let out2 = CGContext(data: &px, width: cw, height: ch, bitsPerComponent: 8,
                               bytesPerRow: cw * 4, space: CGColorSpaceCreateDeviceRGB(),
                               bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)?.makeImage()
    else { exit(1) }
    fonte = out2
}

var saida = fonte
if destW != cw || destH != ch {
    guard let rctx = CGContext(data: nil, width: destW, height: destH, bitsPerComponent: 8,
                               bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(),
                               bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
    rctx.interpolationQuality = .high
    rctx.draw(fonte, in: CGRect(x: 0, y: 0, width: destW, height: destH))
    guard let r = rctx.makeImage() else { exit(1) }
    saida = r
}

guard let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outPath) as CFURL,
                                                 UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, saida, nil)
guard CGImageDestinationFinalize(dest) else { exit(1) }
print("  -> \(URL(fileURLWithPath: outPath).lastPathComponent) \(destW)x\(destH)")
