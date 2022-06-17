import { TableData } from "./TableData";

export enum FilterCondition {
  equal = "equal",
  includes = "includes",
  greater = "greater",
  less = "less",
}

export interface Filter {
  enabled: boolean;
  field: keyof TableData;
  condition: FilterCondition;
  value: string;
}
