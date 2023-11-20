const dialogMenu = document.querySelector(".dialog-menu");
const dialogMenuCloseButton = document.querySelector(".dialog__menu-close");
const menuToggle = document.querySelector(".menu-toggle");

class Menu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          margin-top: var(--spacing);
        }
        a {
          display: inline-block;
          color: var(--color-white);
        }
      </style>
      <nav>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Our Services</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">Directions</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("custom-menu", Menu);

// When the toggle is clicked, open the dialog.
// 1. Add a display: flex to the dialog, this is needed so we can animate it in.
// 2. Show the modal, but wait 100ms before doing so. This is to allow the display: flex
//    to take effect before the dialog is shown. If we don't wait, the dialog will
//    appear without the animation. Or at least look janky
menuToggle.addEventListener("click", () => {
  dialogMenu.style.display = "flex";
  setTimeout(() => {
    dialogMenu.showModal();
  }, 100);
});

// When the close button is clicked,
// 1. Remove the open class from the menu toggle, this is only there for styling
// 2. Add a closing class to the dialog so that it can animate out. This is needed
//    so we can have a display: flex on this item, before it's hidden with
//    display: none when the dialog is closed.
// 3. Close the dialog after 100ms, this is to allow the animation to finish.
dialogMenuCloseButton.addEventListener("click", () => {
  menuToggle.classList.remove("menu-toggle--open");
  dialogMenu.classList.add("dialog-menu--closing");
  setTimeout(() => {
    dialogMenu.close();
    dialogMenu.classList.remove("dialog-menu--closing");
  }, 100);
});
