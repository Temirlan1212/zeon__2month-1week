import axios from "axios";
let API = "http://localhost:1717/signin";

let signup_form = document.querySelector(".signup__form") as HTMLFormElement;
let email_inp_signup = document.querySelector(".signup__form-email") as HTMLFormElement;
let password_inp_signup = document.querySelector(".signup__form-password") as HTMLFormElement;
let name_inp_signup = document.querySelector(".signup__form-name") as HTMLFormElement;
let age_inp_signup = <HTMLFormElement>document.querySelector(".signup__form-age");

interface IUserRegistrationForm {
  username: string;
  password: string;
  firstName: string;
  age: number;
}
interface IAuthResponse {
  token: string;
  data: IUserRegistrationForm;
}

signup_form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput();

  getTokenFromStorage() ? (alert("вы уже зашли в свой аккаунт"), clearInput()) : register(getValueInp());
});

let checkInput = () => {
  if (password_inp_signup.value.length < 6) {
    alert("Пороль должен состоять минимум из 6 символов");
  }
};

let getValueInp = () => {
  let user = {
    username: email_inp_signup.value,
    password: password_inp_signup.value,
    firstName: name_inp_signup.value,
    age: +age_inp_signup,
  };
  return user;
};

let clearInput = () => {
  return (email_inp_signup.value = ""), ((password_inp_signup.value = ""), ((name_inp_signup.value = ""), (age_inp_signup.value = "")));
};

let register = async (user: IUserRegistrationForm) => {
  let { data } = await axios.post<IAuthResponse>(API, user);
  setTokenToStorage(data?.token);
  clearInput();
  return data;
};

let setTokenToStorage = (token: string) => {
  localStorage.setItem("token", token);
};

let getTokenFromStorage = () => {
  let token: string | any = localStorage.getItem("token");
  return token;
};
