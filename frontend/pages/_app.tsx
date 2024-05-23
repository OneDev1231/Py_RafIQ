import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { store } from "redux/store";
import { Provider } from "react-redux";
import TagManager from "react-gtm-module";

import "assets/fonts/SFProDisplay/stylesheet.css";
import "assets/fonts/Satoshi/stylesheet.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useReducer } from "react";
import { Action, initialState, State } from "state/types";
import { reducer } from "state/reducer";
import { DispatchContext } from "context";
import { Loader, ProtectedRoute } from "components";
import "rsuite/dist/rsuite.min.css";
import { ToastContainer } from "react-toastify";
import { API_ENDPOINT } from "api";

export default function App({ Component, pageProps }: AppProps) {
  const [c_state, c_dispatch]: [State, React.Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-WMTBCHJ" });

    const getCookieUrl = `${API_ENDPOINT}get-token`;
    fetch(getCookieUrl, { method: "GET" }).catch((err) => console.log(err));

    const getHomepageDataUrl = `${API_ENDPOINT}home-page/`;
    fetch(getHomepageDataUrl, { method: "GET" })
      .then(async (res) => {
        const data = await res.json();
        localStorage.setItem("homepageData", JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Provider store={store}>
      <DispatchContext.Provider value={{ c_state, c_dispatch }}>
        <ThemeProvider attribute="class">
          <ProtectedRoute>
            <Component {...pageProps} />
            <Loader />
            <ToastContainer />
          </ProtectedRoute>
        </ThemeProvider>
      </DispatchContext.Provider>
    </Provider>
  );
}
