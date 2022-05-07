export interface IGetContactsResponse {
  data: Array<{
    id: number;
    name: string;
  }>;
  status: string;
}
