import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase-Config";

export const AuthContext = createContext();

/**
 * This function is a React Context Provider that uses the Firebase onAuthStateChanged() function to
 * set the currentUser state to the user object returned by Firebase.
 * @returns The current user object.
 */
export function UserAuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
