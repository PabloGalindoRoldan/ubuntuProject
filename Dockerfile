# Dockerfile para Spring Boot
FROM openjdk:17-jdk-slim

WORKDIR /app

# Usa el nombre del JAR que se generó en el directorio target
COPY target/ubuntu-api-0.0.1-SNAPSHOT.jar /app/ubuntu-api.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app/ubuntu-api.jar"]
