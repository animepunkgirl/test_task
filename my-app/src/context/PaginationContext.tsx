import { createContext, FC, ReactNode, useState } from "react";

interface PaginationContext {
  page: number;
  setPage: (page: number) => void;
  itemsOnPage: number;
  setItemsOnPage: (items: number) => void;
}

//Creating empty context because we'll fill it anyway below
const PaginationContext = createContext<PaginationContext>(
  {} as PaginationContext
);

interface Props {
  children: ReactNode;
}

export const PaginationProvider: FC<Props> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(20);

  return (
    <PaginationContext.Provider
      value={{ page, setPage, itemsOnPage, setItemsOnPage }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationContext;
