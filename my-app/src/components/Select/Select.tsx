import React, { FC, ReactNode, useState } from "react";
import useDropdown from "../Dropdown/useDropdown";
import { ReactComponent as Caret } from "../../assets/caret.svg";
import "./Select.scss";
import classNames from "classnames";
import { OffsetObject, PositionObject } from "../Dropdown/Dropdown.types";

export interface SelectOption {
  label: ReactNode;
  value: any;
}

export interface SelectProps {
  value: SelectOption;
  options: SelectOption[];
  onChange: (value: any) => void;
  position?: PositionObject;
  offset?: OffsetObject;
}

const Select: FC<SelectProps> = ({
  value,
  options,
  onChange,
  position = {
    x: "bottom",
    y: "center",
  },
  offset = {
    x: "0.15rem",
  },
}) => {
  const { isOpened, Dropdown, DropdownContent, toggleDropdown } = useDropdown(
    position,
    offset
  );

  const caretClassName = classNames({
    select__caret: true,
    active: isOpened,
  });

  const handleChange = (option: SelectOption) => {
    onChange(option);
    toggleDropdown(); // close after user select something
  };

  //Prevent the button from "jumping" when selecting another option
  const getButtonSize = () => {
    const maxItemLength = options.reduce((prev, current) => {
      if (!current.label) return 0;

      const labelLength = current.label.toString().length;
      console.log(current.label, labelLength);
      return labelLength > prev ? labelLength : prev;
    }, 0);

    return maxItemLength + 5;
  };

  return (
    <Dropdown>
      <button
        className="select input"
        onClick={() => toggleDropdown()}
        style={{ width: `${getButtonSize()}ch` }}
      >
        <span>{value.label}</span>
        <Caret className={caretClassName} />
      </button>
      <DropdownContent>
        {options.map((option, i) => (
          <button
            className="select__btn"
            key={option.value}
            onClick={() => handleChange(option)}
          >
            {option.label}
          </button>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

export default Select;
