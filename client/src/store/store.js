import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './reducers/books';
// import transactionsReducer from './reducers/transactions';
// import userReducer from './reducers/user';

const store = configureStore({
    reducer: {
        books: booksReducer,
        // transactions: transactionsReducer,
        // user: userReducer,
        // Add other reducers as needed
    },
});

export default store;
