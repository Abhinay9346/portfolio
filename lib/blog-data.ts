export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "jwt-authentication-mern",
    title: "JWT Authentication in MERN Applications",
    description:
      "A deep dive into implementing secure JSON Web Token authentication across the full MERN stack, including refresh tokens and middleware patterns.",
    date: "Jan 2026",
    readTime: "8 min read",
    tags: ["Node.js", "React", "Security", "JWT"],
    content: `## Introduction

JSON Web Tokens (JWT) have become the de-facto standard for handling authentication in modern web applications. In this article, we'll walk through implementing a robust JWT authentication system across the full MERN stack.

## Why JWT?

Traditional session-based authentication stores session data on the server, which can become a bottleneck as your application scales. JWT shifts this responsibility to the client by encoding user information into a cryptographically signed token.

**Key advantages:**
- Stateless: No server-side session storage required
- Scalable: Works seamlessly across multiple servers
- Flexible: Can carry custom claims and metadata
- Cross-domain: Ideal for microservices architectures

## Setting Up the Backend

First, let's set up our Express.js server with the necessary dependencies:

\`\`\`javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
\`\`\`

## Generating Tokens

We create two types of tokens: a short-lived access token for API requests and a long-lived refresh token for obtaining new access tokens:

\`\`\`javascript
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
}
\`\`\`

## Authentication Middleware

The middleware validates the access token on every protected request:

\`\`\`javascript
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
\`\`\`

## Implementing Refresh Token Rotation

Refresh token rotation is a security best practice where each refresh token can only be used once. When a refresh token is used, a new one is issued and the old one is invalidated:

\`\`\`javascript
app.post('/api/token/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  // Verify the refresh token exists in our database
  const storedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!storedToken) return res.sendStatus(403);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    // Delete the used refresh token
    await RefreshToken.deleteOne({ token: refreshToken });

    // Generate new token pair
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Store the new refresh token
    await RefreshToken.create({ token: newRefreshToken, userId: user.id });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
});
\`\`\`

## React Frontend Integration

On the client side, we use Axios interceptors to automatically handle token refresh when an access token expires:

\`\`\`javascript
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await axios.post('/api/token/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
\`\`\`

## Security Best Practices

1. **Use HTTPS everywhere** - Tokens are sent in headers and must be encrypted in transit.
2. **Short access token expiry** - Keep access tokens short-lived (15 minutes or less).
3. **Refresh token rotation** - Invalidate old refresh tokens after use.
4. **Store tokens securely** - Use HTTP-only cookies for refresh tokens instead of localStorage in production.
5. **Validate token claims** - Always verify the token issuer, audience, and expiration.

## Conclusion

Implementing JWT authentication in a MERN stack application requires careful consideration of security practices. By using short-lived access tokens with refresh token rotation, you can build a robust and scalable authentication system that protects your users' data.`,
  },
  {
    slug: "building-secure-rest-apis-nodejs",
    title: "Building Secure REST APIs with Node.js",
    description:
      "Best practices for building production-ready REST APIs including input validation, rate limiting, and error handling strategies.",
    date: "Dec 2025",
    readTime: "10 min read",
    tags: ["Node.js", "Express", "API", "Security"],
    content: `## Introduction

Building a REST API is straightforward with Node.js and Express. Building a *secure*, production-ready REST API requires significantly more thought. In this article, we'll cover the essential security practices every Node.js API developer should implement.

## Input Validation with Joi

Never trust user input. Every piece of data that enters your API should be validated before processing:

\`\`\`javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/)
    .required(),
  role: Joi.string().valid('user', 'admin').default('user'),
});

function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.details.map(d => d.message),
      });
    }
    req.body = value;
    next();
  };
}

app.post('/api/users', validateBody(userSchema), createUser);
\`\`\`

## Rate Limiting

Protect your API from abuse with rate limiting. This prevents brute-force attacks and ensures fair usage:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message: { error: 'Too many login attempts.' },
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
\`\`\`

## Helmet for HTTP Headers

Helmet sets various HTTP headers to help protect your app from well-known web vulnerabilities:

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\`

This sets headers like \`X-Content-Type-Options\`, \`Strict-Transport-Security\`, and \`X-Frame-Options\` automatically.

## CORS Configuration

Only allow requests from trusted origins:

\`\`\`javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://yourdomain.com', 'https://admin.yourdomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
\`\`\`

## Centralized Error Handling

A centralized error handler keeps your code clean and ensures consistent error responses:

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
  });

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});
\`\`\`

## Request Logging

Log every request for monitoring and debugging:

\`\`\`javascript
const morgan = require('morgan');

// Use 'combined' format in production for detailed logs
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
\`\`\`

## Database Query Safety

Always use parameterized queries to prevent injection attacks. With MongoDB and Mongoose:

\`\`\`javascript
// DANGEROUS - Never do this
const user = await User.findOne({ email: req.body.email });

// SAFE - Sanitize input first
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize()); // Strips $ and . from req.body, req.query, req.params
\`\`\`

## Conclusion

Security is not a feature you add at the end - it must be baked into every layer of your API from the start. By implementing input validation, rate limiting, proper error handling, and security headers, you create a solid foundation that protects both your application and your users.`,
  },
  {
    slug: "certificate-automation-verification-systems",
    title: "Certificate Automation and Verification Systems",
    description:
      "How to architect a scalable digital certificate platform with QR-code verification, bulk generation, and role-based access control.",
    date: "Nov 2025",
    readTime: "12 min read",
    tags: ["Architecture", "Node.js", "PDF", "QR Code"],
    content: `## Introduction

Digital certificates are everywhere - from course completions and event participation to professional certifications. Building a system that can generate, distribute, and verify these certificates at scale is an interesting engineering challenge. In this article, I'll share the architecture and lessons learned from building the Certificate Automation & Verification System.

## System Architecture Overview

The system follows a layered architecture with clear separation of concerns:

**Frontend Layer:** React.js application with role-based views for admins, issuers, and verifiers.

**API Layer:** Express.js REST API handling authentication, certificate CRUD, generation, and verification.

**Generation Engine:** PDF generation pipeline with template support, dynamic data injection, and QR code embedding.

**Storage Layer:** MongoDB for metadata, with file storage for generated PDFs.

## Role-Based Access Control

The system supports three roles, each with different permissions:

\`\`\`javascript
const roles = {
  admin: ['manage_users', 'manage_templates', 'generate', 'verify', 'audit'],
  issuer: ['generate', 'verify', 'view_reports'],
  verifier: ['verify'],
};

function authorize(...permissions) {
  return (req, res, next) => {
    const userPerms = roles[req.user.role] || [];
    const hasPermission = permissions.every(p => userPerms.includes(p));
    if (!hasPermission) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

app.post('/api/certificates/generate',
  authenticateToken,
  authorize('generate'),
  generateCertificates
);
\`\`\`

## Bulk Certificate Generation

One of the key features is generating certificates in bulk - up to 1000+ per batch. The pipeline works as follows:

1. **CSV Upload:** Admin uploads a CSV with recipient details (name, email, course, date)
2. **Validation:** Each row is validated against the template schema
3. **Queue Processing:** Certificates are added to a processing queue to prevent memory overflow
4. **PDF Generation:** Each certificate is generated from an HTML template using Puppeteer
5. **QR Code Embedding:** A unique verification QR code is embedded in each certificate
6. **Storage:** Generated PDFs are stored with metadata saved to MongoDB

\`\`\`javascript
async function generateBatch(recipients, templateId) {
  const template = await Template.findById(templateId);
  const results = [];

  for (const recipient of recipients) {
    const certId = generateUniqueId();
    const qrCode = await QRCode.toDataURL(
      \\\`\\\${BASE_URL}/verify/\\\${certId}\\\`
    );

    const html = renderTemplate(template.html, {
      ...recipient,
      certId,
      qrCode,
      issueDate: new Date().toLocaleDateString(),
    });

    const pdf = await generatePDF(html);
    await saveCertificate(certId, pdf, recipient);
    results.push({ certId, recipient: recipient.name, status: 'generated' });
  }

  return results;
}
\`\`\`

## QR Code Verification

The verification flow is designed to be instant and trustworthy:

1. **Scan:** Anyone can scan the QR code on a certificate
2. **Lookup:** The system looks up the certificate by its unique ID
3. **Display:** Verification page shows certificate details, issue date, and validity status
4. **Audit Trail:** Every verification attempt is logged for analytics

\`\`\`javascript
app.get('/api/verify/:certId', async (req, res) => {
  const certificate = await Certificate.findOne({
    certId: req.params.certId
  });

  if (!certificate) {
    return res.status(404).json({ verified: false, message: 'Not found' });
  }

  // Log the verification attempt
  await VerificationLog.create({
    certId: certificate.certId,
    verifiedAt: new Date(),
    ip: req.ip,
  });

  res.json({
    verified: true,
    certificate: {
      recipient: certificate.recipientName,
      course: certificate.courseName,
      issueDate: certificate.issueDate,
      issuer: certificate.issuerOrganization,
    },
  });
});
\`\`\`

## Performance Optimizations

Processing 1000+ certificates requires careful optimization:

- **Stream processing:** Generate PDFs one at a time instead of loading all into memory
- **Template caching:** Cache compiled HTML templates to avoid re-parsing
- **Connection pooling:** Reuse Puppeteer browser instances across generations
- **Batch database writes:** Use MongoDB bulk operations for inserting certificate records
- **Progress tracking:** WebSocket-based progress updates for the admin dashboard

## Results

The system achieved:
- **90% reduction** in manual certificate generation effort
- **Support for 1000+** certificates per batch
- **Sub-second** QR code verification
- **Zero** duplicate certificates through unique ID generation

## Conclusion

Building a certificate automation system taught me valuable lessons about batch processing, PDF generation at scale, and designing for verification trust. The key takeaway is that thoughtful architecture upfront - separation of concerns, queue-based processing, and proper access control - pays dividends as the system scales.`,
  },
  {
    slug: "mongodb-schema-design-scalability",
    title: "MongoDB Schema Design for Scalability",
    description:
      "Patterns and anti-patterns for designing MongoDB schemas that scale gracefully from prototype to production workloads.",
    date: "Oct 2025",
    readTime: "9 min read",
    tags: ["MongoDB", "Database", "Architecture"],
    content: `## Introduction

MongoDB's flexible schema is both its greatest strength and its biggest trap. Without thoughtful design, you can end up with schemas that work fine with 100 documents but grind to a halt at 100,000. In this article, we'll explore proven patterns for designing MongoDB schemas that scale.

## The Embedding vs. Referencing Decision

The most fundamental decision in MongoDB schema design is whether to embed related data or reference it. Here's a framework for deciding:

**Embed when:**
- The related data is always accessed together with the parent
- The related data set is bounded (won't grow indefinitely)
- The data has a clear "belongs to" relationship
- You need atomic updates on the parent and child together

**Reference when:**
- The related data is accessed independently
- The related data set can grow unboundedly
- Many-to-many relationships exist
- The document would exceed the 16MB size limit

## Pattern 1: Subset Pattern

Store frequently accessed data in the main document and move less-used data to a separate collection:

\`\`\`javascript
// Product document - main collection
{
  _id: ObjectId("..."),
  name: "Wireless Headphones",
  price: 79.99,
  rating: 4.5,
  // Only store the 10 most recent reviews
  recentReviews: [
    { user: "Alice", rating: 5, text: "Great sound!", date: "2025-10-01" },
    { user: "Bob", rating: 4, text: "Good value", date: "2025-09-28" },
    // ... up to 10 reviews
  ],
  totalReviews: 342,
}

// Full reviews collection
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  user: "Alice",
  rating: 5,
  text: "Great sound quality, comfortable for long use.",
  date: "2025-10-01",
}
\`\`\`

This way, product listing pages load fast (only 10 reviews embedded), while the full review list is available when needed.

## Pattern 2: Bucket Pattern

Instead of one document per data point, group related data into "buckets":

\`\`\`javascript
// Instead of one document per sensor reading (millions of documents)
// Group readings into hourly buckets
{
  sensorId: "temp-001",
  date: ISODate("2025-10-15"),
  hour: 14,
  readings: [
    { time: "14:00:00", value: 22.5 },
    { time: "14:01:00", value: 22.6 },
    { time: "14:02:00", value: 22.4 },
    // ... 60 readings per bucket
  ],
  stats: {
    min: 22.1,
    max: 23.2,
    avg: 22.5,
    count: 60,
  }
}
\`\`\`

This reduces document count by 60x and makes range queries much faster.

## Pattern 3: Computed Pattern

Pre-compute expensive calculations and store them alongside the source data:

\`\`\`javascript
{
  _id: ObjectId("..."),
  name: "JavaScript Course",
  enrollments: 1523,
  completions: 891,
  // Pre-computed fields updated on write
  completionRate: 58.5,
  avgRating: 4.3,
  totalRevenue: 45690,
  lastEnrollmentDate: ISODate("2025-10-15"),
}
\`\`\`

Update computed fields when source data changes rather than calculating them on every read.

## Indexing Strategy

Good indexes are essential for performance at scale:

\`\`\`javascript
// Compound index for common query patterns
db.orders.createIndex({ userId: 1, createdAt: -1 });

// Partial index - only index active records
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { status: "active" } }
);

// Text index for search
db.products.createIndex({ name: "text", description: "text" });
\`\`\`

**Index rules of thumb:**
- Index fields used in queries, sorts, and aggregations
- Put high-cardinality fields first in compound indexes
- Use partial indexes to reduce index size
- Monitor index usage with \`db.collection.aggregate([{$indexStats:{}}])\`

## Anti-Patterns to Avoid

1. **Unbounded arrays:** Never embed arrays that can grow without limit. They cause document growth, replication issues, and eventual hitting of the 16MB limit.

2. **Massive documents:** If your documents regularly exceed 1MB, you need to refactor. Large documents increase network transfer and memory usage.

3. **Unnecessary normalization:** Don't treat MongoDB like a relational database. Over-normalizing leads to excessive \`$lookup\` operations.

4. **Missing indexes:** Every query that scans all documents (COLLSCAN) is a performance problem waiting to happen.

5. **Using ObjectId for everything:** If you have a natural unique identifier (email, SKU, etc.), consider using it as \`_id\` to save an index.

## Conclusion

MongoDB schema design is an art that requires understanding your data access patterns upfront. The patterns covered here - Subset, Bucket, and Computed - address the most common scalability challenges. Start with your queries, design your schema to serve them efficiently, and add indexes strategically. Your future self (and your database) will thank you.`,
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug)
}
