import React, { useState } from "react";
import { Box, Heading, VStack, HStack, Text, Textarea, Button, useToast, Image } from "@chakra-ui/react";
import { FaPlus, FaCode, FaImage, FaFont } from "react-icons/fa";

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
    <Box bg="bg.dark" h="100vh">
      <Heading as="h1" size="2xl" mb={8}>
        Website & App Builder
      </Heading>
      <HStack spacing={8} alignItems="flex-start">
        <VStack w="50%" spacing={4} alignItems="stretch">
          <Heading size="lg">Whiteboard</Heading>
          <Box bg="white" borderWidth={1} borderColor="gray.600" rounded="md" h="calc(100vh - 200px)" p={4} onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
            {elements.map((element, index) => (
              <Box key={index} position="absolute" left={`${element.x}px`} top={`${element.y}px`}>
                {element.type === "image" && <Image borderWidth={1} borderColor="gray.600" src="https://images.unsplash.com/photo-1655148999626-56ce0c641069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwbGFjZWhvbGRlciUyMGltYWdlfGVufDB8fHx8MTcxMjQwODMyM3ww&ixlib=rb-4.0.3&q=80&w=1080" w="100px" />}
                {element.type === "text" && (
                  <Text borderWidth={1} borderColor="gray.600" contentEditable suppressContentEditableWarning fontSize="2xl">
                    Text
                  </Text>
                )}
                {element.type === "code" && (
                  <Box borderWidth={1} borderColor="gray.600" as="pre" bg="gray.700" color="white" p={2} rounded="md" fontSize="sm" fontFamily="mono">
                    {"<Button>Code</Button>"}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </VStack>
        <VStack w="50%" spacing={4} alignItems="stretch">
          <Heading size="lg">Code Editor</Heading>
          <Textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code or description for AI to generate code..." h="200px" />
          <Button leftIcon={<FaCode />} colorScheme="blue" onClick={handleGenerateCode}>
            Generate Code
          </Button>
          <HStack spacing={4}>
            <VStack as="button" spacing={1} draggable onDragStart={(event) => handleDragStart(event, "image")}>
              <FaImage />
              <Text fontSize="xs">Image</Text>
            </VStack>
            <VStack as="button" spacing={1} draggable onDragStart={(event) => handleDragStart(event, "text")}>
              <FaFont />
              <Text fontSize="xs">Text</Text>
            </VStack>
            <VStack as="button" spacing={1} draggable onDragStart={(event) => handleDragStart(event, "code")}>
              <FaCode />
              <Text fontSize="xs">Code</Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Index;
