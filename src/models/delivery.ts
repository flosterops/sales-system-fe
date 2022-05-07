export interface ISaveDeliveryDateRequestData {
  slot: {
    deliveryDay: string;
    partOfTheDay: string;
  };
  homeDelivery: boolean;
  branchId: number | null;
}
