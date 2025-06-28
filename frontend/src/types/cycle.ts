export interface CycleData {
  id: string
  startDate: Date
  endDate: Date
  length: number
  periodLength: number
}

export interface UserSettings {
  averageCycleLength: number
  averagePeriodLength: number
  age?: number
  setupComplete: boolean
}

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal" | "unknown"
