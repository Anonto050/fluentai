# FluentAI

Fluent AI is an AI-integrated language learning platform that leverages the power of artificial intelligence to provide personalized learning experiences. This repository contains the frontend and backend codebase. 

## Demo
Watch the demo here: [FluentAI Demo](https://www.youtube.com/watch?v=nxrakOBEDCc)

## Table of Contents

- [Key Features](#key-features)
- [Visual Overview](#visual-overview)
- [Tech Stack](#tech-stack)
- [Frontend Installation](#frontend-installation)
- [Backend Installation](#backend-installation)
- [Usage](#usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Key Features

- **`Interactive Learning`**: Comprehensive lessons covering alphabets, vocabulary, and phrases with audio-visual aids.
- **`AI-Driven Conversations`**: Practice real-life conversations with AI-driven interactions and get instant feedback.
- **`Gamification`**: Engage with quests, earn XP, and track your position on the leaderboard.
- **`3D Interactive Classroom`**: An immersive 3D classroom feature for interactivity, where users can practice grammar breakdowns, speaking, and listening simultaneously.
- **`Vision Pal`**: A navigation tool for visually impaired users that captures video and provides spoken guidance to help navigate their surroundings.
- **`Sign Language Recognition Module`**: A dedicated module for learning sign language using video capture and a custom ML model for recognition.
- **`Writing and Speaking Practice`**: A module that allows users to practice writing with real-time feedback using OCR technology and engage in speaking practice through AI-based conversations.
- **`Image and PDF Discussions`**: Interactive learning through the discussion of images and PDFs, helping users learn new words and phrases in context.


## Visual Overview

### 1. Welcome Screen
<img src="/frontend/public/project/1.png" alt="Welcome Screen" width="600"/>
An inviting welcome screen to start your language learning journey.

### 2. Language Courses Selection
<img src="/frontend/public/project/8.png" alt="Language Courses Selection" width="600"/>
Easily select from a variety of language courses offered on the platform.

### 3. Learning Dashboard
<img src="/frontend/public/project/2.png" alt="Learning Dashboard" width="600"/>
Overview of learning units, with easy access to quests and shop.

### 4. Quiz Interface
<img src="/frontend/public/project/5.png" alt="Quiz Interface" width="600"/>
Interactive quizzes to test and reinforce your learning.

### 5. Shop Interface
<img src="/frontend/public/project/11.png" alt="Shop Interface" width="600"/>
Use earned points to purchase items in the shop, such as refilling hearts.

### 6. Leaderboard
<img src="/frontend/public/project/12.png" alt="Leaderboard" width="600"/>
Track your ranking among other learners in the community.

### 7. Quests Overview
<img src="/frontend/public/project/13.png" alt="Quests Overview" width="600"/>
Complete quests to earn XP and enhance your learning experience.

### 8. Polychat, Chat with Images & PDFs
<div style="display: flex; justify-content: space-between;">
  <div>
    <img src="/frontend/public/project/14.png" alt="Polychat Interface" width="200"/>
    <p>Polychat Interface</p>
  </div>
  <div>
    <img src="/frontend/public/project/15.png" alt="Chat with Images" width="200"/>
    <p>Chat with Images</p>
  </div>
  <div>
    <img src="/frontend/public/project/16.png" alt="Chat with PDFs" width="200"/>
    <p>Chat with PDFs</p>
  </div>
</div>


## Tech Stack

### Frontend
- **Framework:** Next.js 14
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS with shadcn/ui library

### Backend
- **Java**: The primary programming language for backend development.
- **Spring Boot**: Framework for building production-ready applications quickly.
- **PostgreSQL**: Managed relational database for data persistence.
- **Maven**: Build automation tool for Java projects.
- **Docker**: Containerization for consistent deployment environments.
- **GitHub Actions**: CI/CD for automated testing, building, and deployment.



## Frontend Installation

To set up the frontend locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BRAINIAC2677/fluentai.git
   cd fluentai/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Backend Installation

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



## Usage

Once the server is running, you can explore the platform's various features, such as signing up, selecting a language, and engaging with interactive lessons. The sidebar provides easy navigation to learning modules, quests, the shop, and leaderboards.

## CI/CD Pipeline
This project utilizes GitHub Actions for CI/CD. Upon every commit push to the main branch, the following steps occur automatically:

- **Build:** The backend is built using Maven.
- **Test:** The project tests are run.
- **Dockerize:** The application is packaged into a Docker container.
- **Push to Container Registry:** The Docker image is pushed to the DigitalOcean private container registry.
The CI/CD pipeline is defined in `.github/workflows/`

## Deployment 
DigitalOcean App Platform automatically detects new images in the private container registry and redeploys the latest version of the application. This ensures minimal downtime and continuous delivery of updates to the platform.


## Contributing

We welcome contributions to enhance FluentAI. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a Pull Request.

Please ensure that your code adheres to the project's coding standards and conventions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For questions, suggestions, or feedback, please reach out to:

- Asif Azad - asifazad0178@gmail.com
- Riad Ahmed Anonto - riadahmedanonto355@gmail.com
