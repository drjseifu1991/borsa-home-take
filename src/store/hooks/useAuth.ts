import { useAppDispatch, useAppSelector } from "./app-store-hook";
import { Session, LoginRequest } from "../../model";
import { logIn, logOut, selectIsLoading, selectSession } from "../slice";

export const useAuth = (): {
  session: Session;
  submitLoginRequest: (request: LoginRequest) => void;
  logOut: () => void;
  selectIsLoading?: boolean;
} => {
  const session = useAppSelector(selectSession);
  const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  return {
    session,
    submitLoginRequest: (request: LoginRequest) => {
      
    },
    logOut: () => {
      dispatch(logOut());
    },
    selectIsLoading: isLoading,
  };
};