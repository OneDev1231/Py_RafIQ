import React, { useEffect, useState, useContext } from "react";

import DashboardLayout from "layouts/DashboardLayout";
import { StripeOpen } from "components/Billing";
import { API } from "api";
import { useLoaderOverlay, useNotify } from "hooks";
import { DispatchContext } from "context";
import { ActionType } from "state/types";

const Billing = () => {
  const [cardInfo, setCardInfo] = useState();
  const { notifyError } = useNotify();
  const { c_state, c_dispatch } = useContext(DispatchContext);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const getCard = async () => {
    setWaitingForResponse(true);
    const { status, data } = await API.getPaymentMethods();
    setWaitingForResponse(false);

    if (status !== "ok") {
      notifyError("Error while loading card");
    } else {
      setCardInfo(data);
      c_dispatch({
        type: ActionType.SetCard,
        payload: { data },
      });
    }
  };

  useEffect(() => {
    if (!c_state.card) {
      getCard();
    }
  }, []);

  useLoaderOverlay(waitingForResponse);
  return (
    <DashboardLayout>
      {c_state.card && c_state.card.exp_year !== "" ? (
        <div className="pt-[160px] pb-[400px] rounded-[3px] flex justify-center max-xl:pt-[70px] max-md:pt-[156px] max-md:px-[10px]">
          <div className="bg-[#FFFFFF] dark:bg-[#f9f9fc10] dark:border-[#0000001A] rounded-[20px] border-[1px] border-solid border-[#0000001A] py-[42px] px-[55px] align-center text-center	max-w-[480px] max-xl:max-w-[420px] max-xl:px-[25px] max-xl:py-[35px] max-md:max-w-[309px] max-md:py-[20px] max-md:px-[27px]">
            <div className="text-2xl font-semibold mb-6 -mt-4">
              Connected Card
            </div>
            <div className="flex space-x-3 text-lg">
              <div className="text-right">
                <div>Expiry: </div>
                <div>Card Number:</div>
              </div>
              <div className="text-left">
                <div>{`${c_state.card.exp_month}/${c_state.card.exp_year}`}</div>
                <div>**** **** **** {c_state.card.last_4}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <StripeOpen />
      )}
    </DashboardLayout>
  );
};

export default Billing;
