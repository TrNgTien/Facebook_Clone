import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookie = (name: string, value: any) => cookies.set(name, value);

const getCookie = (name: string) => cookies.get(name);

const removeCookie = (name: string) => cookies.remove(name);

export { setCookie, getCookie, removeCookie };
