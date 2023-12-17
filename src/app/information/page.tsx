"use client";
import { useQuery } from "@apollo/client";
import { useUser } from "@/context/UserContext";
import { GET_INFO } from "@/lib/queries";
import styles from "../page.module.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Heading, HStack, Button, Text } from "@chakra-ui/react";
import EpisodeList from "@/components/EpisodeList";
import { Link } from "@chakra-ui/next-js";
import WelcomeModal from "@/components/WelcomeModal";
const Page: React.FC = () => {
  const { loading, error, data } = useQuery(GET_INFO);
  const { user } = useUser();
  return (
    <ProtectedRoute>
      <main className={styles.main}>
        <section>
          <HStack justifyContent={"space-between"}>
            {/* TODO Sometimes this link triggers the user details modal again? */}
            <Link href="/">&lt; Return Home</Link>
            <Text>Hello {user?.username} 👋</Text>
          </HStack>

          <Heading mt={6} size="2xl">
            Information Page
          </Heading>
          <Heading mt={12} as="h2" size="lg">
            Rick and Morty Episodes
          </Heading>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <EpisodeList episodes={data.episodesByIds} />}
        </section>
      </main>
    </ProtectedRoute>
  );
};

export default Page;
