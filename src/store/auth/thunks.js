import { signInWithGoogle } from "../../firabase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuth = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
};