import { Box, Button, Stack, Flex, Text } from '@chakra-ui/react';
import { FlightResult } from '../App';

const PrintFlights = ({ results }: { results: FlightResult[] }) => {
  return (
    <Box mt={6}>
        {results.length > 0 && (
          <Stack spacing={4}>
            {results.filter((result) => result.status === 1).map((result) => (
              <Flex
                key={result.id}
                align="center"
                p={4}
                borderWidth={1}
                borderRadius="md"
                justify="space-between"
                direction={{ base: 'column', md: 'row' }}
                gap={4}
              >
                <Text>{result.departureAirport} ({result.departureTime})</Text>
                <Text fontSize="lg">&gt;&gt;</Text>
                <Text>{result.arrivalAirport} ({result.arrivalTime})</Text>
                <Text>{result.flight}</Text>
                <Text>價格 {result.price}</Text>
                <Text>剩餘座位 {result.availableSeats}</Text>
                <Button colorScheme="teal">訂票</Button>
              </Flex>
            ))}
          </Stack>
        )}
      </Box>
  )
}

export default PrintFlights;