import { API_ENDPOINT } from "api";

// Get Payment Methods
export const getPaymentMethods = async () => {
  const res = await fetch(`${API_ENDPOINT}payment-methods/`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};

// Get A New Setup Intent
export const getNewSetupIntent = async () => {
  const res = await fetch(`${API_ENDPOINT}setup-intent/`, {
    method: "GET",
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  return await res.json();
};

// Update subscription id
export const updateSubscripton = async (upgrade_plan_id: number) => {
  let formdata = new FormData();
  formdata.append("plan-id", upgrade_plan_id.toString());

  const res = await fetch(
    `${API_ENDPOINT}subscription-plans/updgrade_subscription/`,
    {
      method: "POST",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
      },
      body: formdata,
      redirect: "follow",
    }
  );

  return await res.json();
};
