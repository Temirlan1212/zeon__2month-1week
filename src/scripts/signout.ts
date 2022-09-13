let signout_link = document.querySelector(".header__signout") as HTMLLinkElement;
let nav_links = document.querySelectorAll(".header__link");
let addBooks_btn = document.querySelector(".header__addBook") as HTMLLinkElement;

let token = localStorage.getItem("token");

let toggleClasses = () => {
  nav_links.forEach((elem) => {
    if (token) {
      signout_link ? (signout_link.style.display = "block") : "";
      addBooks_btn.style.display = "block";
      elem.classList.add("header__link-none");
    } else {
      signout_link ? (signout_link.style.display = "none") : "";
      elem.classList.remove("header__link-none");
      addBooks_btn.style.display = "none";
    }
  });
};
toggleClasses();

if (signout_link) {
  signout_link.addEventListener("click", () => {
    localStorage.setItem("token", "");
    toggleClasses();
    window.location.href = "index.html";
  });
}
