
import jsQR from "jsqr";
import React, { useState } from "react";
import { ResizeImageInput } from "../resize-image-input";
import "./index.css";

/*
Based on https://github.com/cozmo/jsQR/blob/master/docs/index.html 
and https://betterprogramming.pub/add-an-html-canvas-into-your-react-app-176dab099a79
Zoom from: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API

*/

type ScannerProps = {
  onChange: (code: string) => void;
};

const Scanner = ({ onChange }: ScannerProps): JSX.Element => {
  const canvas = document.createElement("canvas");
  const canvasCtx = canvas.getContext("2d");

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [code, setCode] = useState("");
  const [showScanImageButton, setShowScanImageButton] = useState(true);
  const [error, setError] = useState("");
  const [img, setImg] = useState("");
  let scanVideoStreamForQRCodeTimeoutId: NodeJS.Timeout;

  const scanImageForQRCode = (
    imageSource: CanvasImageSource,
    width: number,
    height: number
  ): boolean => {
    if (canvasCtx) {
      canvas.height = height;
      canvas.width = width;

      canvasCtx.drawImage(imageSource, 0, 0, width, height);
      const imageData = canvasCtx.getImageData(0, 0, width, height);
      try {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          setCode(code.data);

          return true;
        }
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
      }
    }
    return false;
  };

  const scanVideoStreamForQRCode = (): void => {
    if (code) {
      return;
    }
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      scanImageForQRCode(video, video.videoHeight, video.videoWidth);
    }
    scanVideoStreamForQRCodeTimeoutId = setTimeout(
      scanVideoStreamForQRCode,
      200
    );
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

          const capabilities =
            track && track.getCapabilities && track.getCapabilities();

          if (capabilities && capabilities.zoom) {
            track &&
              track.applyConstraints({
                advanced: [{ zoom: capabilities.zoom.min }],
              });
          }

          video.srcObject = mediaStream;

          // required to tell iOS safari we don't want fullscreen
          video.setAttribute("playsinline", "true");
          video.play();

          scanVideoStreamForQRCodeTimeoutId = setTimeout(
            scanVideoStreamForQRCode,
            1000
          );
        })
        .then(() => {
          setShowScanImageButton(false);
        });
    }
    const cleanup = (): void => {
      // release webcam when it is no longer needed
      mediaStream?.getTracks().forEach((t) => {
        t.stop();
      });
      clearTimeout(scanVideoStreamForQRCodeTimeoutId);
    };
    return cleanup;
  }, [video]);

  const getQRFromBase64String = (base64EncodedImage: string): void => {
    setError("");
    setCode("");
    setImg(base64EncodedImage);

    const img = new Image();
    img.onload = () => {
      const foundQrCode = scanImageForQRCode(img, img.width, img.height);
      if (!foundQrCode) {
        setError(
          "Fant ikke QR kode i bilde. Prøv å holde mobilen litt lenger unna og ta et nytt bilde"
        );
      }
    };
    img.src = base64EncodedImage;
  };

  return (
    <div className="scanner">
      <video
        className={`scanner__video ${
          showScanImageButton ? "scanner__video--hidden" : ""
        }`}
        ref={videoRef}
      ></video>
      {img && <img className="scanner__image" alt="Uploaded image" src={img} />}
      { code && <div className="scanner__code">{code}</div>}

      {error && <div className="scanner__error">{error}</div>}
      <div id="scanner__buttons">
        {showScanImageButton && (
          <ResizeImageInput
            label="Last opp bilde av QR code"
            onChange={getQRFromBase64String}
            maxWidth={640}
            maxHeight={480}
            showImage={false}
            buttonClassName="scanner__buttons__background"
          />
        )}
        {code && (
          <button
            className="scanner__buttons__background"
            onClick={() => onChange(code)}
          >
            Lagre
          </button>
        )}
        <button
          className="scanner__buttons__background"
          onClick={() => onChange("")}
        >
          Avbryt
        </button>
      </div>
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
      <button
        onClick={() => {
          setShowQRScanner(true);
        }}
      >
        {label}
      </button>
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
