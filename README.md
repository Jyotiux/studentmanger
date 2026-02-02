# Student Management API (Spring Boot + JPA + MySQL)

## Requirements
- Java 17
- Maven
- MySQL (or use H2 for dev)

## Setup (MySQL)
1. Create database: `CREATE DATABASE studentdb;`
2. Update `src/main/resources/application.properties` if username/password differ.

## Run
- Build: `mvn clean package`
- Run: `mvn spring-boot:run` or `java -jar target/*.jar`
- Open backend-served frontend: http://localhost:8080/
- API endpoints: GET/POST/DELETE `http://localhost:8080/students`

## Frontend (React + Vite)
- Dev server (fast reload):
  1. cd `frontend`
  2. `npm install`
  3. `npm run dev` (opens at http://localhost:3000)
  - Dev server proxies `/students` to `http://localhost:8080` so API calls work without CORS during development.
- Build and serve from Spring Boot:
  1. cd `frontend`
  2. `npm run build` (build output is placed into `src/main/resources/static`)
  3. Restart the Spring Boot app and open: http://localhost:8080/

## Notes
- For quick dev you can use H2 by uncommenting H2 config in `application.properties`.
- Add validation and exception handling as next improvements.
