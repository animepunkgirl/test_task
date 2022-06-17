import React, { FC, ReactNode, useState } from "react";
import { Field } from "../types/Field";

interface SortContext {
  field: Field;
  changeField: (sort: Field) => void;
  isAsc: boolean;
}

//Creating empty context because we'll fill it anyway below
const SortContext = React.createContext<SortContext>({} as SortContext);

interface SortProviderProps {
  children: ReactNode;
}

export const SortProvider: FC<SortProviderProps> = ({ children }) => {
  const [currentField, setCurrentField] = useState(Field.Title);
  const [isAsc, setIsAsc] = useState(true);

  const changeField = (field: Field) => {
    if (currentField === field) return setIsAsc((prev) => !prev);

    setCurrentField(field);
    setIsAsc(true);
  };

  const value = {
    field: currentField,
    changeField,
    isAsc: isAsc,
  };

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
};

export default SortContext;
