// if (!customElements.get("localization-form")) {
//   customElements.define(
//     "localization-form",
//     class LocalizationForm extends HTMLElement {
//       constructor() {
//         super();
//         this.elements = {
//           input: this.querySelector(
//             'input[name="locale_code"], input[name="country_code"]'
//           ),
//           button: this.querySelector("button"),
//           panel: this.querySelector(".disclosure__list-wrapper"),
//         };
//         this.openSelector = this.openSelector.bind(this);
//         this.onContainerKeyUp = this.onContainerKeyUp.bind(this);
//         this.onItemClick = this.onItemClick.bind(this);
//         this.handleClickOutside = this.handleClickOutside.bind(this);

//         this.elements.button.addEventListener("click", this.openSelector);
//         this.addEventListener("keyup", this.onContainerKeyUp);
//         this.querySelectorAll("a").forEach((item) =>
//           item.addEventListener("click", this.onItemClick)
//         );
//       }

//       connectedCallback() {
//         document.addEventListener("mousedown", this.handleClickOutside);
//       }

//       disconnectedCallback() {
//         document.removeEventListener("mousedown", this.handleClickOutside);
//       }

//       openSelector() {
//         this.elements.button.focus();
//         this.elements.panel.classList.toggle("is-open");
//         const isOpen = this.elements.panel.classList.contains("is-open");
//         this.elements.button.setAttribute("aria-expanded", isOpen.toString());
//       }

//       hidePanel() {
//         this.elements.button.setAttribute("aria-expanded", "false");
//         this.elements.panel.classList.remove("is-open");
//       }

//       handleClickOutside(event) {
//         const isInside = this.contains(event.target);
//         if (!isInside && this.elements.panel.classList.contains("is-open")) {
//           this.hidePanel();
//         }
//       }

//       onContainerKeyUp(event) {
//         if (event.code.toUpperCase() !== "ESCAPE") return;
//         if (this.elements.button.getAttribute("aria-expanded") === "false")
//           return;

//         this.hidePanel();
//         event.stopPropagation();
//         this.elements.button.focus();
//       }

//       onItemClick(event) {
//         event.preventDefault();
//         const form = this.querySelector("form");
//         this.elements.input.value = event.currentTarget.dataset.value;
//         if (form) form.submit();
//       }
//     }
//   );
// }


if (!customElements.get("localization-form")) {
    customElements.define("localization-form",
        class LocalizationForm extends HTMLElement{
          constructor(){
            super();

          }   
          connectedCallback(){
           
          }
        }
    )
}