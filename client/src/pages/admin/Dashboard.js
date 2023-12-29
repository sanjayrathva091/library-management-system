import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import ChartComponent from '../../components/charts/ChartComponent';
import StatsCard from '../../components/StatsCard';
import { userTransactionsData, bookCategoriesData } from '../../database/data';

function Dashboard() {
    const scrollbarColor = useColorModeValue(
        "rgba(0, 0, 0, 0)",
        "rgba(255, 255, 255, 0)"
    );

    return (
        <Box
            px={3}
            maxW={{ base: "100%", md: "calc(100% - 200px)", lg: "calc(100% - 200px)", xl: "calc(100% - 200px)" }}
            position="relative" left={{ base: "0", md: "200px", lg: "200px", xl: "200px" }}
            overflowX={"hidden"}
        >

            <Flex
                p={4}
                gap="1.2rem"
                overflowX="auto"
                overflowY="hidden"
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "12px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: scrollbarColor,
                        borderRadius: "8px",
                    },
                }}
            >
                <StatsCard
                    statsTitle="Active User"
                    statsValue="12,000"
                    statsIcon="users"
                    bgColor="#FFA07A"
                    textColor="#442C2E"
                />
                <StatsCard
                    statsTitle="Available Books"
                    statsValue="102,000"
                    statsIcon="books"
                    bgColor="#FFD3E0"
                    textColor="#5C3B6F"
                />
                <StatsCard
                    statsTitle="Borrowed Books"
                    statsValue="10,000"
                    statsIcon="books"
                    bgColor="#B2D8B2"
                    textColor="#385C38"
                />
                <StatsCard
                    statsTitle="Active User"
                    statsValue="12,000"
                    statsIcon="users"
                    bgColor="#FFA07A"
                    textColor="#442C2E"
                />
                <StatsCard
                    statsTitle="Available Books"
                    statsValue="102,000"
                    statsIcon="books"
                    bgColor="#E6E6FA"
                    textColor="#4B0082"
                />
                <StatsCard
                    statsTitle="Borrowed Books"
                    statsValue="10,000"
                    statsIcon="books"
                    bgColor="#FF6F61"
                    textColor="#3E4444"
                />
            </Flex>


            <ChartComponent
                chartId={"transactionsBar"}
                title="Book Categories"
                data={bookCategoriesData}
                chartType="donut"
            />
            <ChartComponent
                chartId={"bookPie"}
                title="Book Availability"
                data={userTransactionsData}
                chartType="bar"
            />


        </Box>
    )
};

export default Dashboard;