# Stage 1 - build frontend
FROM node:18-alpine AS node-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --silent
COPY frontend/ ./
RUN npm run build

# Stage 2 - build backend and include frontend build
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml ./
# copy entire project
COPY . ./
# copy frontend build into backend static folder
RUN mkdir -p src/main/resources/static
COPY --from=node-build /app/src/main/resources/static/ src/main/resources/static/
RUN mvn -DskipTests package -DskipITs

# Stage 3 - runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
