import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";
import { TFormOrder } from "../../../types";

export class FormOrder extends Form<TFormOrder> {
  protected buttonCard: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(
    container: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(container);

    this.buttonCard = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container,
    );
    this.buttonCash = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container,
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );

    this.buttonCard.addEventListener("click", () => {
      this.events.emit("payment:input", { payment: "card" });
    });

    this.buttonCash.addEventListener("click", () => {
      this.events.emit("payment:input", { payment: "cash" });
    });

    this.addressInput.addEventListener("input", () => {
      this.events.emit("address:input", {
        address: this.addressInput.value,
      });
    });
  }

  protected onSubmit(): void {
    this.events.emit("order:open-next");
  }

  set payment(value: string) {
    if (value === "cash") {
      this.buttonCash.classList.add("button_alt-active");
      this.buttonCard.classList.remove("button_alt-active");
    } else if (value === "card") {
      this.buttonCard.classList.add("button_alt-active");
      this.buttonCash.classList.remove("button_alt-active");
    }
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
