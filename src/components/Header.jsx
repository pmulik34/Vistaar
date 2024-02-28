import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import logo from "../assets/school_logo.png";

function Header() {
  return (
    <Box>
      <Flex
        bg="white"
        w="100%"
        p={4}
        h={20}
        alignItems="center"
        boxShadow="md"
        position="fixed"
        fontFamily="system-ui"
        justifyContent="space-between"
        zIndex={999} 
      >
        {/* Left-hand side */}
        <Flex alignItems="center">
          <Image
            src={logo}
            alt="Forum Logo"
            marginRight="2"
            boxSize="60px" 
          />
          <Text
            fontSize={20}
            fontWeight={600}
          >
            Vistaar
          </Text>
        </Flex>

        {/* Right-hand side */}
        <Flex alignItems="center">
          {/* <LangSelector /> */}
        </Flex>
      </Flex>
      {/* Add padding to the top to prevent content from being hidden */}
      <Box paddingTop={20} /> 
    </Box>
  );
}

export default Header;
