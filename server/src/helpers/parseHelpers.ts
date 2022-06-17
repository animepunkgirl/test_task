import { TableData, tableDataObj } from "../types/TableData";
import { FilterCondition } from "../types/Filter";

export const isField = (field: any): keyof TableData | null => {
  if (typeof field === "string" && Object.keys(tableDataObj).includes(field))
    return field as keyof TableData;

  return null;
};

export const parseBoolean = (field: any, undefinedValue: boolean): boolean => {
  if (typeof field !== "string") return undefinedValue;

  return field.toLowerCase() === "true";
};

export const parseFilterCondition = (field: any): FilterCondition | null => {
  if (typeof field === "string" && Object.keys(FilterCondition).includes(field))
    return field as FilterCondition;

  return null;
};

export const parseInteger = (field: any): number | null => {
  if (typeof field === "string" && !isNaN(parseInt(field)!))
    return parseInt(field);

  return null;
};
