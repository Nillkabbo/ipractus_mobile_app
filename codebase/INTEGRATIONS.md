# External Integrations

**Analysis Date:** 2026-02-02

## APIs & External Services

**Payment Processing:**
- Stripe - Payment processing
  - SDK: @stripe/react-stripe-js, @stripe/stripe-js
  - Purpose: Credit card payments, subscription management
  - Integration: Payment forms, checkout flows

**Mapping & Location:**
- Google Maps API - Geographic visualization
  - Client: google-map-react
  - Purpose: Team locations, event venues, user profiles
  - Integration: Map components in admin and metrics sections

**File Storage:**
- Amazon S3 - Cloud storage
  - Client: Custom S3 integration
  - Purpose: User media (photos, videos, documents)
  - Bucket: ipractus-backend
  - Region: us-east-1

**Real-time Communication:**
- Socket.io - Real-time messaging and notifications
  - Client: socket.io-client
  - Purpose: Chat functionality, live updates
  - Endpoint: Configurable via CHAT_APP_SOCKET_ENDPOINT

## Data Storage

**Databases:**
- Backend API - RESTful service at be.ipractus.com
  - Connection: HTTPS endpoints
  - Client: Custom API wrapper with axios

**File Storage:**
- Amazon S3 - Primary file storage
  - Connection: AWS SDK integration
  - Client: Direct S3 operations via signed URLs

**Caching:**
- Not explicitly detected in frontend

## Authentication & Identity

**Auth Provider:**
- Custom JWT-based authentication
  - Implementation: Custom auth service in src/services/apis/auth.js
  - Endpoints: user/authenticate, user/register, user/verify
  - Storage: JWT tokens with Redux persistence

## Monitoring & Observability

**Error Tracking:**
- Not detected in frontend

**Logs:**
- Console logging for development
- Custom error handling in superFetch

## CI/CD & Deployment

**Hosting:**
- Not detected in frontend configuration
- Backend: be.ipractus.com (implied)

**CI Pipeline:**
- Not detected in frontend configuration

## Environment Configuration

**Required env vars:**
- REACT_APP_BASE - Base application URL
- REACT_APP_API_BASE - API endpoint URL
- REACT_APP_S3AWS - S3 bucket URL
- REACT_APP_S3_ACCESS_KEY - AWS S3 access key
- REACT_APP_S3_SECRET_KEY - AWS S3 secret key
- REACT_APP_S3_BUCKET_NAME - S3 bucket name
- REACT_APP_S3_BUCKET_LOCATION - S3 region
- REACT_APP_GOOGLE_MAP_KEY - Google Maps API key

**Secrets location:**
- Environment variables
- .env.example file for reference

## Webhooks & Callbacks

**Incoming:**
- Socket.io events for real-time updates
- API endpoints for authentication and data

**Outgoing:**
- API calls to be.ipractus.com
- Socket.io emissions for messaging
- Stripe payment processing

---

*Integration audit: 2026-02-02*
```