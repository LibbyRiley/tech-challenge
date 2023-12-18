"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { Button, HStack, Heading, Stack } from "@chakra-ui/react";
import WelcomeModal from "@/components/WelcomeModal";
import { useUser } from "@/context/UserContext";
import { Link } from "@chakra-ui/next-js";
const LoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Button onClick={onClick}>Login</Button>;
};
const LogoutButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button variant="outline" onClick={onClick}>
      Logout
    </Button>
  );
};
const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button variant="solid" onClick={onClick}>
      Edit User Details
    </Button>
  );
};

export default function Home() {
  const { user, setUser, isModalOpen, openModal, closeModal } = useUser();
  const handleModalOpen = () => {
    openModal();
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <main className={styles.main}>
      <Stack alignItems="center">
        <Heading size="sm">Libby Riley</Heading>
        <Heading as="h2" size="2xl" mb={8}>
          Challenge Attempt
        </Heading>

        {!user?.loggedIn ? (
          <LoginButton onClick={handleModalOpen} />
        ) : (
          <>
            <HStack>
              <EditButton onClick={handleModalOpen} />
              <LogoutButton onClick={handleLogout} />
            </HStack>
            <Link href="/information" mt={6}>
              Go to the Information page &gt;
            </Link>
          </>
        )}
      </Stack>
      <WelcomeModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
