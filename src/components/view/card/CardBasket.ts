import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions, TCardBasket } from "../../../types";

export class CardBasket extends Card<TCardBasket> {
  protected basketItemIndex: HTMLElement;
  protected buttonRemove: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.basketItemIndex = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.buttonRemove = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonRemove.addEventListener("click", actions.onClick);
    }
  }
  set index(value: number) {
    this.basketItemIndex.textContent = String(value);
  }
}
