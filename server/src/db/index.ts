import { Pool } from "pg";
import {
  getTableDataFilterQuery,
  getTableDataQuery,
} from "./queries/getTableData";
import { TableData } from "../types/TableData";
import {
  getPageAmountQuery,
  getPageAmountResult,
} from "./queries/getPageAmount";
import { Filter } from "../types/Filter";
import init from "./_init";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

//Without filter
const _getTableData = async (
  orderBy: keyof TableData,
  isAsc: boolean,
  page: number,
  itemsOnPage: number
) => {
  const query = getTableDataQuery(orderBy, isAsc);
  const { rows } = await pool.query<TableData[]>(query, [
    itemsOnPage,
    (page - 1) * itemsOnPage,
  ]);
  return rows;
};

const _getTableDataWithFilter = async (
  orderBy: keyof TableData,
  isAsc: boolean,
  page: number,
  itemsOnPage: number,
  filter: Filter
) => {
  //Catching errors if filter is wrong
  try {
    const query = getTableDataFilterQuery(
      orderBy,
      isAsc,
      filter.field,
      filter.condition
    );
    const { rows } = await pool.query<TableData[]>(query, [
      filter.value,
      itemsOnPage,
      (page - 1) * itemsOnPage,
    ]);
    return rows;
  } catch (e) {
    return [];
  }
};

const getTableData = async (
  orderBy: keyof TableData,
  isAsc: boolean,
  page: number,
  itemsOnPage: number,
  filter: Filter
) => {
  return filter.enabled
    ? await _getTableDataWithFilter(orderBy, isAsc, page, itemsOnPage, filter)
    : await _getTableData(orderBy, isAsc, page, itemsOnPage);
};

const _tableDataCount = async (itemsOnPage: number) => {
  const { rows } = await pool.query<getPageAmountResult>(getPageAmountQuery);

  return (rows[0].count / itemsOnPage).toString();
};

const _tableDataCountWithFilter = async (
  itemsOnPage: number,
  filter: Filter
) => {};

const getPageAmount = async (itemsOnPage: number, filter: Filter) => {
  return filter.enabled
    ? _tableDataCountWithFilter(itemsOnPage, filter)
    : _tableDataCount(itemsOnPage);
};

const db = {
  init,
  getTableData,
  getPageAmount,
};

export default db;
