import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ISuccess } from "../../types";

export class OrderSuccess extends Component<ISuccess> {
  protected amountElement: HTMLElement;
  protected buttonNewOrder: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.amountElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );

    this.buttonNewOrder = ensureElement<HTMLButtonElement>(
      ".button",
      this.container,
    );

    this.buttonNewOrder.addEventListener("click", () => {
      this.events.emit("modal:close");
    });
  }

  set amount(value: number) {
    this.amountElement.textContent = `Списано ${value} синапсов`;
  }
}
