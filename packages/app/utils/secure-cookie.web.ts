import Cookies from "js-cookie";

const getBaseOptions = () => {
  if (process.env.NODE_ENV === "production") {
    return { path: "/", sameSite: "Strict" as const, secure: true };
  }
  return { path: "/" };
};

export const setCookie = (
  name: string,
  value: string,
  days = 7,
): string | undefined => {
  return Cookies.set(name, value, { ...getBaseOptions(), expires: days });
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name, { ...getBaseOptions() });
};
