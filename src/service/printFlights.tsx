import { Box, Button, Stack, Flex, Text } from '@chakra-ui/react';
import { FlightResult, FlightBookTicketResponse } from '../App';

const formatToHHMM = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const PrintFlights = ({ results, onBookFlight, reloadCurrentPage }: {
  results: FlightResult[],
  onBookFlight: (departureTime: string, flight: string) => Promise<FlightBookTicketResponse>,
  reloadCurrentPage: () => Promise<void>
}) => {
  const handleBookClick = async (departureTime: string, flight: string) => {
    try {
      await onBookFlight(departureTime, flight);
      await reloadCurrentPage();
      alert('訂票成功！');
    } catch (error) {
      alert('訂票失敗，請重試。');
    }
  };

  return (
    <Box mt={6}>
      {results.length > 0 && (
        <Stack spacing={4}>
          {results.filter((result) => result.Status === true).map((result) => (
            <Flex
              key={result.ID}
              align="center"
              p={4}
              borderWidth={1}
              borderRadius="md"
              justify="space-between"
              direction={{ base: 'column', md: 'row' }}
              gap={4}
            >
              <Text>{result.DepartureAirport} ({formatToHHMM(result.DepartureTime)})</Text>
              <Text fontSize="lg">&gt;&gt;</Text>
              <Text>{result.ArrivalAirport} ({formatToHHMM(result.ArrivalTime)})</Text>
              <Text>{result.Flight}</Text>
              <Text>價格 {result.Price}</Text>
              <Text>剩餘座位 {result.AvailableSeats}</Text>
              <Button colorScheme="teal" onClick={() => handleBookClick(result.DepartureTime, result.Flight)}>訂票</Button>
            </Flex>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export default PrintFlights;