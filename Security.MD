# Security Measures (Security.MD)

## Authentication Security
- **JWT Protection**: Tokens are signed using HS256 and stored in `HttpOnly`, `SameSite=Lax` cookies to prevent XSS and CSRF.
- **Password Hashing**: All passwords are encrypted using `bcryptjs` with a salt round of 10.
- **Session Expiry**: Sessions are configured to expire after 2 hours with automatic middleware validation.

## Data Security
- **RBAC**: Middleware-level role checks prevent unauthorized access to Admin and Company routes.
- **SQL Injection**: Drizzle ORM is used for all queries, providing automatic protection against SQL injection via parameterized queries.
- **Zod Validation**: Strict schema validation on all API inputs to prevent malformed data entry.

## Infrastructure Security
- **Environment Variables**: Sensitive keys (DB URLs, JWT secrets) are kept in `.env` and never exposed to the client.
- **CORS**: Secure CORS configuration allows only trusted origins.
- **Rate Limiting**: Planned implementation to prevent brute-force attacks on login/register.
