import React, { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";

const ResizablePanels = ({ children }) => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);

  const handleDrag = (e) => {
    setLeftPanelWidth((prevWidth) => {
      const newWidth = prevWidth + (e.movementX / window.innerWidth) * 100;
      return Math.min(90, Math.max(10, newWidth));
    });
  };

  return (
    <Box display="flex" alignItems="flex-start">
      <VStack w={`${leftPanelWidth}%`} spacing={4} alignItems="stretch">
        {children[0]}
      </VStack>
      <Box
        w="2px"
        bg="gray.200"
        cursor="col-resize"
        h="500px"
        onMouseDown={(e) => {
          e.preventDefault();
          window.addEventListener("mousemove", handleDrag);
          window.addEventListener(
            "mouseup",
            () => {
              window.removeEventListener("mousemove", handleDrag);
            },
            { once: true },
          );
        }}
      />
      <VStack flex={1} w={`calc(100% - ${leftPanelWidth}% - 2px)`} spacing={4} alignItems="stretch">
        {children[1]}
      </VStack>
    </Box>
  );
};

export default ResizablePanels;
