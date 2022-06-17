import { ReactNode } from "react";

export interface DropdownWrapperProps {
  children: ReactNode;
}

export interface PositionObject {
  y: "left" | "right" | "center";
  x: "top" | "bottom";
}

export interface OffsetObject {
  x?: string;
  y?: string;
}

export interface DropdownProps {
  $position: PositionObject;
  $offset?: OffsetObject;
  children: ReactNode | null;
}
