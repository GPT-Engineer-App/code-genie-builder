import React, { useState } from "react";
import { Box, Heading, VStack, HStack, Text, Textarea, Button, useToast, Image } from "@chakra-ui/react";
import { FaCode, FaImage, FaFont } from "react-icons/fa";
import ResizablePanels from "../components/ResizablePanels";

const Index = () => {
  const [code, setCode] = useState("");
  const [elements, setElements] = useState([]);
  const toast = useToast();

  const handleGenerateCode = async () => {
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: code }),
      });
      const data = await response.json();
      setCode(data.code);
      toast({
        title: "Code generated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  const handleDragStart = (event, type) => {
    event.dataTransfer.setData("element", type);
  };

  const handleDrop = (event) => {
    const type = event.dataTransfer.getData("element");
    const { clientX, clientY } = event;
    setElements([...elements, { type, x: clientX, y: clientY }]);
  };

  return (
    <Box p={8} bg="bg.dark">
      <Heading as="h1" size="2xl" mb={8}>
        Website & App Builder
      </Heading>
      <ResizablePanels>
        <VStack h="500px" minW="240px" borderWidth={1} borderColor="gray.300" p={4}>
          <Heading size="lg">Whiteboard</Heading>
          <Box bg="white" borderWidth={1} borderColor="gray.600" rounded="md" flexGrow={1} p={4} onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
            {}
          </Box>
        </VStack>
        <VStack h="500px" minW="240px" borderWidth={1} borderColor="gray.300" p={4}>
          <Heading size="lg">Code Editor</Heading>
          <Textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code or description for AI to generate code..." flexGrow={1} />
          <Button leftIcon={<FaCode />} colorScheme="blue" onClick={handleGenerateCode}>
            Generate Code
          </Button>
          {}
        </VStack>
      </ResizablePanels>
    </Box>
  );
};

export default Index;
