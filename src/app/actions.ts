"use server";

const url = {
  authorize: {
    login: `${process.env.NEXT_PUBLIC_API_URL}/login`,
    register: `${process.env.NEXT_PUBLIC_API_URL}/register`,
    confirmSignUp: `${process.env.NEXT_PUBLIC_API_URL}/confirm-signup`,
    resendConfirmationCode: `${process.env.NEXT_PUBLIC_API_URL}/resend-confirmation-code`,
  },
};

export const signIn = async (email: string, password: string) => {
  const body = JSON.stringify({
    email,
    password,
  });

  return await fetch(url.authorize.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body,
  });
};

export const signUp = async (
  fullName: string,
  phoneNumber: string,
  email: string,
  password: string
) => {
  const body = JSON.stringify({
    fullName,
    phoneNumber,
    email,
    password,
  });

  return fetch(url.authorize.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body,
  }).then((response) => response.json());
};

type ConfirmSignUpRequest = { email: string; confirmationCode: string };

export const confirmSignUp = async (req: ConfirmSignUpRequest) => {
  const body = JSON.stringify(req);

  return fetch(url.authorize.confirmSignUp, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body,
  }).then((response) => response.json());
};

export const resendConfirmationCode = async (email: string) => {
  const body = JSON.stringify({
    email,
  });

  return fetch(url.authorize.resendConfirmationCode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body,
  }).then((response) => response.json());
};
