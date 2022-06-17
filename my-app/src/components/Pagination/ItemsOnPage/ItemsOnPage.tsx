import React, { useContext } from "react";
import Select from "../../Select/Select";
import paginationContext from "../../../context/PaginationContext";

const availableOptions = [5, 10, 15, 20, 25, 30, 45];

const ItemsOnPage = () => {
  const { itemsOnPage, setItemsOnPage } = useContext(paginationContext);

  const options = availableOptions.map((option) => ({
    label: option,
    value: option,
  }));

  const getCurrentValue = () => {
    return options.find((option) => option.value === itemsOnPage)!;
  };

  return (
    <div className="pagination__items-select">
      <span>Предметов на странице: </span>
      <Select
        value={getCurrentValue()}
        options={options}
        onChange={(option) => {
          setItemsOnPage(option.value);
        }}
        position={{
          x: "top",
          y: "center",
        }}
        offset={{
          x: "0.5rem",
        }}
      />
    </div>
  );
};

export default ItemsOnPage;
