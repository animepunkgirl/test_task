import React, { FC, useEffect, useRef } from "react";
import { useState } from "react";
import {
  DropdownWrapperProps,
  OffsetObject,
  PositionObject,
} from "./Dropdown.types";

import "./Dropdown.scss";

const getDropdownContentPosition = (
  position: PositionObject,
  offset?: OffsetObject
) => {
  let result: { [k: string]: any } = {};
  const xOffset = offset?.x;
  const yOffset = offset?.y;

  if (xOffset) {
    if (position.x === "top") {
      result.bottom = `calc(100% + ${xOffset}`;
    } else {
      result.top = `calc(100% + ${xOffset}`;
    }
  } else {
    if (position.x === "top") {
      result.bottom = `100%`;
    } else {
      result.top = `100%`;
    }
  }

  if (position.y === "left") result.right = yOffset ?? 0;

  if (position.y == "right") result.left = yOffset ?? 0;

  if (position.y === "center") {
    result.left = "50%";
    result.transform = "translate(-50%, 0)";
  }

  return result;
};

const useDropdown = (position: PositionObject, offset?: OffsetObject) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownWrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (e: PointerEvent) => {
    if (dropdownWrapperRef.current)
      if (!e.composedPath().includes(dropdownWrapperRef.current))
        setIsOpen(false);
  };

  useEffect(() => {
    isOpen
      ? document.addEventListener("pointerup", handleOutsideClick)
      : document.removeEventListener("pointerup", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerup", handleOutsideClick);
    };
  }, [isOpen]);

  const DropdownComponent: FC<DropdownWrapperProps> = ({ children }) => {
    const closeOnLostFocusTimeout = useRef<NodeJS.Timeout | null>(null);

    const onFocusHandler = () => {
      if (closeOnLostFocusTimeout.current)
        clearTimeout(closeOnLostFocusTimeout.current);
    };

    const onBlurHandler = () => {
      closeOnLostFocusTimeout.current = setTimeout(() => {
        setIsOpen(false);
      });
    };

    return (
      <div
        className="dropdown"
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        ref={dropdownWrapperRef}
      >
        {children}
      </div>
    );
  };

  const DropdownContentComponent: FC<DropdownWrapperProps> = ({ children }) => {
    if (!isOpen) return null;

    return (
      <div
        className="dropdown-content"
        style={getDropdownContentPosition(position, offset)}
      >
        {children}
      </div>
    );
  };

  return {
    isOpened: isOpen,
    Dropdown: DropdownComponent,
    toggleDropdown: toggleDropdown,
    DropdownContent: DropdownContentComponent,
  };
};

export default useDropdown;
