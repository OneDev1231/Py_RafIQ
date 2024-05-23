import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext } from "react";
import { useNotify } from "hooks";
import { API } from "api";
import { ActionType } from "state/types";
import { DispatchContext } from "context";

const StripeFormComponent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { notifySuccess, notifyError } = useNotify();
  const { c_state, c_dispatch } = useContext(DispatchContext);

  const getCardDetails = async () => {
    const { status, data } = await API.getPaymentMethods();
    if (status === "ok") {
      c_dispatch({
        type: ActionType.SetCard,
        payload: { data },
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "https://example.com/account/payments/setup-complete",
      },
    });

    if (error) {
      notifyError(error.message!);
    } else {
      getCardDetails();
      notifySuccess("Card Added Successfully");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          disabled={!stripe}
          className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-10 py-[0.35rem] mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StripeFormComponent;
