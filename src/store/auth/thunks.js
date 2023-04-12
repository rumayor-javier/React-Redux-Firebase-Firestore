import { loginEmailPassword, logoutFirebase, registerUser, signInWithGoogle } from "../../firabase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuth = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
};

export const startCreatingUser = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUser({ email, password, displayName });
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
};

export const startLoginEmailPassword = ({ email, password }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await loginEmailPassword({ email, password });
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
};

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();

        dispatch(logout());
    }
};