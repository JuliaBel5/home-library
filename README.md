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

## Install dependencies:

```
npm install
```

## Configure environment variables:

Create a .env file in the project root directory and set up the required environment variables. Example:

```
PORT1=4000
```

## Run the application:

## Development mode:

```
npm run start:dev
```

## Production mode:

```
npm run build
npm run start:prod
```

## API Documentation

This project uses Swagger for API documentation. Once the application is running, visit `http://localhost:<PORT1>/doc` in your browser to view the API documentation and explore the available endpoints.

## Scripts

- `npm run build` - Compiles the application for production.
- `npm run format` - Formats the code using Prettier for consistency.
- `npm run lint` - Runs ESLint to identify and fix code issues.
- `npm run start` - Runs the application in production mode.
- `npm run start:dev` - Runs the application in development mode with hot reloading.
- `npm run test` - Executes unit tests using Jest.

Additional scripts are available for debugging, generating test coverage, and running authentication tests.

## Technologies Used

- **NestJS** - A powerful Node.js framework for building scalable applications.
- **Swagger** - Integrated for easy-to-use API documentation.
- **Jest** - Utilized for comprehensive unit and end-to-end testing.
- **ESLint & Prettier** - Ensures consistent code quality and formatting.

## License

This project is UNLICENSED.
