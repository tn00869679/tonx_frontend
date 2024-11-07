import React from 'react';
import { Box, Text, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';

interface PaginationControlProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (value: string) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Box mt={4} textAlign="center">
            <Text>目前頁數 / 總頁數：{currentPage} / {totalPages}</Text>
            <HStack justify="center" mt={2}>
                <NumberInput
                    min={1}
                    max={totalPages}
                    value={currentPage}
                    onChange={onPageChange}
                    maxW="70px"
                    mr="2rem"
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </HStack>
        </Box>
    )
}

export default PaginationControl;