export interface StatisticDataItem {
  count: number;
  date: string;
}

export interface StatisticData {
  newUsersPerDay: StatisticDataItem[];
  newSalersPerDay: StatisticDataItem[];
  openContactsCurrentMonth: number;
  openContactsPreviousMonth: number;
  visitsCurrentMonth: number;
  visitsPreviousMonth: number;
}
