export interface IDashboardOverviewData {
  users_last_7_days: number
  users_previous_7_days: number
  users_diff_percentage: number
}

export interface IDashboardOverview {
  data: IDashboardOverviewData
}
