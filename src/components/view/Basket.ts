import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IBasket } from "../../types";



export class Basket extends Component<IBasket> {
  protected totalPriceElement: HTMLElement;
  protected submitButton: HTMLButtonElement;
  protected listElement: HTMLElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );

    this.totalPriceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.submitButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    this.submitButton.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  set items(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  set total(value: number) {
    this.totalPriceElement.textContent = `${value} синапсов`;
  }

  set isDisabled(value: boolean) {
    this.submitButton.disabled = value;
  }
}
