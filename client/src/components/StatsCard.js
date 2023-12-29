import React from "react";
import { Flex, Box, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import { FaBook, FaExchangeAlt } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const StatsCard = ({
    statsTitle,
    statsValue,
    statsIcon,
    bgColor,
    textColor,
}) => {
    const iconMap = {
        books: (
            <Icon as={FaBook} boxSize={{ base: 8, sm: 12, md: 12, lg: 16, xl: 16 }} />
        ),
        users: (
            <Icon
                as={MdPerson}
                boxSize={{ base: 8, sm: 12, md: 12, lg: 16, xl: 16 }}
            />
        ),
        transactions: (
            <Icon
                as={FaExchangeAlt}
                boxSize={{ base: 8, sm: 12, md: 12, lg: 16, xl: 16 }}
            />
        ),
    };

    const iconColor = useColorModeValue("gray.600", "gray.300");

    return (
        <Flex
            flex="1"
            direction="row"
            gap="0.8rem"
            align="center"
            p={4}
            rounded="md"
            shadow="md"
            transition="all 300ms"
            _hover={{ transform: "scale(1.05)" }}
            bg={bgColor || "white"}
            color={textColor || iconColor}
        >
            <Box color={iconColor}>{iconMap[statsIcon]}</Box>
            <Box maxW="max-content">
                <Text mt={2} fontSize="xl" fontWeight="semibold">
                    {statsTitle}
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                    {statsValue}
                </Text>
            </Box>
        </Flex>
    );
};

export default StatsCard;
