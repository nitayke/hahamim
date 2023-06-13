import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { auth } from "~/firebase/config";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useGlobalLoadingSpinner } from "./useLoadingSpinner";

const userAtom = atom(auth.currentUser);

export default function useUser() {
  const [user, setUser] = useAtom(userAtom);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const isAdmin = user && !user?.isAnonymous;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    setTimeout(() => {
      setIsLoadingUser(false);
    }, 400);
  }, []);
  return { user, isAdmin, isLoadingUser };
}

export function useSignInAnnymously() {
  const { user } = useUser();
  const { open, close } = useGlobalLoadingSpinner();

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
