import { Router } from "express";
const router = Router();
import db from "../db";
import {
  parseQuery,
  TableDataQuery,
  parsePageAmountQuery,
  PageAmountQuery,
} from "../helpers/parseQuery";

//Return table data page with filter
router.get("/", async (req, res) => {
  const query: unknown = req.query;
  const { orderBy, isAsc, page, filter, itemsOnPage } = parseQuery(
    query as TableDataQuery
  );
  return res.json(
    await db.getTableData(orderBy, isAsc, page, itemsOnPage, filter)
  );
});

//Returns amount of pages
router.get("/page-amount", async (req, res) => {
  const query: unknown = req.query;
  const { itemsOnPage, filter } = parsePageAmountQuery(
    query as PageAmountQuery
  );

  return res.send(await db.getPageAmount(itemsOnPage, filter));
});

export default router;
