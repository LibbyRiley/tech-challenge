import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeCardProps {
  episode: Episode;
}
const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const { id, name, air_date, episode: episodeCode } = episode;
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Box mb={4}>
      <VStack spacing={2}>
        <Button p={4} width="300px" onClick={handleModalOpen} size="md">
          {id} - {name}
        </Button>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        size="sm"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Episode Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Text>
              <strong>Title:</strong> {name}
            </Text>
            <Text>
              <strong>Episode Code:</strong> {episodeCode}
            </Text>
            <Text>
              <strong>Air Date:</strong> {air_date}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EpisodeCard;
