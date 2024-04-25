// Import necessary dependencies
import { useAppDispatch, useAppSelector } from "./app-store-hook";
import { setError, selectError } from "../slice";

// Define the custom hook `useError`
export const useError = (): {
    setError: (error: any) => void;
    error: any;
} => {
    // Access Redux store state and dispatch
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);

    // Return function and state to be used by components
    return {
        setError: (error: any) => {
            dispatch(setError(error));
        },
        error,
    };
};
