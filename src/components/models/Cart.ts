import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private items: IProduct[] = [];

  constructor(protected events: IEvents) {}

  getItems(): IProduct[] {
    return this.items;
  }

  add(item: IProduct) {
    if (!this.hasProductById(item.id)) {
      this.items.push(item);
    }
    this.events.emit("basket:changed");
  }

  remove(product: IProduct) {
    this.items = this.items.filter((item) => item.id !== product.id);
    this.events.emit("basket:changed");
  }

  clear(): void {
    this.items = [];
    this.events.emit("basket:changed");
  }

  getTotalValue(): number {
    return this.items.reduce((total, item) => total + (item.price ?? 0), 0);
  }

  getCount(): number {
    return this.items.length;
  }

  hasProductById(id: string): boolean {
    return this.items.some((item) => item.id === id);
  }
}
