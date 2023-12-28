import React from 'react';
import {
    Box,
    Image,
    Text,
    Button,
    Skeleton,
    useColorModeValue,
} from '@chakra-ui/react';

const BookCard = ({ title, author, imageUrl, isAvailable, onIssue }) => {
    const cardBorderColor = useColorModeValue('gray.200', 'gray.600');

    if (!title && !author && !imageUrl) {
        // Display skeleton UI when no props are provided
        return (
            <Box borderWidth="1px" borderRadius="md" p={3} borderColor={"black"}>
                <Skeleton height="150px" mb={4} />
                <Skeleton height="20px" mb={2} />
                <Skeleton height="20px" />
            </Box>
        );
    }

    return (
        <Box display="grid" placeItems="center" borderWidth="1px" borderRadius="md" p={3} borderColor={cardBorderColor}>
            <Image src={imageUrl} alt={`${title} Cover`} mb={4} />

            <Text fontSize="lg" fontWeight="bold" mb={2} textAlign={"center"}>
                {title}
            </Text>

            <Text fontSize="sm" color="gray.500" mb={4} textAlign={"center"}>
                {author}
            </Text>

            {isAvailable ? (
                <Button colorScheme="blue" size="sm" onClick={onIssue}>
                    Issue
                </Button>
            ) : (
                <Button border={"2px solid black"} size="sm" isDisabled>
                    Not Available
                </Button>
            )}
        </Box>
    );
};

export default BookCard;
