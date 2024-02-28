import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';
function CourseCard({ product, transactionId}) {
  const navigate = useNavigate();
  return (
    <>
      <Card boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;">
        <CardHeader paddingBottom={2}>
          {product?.title && (
            <Heading size='md'>{product.title}</Heading>
          )}
        </CardHeader>
        <CardBody paddingTop={2} paddingBottom={1}>
          {product?.provider_name && (
            <Text mt={2}><strong>Published By:</strong> {product.provider_name}</Text>
          )}
          {(product?.description || product?.shortDescription) && (
            <Text mt={3}>
              <strong>Description:</strong>{" "}
              {product.shortDescription
                ? product.shortDescription
                : product.description
                  ? product.description.substring(0, 100) + "..." 
                  : ""}
            </Text>
          )}

        </CardBody>
        <CardFooter>
          <Button className='custom-button' onClick={() => {
                navigate("/details", { state: { product: product, transactionId: transactionId } });
              }}>View Details</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default CourseCard