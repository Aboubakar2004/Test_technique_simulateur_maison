import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authApi, setStoredToken, getStoredToken } from "../api/client";

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getStoredToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        if (token) {
          const me = await authApi.me();
          setUser(me.user || me);
        }
      } catch (e) {
        setStoredToken(null);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
  }, [token]);

  const login = useCallback(async ({ email, password }) => {
    const data = await authApi.login({ email, password });
    const receivedToken = data.token || data.access_token || data.data?.token;
    if (receivedToken) {
      setStoredToken(receivedToken);
      setToken(receivedToken);
    }
    if (data.user) setUser(data.user);
    else {
      try {
        const me = await authApi.me();
        setUser(me.user || me);
      } catch {}
    }
    return data;
  }, []);

  const signup = useCallback(async ({ email, password }) => {
    const data = await authApi.signup({
      name: email.split("@")[0],
      email,
      password,
    });
    const receivedToken = data.token || data.access_token || data.data?.token;
    if (receivedToken) {
      setStoredToken(receivedToken);
      setToken(receivedToken);
    }
    if (data.user) setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {}
    setStoredToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, signup, logout }),
    [user, token, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
