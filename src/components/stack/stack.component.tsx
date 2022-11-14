import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
}

const Stack = ({ children, direction = "vertical" }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: direction === "vertical" ? "flex-start" : "stretch",
        flexDirection: direction === "vertical" ? "column" : "row",
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
