import { db } from "@/db";
import { users, wallets } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    }).returning();

    // Create wallet for customer
    await db.insert(wallets).values({
      userId: user.id,
      balance: "0",
    });

    const { password: _, ...userWithoutPassword } = user;
    await login(userWithoutPassword);

    return NextResponse.json(userWithoutPassword);
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
