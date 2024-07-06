# Library Database CRUD Application

This project is developed as part of the NoSQL module in the "Big Data and Artificial Intelligence" master's degree program. The goal of the project is to create a small MongoDB application for managing a library database. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on library documents, which include both books and periodicals.

## Project Description

### Library Structure

The library contains various documents (items), which can be either books or periodicals. All documents share the following attributes:
- **Unique Identifier**: A unique ID for each document.
- **Title**: The title of the document.
- **Availability Flag**: Indicates if the document is available.
- **Document Type**: Specifies if the document is a book or a periodical.

Books have additional attributes:
- **Year of Publication**: The year the book was published.
- **Publishing House**: The publishing house of the book.
- **Author**: The primary author of the book.

Periodicals have additional attributes:
- **Periodicity**: The frequency of publication (e.g., weekly, monthly, daily).
- **Publication Date**: The date of publication.

Books also have multiple copies, each identified by a unique copy number.

## Requirements

1. **Create the MongoDB database** corresponding to the library structure.
2. **Create the 'ouvrages' collection** in the database.
3. **Insert some documents** into the 'ouvrages' collection.
4. Develop an application using a high-level language (Next.js 14.1) to:
    - **Insert a document**: Assume each book has 3 copies.
    - **Search for documents** based on document type (e.g., search for periodicals).

## Application Details

### Technologies Used
- **Next.js 14.1**: A React framework for building server-side rendering and static web applications.
- **MongoDB**: NoSQL database used for storing the library documents.
- **Bun**: A fast JavaScript runtime that helps with project setup and running scripts.

### Commands

To run the application, you can use Bun, npm, or Yarn. Here are the commands for each:

#### Using Bun
```bash
# Install dependencies
bun install

# Run the development server
bun dev

# Build the application
bun build

# Start the production server
bun start
```

#### Using npm
```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build the application
npm run build

# Start the production server
npm start
```

#### Using Yarn
```bash
# Install dependencies
yarn install

# Run the development server
yarn dev

# Build the application
yarn build

# Start the production server
yarn start
```

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies**:
    - Using Bun: `bun install`
    - Using npm: `npm install`
    - Using Yarn: `yarn install`

3. **Set up MongoDB**:
    - Ensure MongoDB is installed and running on your machine.
    - Create a database named `library`.
    - Create a collection named `ouvrages`.

4. **Insert initial documents**:
    - Insert sample documents into the `ouvrages` collection using MongoDB Compass or the MongoDB shell.

5. **Run the application**:
    - Using Bun: `bun dev`
    - Using npm: `npm run dev`
    - Using Yarn: `yarn dev`

6. **Access the application**:
    - Open your web browser and navigate to `http://localhost:3000`.

## Conclusion

This application provides a basic CRUD interface for managing a library database using MongoDB and Next.js. The project demonstrates the use of NoSQL databases and modern web development practices.
