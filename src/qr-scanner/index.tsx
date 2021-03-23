import jsQR from "jsqr"
import React, { useState } from "react"
import "./index.css"

/*
Based on https://github.com/cozmo/jsQR/blob/master/docs/index.html 
and https://betterprogramming.pub/add-an-html-canvas-into-your-react-app-176dab099a79

*/

type ScannerProps = {
  onChange: (code: string) => void
}

const Scanner = ({ onChange }: ScannerProps): JSX.Element => {
  const video = document.createElement("video")

  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null)

  const tick = (): void => {
    if (canvasRef.current && context && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasRef.current.height = video.videoHeight
      canvasRef.current.width = video.videoWidth

      context.drawImage(video, 0, 0, video.videoHeight, video.videoWidth)
      const imageData = context.getImageData(0, 0, video.videoHeight, video.videoWidth)
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
      })
      if (code) {
        onChange(code.data)
        return
      }
    }
    requestAnimationFrame(tick)
  }

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d")

      if (renderCtx) {
        setContext(renderCtx)
      }
    }
    if (context) {
      // Use facingMode: environment to attemt to get the front camera on phones
      console.log(navigator)
      console.log(navigator.mediaDevices)
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
        video.srcObject = stream
        video.setAttribute("playsinline", "true") // required to tell iOS safari we don't want fullscreen
        video.play()
        requestAnimationFrame(tick)
      })
    }
  }, [context])

  return (
    <div className="scanner">
      <canvas className="scanner__canvas" ref={canvasRef}></canvas>
    </div>
  )
}

type QRScannerProps = {
  onChange: (code: string) => void
  label: string
}
export const QRScanner = ({ onChange, label }: QRScannerProps): JSX.Element => {
  const [showQRScanner, setShowQRScanner] = useState(false)

  return (
    <div className="qr-scanner">
      <button onClick={() => setShowQRScanner(true)}>{label}</button>
      {showQRScanner ? (
        <Scanner
          onChange={(code) => {
            onChange(code);
            setShowQRScanner(false);
          }}
        />
      ) : null}
    </div>
  );
}
