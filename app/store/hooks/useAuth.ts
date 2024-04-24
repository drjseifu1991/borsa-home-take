import { useAppDispatch, useAppSelector } from "./app-store-hook";
import { Session, LoginRequest, UserEditModel, UserRegistrationModel } from "../../model";
import { 
  logOut,
  selectIsLoading, 
  selectSession,
  selectEditAddressModalVisibile, 
  selectEditEmailModalVisibile, 
  selectEditNameModalVisibile, 
  selectEditUserNameModalVisibile,
  setEditNameModalVisible,
  setEditUserNameModalVisible,
  setEditEmailModalVisible,
  setEditAddressModalVisible
} from "../slice";
import { sagaActions } from "../saga/saga-actions";

export const useAuth = (): {
  session: Session;
  submitLoginRequest: (request: LoginRequest) => void;
  editProfile: (editedUser: UserEditModel) => void;
  registerUser: (userInfo: UserRegistrationModel) => void;
  logOut: () => void;
  setEditNameModalVisible: (value: boolean) => void,
  setEditUserNameModalVisible: (value: boolean) => void,
  setEditEmailModalVisible: (value: boolean) => void,
  setEditAddressModalVisible: (value: boolean) => void,
  selectIsLoading: boolean;
  selectEditNameModalVisible: boolean;
  selectEditUserNameModalVisible: boolean;
  selectEditEmailModalVisible: boolean;
  selectEditAddressModalVisible: boolean;
} => {
  const session = useAppSelector(selectSession);
  const isLoading = useAppSelector(selectIsLoading);
  const isEditNameModalVisibile = useAppSelector(selectEditNameModalVisibile)
  const isEditUserNameModalVisibile = useAppSelector(selectEditUserNameModalVisibile)
  const isEditEmailModalVisibile = useAppSelector(selectEditEmailModalVisibile)
  const isEditAddressModalVisibile = useAppSelector(selectEditAddressModalVisibile)

  const dispatch = useAppDispatch();

  return {
    session,
    submitLoginRequest: (request: LoginRequest) => {
      dispatch({ type: sagaActions.LOGIN_REQUEST, payload: {...request}})
    },
    editProfile: (editedInfo: UserEditModel) => {
      dispatch({type: sagaActions.EDIT_PROFILE, payload: {...editedInfo}})
    },
    registerUser: (userInfo: UserRegistrationModel) => {
      dispatch({type: sagaActions.REGISTER_USER, payload: {...userInfo}})
    },
    logOut: () => {
      dispatch(logOut());
    },
    setEditNameModalVisible: (value: boolean) => {
      dispatch(setEditNameModalVisible(value))
    },
    setEditUserNameModalVisible: (value: boolean) => {
      dispatch(setEditUserNameModalVisible(value))
    },
    setEditEmailModalVisible: (value: boolean) => {
      dispatch(setEditEmailModalVisible(value))
    },
    setEditAddressModalVisible: (value: boolean) => {
      dispatch(setEditAddressModalVisible(value))
    },
    selectIsLoading: isLoading,
    selectEditNameModalVisible: isEditNameModalVisibile,
    selectEditUserNameModalVisible: isEditUserNameModalVisibile,
    selectEditEmailModalVisible: isEditEmailModalVisibile,
    selectEditAddressModalVisible: isEditAddressModalVisibile,
  };
};