import { TableData } from "../../types/TableData";
import { FilterCondition } from "../../types/Filter";
import { getFilter } from "../../helpers/dbQueryHelpers";

export interface getPageAmountResult {
  count: number;
}

export const getPageAmountQuery = `
  SELECT COUNT(*)
  FROM ${process.env.PGTABLE}
`;

export const getPageAmountFilterQuery = (
  filterField: keyof TableData,
  condition: FilterCondition
) => {
  return `
    SELECT COUNT(*)
    FROM ${process.env.PGTABLE}
    WHERE
        ${filterField} ${getFilter(filterField, condition)}
  ; 
  `;
};
