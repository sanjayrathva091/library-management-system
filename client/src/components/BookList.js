import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const BookList = () => {
    console.log('BookList route')

    return (
        <div>
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4, xl: 6 }} gap="2rem">
                {/* {dummyBooks.map((book, index) => <BookCard key={index} {...book} />)} */}
            </SimpleGrid>
        </div>
    );
};

export default BookList;
