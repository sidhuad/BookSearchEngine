
# Book Search Engine

![Static Badge](https://img.shields.io/badge/License-MIT-green)

## Description

- **Motivation**: The motivation for building the BookSearchEngine project is to create a full-stack application that allows users to search for books, save their favorite books, and have an authenticated experience using JWT-based authentication. The goal was to combine GraphQL for efficient querying and MongoDB for data storage, allowing users to interact with their book collection in an intuitive and secure way.
- **Why build This Project**: I wanted to build a project that demonstrated how to integrate modern technologies like GraphQL, MongoDB, and JWT authentication to create a functional, secure, and scalable web application. With the growing popularity of book databases and personal book collections, I saw an opportunity to build a book search and save feature that leverages the power of GraphQL for querying and MongoDB for persistent storage.
- **What problem's did it solve**: Personal Book Collection: Users can log in to their accounts and save their favorite books for future reference.Secure Authentication: With JWT authentication, users can securely sign up, log in, and interact with their personalized book collection.Efficient Data Access: GraphQL allows users to fetch specific book data, minimizing over-fetching and making the app more efficient.User Account Management: The project offers user registration, login, and authenticated sessions, ensuring only authenticated users can save books.
- **Lesson's Learned**: GraphQL: Gained experience using GraphQL for querying and mutating data, allowing for a more flexible and efficient way to interact with the backend.JWT Authentication: Implemented JWT authentication for user registration and login, ensuring secure communication between the frontend and backend.Mongoose & MongoDB: Learned how to use Mongoose for modeling data and interacting with a MongoDB database to store user data and book information.Full-stack Development: Integrated the frontend, backend, and database, learning how to tie them together to create a full-stack web application.
- **What makes your project stand-out**: Secure User Authentication: The application implements JWT authentication, providing secure login and sign-up functionality.Efficient GraphQL API: Instead of traditional REST, this project uses GraphQL, enabling users to fetch exactly the data they need without over-fetching.Personalized Book Collection: Users can not only search for books, but they can also save their favorite books to their personal collection, enhancing the app’s value for regular users.Modern Tech Stack: Combines popular technologies such as MongoDB, Mongoose, JWT, and GraphQL in a full-stack project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)
- [Link](#link)

## Installation
1. Clone the repository:
    ```
    git clone https://github.com/sidhuad/booksearchengine.git
    cd booksearchengine
    ```
2. Install Dependencies: Run the following command to install the required Node.js dependencies:
    ```
    npm install
    ```
3. Set Up Environment Variables: Create a .env file in the root of your project and add your MongoDB URI and JWT Secret Key:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
4. Run the Development Server: Start the server with:
    ```
    npm run dev
    ```

## Usage
1. Create an Account
2. Login:
    - After signing up, log in with your credentials . You will receive a JWT token upon successful authentication.
3. Search for Books:
    - Once logged in, you can search for books via the GraphQL endpoint. Use GraphQL queries to search books by title, author, etc.
4. Save Books:
    - After finding a book, you can save it to your personal collection if you're logged in. This feature is only available to authenticated users.
5. View Saved Books:
    - You can view all saved books under your user profile or via the relevant GraphQL query.

## Credits
- GraphQL: GraphQL for efficient data querying.
- JWT: JSON Web Tokens for secure authentication.
- MongoDB: MongoDB for the NoSQL database.
- Mongoose: Mongoose for MongoDB object modeling.
- Apollo Server: Apollo Server for building the GraphQL API.

## License
A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code. https://choosealicense.com/licenses/mit/

## Features
- Secure user authentication with JWT.
- Book search via GraphQL API.
- Ability to save books to a personal collection.
- View saved books in your account.

## How to Contribute
Contributions are welcome! Here’s how you can contribute:
1. Fork the repository and create a new branch.
2. Make your changes and add tests if necessary.
3. Commit your changes and push to your forked repository.
4. Create a pull request with a clear description of what you’ve done.

If you're interested in any specific feature or want to improve something, feel free to open an issue or contribute via a pull request!

## Tests
```
no tests available
```

## Questions
- For Further Questions and Bug reports Please reach out to me at Github [sidhuad](https://github.com/sidhuad) or email me at adarshsidhu83@gmail.com

## Link
- [Deployed Link](https://booksearchengine-5vsb.onrender.com/)
- [Github Repo](https://github.com/sidhuad/BookSearchEngine)