import axios from 'axios';
import { FlightListResponse, FlightBookTicketResponse } from '../App';

const apiUrl = import.meta.env.VITE_API_SERVER;

const formatDateToISO = (dateString: string) => {
    const date = new Date(dateString);
    const isoDate = date.toISOString().split('T')[0] + "T00:00:00Z";
    return isoDate;
};

export const fetchFlights = async (departure: string, destination: string, date: string, page: number, perPage: number): Promise<FlightListResponse> => {
    try {
        const dateTime = formatDateToISO(date);
        const response = await axios.get(`${apiUrl}/flight/list`, {
            params: {
                departureAirport: departure,
                arrivalAirport: destination,
                departureTime: dateTime,
                page: page === 0 ? 1 : page,
                perPage: perPage,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching flight list:', error);
        throw error;
    }
};

export const fetchBookTicket = async (departureTime: string, flight: string): Promise<FlightBookTicketResponse> => {
    try {
        const response = await axios.patch(`${apiUrl}/flight/bookTicket`, { 
            departureTime: departureTime,
            flight: flight,
        });

        return response.data;
    } catch (error) {
        console.error('Error booking flight:', error);
        throw error;
    }
};