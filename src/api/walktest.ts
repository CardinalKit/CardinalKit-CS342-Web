export enum StoppingReason {
  Tired = 1,
  Interrupted = 2,
  LegHurt = 3,
  ShortOfBreath = 4,
  ChestPain = 5,
  None = 6,
}

export interface Walktest {
  ID: number;
  createdAt: Date;
  updatedAt: Date;

  syncID: string;
  mobileUserID: number;
  date: Date;
  endDate: Date;
  distance: number;
  stairs: number;
  stepsWithoutStopping: number;
  stoppingReason: StoppingReason;
  walkingAidID: number;
  painScale: number;
  fileName: string;
  phoneLocationID: number;
  postSOBScale?: number;
  preSOBScale?: number;
  inClinic: boolean;
  openWalk: boolean;
  chestStrapUsage: boolean;
  watchUsage: boolean;
  injuries: boolean;
  injuriesDate?: Date;
  anyPain: boolean;
  anyPainLocation?: string[];
  anyPainLocationOther?: string;
  phoneLocation: string;
  phoneLocationOther?: string;
  walkingAid?: string;
  stoppingReasonInterrupted?: boolean;
  stoppingReasonTired?: boolean;
  stoppingReasonLegHurt?: boolean;
  stoppingReasonChestPain?: boolean;
}
