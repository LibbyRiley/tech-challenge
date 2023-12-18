"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Flex,
  Stack,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

interface StepProps {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
}

const SetNameStep: React.FC<StepProps> = ({ onNext }) => {
  const { user, setUser } = useUser();
  const [nameInput, setNameInput] = useState<string>(user?.username || "");
  // State to manage error state for input validation
  const [isError, setIsError] = useState<boolean>(false);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleSaveName = () => {
    // Check if the trimmed nameInput is not empty
    if (nameInput.trim() !== "") {
      // Update the user state with the new username and ensure jobTitle is defined
      setUser((prevUser) => ({
        ...prevUser,
        username: nameInput,
        jobTitle: prevUser?.jobTitle || "", // Ensure jobTitle is defined (threw me an error without this)
        loggedIn: !!nameInput && !!prevUser?.jobTitle,
      }));
      onNext && onNext();
    } else {
      // Set isError to true if nameInput is empty
      setIsError(nameInput === "");
    }
  };

  return (
    <>
      <Stack py={6}>
        <FormControl isInvalid={isError} my={2} isRequired>
          <FormLabel htmlFor="nameInput">Name</FormLabel>
          <Input
            id="nameInput"
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            onChange={handleNameInputChange}
          />
          <FormErrorMessage>This is a required field</FormErrorMessage>
        </FormControl>
        <Flex w="100%" justifyContent="flex-end">
          <Button
            mt={4}
            onClick={handleSaveName}
            aria-label="Save and continue to the next step"
          >
            Save and Continue
          </Button>
        </Flex>
      </Stack>
    </>
  );
};

const SetJobTitleStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const { user, setUser } = useUser();
  const [jobTitleInput, setJobTitleInput] = useState<string>(
    user?.jobTitle || ""
  );
  // State to manage error state for input validation
  const [isError, setIsError] = useState<boolean>(false);

  const handleJobTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJobTitleInput(e.target.value);
  };

  const handleSaveJobTitle = () => {
    // Check if the trimmed jobTitleInput is not empty
    console.log(!!user?.username && !!jobTitleInput);
    if (jobTitleInput.trim() !== "") {
      // Update the user state with the new jobTitle and ensure username is defined
      setUser((prevUser) => ({
        ...prevUser,
        username: prevUser!.username || "", // Ensure username is defined (threw me an error without this)
        jobTitle: jobTitleInput,
        loggedIn: true,
      }));
      onNext && onNext();
    } else {
      // Set isError to true if jobTitleInput is empty
      setIsError(jobTitleInput === "");
    }
  };

  return (
    <>
      <Button size="xs" onClick={onPrev}>
        &lt; Go Back
      </Button>
      <Stack py={6}>
        <FormControl isInvalid={isError} isRequired my={2}>
          <FormLabel htmlFor="jobTitleInput">Job Title</FormLabel>
          <Input
            id="jobTitleInput"
            type="text"
            placeholder="Enter your job title"
            value={jobTitleInput}
            onChange={handleJobTitleInputChange}
          />
          <FormErrorMessage>This is a required field</FormErrorMessage>
        </FormControl>
        <Button
          disabled={jobTitleInput === ""}
          mt={4}
          alignSelf="flex-end"
          onClick={handleSaveJobTitle}
          aria-label="Save your details"
        >
          Save and Continue
        </Button>
      </Stack>
    </>
  );
};

const CompleteStep: React.FC<StepProps> = ({ onPrev, onClose }) => {
  return (
    <>
      <Button size="xs" onClick={onPrev}>
        Edit User Details
      </Button>
      <Stack py={6}>
        <Heading my={4} as="h3">
          Success!
        </Heading>
        <Link href="information" onClick={onClose}>
          Go to the Information page
        </Link>
      </Stack>
    </>
  );
};

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1); // Track the current step

  // Step Handlers
  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleCloseModal = () => {
    // Reset the step when the modal is closed
    setStep(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      size="lg"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 1 && <SetNameStep onNext={handleNextStep} />}
          {step === 2 && (
            <SetJobTitleStep onNext={handleNextStep} onPrev={handlePrevStep} />
          )}
          {step === 3 && (
            <CompleteStep onClose={handleCloseModal} onPrev={handlePrevStep} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default WelcomeModal;
