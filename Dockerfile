# Stage 1: Build
# Use a Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS builder

# Set the working directory
WORKDIR /app

# Copy the Maven configuration and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package

# Stage 2: Runtime
# Use the official Eclipse Temurin image for JDK 17
FROM eclipse-temurin:17-jdk-alpine

# Create a directory for the application
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/fluentai-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Set the entry point to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
