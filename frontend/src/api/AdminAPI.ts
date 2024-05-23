import { API_ENDPOINT } from "api";

// Get All Users
export const getAllUsers = async () => {
  const res = await fetch(`${API_ENDPOINT}users/`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};

// Delete user
export const deleteUser = async (id: number) => {
  const res = await fetch(`${API_ENDPOINT}delete-user/?user-id=${id}`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};

// Get analytics overview
export const getAnalyticsOverview = async (date: string) => {
  const res = await fetch(
    `${API_ENDPOINT}admin-analytics/get_overview/?date=${date}`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }
  );

  return await res.json();
};

// Get analytics graph
export const getAnalyticsGraph = async (year: string, type: string) => {
  const res = await fetch(
    `${API_ENDPOINT}admin-analytics/?year=${year}&type=${type}`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }
  );

  return await res.json();
};

// Get New Signup users
export const getNewSignupUsers = async () => {
  const res = await fetch(`${API_ENDPOINT}users/get_new_signups/`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};

// Get All Transactions
export const getAllTransactions = async (date: string) => {
  const res = await fetch(`${API_ENDPOINT}payment-history/?date=${date}`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};

// Get User detail
export const getUserDetail = async () => {
  const res = await fetch(`${API_ENDPOINT}users/me/`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};
