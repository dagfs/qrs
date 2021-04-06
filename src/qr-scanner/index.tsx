import jsQR from "jsqr";
import React, { useState } from "react";
import ts from "typescript";
import "./index.css";

/*
Based on https://github.com/cozmo/jsQR/blob/master/docs/index.html 
and https://betterprogramming.pub/add-an-html-canvas-into-your-react-app-176dab099a79
*/

type ScannerProps = {
  onChange: (code: string) => void;
};

const Scanner = ({ onChange }: ScannerProps): JSX.Element => {
  const canvas = document.createElement("canvas");
  const canvasCtx = canvas.getContext("2d");

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  const scanVideoStreamForQRCode = (): void => {
    if (canvasCtx && video && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;

      canvasCtx.drawImage(video, 0, 0, video.videoHeight, video.videoWidth);
      const imageData = canvasCtx.getImageData(
        0,
        0,
        video.videoHeight,
        video.videoWidth
      );
      try {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          onChange(code.data);
          return;
        }
      } catch (error) {
        if (error! instanceof RangeError) throw error;
      }
    }
    setTimeout(scanVideoStreamForQRCode, 200);
  };

  React.useEffect(() => {
    let mediaStream: MediaStream;
    if (videoRef.current) {
      setVideo(videoRef.current);
    }
    if (video) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
          mediaStream = stream;
          const [track] = mediaStream.getVideoTracks();

          const capabilities = track.getCapabilities();
          // TODO - fix type declarations
          //@ts-ignore
          if (capabilities.zoom) {
            //@ts-ignore
            const zoom = { zoom: capabilities.zoom.max };
            const c = {
              advanced: [ zoom ],
            };
            //@ts-ignore
            track.applyConstraints(c);
          }

          video.srcObject = mediaStream;
          video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
          video.play();
          setTimeout(scanVideoStreamForQRCode, 1000);
        });
    }
    const cleanup = (): void => {
      // release webcam when it is no longer needed
      mediaStream?.getTracks().forEach((t) => {
        t.stop();
      });
    };
    return cleanup;
  }, [video]);

  return (
    <div className="scanner">
      <video className="scanner__video" ref={videoRef}></video>
        <button onClick={() => onChange("")}>Avbryt</button>
    </div>
  );
};

type QRScannerProps = {
  onChange: (code: string) => void;
  label: string;
};
export const QRScanner = ({ onChange, label }: QRScannerProps): JSX.Element => {
  const [showQRScanner, setShowQRScanner] = useState(false);

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
};
