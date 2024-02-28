import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      backgroundColor="#fff"
      color="#000"
      textAlign="center"
      py="4"
      boxShadow="0px 0px 10px 0px #00000040"
    >
      Developed with ❤️ by{' '}
      <Box as="a" target='_blank' href="https://www.tekdi.net" textDecoration="none" color="#000" _hover={{ color: "#4f6f4a" }}>
        Tekdi Technologies
      </Box>
    </Box>
  );
};

export default Footer;
