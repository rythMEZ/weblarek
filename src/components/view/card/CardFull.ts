import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { TCardFull } from "../../../types";
import { CDN_URL } from "../../../utils/constants";
import { IEvents } from "../../base/Events";

export class CardFull extends Card<TCardFull> {
  protected descriptionElement: HTMLElement;
  protected buttonBuy: HTMLButtonElement;
  protected imageElement: HTMLImageElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.buttonBuy = ensureElement<HTMLButtonElement>(
      ".button",
      this.container,
    );

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );

    this.buttonBuy.addEventListener("click", () => {
      this.events.emit("basket:toggle");
    });
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

  set image(value: string) {
    const fileName = value.replace(".svg", ".png");
    this.setImage(this.imageElement, CDN_URL + fileName, this.title);
  }
}
