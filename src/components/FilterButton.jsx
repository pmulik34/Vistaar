import React, { useState } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, VStack } from '@chakra-ui/react';

function FilterButton({ states, SelectedFilterOption, ResetSearch }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleApplyFilters = () => {
        SelectedFilterOption(selectedFilter);
        handleClose();
    };

    const handleResetFilters = () => {
        // Reset the selected filter
        setSelectedFilter('');
        // Call the function to reset the API
        SelectedFilterOption('All'); // Assuming 'All' resets the API
        handleClose();
    };

    return (
        <Box>
            <Button onClick={handleOpen} className="custom-button">
                Filter
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose} size="md">
                <ModalOverlay backdropFilter="auto" backdropBlur="3px" />
                <ModalContent mt="20vh" ml={5} mr={5}>
                    <ModalHeader>Filter Options</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Select
                                placeholder="Select State"
                                value={selectedFilter}
                                onChange={handleFilterChange}
                            >
                                <option value="All">All</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </Select>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleResetFilters} _hover={{ background: '#4f6f4a', color: '#fff' }}
                            _active={{ background: '#4f6f4a', color: '#fff' }}
                            color='#4f6f4a' variant='outline' borderColor='#4f6f4a' mr={4}>
                            Reset
                        </Button>
                        <Button onClick={handleApplyFilters} className="custom-button">
                            Apply Filter
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default FilterButton;
