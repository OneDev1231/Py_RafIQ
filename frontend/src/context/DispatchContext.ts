import React from "react";
import { Action, State } from "state/types";

// @ts-ignore

export const DispatchContext: React.Context<{
  c_state: State;
  c_dispatch: React.Dispatch<Action>;
}> = React.createContext(null);