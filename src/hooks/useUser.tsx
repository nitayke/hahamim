import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { auth } from "~/firebase/config";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import useLoadingSpinner from "./useLoadingSpinner";

const userAtom = atom(auth.currentUser);

type useUserProps = {
  signInAnonymously?: boolean;
};
export default function useUser({ signInAnonymously = false }: useUserProps = {}) {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return { user };
}

export function useSignInAnnymously() {
  const { user } = useUser();
  const { open, close } = useLoadingSpinner();

  useEffect(() => {
    const signIn = async () => {
      open();
      await signInAnonymously(auth);
      close();
    };
    if (!user) {
      signIn();
    }

    return () => {
      close();
    };
  }, [user]);
}
