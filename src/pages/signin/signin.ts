import axios from "axios";
let API = "http://localhost:1717/login";
let signin_form = document.querySelector(".signin__form") as HTMLFormElement;
let email_inp_signin = <HTMLInputElement>document.querySelector(".signin__form-email");
let password_inp_signin = <HTMLInputElement>document.querySelector(".signin__form-password");

interface IUserLogInForm {
  username: string;
  password: string;
}
interface IAuthResponse {
  token: string;
  data: IUserLogInForm;
}

signin_form?.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput();
  getTokenFromStorage() ? (alert("вы уже зашли в свой аккаунт"), clearInput()) : signIn(getValueInp());
});

let checkInput = () => {
  if (password_inp_signin.value.length < 6) {
    alert("Пороль должен состоять минимум из 6 символов");
  }
};
let getValueInp = () => {
  let user = {
    username: email_inp_signin.value,
    password: password_inp_signin.value,
  };
  return user;
};
let clearInput = () => {
  return (email_inp_signin.value = ""), (password_inp_signin.value = "");
};

let signIn = async (user: IUserLogInForm) => {
  // await axios.post<IAuthResponse>(API, user).catch((res) => {
  //   alert(res.response.data + "/ no accaount with such username");
  // });

  // let { data } = await axios.post<IAuthResponse>(API, user);

  // setTokenToStorage(data.token);
  // console.log(data);
  // clearInput();
  // window.location.href = "index.html";

  await axios
    .post<IAuthResponse>(API, user)
    .then((res) => {
      setTokenToStorage(res.data?.token);
      clearInput();
      window.location.href = "index.html";
      return res.data;
    })
    .catch((error) => {
      alert(error.response.data + " OR no accaount with such username");
    });
};

let setTokenToStorage = (token: string) => {
  localStorage.setItem("token", token);
};

let getTokenFromStorage = () => {
  return localStorage.getItem("token");
};
