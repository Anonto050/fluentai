# Fluent AI Backend

## Overview

Fluent AI is an AI-integrated language learning platform that leverages the power of artificial intelligence to provide personalized learning experiences. This repository contains the backend APIs built using Spring Boot, which interact with a managed PostgreSQL database.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Technologies Used

- **Java**: The primary programming language for backend development.
- **Spring Boot**: Framework for building production-ready applications quickly.
- **PostgreSQL**: Managed relational database for data persistence.
- **Maven**: Build automation tool for Java projects.
- **Docker**: Containerization for consistent deployment environments.
- **GitHub Actions**: CI/CD for automated testing, building, and deployment.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Java 17 or higher
- Maven 3.6.0 or higher
- Docker
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BRAINIAC2677/fluentai.git
   cd fluentai/backend
   ```
2. **Install dependencies**:
    ```bash 
    mvn install
    ```
3. **Configure database credentials:**
    ```
    SPRING_DATASOURCE_URL=jdbc:postgresql://<your-database-url>:5432/<database-name>
    SPRING_DATASOURCE_USERNAME=<your-username>
    SPRING_DATASOURCE_PASSWORD=<your-password>
    ```
### Running The Application
To run the application locally, use the following command:

```
mvn spring-boot:run
```
The application will be accessible at http://localhost:8080


## CI/CD Pipeline
This project utilizes GitHub Actions for CI/CD. Upon every commit push to the main branch, the following steps occur automatically:

- **Build:** The project is built using Maven.
- **Test:** The project tests are run.
- **Dockerize:** The application is packaged into a Docker container.
- **Push to Container Registry:** The Docker image is pushed to the DigitalOcean private container registry.
The CI/CD pipeline is defined in `.github/workflows/backend-ci-cd.yaml.`

