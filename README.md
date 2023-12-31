# library-management-system

The Library Management System is a comprehensive online platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It facilitates the efficient management of library resources, providing both administrative and user functionalities.

## Project Structure

The project is organized into two main components: the frontend (`client`) and the backend (`server`).

### Frontend (client)

- **`public/`:** Contains static files.
- **`src/`:** Main source directory for React components and application code.
  - **`components/`:** Reusable components.
  - **`pages/`:** Individual pages of the application.
  - **`App.js`:** Main component for the application.
  - **`index.js`:** Entry point for React.

### Backend (server)

- **`controllers/`:** Logic to handle requests.
- **`models/`:** MongoDB schema models.
- **`routes/`:** Express.js route handlers.
- **`index.js`:** Entry point for the backend.

### Additional Files

- **`.gitignore`:** Specifies files/directories to be ignored by version control.
- **`package.json`:** Configuration for npm packages, scripts, and dependencies.
- **`README.md`:** Project documentation.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```
2. **Install Dependencies:**

   ```
   # Install frontend dependencies
     cd client
     npm install

   # Install backend dependencies
     cd ../server
     npm install

   ```

3. **Run Development Servers:**

   ```
   # Start React development server
     cd ../client
     npm start

   # Start Express.js server
     cd ../server
     node index.js

   ```

4. **Open in Browser:**

   ```
   Frontend: http://localhost:3000
   Backend: http://localhost:4000

   ```

### API Endpoints

The API provides endpoints for the creation and management of books, users, and transactions. Detailed API documentation is available in the respective section of the code.

### Detailed API Documentation:

1. GET /api/books:

   - Description: Get a list of all books in the library.
   - Response:

   ```
   [
    {
        "_id": "book_id",
        "name": "Book Title",
        "author": "Author Name",
        "availability": true
    },
   ]

   ```

2. POST /api/books:

   - Description: Add a new book to the library.
   - Request:

   ```
   {
        "name": "New Book Title",
        "author": "New Author",
        "availability": true
   }

   ```

   - Response:

   ```
    {
        "_id": "new_book_id",
        "name": "New Book Title",
        "author": "New Author",
        "availability": true
    }

   ```

3. GET /api/users/:id:

   - Description: Get details of a specific user.
   - Response:

   ```
   {
        "_id": "user_id",
        "username": "user123",
        "name": "User Name",
        "email": "user@example.com",
        "contactNumber": "1234567890"
   }

   ```

4. GET /api/users/:id/transactions:

   - Description: Get transaction history for a user.
   - Response:

   ```
   [
    {
        "_id": "transaction_id",
        "book": {
            "name": "Book Title",
            "author": "Author Name"
        },
        "dueDate": "2023-12-31",
        "transactionType": "issued"
    },
   ]

   ```

5. POST /api/transactions/issue/:bookId/:userId:

   - Description: Issue a book to a user.
   - Response:

   ```
   {
        "_id": "new_transaction_id",
        "book": {
            "name": "Book Title",
            "author": "Author Name"
        },
        "dueDate": "2023-12-31",
        "transactionType": "issued"
   }

   ```

6. POST /api/transactions/return/:bookId/:userId:

   - Description: Return a book from a user.
   - Response:

   ```
    {
        "_id": "returned_transaction_id",
        "book": {
            "name": "Book Title",
            "author": "Author Name"
        },
        "dueDate": "2023-12-31",
        "transactionType": "returned"
    }

   ```

### Contributing

Feel free to contribute to the project by following the contribution guidelines.

### License

This project is licensed under the MIT License.

### Acknowledgments

- ReactJs
- NodeJs
- ExpressJs
- MongoDB
