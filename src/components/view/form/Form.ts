import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { TForm, TErrorsBuyer } from "../../../types";


export abstract class Form<T extends TForm> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorElement: HTMLElement;

  constructor(container: HTMLFormElement) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );
    this.errorElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );

    this.container.addEventListener("submit", (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }

  protected abstract onSubmit(): void;

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: TErrorsBuyer) {
    const messages = Object.values(value)
    this.errorElement.textContent = messages.join(" ");
  }
}
