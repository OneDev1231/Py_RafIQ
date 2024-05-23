import { useContext, useEffect, useState } from "react";
import { DispatchContext } from "context";
import { ActionType } from "../state/types";

export const useLoaderOverlay = (isLoading: boolean) => {
  const { c_dispatch } = useContext(DispatchContext);

  useEffect(() => {
    c_dispatch({
      type: ActionType.SetLoading,
      payload: {
        isLoading,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // return {
  //   showLoaderOverlay: () => setIsShowLoaderOverlay(true),
  //   hideLoaderOverlay: () => setIsShowLoaderOverlay(false),
  // };
};
