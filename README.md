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
