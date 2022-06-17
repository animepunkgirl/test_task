import React, { useContext } from "react";
import FieldFilter from "./FieldFilter";

import "./Filter.scss";
import ConditionFilter from "./ConditionFilter";
import filterContext from "../../context/FilterContext";
import classNames from "classnames";

const Filter = () => {
  const filter = useContext(filterContext);

  const getFilterBtn = () => {
    const className = classNames("filter__btn", "button", {
      "filter__btn-disable": filter.isEnabled,
    });
    const text = filter.isEnabled ? "Выключить фильтр" : "Включить фильтр";

    return (
      <button className={className} onClick={() => filter.toggleEnabled()}>
        {text}
      </button>
    );
  };

  return (
    <div className="filter">
      <div className="filter__label">Фильтр:</div>

      <FieldFilter />
      <ConditionFilter />
      <input
        className="filter__input input"
        type="text"
        value={filter.value}
        placeholder="Введите значение"
        onChange={(e) => filter.setValue(e.target.value)}
      />
      {getFilterBtn()}
    </div>
  );
};

export default Filter;
