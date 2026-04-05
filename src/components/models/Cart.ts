import { IProduct } from "../../types";

export class Cart {
  private items: IProduct[] = [];

  constructor() {}

  getItems(): IProduct[] {
    return this.items;
  }

  add(item: IProduct) {
    if (!this.hasProductById(item.id)) {
      this.items.push(item);
    }
  }

  remove(product: IProduct) {
    this.items = this.items.filter((item) => item.id !== product.id);
  }

  clear(): void {
    this.items = [];
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
