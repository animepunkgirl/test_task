import React, { useContext, useEffect, useState } from "react";

import "./Pagination.scss";
import paginationContext from "../../context/PaginationContext";
import API from "../../api";
import classNames from "classnames";
import ItemsOnPage from "./ItemsOnPage/ItemsOnPage";
import filterContext from "../../context/FilterContext";

const Pagination = () => {
  const pagination = useContext(paginationContext);
  const filter = useContext(filterContext);
  const [pageCount, setPageCount] = useState(-1); // -1 means no data loaded

  useEffect(() => {
    /*
    По хорошему в продакшене здесь добавить проверку что фильтр был включён вместо того, чтобы делать новые запросы к серверу.
    Может сделать мемоизацию результата.
   */
    (async () => {
      const result = await API.getPageAmount({
        itemsOnPage: pagination.itemsOnPage,
        filterEnabled: filter.isEnabled,
        filterField: filter.field,
        filterCondition: filter.condition,
        filterValue: filter.value,
      });
      setPageCount(Math.ceil(result));
    })();
  }, [pagination.itemsOnPage, filter]);

  if (pageCount < 0) return null;

  const renderPageButtons = () => {
    return [...Array(pageCount)].map((el, i) => {
      const page = i + 1;

      return (
        <button
          key={i}
          className={classNames({ active: page === pagination.page })}
          onClick={() => pagination.setPage(page)}
        >
          {page}
        </button>
      );
    });
  };
  return (
    <div className="pagination">
      <div className="pagination__pages">
        <button
          onClick={() => pagination.setPage(1)}
          disabled={pagination.page === 1}
        >
          &laquo;
        </button>

        {renderPageButtons()}

        <button
          onClick={() => pagination.setPage(pageCount)}
          disabled={pagination.page === pageCount}
        >
          &raquo;
        </button>
      </div>
      <ItemsOnPage />
    </div>
  );
};

export default Pagination;
