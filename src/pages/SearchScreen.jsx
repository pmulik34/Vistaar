import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import SearchResultCard from '../components/SearchResultCard';
import Slider from '../components/Slider';

function SearchScreen({ searchText }) {
  console.log("searchText", searchText);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [searchText]);

  return (
    <Box>
      <Box marginTop={1} p={4} marginBottom={20}>
        <Box marginTop={35}>
          <Slider 
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : searchText.length === 0 ? (
            <p>No data found</p>
          ) : (
            searchText.map((item, index) => (
              <SearchResultCard
                key={index}
                title={item.title ? item.title : ""}
                imageUrl={item.imageUrl ? item.imageUrl : ""}
                publishedBy={item.provider_name ? item.provider_name : ""}
                description={item.description ? `${item.description.slice(0, 200)}${item.description.length > 100 ? '...' : ''}` : ""}
                bpp_id={item.bpp_id}
                bpp_uri={item.bpp_uri}
                item={item}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SearchScreen;
