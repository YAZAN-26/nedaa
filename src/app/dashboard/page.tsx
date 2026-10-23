"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DashboardPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [showQR, setShowQR] = useState(false);

  const createOrder = async () => {
    if (!orderNumber) return;

    try {
      await addDoc(collection(db, "orders"), {
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
        <h1 className="text-4xl font-bold text-center text-slate-800">
          Nedaa Orders
        </h1>

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