export interface ITimeTrackSearchRequest {
  criteria: {
    breakStartTimeGte?: string; // "yyyy-MM-dd'T'HH:mm:ssXXX"
    breakStartTimeLt?: string; // "yyyy-MM-dd'T'HH:mm:ssXXX"
  };
  page: {
    pageNumber?: number;
    pageSize?: number;
    sort?: {
      orders: {
        direction: string;
        property: string;
      }[];
    };
  };
}

export interface IDashboardTimeTrack {
  firstName: string;
  lastName: string;
  breakStart: string;
  breakEnd: string;
  breakStatus: string;
}
export interface ITimeTrackSearchResponse {
  data: IDashboardTimeTrack[];
  status: string;
}

export interface IInitiateBreakResponse {
  data: {};
  status: 'success' | 'failed';
}

export enum EBreakStatuses {
  afterSales = 'AFTERSALES',
  comfortBreak = 'COMFORT_BREAK',
  escalation = 'ESCALATION',
  lunchBreak = 'LUNCH_BREAK',
  meetings = 'MEETING',
  outbound = 'OUTBOUND',
  teaBreak = 'TEA_BREAK',
  training = 'TRAINING',
  unknown = 'UNKNOWN',
}

export interface IConfirmActivityResponse extends IInitiateBreakResponse {}

export interface IBreakReason {
  displayName: string;
  name: string;
}

export interface IBreakReasonsResponse extends IInitiateBreakResponse {
  data: IBreakReason[];
}
