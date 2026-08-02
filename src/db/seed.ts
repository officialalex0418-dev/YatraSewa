import { db } from "@/db";
import { users, companies, wallets, buses, routes, trips } from "@/db/schema";
import bcrypt from "bcryptjs";

export async function seed() {
  const adminPassword = await bcrypt.hash("Laxmi@123", 10);
  const companyPassword = await bcrypt.hash("Agent@123", 10);
  const userPassword = await bcrypt.hash("User@123", 10);

  // Clear existing data (in order of dependencies)
  await db.delete(trips);
  await db.delete(routes);
  await db.delete(buses);
  await db.delete(companies);
  await db.delete(wallets);
  await db.delete(users);

  // Create Super Admin
  const [admin] = await db.insert(users).values({
    name: "Super Admin",
    email: "laxmisah988@gmail.com",
    password: adminPassword,
    role: "admin",
  }).returning();

  // Create Company Owner
  const [companyOwner] = await db.insert(users).values({
    name: "Company Agent",
    email: "agent.laxmisah988@gmail.com",
    password: companyPassword,
    role: "company",
  }).returning();

  // Create Customer
  const [customer] = await db.insert(users).values({
    name: "John Doe",
    email: "user.laxmisah988@gmail.com",
    password: userPassword,
    role: "customer",
  }).returning();

  // Create Wallet for Customer
  await db.insert(wallets).values({
    userId: customer.id,
    balance: "0",
  });

  // Create a Company
  const [yatraExpress] = await db.insert(companies).values({
    name: "Yatra Express",
    ownerId: companyOwner.id,
    status: "approved",
  }).returning();

  // Create a Bus
  const [bus] = await db.insert(buses).values({
    companyId: yatraExpress.id,
    name: "Pokhara Super Deluxe",
    type: "AC / Deluxe",
    capacity: 35,
    registrationNumber: "BA 2 PA 1234",
    amenities: ["WiFi", "Charging", "Water", "AC"],
  }).returning();

  // Create a Route
  const [route] = await db.insert(routes).values({
    companyId: yatraExpress.id,
    origin: "Kathmandu",
    destination: "Pokhara",
    distance: "200",
    estimatedDuration: "6 hours",
  }).returning();

  // Create some Trips
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(7, 0, 0, 0);

  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  dayAfter.setHours(20, 0, 0, 0);

  await db.insert(trips).values([
    {
      busId: bus.id,
      routeId: route.id,
      departureTime: tomorrow,
      arrivalTime: new Date(tomorrow.getTime() + 6 * 60 * 60 * 1000),
      price: "1250",
      status: "scheduled",
    },
    {
      busId: bus.id,
      routeId: route.id,
      departureTime: dayAfter,
      arrivalTime: new Date(dayAfter.getTime() + 6 * 60 * 60 * 1000),
      price: "1500",
      status: "scheduled",
    },
  ]);

  console.log("Seed data created successfully");
}
