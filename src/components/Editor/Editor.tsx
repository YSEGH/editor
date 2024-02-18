import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import style from "./css/Editor.module.css";
import { rotateAroundCenter } from "./utils";

type Snap = "start" | "center" | "end";

type SnappingEdges = {
  vertical: Array<{
    guide: number;
    offset: number;
    snap: Snap;
  }>;
  horizontal: Array<{
    guide: number;
    offset: number;
    snap: Snap;
  }>;
};

type Dimensions = {
  width: number;
  height: number;
};

type Props = {
  imageUrl: string;
  printArea: {
    type: string;
    width: number;
    height: number;
    template: string;
  };
};
type Templates = {
  [q: string]: Dimensions;
};

const GUIDELINE_OFFSET = 4;
const PRINTAREA_CLASS = "printArea";
const IMAGE_CLASS = "image";
const BREAKPOINT = 780;

const templates: Templates = {
  square: {
    width: window.innerWidth > BREAKPOINT ? 300 : 250,
    height: window.innerWidth > BREAKPOINT ? 300 : 250,
  },
  rectangular: {
    width: window.innerWidth > BREAKPOINT ? 250 : 200,
    height: window.innerWidth > BREAKPOINT ? 300 : 250,
  },
};

// Créer le rapport pixel/cm avec les vraies mesures en cm.

