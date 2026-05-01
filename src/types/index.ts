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

// Тип объекта, для получения информации о валидации полей
export type TErrorsBuyer = Partial<Record<keyof IBuyer, string>>;

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

export interface ICardActions {
  onClick?: () => void;
}

export type TCard = Pick<IProduct, "title" | "price">;

export type TCardBasket = TCard & {
  index: number;
};

export type TCardCatalog = TCard & Pick<IProduct, "image" | "category">;

export type TForm = {
  valid: boolean;
  errors: string[];
};

export type TFormContact = TForm & {
  email: string;
  phone: string;
};

export type TFormOrder = TForm & {
  address: string;
  payment: string;
};


export interface IBasket {
  items: HTMLElement[];
  total: number;
  isDisabled: boolean;
}

export interface IGallery {
  catalog: HTMLElement[];
}

export interface IHeader {
  counter: number;
}

export interface IModal {
  content: HTMLElement;
}

export interface ISuccess {
  amount: number;
}

export type TCardFull = Omit<IProduct, "id"> & {
  isInBasket: boolean;
  isDisabled: boolean;
};