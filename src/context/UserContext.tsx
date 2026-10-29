import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth } from "../lib/firebase";

const UserContext = createContext<any>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  function initUser(user: any) {
    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }
    setUser(user);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initUser);
    return unsubscribe;
  }, []);

  const value = { user, loading };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export function useUser() {
  return useContext(UserContext);
}
export default UserProvider;
