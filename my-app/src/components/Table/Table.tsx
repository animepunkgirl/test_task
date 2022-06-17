import React from "react";
import TableHeader from "./TableHeader/TableHeader";

import "./Table.scss";
import TableList from "./TableList/TableList";

const Table = () => {
  return (
    <div className="table">
      <TableHeader />
      <TableList />
    </div>
  );
};

export default Table;
