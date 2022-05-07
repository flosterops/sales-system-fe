export interface IPickupBranch {
  branchId: number;
  branchName: string;
  branchAddress: string;
  availableSlots: IAvailableSlot[];
}

export interface IAvailableSlot {
  slotTime: string;
  slotDate: string;
}

export interface IAvailableDeliveryDatesResponse {
  data: IDeliverySlots;
}

export interface IDeliverySlots {
  pickupBranches: IPickupBranch[];
  homeDeliverySlots: IAvailableSlot[];
}
