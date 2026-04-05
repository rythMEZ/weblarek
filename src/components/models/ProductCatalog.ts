import { IProduct } from "../../types";

export class ProductCatalog {
  private items: IProduct[];
  private item: IProduct | null = null;
  

  constructor(items: IProduct[]) {
    this.items = items;
  }

  setItems(items: IProduct[]): void {
    this.items = items;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItemById(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }
  setSelectedItem(item: IProduct): void {
    this.item = item;
  }
  getSelectedItem(): IProduct | null {
    return this.item;
  }
}
