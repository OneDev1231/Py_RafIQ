import { Action, ActionType, State } from "./types";

export const reducer: (state: State, action: Action) => State = (
  c_state: State,
  action: Action
) => {
  const { type, payload } = action;

  // Account context.
  if (type === ActionType.SetUser) {
    return {
      ...c_state,
      user: payload.user,
    };
  }

  // Set Card.
  if (type === ActionType.SetCard) {
    return {
      ...c_state,
      card: payload.data,
    };
  }

  // Set Loading.
  if (type === ActionType.SetLoading) {
    return {
      ...c_state,
      isLoading: payload.isLoading,
    };
  }
  return { ...c_state };
};
