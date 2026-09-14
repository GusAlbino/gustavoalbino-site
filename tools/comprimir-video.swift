// Recomprime video para a web, com controle de bitrate.
//
//   swift tools/comprimir-video.swift <entrada> <saida> <larguraMax> <kbps>
//
// Por que nao avconvert
// ---------------------
// O avconvert existe nesta maquina e tem presets, mas eles miram qualidade e
// nao tamanho: o video do Hercules, 15,9MB em 1600x900, saiu com 25,9MB pelo
// Preset1280x720. Aqui o bitrate e o parametro, que e o que decide o peso.
//
// Por que H.264 e nao HEVC
// ------------------------
// O AVFoundation oferece HEVC e ele comprime melhor, mas Firefox nao toca H.265
// em MP4. Num portfolio, video que nao abre e pior que video pesado.
//
// O audio e descartado: os dois videos do site entram com muted no HTML, entao
// a faixa so ocupava espaco.
import AVFoundation
import Foundation

let a = CommandLine.arguments
guard a.count == 5, let larguraMax = Double(a[3]), let kbps = Int(a[4]) else {
    print("uso: comprimir-video.swift <entrada> <saida> <larguraMax> <kbps>"); exit(1)
}
let entrada = URL(fileURLWithPath: a[1])
let saida = URL(fileURLWithPath: a[2])
try? FileManager.default.removeItem(at: saida)

let asset = AVURLAsset(url: entrada)
guard let trilha = asset.tracks(withMediaType: .video).first else { print("sem trilha de video"); exit(1) }

let tamanho = trilha.naturalSize.applying(trilha.preferredTransform)
let lo = abs(tamanho.width), al = abs(tamanho.height)
let escala = min(1.0, larguraMax / Double(lo))
// dimensao par: encoder H.264 recusa largura ou altura impar
let novaL = Int((Double(lo) * escala / 2).rounded()) * 2
let novaA = Int((Double(al) * escala / 2).rounded()) * 2

let leitor = try AVAssetReader(asset: asset)
let saidaTrilha = AVAssetReaderTrackOutput(track: trilha, outputSettings: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
leitor.add(saidaTrilha)

let escritor = try AVAssetWriter(outputURL: saida, fileType: .mp4)
let entradaVideo = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: novaL,
    AVVideoHeightKey: novaA,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: kbps * 1000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
        // quadro-chave a cada 2s: deixa o visitante pular no video sem baixar tudo
        AVVideoMaxKeyFrameIntervalDurationKey: 2.0,
        AVVideoAllowFrameReorderingKey: true,
    ],
])
entradaVideo.expectsMediaDataInRealTime = false
// a rotacao do original vira pixels na saida, entao a transformacao ja foi aplicada
entradaVideo.transform = trilha.preferredTransform
let adaptador = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: entradaVideo, sourcePixelBufferAttributes: nil)
escritor.add(entradaVideo)

escritor.startWriting()
escritor.startSession(atSourceTime: .zero)
leitor.startReading()

let fila = DispatchQueue(label: "comprimir")
let feito = DispatchSemaphore(value: 0)
entradaVideo.requestMediaDataWhenReady(on: fila) {
    while entradaVideo.isReadyForMoreMediaData {
        guard let amostra = saidaTrilha.copyNextSampleBuffer() else {
            entradaVideo.markAsFinished()
            escritor.finishWriting { feito.signal() }
            return
        }
        _ = entradaVideo.append(amostra)
    }
}
feito.wait()

if escritor.status != .completed {
    print("falhou: \(escritor.error?.localizedDescription ?? "?")"); exit(1)
}
let bytes = (try! FileManager.default.attributesOfItem(atPath: saida.path)[.size] as! NSNumber).doubleValue
print(String(format: "  %@  %dx%d  %.1f MB", saida.lastPathComponent, novaL, novaA, bytes / 1048576))
