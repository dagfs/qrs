import React, { useState } from "react";

type ImageInputProps = {
  label: string;
  onChange: (value: string) => void;
  maxWidth?: number;
  maxHeight?: number;
  showImage?: boolean;
  buttonClassName?: string;
};

export const ResizeImageInput = ({
  label,
  maxWidth = 1920,
  maxHeight = 1080,
  onChange,
  showImage = true,
  buttonClassName = "",
}: ImageInputProps): JSX.Element => {
  const [image, setImage] = useState("");

  const uploadImage = (): void => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event: Event) => {
      /* Use file reader to read image from client*/
      const fr = new FileReader();

      /* When the image is loaded, transform and resize it*/
      fr.onload = () => {
        /* Get the result of the loaded image */
        const readImageByteString = fr.result?.toString() || "";

        /* Create a canvas to resize the image to preferred size */
        const imageResizeCanvas = document.createElement("canvas");

        const imageResizeCanvasContext = imageResizeCanvas.getContext("2d");

        if (imageResizeCanvasContext) {
          /* Create an image object that can be drawn on a canvas */
          const imageObjectToBeDrawnOnCanvas = new Image();

          /* Wait til image has been loaded before trying to draw it on canvas */
          imageObjectToBeDrawnOnCanvas.onload = () => {
            /* Calculate image height and width */
            let imageWidth = maxWidth;
            let imageHeight = maxHeight;
            const xScale = maxWidth / imageObjectToBeDrawnOnCanvas.width;
            const yScale = maxHeight / imageObjectToBeDrawnOnCanvas.height;
            if (xScale > yScale) {
              imageHeight = imageObjectToBeDrawnOnCanvas.height * xScale;
            } else {
              imageWidth = imageObjectToBeDrawnOnCanvas.width * yScale;
            }

            /* Draw the image scaled down */
            imageResizeCanvas.width = imageWidth;
            imageResizeCanvas.height = imageHeight;
            imageResizeCanvasContext.drawImage(
              imageObjectToBeDrawnOnCanvas,
              0,
              0,
              imageWidth,
              imageHeight
            );

            const base64ImageString = imageResizeCanvas.toDataURL();
            setImage(base64ImageString);
            onChange(base64ImageString);
          };

          imageObjectToBeDrawnOnCanvas.src = readImageByteString;
        }
      };
      if (event && event.target) {
        const target = event.target as HTMLInputElement;
        if (target.files) {
          fr.readAsDataURL(target.files[0]);
        }
      }

      /* TODO split into multiple functions for better readability */
    };

    input.click();
  };

  return (
    <div className="input-image">
      {showImage && <img className="input-image--image" src={image} />}
        <button className={buttonClassName} onClick={uploadImage}>
          {label}
        </button>
    </div>
  );
};
