import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Check if user information is set, otherwise redirect to the welcome page
    if (!user?.loggedIn) {
      router.push("/");
    }
  }, [user, router]);
  // Render null during the initial redirect, to prevent the protect p[age appearing before redirect
  if (!user?.loggedIn) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
