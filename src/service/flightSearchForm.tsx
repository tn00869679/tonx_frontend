import React from 'react';
import { Box, FormControl, FormLabel, Select, Button, Flex, Input } from '@chakra-ui/react';

interface FlightSearchFormProps {
    departure: string;
    setDeparture: (value: string) => void;
    destination: string;
    setDestination: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;
    handleSearch: () => void;
    airports: { value: string; label: string }[];
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
    departure,
    setDeparture,
    destination,
    setDestination,
    date,
    setDate,
    itemsPerPage,
    setItemsPerPage,
    handleSearch,
    airports,
}) => {
    const filteredDepartureOptions = airports.filter(airport => airport.value !== destination);
    const filteredDestinationOptions = airports.filter(airport => airport.value !== departure);

    return (
        <Box>
            <Flex mb={4} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
                <FormControl id="departure" flex="3">
                    <FormLabel>起點</FormLabel>
                    <Select
                        placeholder="選擇起點"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                    >
                        {filteredDepartureOptions.map((airport) => (
                            <option key={airport.value} value={airport.value}>
                                {airport.label}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl id="destination" flex="3">
                    <FormLabel>終點</FormLabel>
                    <Select
                        placeholder="選擇終點"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    >
                        {filteredDestinationOptions.map((airport) => (
                            <option key={airport.value} value={airport.value}>
                                {airport.label}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl id="date" flex="2">
                    <FormLabel>日期</FormLabel>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </FormControl>

                <FormControl id="itemsPerPage" flex="1">
                    <FormLabel>筆數</FormLabel>
                    <Select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Select>
                </FormControl>

                <Button
                    colorScheme="blue"
                    onClick={handleSearch}
                    isDisabled={!departure || !destination}
                    alignSelf={{ base: 'stretch', md: 'flex-end' }}
                >
                    查詢班機
                </Button>
            </Flex>
        </Box>
    )
}

export default FlightSearchForm;