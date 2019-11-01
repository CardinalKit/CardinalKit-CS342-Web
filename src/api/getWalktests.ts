import { StoppingReason, Walktest } from './walktest';

import { BASE_URL } from './common';
import { request } from './request';

interface APIWalktest {
  id: number;
  createdAt: string;
  updatedAt: string;

  sync_id: string;
  mobileUserID: number;
  date: string;
  endDate: string;
  distance: number;
  stairs: number;
  stepsWithoutStopping: number;
  stoppingReasonID: number;
  walkingAidID: number;
  painScale: number;
  fileName: string;
  phoneLocationID: number;
  postSOBScale: number | null;
  preSOBScale: number | null;
  inClinic: boolean;
  openWalk: boolean;
  chestStrapUsage: boolean;
  watchUsage: boolean;
  injuries: boolean;
  injuriesDate?: string;
  anyPain: boolean;
  anyPainLocation?: string[];
  anyPainLocationOther?: string;
  phoneLocation: string;
  phoneLocationOther: string | null;
  walkingAid?: string;
  stoppingReasonInterrupted?: boolean;
  stoppingReasonTired?: boolean;
  stoppingReasonLegHurt?: boolean;
  stoppingReasonChestPain?: boolean;
}

function apiWalktestToWalktest(apiWalktest: APIWalktest): Walktest {
  return {
    ID: apiWalktest.id,
    createdAt: new Date(apiWalktest.createdAt),
    updatedAt: new Date(apiWalktest.updatedAt),

    syncID: apiWalktest.sync_id,
    mobileUserID: apiWalktest.mobileUserID,
    date: new Date(apiWalktest.date),
    endDate: new Date(apiWalktest.endDate),
    distance: apiWalktest.distance,
    stairs: apiWalktest.stairs,
    stepsWithoutStopping: apiWalktest.stepsWithoutStopping,
    stoppingReason: apiWalktest.stoppingReasonID as StoppingReason,
    walkingAidID: apiWalktest.walkingAidID,
    painScale: apiWalktest.painScale,
    fileName: apiWalktest.fileName,
    phoneLocationID: apiWalktest.phoneLocationID,
    postSOBScale: apiWalktest.postSOBScale === null ? undefined : apiWalktest.postSOBScale,
    preSOBScale: apiWalktest.preSOBScale === null ? undefined : apiWalktest.preSOBScale,
    inClinic: apiWalktest.inClinic,
    openWalk: apiWalktest.openWalk,
    chestStrapUsage: apiWalktest.chestStrapUsage,
    watchUsage: apiWalktest.watchUsage,
    injuries: apiWalktest.injuries,
    injuriesDate: apiWalktest.injuriesDate ? new Date(apiWalktest.injuriesDate) : undefined,
    anyPain: apiWalktest.anyPain,
    anyPainLocation: apiWalktest.anyPainLocation,
    anyPainLocationOther: apiWalktest.anyPainLocationOther,
    phoneLocation: apiWalktest.phoneLocation,
    phoneLocationOther:
      apiWalktest.phoneLocationOther === null ? undefined : apiWalktest.phoneLocationOther,
    walkingAid: apiWalktest.walkingAid,
    stoppingReasonInterrupted: apiWalktest.stoppingReasonInterrupted,
    stoppingReasonTired: apiWalktest.stoppingReasonTired,
    stoppingReasonLegHurt: apiWalktest.stoppingReasonLegHurt,
    stoppingReasonChestPain: apiWalktest.stoppingReasonChestPain,
  };
}

export function getWalktestsForUser(authToken: string, userID: number): Promise<Walktest[]> {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      'X-DeviceFingerprint': 'tempfingerprint',
    },
  };
  return request(`${BASE_URL}/api/v1/walktest/${userID}`, options).then(
    (apiWalktests: APIWalktest[]) => apiWalktests.map(apiWalktestToWalktest)
  );
}
