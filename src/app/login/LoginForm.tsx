"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      toast.success(`Welcome back, ${result.name}!`);
      
      let target = "/dashboard";
      if (result.role === 'admin') {
        target = "/dashboard/admin";
      } else if (result.role === 'company') {
        target = "/dashboard/company/fleet";
      }
      
      // Perform a hard redirect to ensure cookies are sent and middleware picks them up
      window.location.href = target;
    } catch (err: any) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Bus className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold">YatraSewa</h1>
          <p className="text-gray-500">Welcome back! Please login to your account</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input type="email" {...register("email")} placeholder="john@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">Password</label>
                  <Link href="/forgot-password" className="text-xs text-purple-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input type="password" {...register("password")} placeholder="••••••••" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
              </div>
              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">Don't have an account? </span>
              <Link href="/register" className="text-purple-600 font-semibold hover:underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
