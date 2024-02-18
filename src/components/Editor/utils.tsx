import Konva from "konva";

export const rotatePoint = (
  { x, y }: { x: number; y: number },
  rad: number
) => {
  const rcos = Math.cos(rad);
  const rsin = Math.sin(rad);
  return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
};

// will work for shapes with top-left origin, like rectangle
export const rotateAroundCenter = (node: Konva.Node, rotation: number) => {
  //current rotation origin (0, 0) relative to desired origin - center (node.width()/2, node.height()/2)
  const topLeft = { x: -node.width() / 2, y: -node.height() / 2 };
  const current = rotatePoint(topLeft, Konva.getAngle(node.rotation()));
  const rotated = rotatePoint(topLeft, Konva.getAngle(rotation));
  const dx = rotated.x - current.x,
    dy = rotated.y - current.y;

  node.rotation(rotation);
  node.x(node.x() + dx);
  node.y(node.y() + dy);
};
