import { IBuyer, TPayment, TErrorsBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment: TPayment = "";
  private address: string = "";
  private phone: string = "";
  private email: string = "";

  constructor(protected events: IEvents) {}

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit("buyer:changed");
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit("buyer:changed");
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit("buyer:changed");
  }

  setEmail(email: string): void {
    this.email = email;
    this.events.emit("buyer:changed");
  }

  getInfo(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  clear(): void {
    this.payment = "";
    this.address = "";
    this.phone = "";
    this.email = "";
  }

  validOrder(): TErrorsBuyer {
    const errors: TErrorsBuyer = {};

    if (!this.payment) errors.payment = "Не выбран вид оплаты";
    if (!this.address) errors.address = "Не указан адрес доставки";

    return errors;
  }

  validContact(): TErrorsBuyer {
    const errors: TErrorsBuyer = {};

    if (!this.phone) errors.phone = "Не указан номер телефона";
    if (!this.email) errors.email = "Не указан адрес электронной почты";

    return errors;
  }
}
