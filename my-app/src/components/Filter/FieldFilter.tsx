import React, { useContext } from "react";
import Select, { SelectOption } from "../Select/Select";
import FilterContext from "../../context/FilterContext";
import { Field } from "../../types/Field";

const FieldFilter = () => {
  const { field, changeField } = useContext(FilterContext);

  const options: SelectOption[] = [
    {
      label: "Название",
      value: Field.Title,
    },
    {
      label: "Количество",
      value: Field.Amount,
    },
    {
      label: "Расстояние",
      value: Field.Distance,
    },
    {
      label: "Дата",
      value: Field.Date,
    },
  ];

  const getCurrentValue = () => {
    return options.find((option) => option.value === field)!;
  };

  const handleChange = (option: SelectOption) => {
    changeField(option.value);
  };

  return (
    <Select
      value={getCurrentValue()}
      options={options}
      onChange={handleChange}
    />
  );
};

export default FieldFilter;
