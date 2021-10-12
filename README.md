# Backend
Boilerplate for readall Backend

# How to build?
To build the sequelize config files, migrate (create databases and tables) and seeds:
`npm run-script build`

# How to clean up previus build
`npm run-script reset`

# Default Task Manager
- PM2

# Missing Development
- Separate environments and variables for development, QA and production
- Redis for microservices
- Redis for frontend communication
- JWT based authentication
- CD/CI
- Automation test (Cypress?)
- Check if the compression and minify middlewares are working

# Mantainability Over the Time
- ESLint (AirBnB Modified)
- Hoosky (Check linter before commiting)
- SonarCube (Code quality)

# Testing
- Mocha/Chai (Unitary & Integration)
- Sinon (Mocks for Unitary)
- Postman (Regresion)

# ORM/ODM
- Sequelize for MySQL
- Mongoose for MongoDB
