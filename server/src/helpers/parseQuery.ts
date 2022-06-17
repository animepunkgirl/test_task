import { Filter, FilterCondition } from "../types/Filter";
import { TableData } from "../types/TableData";
import {
  isField,
  parseBoolean,
  parseFilterCondition,
  parseInteger,
} from "./parseHelpers";

export interface TableDataQuery {
  page: string;
  sortField: string;
  sortIsAsc: string;
  filterField: string;
  filterEnabled: string;
  filterCondition: string;
  filterValue: string;
  itemsOnPage: string;
}

interface TableDataParseResult {
  orderBy: keyof TableData;
  isAsc: boolean;
  page: number;
  itemsOnPage: number;
  filter: Filter;
}

const parseQuery = (queries: TableDataQuery): TableDataParseResult => {
  return {
    page: parseInteger(queries.page) ?? 1,
    itemsOnPage: parseInteger(queries.itemsOnPage) ?? 20,
    orderBy: isField(queries.sortField) ?? "title",
    isAsc: parseBoolean(queries.sortIsAsc, true),
    filter: {
      field: isField(queries.filterField) ?? "title",
      enabled: parseBoolean(queries.filterEnabled, false),
      condition:
        parseFilterCondition(queries.filterCondition) ?? FilterCondition.equal,
      value: queries.filterValue,
    },
  };
};

export interface PageAmountQuery {
  filterField: string;
  filterEnabled: string;
  filterCondition: string;
  filterValue: string;
  itemsOnPage: string;
}

interface PageAmountParseResult {
  itemsOnPage: number;
  filter: Filter;
}

const parsePageAmountQuery = (
  queries: PageAmountQuery
): PageAmountParseResult => {
  return {
    itemsOnPage: parseInteger(queries.itemsOnPage) ?? 20,
    filter: {
      field: isField(queries.filterField) ?? "title",
      enabled: parseBoolean(queries.filterEnabled, false),
      condition:
        parseFilterCondition(queries.filterCondition) ?? FilterCondition.equal,
      value: queries.filterValue,
    },
  };
};

export { parseQuery, parsePageAmountQuery };
