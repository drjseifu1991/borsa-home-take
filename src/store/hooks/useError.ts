import { useAppDispatch, useAppSelector } from "./app-store-hook";
import { setError, selectError } from "../slice";

export const useError: any = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);

    return {
        setError: (error: any) => {
            dispatch(setError(error));
        },
        error,
    };
};