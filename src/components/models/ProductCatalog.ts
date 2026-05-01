import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
  private items: IProduct[] = [];
  private item: IProduct | null = null;

  constructor(protected events: IEvents) {}

  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit("catalog:changed");
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }
  setSelectedItem(item: IProduct): void {
    this.item = item;
    this.events.emit("preview:open");
  }
  getSelectedItem(): IProduct | null {
    return this.item;
  }
}