const Editor: React.FC<Props> = ({ imageUrl, printArea: { template } }) => {
  const [printAreaDimension, setPrintAreaDimension] = useState<Dimensions>(
    templates[template]
  );
  const orientationRef = useRef<"Portrait" | "Paysage">("Portrait");
  const shadowBlur = 29;
  const shadowOffset = { x: 0, y: 0 };
  const editorRef = useRef<HTMLDivElement | null>(null);
  const stageRef = React.useRef<Konva.Stage>(null);
  const layerRef = React.useRef<Konva.Layer>(null);
  const [loading, setLoading] = useState(true);
  const [imagePosition, setImagePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [imageDimension, setImageDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const getLineGuideStops = (skipShape: Konva.Shape) => {
    const stage = skipShape.getStage();
    if (!stage) return { vertical: [], horizontal: [] };

    // we can snap to stage borders and the center of the stage
    const vertical: any = [];
    const horizontal: any = [];

    // and we snap over edges and center of each object on the canvas
    stage.find(`.${PRINTAREA_CLASS}`).forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      const box = guideItem.getClientRect();
      // and we can snap to all edges of shapes
      vertical.push(
        box.x + shadowBlur,
        box.x + box.width - (shadowBlur + shadowOffset.x),
        box.x + box.width / 2
      );
      horizontal.push(
        box.y + shadowBlur,
        box.y + box.height - (shadowBlur + shadowOffset.y),
        box.y + box.height / 2
      );
    });
    return {
      vertical,
      horizontal,
    };
  };

  const getObjectSnappingEdges = React.useCallback(
    (node: Konva.Shape): SnappingEdges => {
      const box = node.getClientRect();
      const absPos = node.absolutePosition();

      return {
        vertical: [
          {
            guide: Math.round(box.x),
            offset: Math.round(absPos.x - box.x),
            snap: "start",
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(absPos.x - box.x - box.width / 2),
            snap: "center",
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(absPos.x - box.x - box.width),
            snap: "end",
          },
        ],
        horizontal: [
          {
            guide: Math.round(box.y),
            offset: Math.round(absPos.y - box.y),
            snap: "start",
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(absPos.y - box.y - box.height / 2),
            snap: "center",
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(absPos.y - box.y - box.height),
            snap: "end",
          },
        ],
      };
    },
    []
  );

  const getGuides = React.useCallback(
    (
      lineGuideStops: ReturnType<typeof getLineGuideStops>,
      itemBounds: ReturnType<typeof getObjectSnappingEdges>
    ) => {
      const resultV: Array<{
        lineGuide: number;
        diff: number;
        snap: Snap;
        offset: number;
      }> = [];

      const resultH: Array<{
        lineGuide: number;
        diff: number;
        snap: Snap;
        offset: number;
      }> = [];

      lineGuideStops.vertical.forEach((lineGuide: any) => {
        itemBounds.vertical.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach((lineGuide: any) => {
        itemBounds.horizontal.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            });
          }
        });
      });

      const guides: Array<{
        lineGuide: number;
        offset: number;
        orientation: "V" | "H";
        snap: "start" | "center" | "end";
      }> = [];

      const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: "V",
          snap: minV.snap,
        });
      }

      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: "H",
          snap: minH.snap,
        });
      }

      return guides;
    },
    []
  );

  const drawGuides = React.useCallback(
    (guides: ReturnType<typeof getGuides>, layer: Konva.Layer) => {
      guides.forEach((lg) => {
        if (lg.orientation === "H") {
          const line = new Konva.Line({
            points: [-6000, 0, 6000, 0],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6],
          });
          layer.add(line);
          line.absolutePosition({
            x: 0,
            y: lg.lineGuide,
          });
        } else if (lg.orientation === "V") {
          const line = new Konva.Line({
            points: [0, -6000, 0, 6000],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6],
          });
          layer.add(line);
          line.absolutePosition({
            x: lg.lineGuide,
            y: 0,
          });
        }
      });
    },
    []
  );

  const onMove = React.useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.target.opacity(0.3);
      const layer = e.target.getLayer();
      if (!layer) return;
      // clear all previous lines on the screen
      layer.find(".guid-line").forEach((l: any) => l.destroy());

      // find possible snapping lines
      const lineGuideStops = getLineGuideStops(e.target as Konva.Shape);
      // find snapping points of current object
      const itemBounds = getObjectSnappingEdges(e.target as Konva.Shape);

      // now find where can we snap current object
      const guides = getGuides(lineGuideStops, itemBounds);

      const printArea = layer.findOne(`.${PRINTAREA_CLASS}`)!;

      let removeWidth =
        orientationRef.current === "Paysage" ? printArea.width() : 0;

      setImagePosition({
        x: Math.round(e.target.position().x - printArea?.position().x),
        y: Math.round(
          e.target.position().y - printArea?.position().y + removeWidth
        ),
      });

      setImageDimension({
        width: Math.round(e.target.scaleX() * e.target.width()),
        height: Math.round(e.target.scaleY() * e.target.height()),
      });

      // do nothing if no snapping
      if (!guides.length) {
        return;
      }

      drawGuides(guides, layer);

      const absPos = e.target.absolutePosition();
      // now force object position
      guides.forEach((lg) => {
        switch (lg.snap) {
          case "start": {
            switch (lg.orientation) {
              case "V": {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case "H": {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
          case "center": {
            switch (lg.orientation) {
              case "V": {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case "H": {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
          case "end": {
            switch (lg.orientation) {
              case "V": {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case "H": {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
        }
      });
      e.target.absolutePosition(absPos);
    },
    [drawGuides, getGuides, getObjectSnappingEdges]
  );

  const onMoveEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.target.opacity(0.7);
    const layer = e.target.getLayer();
    if (!layer) return;
    // clear all previous lines on the screen
    layer.find(".guid-line").forEach((l: any) => l.destroy());
  };

  const setOrientationHandler = () => {
    const layer = layerRef.current;
    const printArea = layer?.findOne(`.${PRINTAREA_CLASS}`);
    const image = layer?.findOne(`.${IMAGE_CLASS}`);
    if (!layer || !printArea || !image) return;
    resetNodePosition(image);

    switch (orientationRef.current) {
      case "Portrait":
        rotateAroundCenter(printArea, -90);
        orientationRef.current = "Paysage";
        setImagePosition({
          x: Math.round(image.position().x - printArea.position().x),
          y: Math.round(
            image.position().y - printArea.position().y + printArea.width()
          ),
        });

        break;
      case "Paysage":
        rotateAroundCenter(printArea, 0);
        orientationRef.current = "Portrait";
        setImagePosition({
          x: Math.round(image.position().x - printArea.position().x),
          y: Math.round(image.position().y - printArea.position().y),
        });
        break;
    }
  };

  const getImageDimensions = () => {
    let width: number = 0;
    let height: number = 0;
    if (!printAreaDimension) return { width: width, height: height };
    switch (true) {
      case printAreaDimension.width === printAreaDimension.height:
        width = printAreaDimension.width;
        height = printAreaDimension.height;
        break;
      case printAreaDimension.width > printAreaDimension.height:
        width = printAreaDimension.width;
        height = printAreaDimension.width;
        break;
      case printAreaDimension.width < printAreaDimension.height:
        width = printAreaDimension.height;
        height = printAreaDimension.height;
        break;
    }
    return { width: width, height: height };
  };

  const resetImageHandler = () => {
    const editor = editorRef.current;
    const layer = layerRef.current;
    if (!editor || !layer) return;

    if (layer?.getChildren().length === 0) return;

    const printArea = layer.findOne(`.${PRINTAREA_CLASS}`);
    const image = layer.findOne(`.${IMAGE_CLASS}`);

    if (!image || !printArea) return;

    resetNodePosition(image);
    resetNodeDimension(image);

    switch (orientationRef.current) {
      case "Portrait":
        setImagePosition({
          x: Math.round(image.position().x - printArea.position().x),
          y: Math.round(image.position().y - printArea.position().y),
        });
        break;
      case "Paysage":
        setImagePosition({
          x: Math.round(image.position().x - printArea.position().x),
          y: Math.round(
            image.position().y - printArea.position().y + printArea.width()
          ),
        });
        break;
    }
  };

  const resetNodePosition = (node: Konva.Node) => {
    const stage = stageRef.current;
    if (!stage) return;
    let x = stage.width() / 2 - node.width() / 2;
    let y = stage.height() / 2 - node.height() / 2;
    setNodePosition(node, x, y);
  };

  const setNodePosition = (node: Konva.Node, x: number, y: number) => {
    node.x(x);
    node.y(y);
  };

  const resetNodeDimension = (node: Konva.Node) => {
    node.scale({ x: 1, y: 1 });
  };

  React.useEffect(() => {}, [orientationRef.current]);

  React.useEffect(() => {
    function fitStageIntoParentContainer() {
      setPrintAreaDimension(templates[template]);
      const editor = editorRef.current;
      const stage = stageRef.current;
      const layer = layerRef.current;

      if (!editor || !stage || !layer) return;

      // now we need to fit stage into parent container
      var containerWidth = editor.clientWidth;
      var height = 400;
      stage.width(containerWidth);
      stage.height(height);

      if (layer?.getChildren().length === 0) return;
      const image = layer.findOne(`.${IMAGE_CLASS}`);
      const printArea = layer.findOne(`.${PRINTAREA_CLASS}`);
      if (!image || !printArea) return;
      resetNodePosition(image);
      resetNodePosition(printArea);
    }

    fitStageIntoParentContainer();
    window.addEventListener("resize", fitStageIntoParentContainer);
    return () => {
      window.removeEventListener("resize", fitStageIntoParentContainer);
    };
  }, [editorRef.current]);

  React.useEffect(() => {
    const editor = editorRef.current;
    const stage = stageRef.current;
    const layer = layerRef.current;

    if (!editor || !stage || !layer) return;

    layer.findOne(`.${PRINTAREA_CLASS}`)?.destroy();

    const rect = new Konva.Rect({
      x: stage.width() / 2 - printAreaDimension.width / 2,
      y: stage.height() / 2 - printAreaDimension.height / 2,
      width: printAreaDimension.width,
      height: printAreaDimension.height,
      fill: "#fff",
      name: PRINTAREA_CLASS,
      shadowEnabled: true,
      shadowForStrokeEnabled: false,
      shadowColor: "#64646f33",
      shadowBlur: shadowBlur,
      shadowOffset: shadowOffset,
    });

    layer.add(rect);
    layer.draw();
    rect.zIndex(0);

    if (!layer.findOne(`.${IMAGE_CLASS}`)) {
      const imageObj = new window.Image();

      imageObj.onload = () => {
        const { width, height } = getImageDimensions();

        const konvaImage = new Konva.Image({
          x: stage.width() / 2 - width / 2,
          y: stage.height() / 2 - height / 2,
          image: imageObj,
          width: width,
          height: height,
          draggable: true,
          name: IMAGE_CLASS,
        });

        setImagePosition({
          x: konvaImage.position().x - rect.position().x,
          y: konvaImage.position().y - rect.position().y,
        });

        setImageDimension({
          width: width,
          height: height,
        });

        const transformer = new Konva.Transformer({
          rotateEnabled: false,
          centeredScaling: false,
        });
        transformer.nodes([konvaImage]);
        layer.add(transformer);
        layer.add(konvaImage);
        layer.draw();
        konvaImage.zIndex(1);
        konvaImage.on("transform", (e: Konva.KonvaEventObject<DragEvent>) =>
          onMove(e)
        );
        konvaImage.on("transformend", (e: Konva.KonvaEventObject<DragEvent>) =>
          onMoveEnd(e)
        );
        konvaImage.on("dragmove", (e: Konva.KonvaEventObject<DragEvent>) =>
          onMove(e)
        );
        konvaImage.on("dragend", (e: Konva.KonvaEventObject<DragEvent>) =>
          onMoveEnd(e)
        );
        setLoading(false);
      };

      imageObj.src = imageUrl;
    }
  }, [template, loading, onMove]);

  return (
    <div ref={editorRef} id="editor" className={style["editor"]}>
      <div className={style["editor__button-actions"]}>
        <button
          className={style["editor-orientation"]}
          onClick={setOrientationHandler}
        >
          Landscape
        </button>
        <button className={style["editor-reset"]} onClick={resetImageHandler}>
          Reset
        </button>
      </div>
      {printAreaDimension && (
        <Stage
          id="editor__stage"
          className={style.editor__stage}
          ref={stageRef}
        >
          <Layer ref={layerRef} />
        </Stage>
      )}
      <div className={style.editor__details}>
        <div className={style["editor__details-position"]}>
          <h4 className={style["details-title"]}>Position</h4>
          <p className={style["details-element"]}>
            x: <span>{imagePosition.x}</span>
          </p>
          <p className={style["details-element"]}>
            y: <span>{imagePosition.y}</span>
          </p>
        </div>
        <div className={style["editor__details-dimension"]}>
          <h4 className={style["details-title"]}>Dimension</h4>
          <p className={style["details-element"]}>
            Largeur: <span>{imageDimension.width}</span>
          </p>
          <p className={style["details-element"]}>
            Hauteur: <span>{imageDimension.height}</span>
          </p>
        </div>
        <div className={style["editor__details-orientation"]}>
          <h4 className={style["details-title"]}>Orientation</h4>
          <p className={style["details-element"]}>
            <span>{orientationRef.current}</span>
          </p>
        </div>
      </div>
      <div className={style.editor__submit}>
        <button>Valider</button>
      </div>
    </div>
  );
};

export default Editor;
