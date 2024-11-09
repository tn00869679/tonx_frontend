import { useState } from 'react'
import { Box } from '@chakra-ui/react';
import './App.css'
import PrintFlights from './service/printFlights';
import FlightSearchForm from './service/flightSearchForm';
import PaginationControl from './service/paginationControl';
import { fetchFlights, fetchBookTicket } from './api/flight';
import { airports } from './constants/airports';

export interface FlightResult {
  ID: number;
  DepartureAirport: string;
  DepartureTime: string;
  ArrivalAirport: string;
  ArrivalTime: string;
  Flight: string;
  Price: number;
  AvailableSeats: number;
  Overbooking: number;
  Status: boolean;
}

export interface FlightListData {
  count: number;
  flights: FlightResult[];
}

export interface FlightListResponse {
  code: number;
  data: FlightListData;
  message: string;
  status: string;
}

export interface FlightBookTicketResponse {
  code: number;
  data: string;
  message: string;
  status: string;
}

function App() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState<FlightResult[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSearch = async () => {
    const fetchedFlightsResult = await fetchFlights(departure, destination, date, currentPage, itemsPerPage);

    setResults(fetchedFlightsResult.data.flights);
    setTotalCount(fetchedFlightsResult.data.count);
    fetchedFlightsResult.data.count === 0 ? setCurrentPage(0) : setCurrentPage(1);
  };

  const handlePageChange = async (value: string) => {
    const page = parseInt(value) || 1;
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      const fetchedFlightsResult = await fetchFlights(departure, destination, date, page, itemsPerPage);
      setResults(fetchedFlightsResult.data.flights);
      setTotalCount(fetchedFlightsResult.data.count);
    }
  };

  const reloadCurrentPage = async () => {
    const fetchedFlightsResult = await fetchFlights(departure, destination, date, currentPage, itemsPerPage);
    setResults(fetchedFlightsResult.data.flights);
    setTotalCount(fetchedFlightsResult.data.count);
  };

  return (
    <Box w="100%" maxW="1200px" mx="auto" mt={5} p={10} borderWidth={1} borderRadius="md">
      <FlightSearchForm
        departure={departure}
        setDeparture={setDeparture}
        destination={destination}
        setDestination={setDestination}
        date={date}
        setDate={setDate}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleSearch={handleSearch}
        airports={airports}
      />

      <PrintFlights
        results={results}
        onBookFlight={fetchBookTicket}
        reloadCurrentPage={reloadCurrentPage}
      />

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default App
