import "./scss/styles.scss";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { Cart } from "./components/models/Cart";
import { Buyer } from "./components/models/Buyer";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/ApiClient";
import { Api } from "./components/base/Api";

//Проверка классов и их методов
const ID = "854cef69-976d-4c2a-a18c-2aa45046c390";

// Проверка работы класса ProductCatalog и его методов
const productsModel = new ProductCatalog();

productsModel.setItems(apiProducts.items);
productsModel.setSelectedItem(apiProducts.items[1]);

console.log(`Массив товаров из каталога:`, productsModel.getItems());
console.log(`Товар из каталога:`, productsModel.getSelectedItem());
console.log(`Получение товара по ID`, productsModel.getItemById(ID));

// Проверка работы класса Cart и его методов
const cartModel = new Cart();

console.log(`Массив всех товаров в корзине`, cartModel.getItems());

cartModel.add(apiProducts.items[0]);
cartModel.add(apiProducts.items[0]);
cartModel.add(apiProducts.items[1]);
cartModel.add(apiProducts.items[2]);
console.log(`Проверка добавления товара в корзину`, cartModel.getItems());

cartModel.remove(apiProducts.items[1]);
console.log(`Проверка удаления товара из корзины`, cartModel.getItems());

console.log(`Сумма заказа`, cartModel.getTotalValue());
console.log(`Количество товаров в корзине`, cartModel.getCount());
console.log(
  `Проверка наличия товара в корзине по ID`,
  cartModel.hasProductById(ID),
);

cartModel.clear();
console.log(`Очистка корзины`, cartModel.getItems());

// Проверка работы класса Buer и его методов
const buyerModel = new Buyer();

buyerModel.setPayment("card");
buyerModel.setAddress("119180, Bryansk, Polyanka 15");
buyerModel.setPhone("89005553535");
buyerModel.setEmail("etovsemne@yandex.ru");
console.log(`Получение данных о пользователе`, buyerModel.getInfo());

buyerModel.clear();
console.log(
  `Проверка метода очистки данных пользователя`,
  buyerModel.getInfo(),
);

console.log(`Валидация данных`, buyerModel.valid());

// Проверка работы класс ApiClient
const api = new Api(API_URL);
const apiClient = new ApiClient(api);
const serverProducts = new ProductCatalog();

async function init() {
  try {
    const products = await apiClient.getProducts();
    serverProducts.setItems(products.items);
    console.log(`Данные с сервера`, serverProducts.getItems());
  } catch (err) {
    console.log(err);
  }
}

init();
