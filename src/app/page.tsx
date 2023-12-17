"use client";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { Button, Heading, Stack } from "@chakra-ui/react";
import WelcomeModal from "@/components/WelcomeModal";
import { useUser } from "@/context/UserContext";
import { Link } from "@chakra-ui/next-js";
const LoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Button onClick={onClick}>Login</Button>;
};

const EditButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Button onClick={onClick}>Edit User Details</Button>;
};

export default function Home() {
  const { user, isModalOpen, openModal, closeModal } = useUser();
  const handleModalOpen = () => {
    openModal();
  };
  return (
    <main className={styles.main}>
      <Stack alignItems="center">
        <Heading size="sm">Libby Riley</Heading>
        <Heading as="h2" size="2xl" mb={8}>
          Challenge Attempt
        </Heading>

        {!user ? (
          <LoginButton onClick={handleModalOpen} />
        ) : (
          <>
            <EditButton onClick={handleModalOpen} />
            <Link href="/information" mt={6}>
              Go to the Information page
            </Link>
          </>
        )}
      </Stack>
      {isModalOpen && (
        <WelcomeModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </main>
  );
}
