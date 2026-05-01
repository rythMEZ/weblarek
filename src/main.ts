import "./scss/styles.scss";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/ApiClient";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { CardCatalog } from "./components/view/card/CardCatalog";
import { Gallery } from "./components/view/Gallery";
import { Header } from "./components/view/Header";
import { Modal } from "./components/view/Modal";
import { IProduct, TPayment, IOrderRequest } from "./types";
import { CardFull } from "./components/view/card/CardFull";
import { Basket } from "./components/view/Basket";
import { CardBasket } from "./components/view/card/CardBasket";
import { FormOrder } from "./components/view/form/FormOrder";

import { FormContact } from "./components/view/form/FormContact";
import { OrderSuccess } from "./components/view/OrderSuccess";

// Инициализация
const api = new Api(API_URL);
const apiClient = new ApiClient(api);
const events = new EventEmitter();

async function init() {
  try {
    const products = await apiClient.getProducts();
    productsModel.setItems(products.items);
  } catch (err) {
    console.log(err);
  }
}

// Модели
const cartModel = new Cart(events);
const productsModel = new ProductCatalog(events);
const buyerModel = new Buyer(events);

// DOM-Элементы
const galleryConatiner = ensureElement<HTMLElement>(".gallery");
const modalContainer = ensureElement<HTMLElement>("#modal-container");
const headerContainer = ensureElement<HTMLElement>(".header");

// Темплейты
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successOrderTemplate = ensureElement<HTMLTemplateElement>("#success");

// Отображение
const gallery = new Gallery(galleryConatiner);
const header = new Header(events, headerContainer);
const modal = new Modal(events, modalContainer);

// Константы
const basket = new Basket(cloneTemplate(basketTemplate), events);
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContact = new FormContact(cloneTemplate(contactsTemplate), events);

// Вспомогательная функция рендера корзины
const renderBasket = () => {
  const items = cartModel.getItems().map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit("basket:remove-from-basket", item),
    });
    return card.render({ ...item, index: index + 1 });
  });

  modal.render({
    content: basket.render({
      items,
      total: cartModel.getTotalValue(),
      isDisabled: cartModel.getCount() === 0,
    }),
  });
};

// Каталог
events.on("catalog:changed", () => {
  const itemCard = productsModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCard });
});

// Выбор карточки
events.on("card:select", (item: IProduct) => {
  productsModel.setSelectedItem(item);
});

// Карточка с подробным описанием
events.on("preview:open", () => {
  const item = productsModel.getSelectedItem();

  if (!item) return;

  const isInBasket = cartModel.hasProductById(item.id);

  const card = new CardFull(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (isInBasket) {
        events.emit("basket:remove-from-preview", item);
      } else {
        events.emit("basket:add", item);
      }
    },
  });
  modal.render({
    content: card.render({
      ...item,
      isInBasket,
      isDisabled: item.price === null,
    }),
  });

  modal.open();
});

// Закрытие модального окна
events.on("modal:close", () => {
  modal.close();
});

//Открытие корзины в шапке сайта
events.on("basket:open", () => {
  renderBasket();
  modal.open();
});

// Изменение корзины при добавлении товара в корзину
events.on("basket:changed", () => {
  header.render({ counter: cartModel.getCount() });
});

// Добавление и удаление товаров из корзины
events.on("basket:add", (item: IProduct) => {
  cartModel.add(item);
  modal.close();
});

events.on("basket:remove-from-preview", (item: IProduct) => {
  cartModel.remove(item);
  modal.close();
});

events.on("basket:remove-from-basket", (item: IProduct) => {
  cartModel.remove(item);
  renderBasket();
});

// Открытие первой формы - Order (способ оплаты, адрес)
events.on("order:open", () => {
  const buyer = buyerModel.getInfo();
  modal.render({
    content: formOrder.render({
      address: buyer.address,
      payment: buyer.payment,
    }),
  });
});

// Открытие второй формы - Contact (эмейл, телефон)
events.on("order:open-next", () => {
  const buyer = buyerModel.getInfo();
  formContact.errors = [];

  modal.render({
    content: formContact.render({
      email: buyer.email,
      phone: buyer.phone,
    }),
  });
});

// Открытие модального окна с информацией об успешном заказе
events.on("order:submit", async () => {
  const buyer = buyerModel.getInfo();
  const success = new OrderSuccess(cloneTemplate(successOrderTemplate), events);
  const orderPayload: IOrderRequest = {
    ...buyer,
    items: cartModel.getItems().map((item) => String(item.id)),
    total: cartModel.getTotalValue(),
  };

  try {
    const result = await apiClient.postOrderInfo(orderPayload);
    modal.render({
      content: success.render({
        amount: result.total,
      }),
    });
  } catch (err) {
    console.log(err);
  }

  cartModel.clear();
});

//Обработка данных введенных пользователем
events.on("buyer:changed", () => {
  const buyer = buyerModel.getInfo();
  formOrder.payment = buyer.payment;
  formOrder.address = buyer.address;
  formContact.email = buyer.email;
  formContact.phone = buyer.phone;

  const orderErrorsRaw = buyerModel.validOrder();
  const contactErrorsRaw = buyerModel.validContact();

  const orderErrors = Object.values(orderErrorsRaw).filter(Boolean);
  const contactErrors = Object.values(contactErrorsRaw).filter(Boolean);

  formOrder.errors = orderErrors;
  formOrder.valid = orderErrors.length === 0;

  formContact.errors = contactErrors;
  formContact.valid = contactErrors.length === 0;
});

events.on("payment:input", ({ payment }: { payment: TPayment }) => {
  buyerModel.setPayment(payment);
});

events.on("address:input", ({ address }: { address: string }) => {
  buyerModel.setAddress(address);
});

events.on("email:input", ({ email }: { email: string }) => {
  buyerModel.setEmail(email);
});

events.on("phone:input", ({ phone }: { phone: string }) => {
  buyerModel.setPhone(phone);
});

init();
