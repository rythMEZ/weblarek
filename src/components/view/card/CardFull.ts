import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { ICardActions, TCardFull } from "../../../types";

export class CardFull extends Card<TCardFull> {
  protected descriptionElement: HTMLElement;
  protected buttonBuy: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buttonBuy = ensureElement<HTMLButtonElement>(
      ".button",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonBuy.addEventListener("click", actions.onClick);
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set isInBasket(value: boolean) {
    this.buttonBuy.textContent = value ? "Удалить из корзины" : "Купить";
  }

  set isDisabled(value: boolean) {
    if (value) {
      this.buttonBuy.disabled = value;
      this.buttonBuy.textContent = "Недоступно";
    }
  }
}
