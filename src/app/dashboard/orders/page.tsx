"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";

export default function DashboardPage() {
  const router = useRouter();

  const [orderNumber, setOrderNumber] = useState("");
  const [showQR, setShowQR] = useState(false);

  const createOrder = async () => {
    if (!orderNumber) return;

    const user = auth.currentUser;

    if (!user) {
      alert("يجب تسجيل الدخول أولاً");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        restaurantId: user.uid,
        orderNumber,
        status: "يتم التحضير",
        createdAt: new Date(),
      });

      setShowQR(true);
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إنشاء الطلب");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (showQR) {
    return (
      <main
        className="min-h-screen bg-white flex flex-col items-center justify-center cursor-pointer"
        onClick={() => {
          setShowQR(false);
          setOrderNumber("");
        }}
      >
        <h1 className="text-4xl font-bold mb-8">
          طلب #{orderNumber}
        </h1>

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <QRCode
            value={`http://localhost:3000/order/${orderNumber}`}
            size={260}
          />
        </div>

        <p className="mt-8 text-slate-500 text-lg">
          اطلب من العميل تصوير الكود
        </p>

        <p className="mt-2 text-sm text-slate-400">
          اضغط في أي مكان للمتابعة
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold text-slate-800">
            Nedaa Orders
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            خروج
          </button>

        </div>

        <p className="text-center text-slate-500 mt-3">
          إنشاء طلب جديد
        </p>

        <input
          type="number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="رقم الطلب"
          className="w-full mt-8 border rounded-xl p-4 text-center text-xl"
        />

        <button
          onClick={createOrder}
          className="w-full mt-5 bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl text-lg"
        >
          إنشاء الطلب
        </button>

      </div>

    </main>
  );
}