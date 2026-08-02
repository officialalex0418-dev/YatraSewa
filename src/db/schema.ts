import { pgTable, text, timestamp, uuid, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "company", "manager", "counter", "driver", "conductor", "customer"] }).notNull().default("customer"),
  phone: text("phone"),
  avatar: text("avatar"),
  membership: text("membership", { enum: ["silver", "gold", "platinum", "diamond"] }).notNull().default("silver"),
  yatraPoints: integer("yatra_points").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id").references(() => users.id),
  logo: text("logo"),
  contactDetails: jsonb("contact_details"),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const buses = pgTable("buses", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // AC, Non-AC, Deluxe
  capacity: integer("capacity").notNull(),
  registrationNumber: text("registration_number").notNull().unique(),
  amenities: jsonb("amenities"), // WiFi, Charging, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const routes = pgTable("routes", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id").references(() => companies.id),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  distance: decimal("distance"),
  estimatedDuration: text("estimated_duration"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  busId: uuid("bus_id").references(() => buses.id),
  routeId: uuid("route_id").references(() => routes.id),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  price: decimal("price").notNull(),
  status: text("status", { enum: ["scheduled", "ongoing", "completed", "cancelled"] }).default("scheduled"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  tripId: uuid("trip_id").references(() => trips.id),
  seatNumbers: text("seat_numbers").notNull(), // Comma separated or JSON
  totalAmount: decimal("total_amount").notNull(),
  paymentStatus: text("payment_status", { enum: ["pending", "paid", "failed"] }).default("pending"),
  bookingStatus: text("booking_status", { enum: ["confirmed", "cancelled", "completed"] }).default("confirmed"),
  qrCode: text("qr_code"),
  pdfUrl: text("pdf_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const wallets = pgTable("wallets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).unique(),
  balance: decimal("balance").default("0"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const yatraPointsTransactions = pgTable("yatra_points_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  bookingId: uuid("booking_id").references(() => bookings.id),
  points: integer("points").notNull(),
  type: text("type", { enum: ["earned", "redeemed"] }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const coupons = pgTable("coupons", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  discountType: text("discount_type", { enum: ["percentage", "fixed"] }).notNull(),
  discountValue: decimal("discount_value").notNull(),
  expiryDate: timestamp("expiry_date"),
  isActive: boolean("is_active").default(true),
  companyId: uuid("company_id").references(() => companies.id), // Null for admin coupons
  createdAt: timestamp("created_at").defaultNow(),
});
