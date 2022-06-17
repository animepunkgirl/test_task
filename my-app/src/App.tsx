import React from "react";
import Table from "components/Table/Table";
import { SortProvider } from "context/SortContext";

import "destyle.css";
import "./App.scss";
import "./common.scss";
import Filter from "./components/Filter/Filter";
import { PaginationProvider } from "./context/PaginationContext";
import Pagination from "./components/Pagination/Pagination";
import { FilterProvider } from "./context/FilterContext";

function App() {
  /*
    Использую Context вместо глобального стейт хранилища.
   */
  return (
    <SortProvider>
      <PaginationProvider>
        <FilterProvider>
          <div className="app">
            <div className="wrapper">
              <Filter />
              <Table />
              <Pagination />
            </div>
          </div>
        </FilterProvider>
      </PaginationProvider>
    </SortProvider>
  );
}

export default App;
