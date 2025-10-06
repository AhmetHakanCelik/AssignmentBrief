FROM maven:3.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
#COPY --from=build /app/target/AssignmentBrief-0.0.1-SNAPSHOT.jar.original.jar ./AssignmentBrief-0.0.1.jar.original.jar
COPY --from=build /app/target/AssignmentBrief-0.0.1-SNAPSHOT.jar ./AssignmentBrief-0.0.1.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "AssignmentBrief-0.0.1.jar"]
