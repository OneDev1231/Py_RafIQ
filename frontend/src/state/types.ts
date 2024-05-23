import { User, Card } from "../api/types";

export type State = {
  user?: User | null;
  isLoading?: boolean;
  card?: Card | null;
};

export enum ActionType {
  SetUser = "SET_USER",
  SetLoading = "SET_LOADING",
  SetCard = "SET_CARD",
}

export type Action = {
  type: ActionType;
  payload: {
    user?: User | null;
    isLoading?: boolean;
    data?: Card | null;
  };
};

export const initialState: State = {};
