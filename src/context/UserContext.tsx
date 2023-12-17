import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface UserContextProps {
  children: ReactNode;
}

interface User {
  username: string;
  jobTitle: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Attempted localStorage, but ran into SSR hydration issues
  //   const [user, setUser] = useState<User | null>(() => {
  //     // Check if localStorage is defined before attempting to use it
  //     if (typeof window !== "undefined") {
  //       const storedUser = localStorage.getItem("user");
  //       return storedUser ? JSON.parse(storedUser) : null;
  //     }
  //     return null; // Handle the case where localStorage is not available
  //   });

  //   useEffect(() => {
  //     // Check if localStorage is defined before attempting to use it
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("user", JSON.stringify(user));
  //     }
  //   }, [user]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, isModalOpen, openModal, closeModal }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
