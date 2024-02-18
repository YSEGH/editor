import Konva from "konva";
import React, { useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";

interface URLImageProps {
  imageRef: any;
  src: string;
  x: number;
  y: number;
  onDragMove: Function;
  onDragEnd: Function;
}

const KonvaImage: React.FC<URLImageProps> = ({
  imageRef,
  src,
  x,
  y,
  onDragMove,
  onDragEnd,
}) => {
  const [image, setImage] = useState<CanvasImageSource | undefined>();
  const transformerRef = React.useRef<Konva.Transformer>(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.src = src;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        setImage(img);
      };
    };

    loadImage();
  }, [src]);

  useEffect(() => {
    if (imageRef.current) {
      transformerRef.current?.setNodes([imageRef.current]);
      transformerRef.current?.getLayer()?.batchDraw();
    }
  }, [image]);

  return (
    <>
      <Image
        image={image}
        x={x}
        y={y}
        width={100}
        height={100}
        draggable
        ref={imageRef}
        onTransformEnd={() => {}}
        onDragMove={(e) => onDragMove(e)}
        onDragEnd={(e) => onDragEnd(e)}
      />
      <Transformer ref={transformerRef} rotationSnaps={[0, 90, 180, 270]} />
    </>
  );
};

export default KonvaImage;
