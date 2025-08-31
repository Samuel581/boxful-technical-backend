# Boxful Technical Backend

A robust NestJS backend API for Boxful, a logistics and storage management platform. This project provides user authentication, order management, and product tracking capabilities.

## 🚀 Features

- **User Authentication**: JWT-based authentication with password hashing
- **Order Management**: Create and manage delivery orders with product details
- **User Management**: User registration, login, and profile management
- **Product Tracking**: Track product dimensions and weights
- **API Documentation**: Swagger/OpenAPI documentation
- **Database**: MongoDB with Prisma ORM
- **Validation**: Request validation with class-validator
- **Security**: Password hashing with bcrypt, JWT tokens

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB
- **ORM**: Prisma
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- MongoDB database (local or cloud)
- Git

## 🚀 Installation

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boxful-technical-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp example.env .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
   BCRYPT_SALT_ROUNDS=12
   JWT_SECRET_KEY="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="1d"
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma db push
   ```

5. **Start the application**
   ```bash
   # Development mode
   pnpm start:dev
   
   # Production mode
   pnpm build
   pnpm start:prod
   ```

### Option 2: Docker Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd boxful-technical-backend
   ```

2. **Create Docker Compose file**
   Create a `docker-compose.yml` file in the root directory:
   ```yaml
   version: '3.8'
   
   services:
     backend:
       build: .
       ports:
         - "3000:3000"
       environment:
         - DATABASE_URL=mongodb://mongo:27017/boxful
         - BCRYPT_SALT_ROUNDS=12
         - JWT_SECRET_KEY=your-super-secret-jwt-key
         - JWT_EXPIRES_IN=1d
         - PORT=3000
       depends_on:
         - mongo
       networks:
         - boxful-network
       volumes:
         - .:/app
         - /app/node_modules
   
     mongo:
       image: mongo:latest
       ports:
         - "27017:27017"
       environment:
         - MONGO_INITDB_DATABASE=boxful
       volumes:
         - mongo_data:/data/db
       networks:
         - boxful-network
   
     # Frontend service (if you have a frontend)
     frontend:
       build: ../frontend  # Adjust path to your frontend directory
       ports:
         - "3001:3001"
       environment:
         - REACT_APP_API_URL=http://backend:3000
       depends_on:
         - backend
       networks:
         - boxful-network
   
   volumes:
     mongo_data:
   
   networks:
     boxful-network:
       driver: bridge
   ```

3. **Create Dockerfile**
   Create a `Dockerfile` in the root directory:
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Install pnpm
   RUN npm install -g pnpm
   
   # Copy package files
   COPY package.json pnpm-lock.yaml ./
   
   # Install dependencies
   RUN pnpm install
   
   # Copy source code
   COPY . .
   
   # Generate Prisma client
   RUN pnpm prisma generate
   
   # Build the application
   RUN pnpm build
   
   # Expose port
   EXPOSE 3000
   
   # Start the application
   CMD ["pnpm", "start:prod"]
   ```

4. **Start with Docker Compose**
   ```bash
   # Start all services
   docker-compose up -d
   
   # View logs
   docker-compose logs -f backend
   
   # Stop all services
   docker-compose down
   ```

5. **Database Setup with Docker**
   ```bash
   # Run Prisma migrations
   docker-compose exec backend pnpm prisma db push
   
   # Generate Prisma client
   docker-compose exec backend pnpm prisma generate
   ```

### Network Configuration

The Docker setup includes a shared network (`boxful-network`) that allows:

- **Backend-Frontend Communication**: The frontend can communicate with the backend using `http://backend:3000`
- **Backend-Database Communication**: The backend connects to MongoDB using `mongodb://mongo:27017/boxful`
- **Service Discovery**: Services can reference each other by their service names

**Important Notes:**
- The backend service is accessible at `http://localhost:3000`
- The frontend service is accessible at `http://localhost:3001`
- MongoDB is accessible at `mongodb://localhost:27017`
- All services communicate internally using the `boxful-network`

## 📚 API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/docs
```

## 🔐 Authentication

The API uses JWT-based authentication. To access protected endpoints:

1. **Register a new user**
   ```bash
   POST /auth/register
   {
     "firstName": "John",
     "lastName": "Doe",
     "sex": "MALE",
     "bornDate": "1990-01-01T00:00:00.000Z",
     "phone": "+1234567890",
     "email": "john.doe@example.com",
     "password": "securepassword123"
   }
   ```

2. **Login to get JWT token**
   ```bash
   POST /auth/login
   {
     "email": "john.doe@example.com",
     "password": "securepassword123"
   }
   ```

3. **Use the token in protected endpoints**
   ```bash
   Authorization: Bearer <your-jwt-token>
   ```

## 📦 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Orders (Protected)
- `POST /orders` - Create a new order
- `GET /orders` - Get all orders for the authenticated user

### Users (Protected)
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID

## 📊 Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  firstName String
  lastName  String
  isActive  Boolean  @default(true)
  sex       Sex
  bornDate  DateTime
  phone     String   @unique
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
}
```

### Order Model
```prisma
model Order {
  id     String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  user   User   @relation(fields: [userId], references: [id])
  
  // Collection & Destination info
  collectionAddress    String
  destinationAddress   String
  destinationFirstName String
  destinationLastName  String
  destinationEmail     String
  destinationPhone     String
  
  // Location details
  department       String
  province         String
  addressReference String
  additionalNotes  String?
  
  // Order management
  scheduledDate DateTime
  products      ProductData[]
}
```

### Product Data Type
```prisma
type ProductData {
  name   String
  weight Float
  length Int
  height Int
  width  Int
}
```

## 🔧 Development

### Available Scripts

```bash
# Development
pnpm start:dev          # Start in development mode with hot reload
pnpm start:debug        # Start in debug mode

# Building
pnpm build              # Build the application
pnpm start:prod         # Start in production mode

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:cov           # Run tests with coverage
pnpm test:e2e           # Run end-to-end tests

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format code with Prettier
```

### Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── config/          # JWT configuration
│   ├── dto/             # Auth DTOs
│   ├── guard/           # JWT guards
│   ├── strategies/      # Passport strategies
│   └── types/           # Auth types
├── common/              # Shared utilities
│   └── helpers/         # Helper functions
├── orders/              # Orders module
│   └── dto/             # Order DTOs
├── prisma/              # Database service
├── users/               # Users module
│   └── dto/             # User DTOs
└── main.ts              # Application entry point
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using class-validator
- **CORS Protection**: Cross-origin resource sharing protection
- **Environment Variables**: Sensitive data stored in environment variables

## 🧪 Testing

The project includes comprehensive testing setup:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:cov

# Run end-to-end tests
pnpm test:e2e
```

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | MongoDB connection string | Yes | - |
| `BCRYPT_SALT_ROUNDS` | Salt rounds for password hashing | No | 12 |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | Yes | - |
| `JWT_EXPIRES_IN` | JWT token expiration time | No | "1d" |
| `PORT` | Server port | No | 3000 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v0.0.1** - Initial release with authentication and order management

---

**Note**: This is a technical backend project for Boxful. Make sure to configure your environment variables properly before running the application.
