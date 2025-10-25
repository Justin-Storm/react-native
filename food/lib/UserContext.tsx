import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from './appwriteConfig';
import { Models } from 'react-native-appwrite';

interface UserContextProps {
  user: Models.User<{}> | null;
  setUser: React.Dispatch<React.SetStateAction<Models.User<{}> | null>>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};