"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("تم تسجيل الدخول ✅");

      router.push("/dashboard");

    } catch (error: any) {
      alert("بيانات الدخول غير صحيحة");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          تسجيل الدخول
        </h1>

        <form
          onSubmit={handleLogin}
          className="mt-6 space-y-4"
        >

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl"
          >
            تسجيل الدخول
          </button>

        </form>

      </div>

    </main>
  );
}