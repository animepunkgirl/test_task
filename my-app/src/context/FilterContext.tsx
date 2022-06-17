import { Field } from "../types/Field";
import { FilterCondition } from "../types/FilterCondition";
import { createContext, FC, ReactNode, useState } from "react";

interface FilterContext {
  isEnabled: boolean;
  toggleEnabled: () => void;
  field: Field;
  changeField: (field: Field) => void;
  condition: FilterCondition;
  changeCondition: (condition: FilterCondition) => void;
  value: string | number;
  setValue: (value: string | number) => void;
}

//Creating empty context because we'll fill it anyway below
const FilterContext = createContext<FilterContext>({} as FilterContext);

interface Props {
  children: ReactNode;
}

export const FilterProvider: FC<Props> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [field, setField] = useState(Field.Title);
  const [condition, setCondition] = useState(FilterCondition.includes);
  const [value, setValue] = useState<string | number>("");

  return (
    <FilterContext.Provider
      value={{
        isEnabled,
        toggleEnabled: () => setIsEnabled((prev) => !prev),
        value,
        setValue: (value: string | number) => setValue(value),
        field,
        changeField: (field: Field) => setField(field),
        changeCondition: (condition: FilterCondition) =>
          setCondition(condition),
        condition,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
