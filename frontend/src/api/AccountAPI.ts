import { API_ENDPOINT } from "api";
import { Login, ResetEmail } from "./types";
import { getCookie } from "utils";

// Change password
export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const postData = { email, password, name, user_type: "USER" };
  const res = await fetch(`${API_ENDPOINT}signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(postData),
  });
  return await res.json();
};

// Login
export const login = async (username: string, password: string) => {
  const postData = { username, password };
  const url = `${API_ENDPOINT}login/`;
  const csrftoken = getCookie("csrftoken");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRFToken": csrftoken!,
    },
    body: JSON.stringify(postData),
  });

  if (res.status === 200) {
    return (await res.json()) as Login;
  } else {
    return { token: null, user: null } as Login;
  }
};

// Reset Email
export const resetEmail = async (email: string) => {
  const url = `${API_ENDPOINT}reset-email/?email=${email}`;
  const res = await fetch(url, {
    method: "GET",
  });

  return (await res.json()) as ResetEmail;
};

// Sign out
export const signOut = async () => {
  const url = `${API_ENDPOINT}logout/`;
  const res = await fetch(url, {
    method: "GET",
  });

  return await res.json();
};

// Verify Otp
export const verifyOtp = async (code: string) => {
  const url = `${API_ENDPOINT}verify-otp/?otp=${code}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("reset-email-token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return (await res.json()) as ResetEmail;
};

// Reset Password
export const resetPassword = async (password: string) => {
  const url = `${API_ENDPOINT}reset-password/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Token " + localStorage.getItem("otp-token"),
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(password),
  });

  return (await res.json()) as ResetEmail;
};

// Get Access Token from google auth
export const getAccessTokenFromCode = async (
  code: string | (string | null)[]
) => {
  const res = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    }),
  });
  return await res.json();
};

// Post Google access token
export const postGoogleAccessToken = async (token: string) => {
  const url = `${API_ENDPOINT}google/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ access_token: token }),
  });

  return await res.json();
};
