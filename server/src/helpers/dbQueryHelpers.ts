import { TableData } from "../types/TableData";
import { FilterCondition } from "../types/Filter";

export const getFilter = (
  field: keyof TableData,
  condition: FilterCondition
): string => {
  if (condition === FilterCondition.equal) return "= $1";
  if (condition === FilterCondition.greater) return "> $1";
  if (condition === FilterCondition.less) return "< $1";
  if (condition === FilterCondition.includes) {
    return "LIKE '%' || $1 || '%'";
  }
  return "= $1";
};
