import { useContext } from "react";
import { Point, pointContext, PointType } from "../../contexts/point.context";

interface Props {
  type: PointType | "remove";
  point: Point;
  setTemporaryPoint: React.Dispatch<React.SetStateAction<Point | undefined>>;
}

const PopupButton = ({ type, setTemporaryPoint, point }: Props) => {
  const { points, setPoints } = useContext(pointContext);

  const createPoint = (type: PointType) => {
    const newPoint: Point = { type, coords: point.coords };
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    setTemporaryPoint(undefined);
  };

  const removePoint = () => {
    const newPoints = points.filter((p) => p !== point);
    setPoints(newPoints);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        point.type === "temporary" && type !== "remove"
          ? createPoint(type)
          : removePoint();
      }}
    >
      {type !== "remove" ? `set as ${type}` : type}
    </button>
  );
};

export default PopupButton;
