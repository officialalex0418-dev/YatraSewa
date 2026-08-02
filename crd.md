# Core Requirements Document (CRD)

## Functional Requirements

### 1. Authentication & RBAC
- Multi-role support: Super Admin, Company, Manager, Counter Staff, Driver, Conductor, Customer.
- JWT-based session management with HttpOnly cookies.
- Secure registration for customers and company approval flow for admins.

### 2. Booking System
- Real-time search for buses between locations.
- Interactive seat selection (limit 4 seats per booking).
- Simulation of secure payment gateways (eSewa, Khalti).
- Instant booking confirmation and ticket generation.

### 3. Loyalty & Wallet
- **Yatra Points**: 10% cashback on all bookings.
- **Yatra Wallet**: Store balance and transaction history.
- Point redemption logic for discounts.

### 4. Management Dashboards
- **Super Admin**: Platform oversight, user management, and revenue analytics.
- **Company**: Fleet management (Bus/Route/Trip creation).
- **Customer**: Booking history and reward tracking.

## Non-Functional Requirements
- **Scalability**: Designed to handle high concurrent seat selection requests.
- **Security**: Password hashing, input validation, and secure session handling.
- **Performance**: SSR/ISR utilization in Next.js for fast page loads.
- **UI/UX**: Premium, minimal design language (Stripe/Linear inspired).
