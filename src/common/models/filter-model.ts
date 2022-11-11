export interface Filter {
  page?: number;
  pageSize?: number;
  filters?: any[];
  sort?: any;
  date?: IDate;
  search?: ISearh;
}

export interface IDate {
  column?: string;
  startDate?: string;
  endDate?: string;
}

export interface ISearh {
  column?: string;
  value?: string;
}
