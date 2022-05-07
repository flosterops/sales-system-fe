import { EGadgetTypes } from 'models/gadget';

export const isUndefined = (value: any): value is undefined => typeof value === 'undefined';

export const isEGadgetType = (value: string): value is EGadgetTypes =>
  [
    EGadgetTypes.breakList,
    EGadgetTypes.customers,
    EGadgetTypes.newEnquiry,
    EGadgetTypes.taskQueue,
    EGadgetTypes.vehicles,
    EGadgetTypes.workerStatistics,
  ].includes(value as EGadgetTypes);
