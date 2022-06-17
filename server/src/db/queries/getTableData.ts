import { TableData } from "../../types/TableData";
import { FilterCondition } from "../../types/Filter";
import { getFilter } from "../../helpers/dbQueryHelpers";

export const getTableDataQuery = (orderBy: keyof TableData, isAsc: boolean) => {
  const order = isAsc ? "ASC" : "DESC";
  return `
    SELECT 
      * 
    FROM ${process.env.PGTABLE}
    ORDER BY ${orderBy} ${order}
    LIMIT $1 OFFSET $2  
  ; 
  `;
};

export const getTableDataFilterQuery = (
  orderBy: keyof TableData,
  isAsc: boolean,
  filterField: keyof TableData,
  condition: FilterCondition
) => {
  const order = isAsc ? "ASC" : "DESC";
  return `
    SELECT 
      * 
    FROM ${process.env.PGTABLE}
    WHERE
        ${filterField} ${getFilter(filterField, condition)}
    ORDER BY ${orderBy} ${order}
    LIMIT $2 OFFSET $3 
  ; 
  `;
};
