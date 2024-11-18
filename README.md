# Home Library

## Project Overview

Home Library is a Node.js application built with NestJS to manage your personal library collection. This service provides functionality for handling users, tracks, artists, albums, and favorites, offering a complete system to organize and interact with your home library. The project also integrates Swagger to provide detailed API documentation for seamless interaction with the service.

## Prerequisites

- Node.js and npm
- NestJS CLI (for development)

## Setup and Installation

## Clone the repository:

```
git clone https://github.com/JuliaBel5/nodejs2024Q3-service.git
cd nodejs2024Q3-service
```

## Switch to the appropriate branch:

To access the database functionality, switch to the feat-add-database branch:

```
git checkout feat-add-database
```

## Install dependencies:

```
npm install
```

## Configure environment variables:

Create a .env file in the project root directory and set up the required environment variables. Example:

```
PORT=4000
PORT_DB=5432
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/home_library_db?schema=public"
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=home_library_db
```

## Run the application:

## Development mode:

```
npm run docker:start
```

## API Documentation

This project uses Swagger for API documentation. Once the application is running, visit `http://localhost:<PORT>/doc` in your browser to view the API documentation and explore the available endpoints.

## Scripts

- `npm run format` - Formats the code using Prettier for consistency.
- `npm run lint` - Runs ESLint to identify and fix code issues.
- `npm run docker:start` - Runs the application in development (watch) mode.
- `npm run docker:stop` - Stops and removes the Docker containers and network created by docker compose up.
- `npm run docker-audit` - Analyzes the specified Docker image for known vulnerabilities using Docker Scout.
- `npm run test` - Executes unit tests using Jest.

## Technologies Used

- **NestJS** - A powerful Node.js framework for building scalable applications.
- **Swagger** - Integrated for easy-to-use API documentation.
- **Jest** - Utilized for comprehensive unit and end-to-end testing.
- **ESLint & Prettier** - Ensures consistent code quality and formatting.
- **Docker** - Used for containerizing the application, simplifying deployment and ensuring consistent environments.

## License

This project is UNLICENSED.
