import { IBuyer, TPayment, TErrorsBuyer } from "../../types";

export class Buyer {
  private payment: TPayment = "";
  private address: string = "";
  private phone: string = "";
  private email: string = "";

  constructor() {}

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setEmail(email: string): void {
    this.email = email;
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

  valid(): TErrorsBuyer {
    const errors: TErrorsBuyer = {};

    if (this.payment === "") {
      errors.payment = "Не выбран вид оплаты";
    }
    if (this.address === "") {
      errors.address = "Не указан адрес доставки";
    }
    if (this.phone === "") {
      errors.phone = "Не указан номер телефона";
    }

    if (this.email === "") {
      errors.email = "Не указан адрес электронной почты";
    }

    return errors;
  }
}
