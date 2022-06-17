import axiosPrototype from "axios";
import { Field } from "../types/Field";
import { TableDataDTO } from "../types/TableDataDTO";
import { FilterCondition } from "../types/FilterCondition";

const axios = axiosPrototype.create({
  baseURL: process.env.REACT_APP_API,
});

interface getPageAmountOptions {
  itemsOnPage: number;
  filterField: Field;
  filterEnabled: boolean;
  filterCondition: FilterCondition;
  filterValue: string | number;
}

const getPageAmount = async (options: getPageAmountOptions) => {
  const result = await axios.get<number>("/page-amount", {
    params: options,
  });
  return result.data;
};

interface fetchDataOptions extends getPageAmountOptions {
  page: number;
  sortField: Field;
  sortIsAsc: boolean;
}

const fetchData = async (options: fetchDataOptions) => {
  const result = await axios.get<TableDataDTO[]>("/", {
    params: options,
  });
  return result.data;
};

const API = {
  getPageAmount,
  fetchData,
};

export default API;
