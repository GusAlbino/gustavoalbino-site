// uso: swift tools/comprimir-pdf.swift entrada.pdf saida.pdf [largura-px=1800] [qualidade=0.8]
// Redesenha cada página como JPEG dentro de um PDF novo. Sai sem texto selecionável,
// o que serve para portfólio e catálogo de leitura. Existe porque o Workers recusa arquivo acima de 25 MiB.
import AppKit
import PDFKit
let a = CommandLine.arguments
guard a.count >= 3, let doc = PDFDocument(url: URL(fileURLWithPath: a[1])) else { print("erro ao abrir"); exit(1) }
let larg = a.count > 3 ? CGFloat(Double(a[3])!) : 1800, q = a.count > 4 ? Double(a[4])! : 0.8
let out = NSMutableData()
let cons = CGDataConsumer(data: out)!
var caixa0 = CGRect(x: 0, y: 0, width: 100, height: 100)
let ctx = CGContext(consumer: cons, mediaBox: &caixa0, nil)!
for i in 0..<doc.pageCount {
  autoreleasepool {
    let pg = doc.page(at: i)!
    let b = pg.bounds(for: .mediaBox)
    let esc = larg / b.width
    let w = Int(b.width * esc), h = Int(b.height * esc)
    let cs = CGColorSpaceCreateDeviceRGB()
    let bmp = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: cs, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
    bmp.setFillColor(CGColor(gray: 1, alpha: 1)); bmp.fill(CGRect(x: 0, y: 0, width: w, height: h))
    bmp.scaleBy(x: esc, y: esc); pg.draw(with: .mediaBox, to: bmp)
    let rep = NSBitmapImageRep(cgImage: bmp.makeImage()!)
    let jpg = rep.representation(using: .jpeg, properties: [.compressionFactor: q])!
    let img = CGImage(jpegDataProviderSource: CGDataProvider(data: jpg as CFData)!, decode: nil, shouldInterpolate: true, intent: .defaultIntent)!
    var mb = CGRect(x: 0, y: 0, width: b.width, height: b.height)
    ctx.beginPDFPage([kCGPDFContextMediaBox as String: NSData(bytes: &mb, length: MemoryLayout<CGRect>.size)] as CFDictionary)
    ctx.draw(img, in: mb)
    ctx.endPDFPage()
  }
}
ctx.closePDF()
try! out.write(to: URL(fileURLWithPath: a[2]))
print(a[2], doc.pageCount, "páginas", out.length / 1_000_000, "MB")
