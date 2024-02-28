import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, InputGroup, InputRightElement, Input, Flex } from '@chakra-ui/react';
import { IoIosSearch } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import {
  getallContent,
} from "../services/Apicall";
import SearchScreen from './SearchScreen';
import { v4 as uuidv4 } from 'uuid';
import FilterButton from '../components/FilterButton';
import axios from 'axios';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [story, setStory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [transactionId, setTransactionId] = useState(uuidv4());
  const [states, setStates] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search...');   

  useEffect(() => {
    setLoading(true);
    searchResponse();
  }, []);
  const searchResponse = async () => {
    let bodyData = {
      context: {
        domain: "vistaar:content",
        action: "search",
        version: "1.1.0",
        bap_id: "vistaar-bap.tekdinext.com",
        bap_uri: "https://vistaar-bap.tekdinext.com",
        bpp_id: "apurva.dev.bpp",
        bpp_uri: "https://bpp-dev.apurva.ai",
        transaction_id: transactionId,
        message_id: uuidv4(),
        timestamp: "2023-02-06T09:55:41.161Z",
      },
      message: {
        intent: {
          item: {
            descriptor: {
              name: "agriculture",
            },
          },
        },
      },
    };
    let response = await getallContent(bodyData);
    console.log(response);

    if (
      response &&
      response.data &&
      response.data.vistaar_cache_db &&
      Array.isArray(response.data.vistaar_cache_db)
    ) {
      let arrayOfObjects = [];
      for (const providers of response.data.vistaar_cache_db) {
        let obj = {
          item_id: providers.item_id,
          title: providers.title ? providers.title : "",
          description: providers.description ? providers.description : "",
          provider_id: providers.provider_id,
          provider_name: providers.provider_name,
          bpp_id: providers.bpp_id,
          bpp_uri: providers.bpp_uri,
          icon: providers.icon ? providers.icon : "",
          shortDescription: providers.short_desc ? providers.short_desc : "",
        };
        arrayOfObjects.push(obj);
      }

      console.log("arrayOfObjects", arrayOfObjects);
      setStory(arrayOfObjects);

      // Extracting states from the response
      const extractedStates = response.data.vistaar_cache_db.map(provider => provider.state);
      let allStates = [];
      extractedStates.forEach(state => {
        if (Array.isArray(state)) {
          allStates.push(state.join(','));
        } else {
          allStates.push(state);
        }
      });
      const uniqueStates = [...new Set(allStates.join(',').split(','))];
      const filteredStates = uniqueStates.filter(state => state && state !== "All");
      setStates(filteredStates);

    } else {
      console.error("Invalid response format");
    }
  };

  //Filter functionality
  useEffect(() => {
    if (selectedFilter) {
      handleFilter();
    }
  }, [selectedFilter]);

  const handleFilter = async () => {
    console.log('Inside filter function');
    try {
      let apiUrl = '';
      if (selectedFilter === 'All') {
        searchResponse();
      } else {
        // Encode the selected filter value
        const encodedFilter = encodeURIComponent(selectedFilter);
        apiUrl = `https://vistaar-api.tekdinext.com/cache/FilterByState?state=${encodedFilter}`;
      }
      const response = await axios.get(apiUrl);
      if (response && response.data && response.data.data && response.data.data.vistaar_cache_db) {
        setStory(response.data.data.vistaar_cache_db);
      } else {
        // Handle no data
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };
  const handleResetSearch = () => {
    searchResponse();
};

  //search functionality
  useEffect(() => {
    const results = story.filter(item =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1); // Reset current page when performing a new search
  }, [inputValue, story]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  // Pagination configuration
  const itemsPerPage = 6; // Change this according to your requirement
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filtered results based on search and pagination
  const filteredResults = inputValue.length > 0 ? searchResults : story;
  const visibleResults = filteredResults.slice(startIndex, endIndex);

  // transaction id 
  console.log(`Home Page transaction id ${transactionId}`);
  
  // change placeholder based on filter value 
  useEffect(() => {
    if (selectedFilter && selectedFilter !== 'All') {
      setSearchPlaceholder(`You are Searching in ${selectedFilter}`);
    } else {
      setSearchPlaceholder('Search...');
    }
  }, [selectedFilter]);
  return (
    <Box p={4} marginBottom="60px">
      {/* search bar */}
      <Flex alignItems="center">
        <InputGroup flex="1" mr={4}>
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={inputValue}
            onChange={handleChange}
          />
          <InputRightElement onClick={handleClear} cursor="pointer">
            {inputValue ? (
              <RxCrossCircled color="gray.300" />
            ) : (
              <IoIosSearch color="gray.300" />
            )}
          </InputRightElement>
        </InputGroup>

        <FilterButton states={states} SelectedFilterOption={setSelectedFilter} ResetSearch={handleResetSearch} />
      </Flex>

      {inputValue.length > 0 ? (
        <SearchScreen searchText={visibleResults} transactionId={transactionId}  />
      ) : (
        <>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={4} pt={4}>
            {visibleResults.map((product, index) => (
              <CourseCard key={index} product={product} transactionId={transactionId} />
            ))}
          </SimpleGrid>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredResults.length / itemsPerPage)}
            handlePageChange={handlePageChange}
          />
        </>


      )}


    </Box>
  );
};

export default Home;
