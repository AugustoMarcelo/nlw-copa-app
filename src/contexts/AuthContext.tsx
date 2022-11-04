import { makeRedirectUri } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/build/providers/Google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { createContext, ReactNode, useEffect, useState } from 'react';

maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: Boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = useAuthRequest({
    clientId:
      '1071186759854-s6mqhtkpcjkb53dgrmcg41jhj5qaa1mi.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log(`Authentication token: ${access_token}`);
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
