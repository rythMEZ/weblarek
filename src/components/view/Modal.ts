import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IModal } from "../../types";



export class Modal extends Component<IModal> {
  protected contentElement: HTMLElement;
  protected buttonClose: HTMLButtonElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
  ) {
    super(container);

    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );
    this.buttonClose = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );

    this.buttonClose.addEventListener("click", () => {
      this.events.emit("modal:close");
    });

    this.container.addEventListener("click", (evt) => {
      if (evt.target === this.container) {
        this.events.emit("modal:close");
      }
    });
  }

  set content(item: HTMLElement) {
    this.contentElement.replaceChildren(item);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
    this.contentElement.replaceChildren();
  }
}
