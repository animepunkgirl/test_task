import React from "react";
import { Field } from "types/Field";
import TableHeaderItem from "./TableHeaderItem";

export interface HeaderField {
  name: string;
  field: Field;
  disabledSort?: boolean;
}

const TableHeader = () => {
  const fields: HeaderField[] = [
    {
      name: "Название",
      field: Field.Title,
    },
    {
      name: "Количество",
      field: Field.Amount,
    },
    {
      name: "Расстояние",
      field: Field.Distance,
    },
    {
      name: "Дата",
      field: Field.Date,
      disabledSort: true,
    },
  ];

  return (
    <div className="table__row table__row-header">
      {fields.map((field) => (
        <TableHeaderItem item={field} />
      ))}
    </div>
  );
};

export default TableHeader;
