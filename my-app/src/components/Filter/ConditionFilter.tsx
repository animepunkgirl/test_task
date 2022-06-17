import React, { useContext, useEffect } from "react";
import Select, { SelectOption } from "../Select/Select";
import FilterContext from "../../context/FilterContext";
import { FilterCondition } from "../../types/FilterCondition";
import { Field } from "../../types/Field";

const ConditionFilter = () => {
  const { field, condition, changeCondition } = useContext(FilterContext);

  //Change condition to available
  useEffect(() => {
    field === Field.Title
      ? changeCondition(FilterCondition.includes)
      : changeCondition(FilterCondition.equal);
  }, [field]);

  const options: SelectOption[] = [
    {
      label: "=",
      value: FilterCondition.equal,
    },
    {
      label: "содержит",
      value: FilterCondition.includes,
    },
    {
      label: ">",
      value: FilterCondition.greater,
    },
    {
      label: "<",
      value: FilterCondition.less,
    },
  ];

  //Get options depends on selected field
  const getOptions = () => {
    if (field !== Field.Title)
      return options.filter(
        (option) => option.value !== FilterCondition.includes
      );

    return options.filter(
      (option) =>
        option.value === FilterCondition.includes ||
        option.value === FilterCondition.equal
    );
  };

  const getCurrentValue = () => {
    return options.find((option) => option.value === condition)!;
  };

  const handleChange = (option: SelectOption) => {
    changeCondition(option.value);
  };

  return (
    <Select
      value={getCurrentValue()}
      options={getOptions()}
      onChange={handleChange}
    />
  );
};

export default ConditionFilter;
