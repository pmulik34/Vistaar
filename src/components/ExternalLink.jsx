import { Box, Center, Text, Button, Stack } from '@chakra-ui/react';
import React from 'react';

const ExternalLink = ({ url }) => {
    console.log('Url',url);
  return (
    <Center>
      <Box>
        <Text>
          Explore this content from an external website. Choose how you'd like to view it:
        </Text>
        <iframe
          src={url}
          title="External Website"
          style={{
            width: '100%',
            height: '500px',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '10px'
          }}
        ></iframe>
        <Stack direction="row" justifyContent="center" marginTop="10px">
          <Button
            size="md"
            className='custom-button'
            style={{ width: "150px" }}
            onClick={() => window.open(url, '_blank')}
          >
            Open in New Tab
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default ExternalLink;
