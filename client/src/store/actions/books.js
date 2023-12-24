import { createAsyncThunk } from '@reduxjs/toolkit';

// Example thunk to fetch books from an API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    // Your API call here
    const response = await fetch('/api/books');
    const data = await response.json();
    return data;
});

// Other book-related actions can be added here
