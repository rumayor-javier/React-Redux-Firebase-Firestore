import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firabase/config";
import { onAuthStateChanged } from "firebase/auth";

export const useCheckAuth = () => {

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { displayName, email, uid, photoURL } = user;
      dispatch(login({ displayName, email, uid, photoURL }));
    });
  }, []);

  return status;

}
