import React, { FC, useContext } from "react";
import { HeaderField } from "./TableHeader";
import classNames from "classnames";
import { ReactComponent as Caret } from "../../../assets/caret.svg";
import SortContext from "../../../context/SortContext";

interface Props {
  item: HeaderField;
}

const TableHeaderItem: FC<Props> = ({ item }) => {
  const sort = useContext(SortContext);

  const className = classNames({
    table__cell: true,
    "table__cell-header": true,
    active: item.field === sort.field,
    "no-sort": item.disabledSort,
  });

  const renderCaret = () => {
    if (item.field !== sort.field) return null;

    const caretClassName = classNames({
      icon: true,
      rotate: sort.isAsc,
    });
    return <Caret className={caretClassName} />;
  };

  const handleClick = () => {
    if (!item.disabledSort) sort.changeField(item.field);
  };

  return (
    <div className={className} onClick={handleClick}>
      {item.name}
      {renderCaret()}
    </div>
  );
};

export default TableHeaderItem;
