import React, { useContext, useEffect, useState } from "react";
import { TableDataDTO } from "../../../types/TableDataDTO";
import API from "../../../api";
import TableItem from "../TableItem/TableItem";
import sortContext from "../../../context/SortContext";
import paginationContext from "../../../context/PaginationContext";
import filterContext from "../../../context/FilterContext";
import NoResult from "../NoResult";

const TableList = () => {
  const sort = useContext(sortContext);
  const pagination = useContext(paginationContext);
  const filter = useContext(filterContext);

  const [fields, setFields] = useState<TableDataDTO[]>([]);

  /*
    В продакшене лучше разделить этот useEffect отдельно на сортироку, пагинацию и фильтр.
    Сделать проверки перед запросом к серверу, например, включён ли фильтр и нужно ли нам тогда делать запрос или нет
   */
  useEffect(() => {
    (async () => {
      const tableData = await API.fetchData({
        page: pagination.page,
        itemsOnPage: pagination.itemsOnPage,
        sortField: sort.field,
        sortIsAsc: sort.isAsc,
        filterEnabled: filter.isEnabled,
        filterField: filter.field,
        filterCondition: filter.condition,
        filterValue: filter.value,
      });

      tableData ? setFields(tableData) : setFields([]);
    })();
  }, [
    sort.field,
    sort.isAsc,
    pagination.page,
    pagination.itemsOnPage,
    filter.isEnabled,
    filter.field,
    filter.condition,
    filter.value,
  ]);

  if (!fields.length) return <NoResult />;

  return (
    <>
      {fields.map((field) => (
        <TableItem key={field.id} item={field} />
      ))}
    </>
  );
};

export default TableList;
