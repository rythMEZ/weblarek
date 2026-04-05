export type ApiPostMethods = "POST" | "PUT" | "DELETE";

// Тип способа оплаты
export type TPayment = "card" | "cash" | "";

// Тип объекта, который получаем от сервера со списком карточек товаров
export type TProductList = {
  total: number;
  items: IProduct[];
};

// Тип объекта, который мы передаем на сервер с информацией о заказе
export type IOrderRequest = IBuyer & {
  total: number; // сумма заказа
  items: string[]; // массив c ID товаров
};

// Тип объекта, который мы получаем от сервера
export type IOrderResponse = {
  id: string; // id заказа
  total: number; // сумма заказа
};

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
}

export interface IBuyer {
  payment: TPayment;
  address: string;
  email: string;
  phone: string;
}
