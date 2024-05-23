import {
  createUser,
  login,
  signOut,
  resetEmail,
  verifyOtp,
  resetPassword,
  getAccessTokenFromCode,
  postGoogleAccessToken,
} from "./AccountAPI";

import {
  getAllUsers,
  deleteUser,
  getAnalyticsOverview,
  getAnalyticsGraph,
  getNewSignupUsers,
  getAllTransactions,
  getUserDetail,
} from "./AdminAPI";

import {
  getPaymentMethods,
  getNewSetupIntent,
  updateSubscripton,
} from "./PaymentAPI";

export const API_ENDPOINT = process.env.NEXT_PUBLIC_RAFIQ_API_ADDRESS;

export const API = {
  login,
  signOut,
  resetEmail,
  verifyOtp,
  resetPassword,
  createUser,
  getAccessTokenFromCode,
  postGoogleAccessToken,

  getAllUsers,
  deleteUser,
  getAnalyticsOverview,
  getAnalyticsGraph,
  getNewSignupUsers,
  getAllTransactions,
  getUserDetail,

  getPaymentMethods,
  getNewSetupIntent,
  updateSubscripton,
};
