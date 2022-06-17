import React, { FC } from "react";
import { TableDataDTO } from "../../../types/TableDataDTO";
import distanceToReadable from "../../../helpers/distanceToReadable";

interface Props {
  item: TableDataDTO;
}

const TableItem: FC<Props> = ({ item }) => {
  const date = new Date(item.date);
  const distance = distanceToReadable(item.distance);
  return (
    <div className="table__row">
      <div className="table__cell">{item.title}</div>
      <div className="table__cell">{item.amount}</div>
      <div className="table__cell">{distance}</div>
      <div className="table__cell">{date.toLocaleDateString()}</div>
    </div>
  );
};

export default TableItem;
