# Use the official Eclipse Temurin image for JDK 17
FROM eclipse-temurin:17-jdk-alpine

# Create a directory for the application
WORKDIR /app

# Copy the Spring Boot JAR file to the container
COPY target/fluentai-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# Set the entry point to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

