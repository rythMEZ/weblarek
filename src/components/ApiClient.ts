import { IApi, TProductList, IOrderResponse, IOrderRequest } from "../types";

export class ApiClient {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<TProductList> {
    return await this.api.get("/product");
  }

  async postOrderInfo(order: IOrderRequest): Promise<IOrderResponse> {
    return await this.api.post("/order/", order);
  }
}
