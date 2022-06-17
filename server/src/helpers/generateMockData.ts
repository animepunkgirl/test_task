import { randomInt } from "crypto";
import { TableData } from "../types/TableData";
import * as mockTitles from "../mock/titles.json";

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

//Generate mock data for our insert query
const generateMockData = async (): Promise<TableData[]> => {
  const { titles } = mockTitles;

  return titles.map((title) => ({
    title: title.productName,
    amount: randomInt(1, 101),
    distance: randomInt(1000, 130001),
    date: randomDate(new Date(2019, 0, 1), new Date(2022, 6, 16)),
  }));
};

export default generateMockData;
