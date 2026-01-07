
  # Railway Department App

  This is a code bundle for Railway Department App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

# Railway Booking System - Backend

This is the backend REST API for the Railway Booking System, built with **Spring Boot** and **MongoDB**. It handles user authentication, train management, and ticket booking operations.

## 🚀 Features

- **User Authentication**: Secure Sign Up and Login using JWT (JSON Web Tokens).
- **Train Management**: Search and view train schedules.
- **Booking System**: Book tickets for available trains.
- **Data Persistence**: Stores all data in a MongoDB database.
- **Security**: Role-based access control (if implemented) and secure password storage.

## 🛠️ Technology Stack

- **Java**: 17
- **Framework**: Spring Boot 3.2.1
- **Build Tool**: Maven
- **Database**: MongoDB
- **Security**: Spring Security, JWT (JJWT library)
- **Utilities**: Lombok

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

1.  **Java Development Kit (JDK) 17**: [Download JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
2.  **Maven**: [Download Maven](https://maven.apache.org/download.cgi) (or use the included `mvnw` wrapper)
3.  **MongoDB**: You need a running MongoDB instance (local or cloud like MongoDB Atlas).

## ⚙️ Configuration

The application configuration is located in `src/main/resources/application.properties`.

**Default Configuration:**

```properties
spring.application.name=backend
server.port=8080

# Database Configuration (Update with your credentials)
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/railway_db

# JWT Configuration
app.jwtSecret=YourSecretKey
app.jwtExpirationMs=86400000
```

> **Note:** Ideally, sensitive information like database URIs and JWT secrets should be passed as environment variables (`SPRING_DATA_MONGODB_URI`, `APP_JWTSECRET`, etc.) rather than hardcoded in the properties file.

## 🏃‍♂️ How to Run

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
3.  **Clean and Install Dependencies**:
    ```bash
    ./mvnw clean install
    ```
    (On Windows, use `mvnw.cmd clean install`)
4.  **Run the Application**:
    ```bash
    ./mvnw spring-boot:run
    ```
    (On Windows, use `mvnw.cmd spring-boot:run`)

The server will start on `http://localhost:8080`.

## 📂 Project Structure

```
src/main/java/com/example/backend
├── config       # Configuration classes (e.g., AppConfig)
├── controller   # REST Controllers (API endpoints)
├── dto          # Data Transfer Objects (Request/Response models)
├── exception    # Global Exception Handling
├── model        # MongoDB Document Models (Entities)
├── repository   # Repository interfaces for database access
├── security     # Security config, JWT utils, UserDetails services
├── service      # Business logic interfaces and implementations
└── BackendApplication.java # Main entry point
```

## 🔌 API Endpoints (Examples)

**Authentication**
- `POST /api/auth/signin` - Authenticate user
- `POST /api/auth/signup` - Register key user

**Trains**
- `GET /api/trains` - List all trains (search functionality might be included)
- `GET /api/trains/{id}` - Get train details
- `POST /api/trains` - Add a new train (Admin only typically)

**Bookings**
- `POST /api/bookings` - Create a ticket booking
- `GET /api/bookings/user/{userId}` - Get bookings for a specific user

*(Note: The actual endpoints depend on the implementation in the `controller` package.)*

## 📝 License



[Add License Information Here]

  
