import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";
import { TFormContact } from "../../../types";

export class FormContact extends Form<TFormContact> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    this.emailInput.addEventListener("input", () => {
      this.events.emit("email:input", { email: this.emailInput.value });
    });

    this.phoneInput.addEventListener("input", () => {
      this.events.emit("phone:input", { phone: this.phoneInput.value });
    });
  }

  protected onSubmit(): void {
    this.events.emit("order:submit");
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}
