export const tableDataObj: TableData = {
  title: "",
  amount: 0,
  distance: 0,
  date: new Date(),
};

export interface TableData {
  title: string;
  amount: number;
  distance: number; // in meters
  date: Date;
}
