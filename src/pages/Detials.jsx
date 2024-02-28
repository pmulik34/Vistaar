import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getseletedData } from '../services/Apicall';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from 'react-router-dom';

const Details = () => {
  const uniqueId = uuidv4();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const [story, setStory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(state?.transactionId || uuidv4());
  const messageId = uuidv4();
  const { itemId } = useParams();


  useEffect(() => {
    if (state && state.product) {
      fetchSelectedCourseData();
    }
  }, [state]);

  const fetchSelectedCourseData = async () => {
    try {
      setIsLoading(true);

      let bodyData = {
        context: {
          domain: "vistaar:content",
          action: "select",
          version: "1.1.0",
          bap_id: "vistaar-bap.tekdinext.com",
          bap_uri: "https://vistaar-bap.tekdinext.com/",
          bpp_id: state.product?.bpp_id,
          bpp_uri: state.product?.bpp_uri,
          transaction_id: transactionId,
          message_id: messageId,
          timestamp: "2023-02-06T09:55:41.161Z",
        },
        message: {
          order: {
            provider: {
              id: state.product?.provider_id,
            },
            items: [
              {
                id: state.product?.item_id,
              },
            ],
          },
        },
      };

      let response = await getseletedData(bodyData);

      // console.log("resp", response);
      if (response && response.responses && response.responses.length > 0) {
        // console.log("Entered 1");
        let arrayOfObjects = [];
        let uniqueItemIds = new Set();

        for (const responses of response.responses) {
          const provider = responses.message.order;
          for (const item of provider.items) {
            if (!uniqueItemIds.has(item.id)) {
              let obj = {
                item_id: item.id,
                title: state.product.title,
                description: state.product.description ? state.product.description : "",
                long_desc: item.descriptor.long_desc,
                provider_id: state.product.provider_id,
                provider_name: state.product.provider_name,
                bpp_id: state.product.bpp_id,
                bpp_uri: state.product.bpp_uri,
                icon: state.product.icon ? state.product.icon : "",
                descriptionshort: state.product.shortDescription ? state.product.shortDescription : "",
              };
              arrayOfObjects.push(obj);
              uniqueItemIds.add(item.id);
            }
          }
        }

        setStory(arrayOfObjects[0]);
        // console.log("arrayOfObjects", arrayOfObjects);

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("No data found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      setIsLoading(false);
      setError("Error fetching details. Please try again.");
    }
  };
  console.log("itemId:", state.product?.item_id);

  const handleBack = () => {
    navigate('/');
  };
  // console.log("story", story);

  // transaction id 
  console.log(`${state.product?.title} transaction id ${transactionId}`);
  console.log(`${state.product?.title} messageId  ${messageId}`);
  return (
    <>
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Box textAlign="center">
            <Text fontSize="xl">Loading...</Text>
          </Box>
        </div>
      ) : error ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <Box textAlign="center">
            <Text fontSize="xl">{error}</Text>
            <Button
              mt={4}
              colorScheme="green"
              variant="solid"
              backgroundColor="rgb(62, 97, 57)"
              color="white"
              onClick={handleBack}
            >
              Go Back
            </Button>
          </Box>
        </div>
      ) : (
        <Box p={4} pt={30}>
          <Flex justify="space-between" alignItems="center" mb={4} >
            <Box flex="1"></Box>
            <Box>
              <Button leftIcon={<MdKeyboardBackspace style={{ marginTop: '-0.1rem' }} />} _hover={{ background: '#4f6f4a', color: '#fff' }}
                _active={{ background: '#4f6f4a', color: '#fff' }}
                color='#4f6f4a' variant='outline' borderColor='#4f6f4a' onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>
          </Flex>
          <Heading as="h2" >{state.product?.provider_name}</Heading>
          {state.product?.title && (
            <Text mt={2}>
              <strong>{state.product?.title}</strong>
            </Text>
          )}
          {story && story.descriptor && story.descriptor.long_desc ? (
            <Text marginTop={2} fontSize={["xs", "sm"]} color={"gray.700"}>
              {story.descriptor.long_desc}
            </Text>
          ) : (
            <Text>{state.product?.description}</Text>
          )}
          <Button mt={3} className='custom-button' onClick={() => {
            navigate(`/confirm/${state.product?.item_id}`, {
              state: {
                product: story,
                product1: state.product,
                transactionId: transactionId
              },
            });
          }}>Confirm</Button>
        </Box>
      )}
    </>
  );
};

export default Details;
