import { SimpleGrid, Box } from "@chakra-ui/react";
import EpisodeCard from "./EpisodeCard";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
}

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} mt={6} spacing={4}>
      {episodes.map((episode) => (
        <Box key={episode.id}>
          <EpisodeCard episode={episode} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default EpisodeList;
