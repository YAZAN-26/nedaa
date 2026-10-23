"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "restaurants", userCredential.user.uid),
        {
          restaurantName,
          email,
          subscriptionStatus: "active",
          daysRemaining: 365,
          createdAt: new Date(),
        }
      );

      alert("تم إنشاء الحساب بنجاح ✅");

      setRestaurantName("");
      setEmail("");
      setPassword("");

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          إنشاء حساب مطعم
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Nedaa Orders
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-8 space-y-4"
        >

          <input
            type="text"
            placeholder="اسم المطعم"
            value={restaurantName}
            onChange={(e) =>
              setRestaurantName(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl"
          >
            إنشاء الحساب
          </button>

        </form>

      </div>

    </main>
  );
}