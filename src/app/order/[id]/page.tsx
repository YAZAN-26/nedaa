"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrderPage() {
  const params = useParams();

  const orderId = params.id as string;

  const [status, setStatus] = useState("جاري التحميل...");
  const [loading, setLoading] = useState(true);

  const previousStatus = useRef("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "orders")
        );

        let found = false;

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (data.orderNumber == orderId) {
            found = true;

            if (
              previousStatus.current !== "جاهز للاستلام" &&
              data.status === "جاهز للاستلام"
            ) {
              const audio = new Audio(
                "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
              );

              audio.play().catch(() => {});
            }

            previousStatus.current = data.status;

            setStatus(data.status);
          }
        });

        if (!found) {
          setStatus("تم التسليم");
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (orderId) {
      loadOrder();

      const interval = setInterval(() => {
        loadOrder();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [orderId]);

  const getColor = () => {
    if (status === "جاهز للاستلام") {
      return "bg-green-500";
    }

    if (status === "تم التسليم") {
      return "bg-blue-500";
    }

    return "bg-yellow-500";
  };

  const getText = () => {
    if (status === "جاهز للاستلام") {
      return "طلبك جاهز للاستلام";
    }

    if (status === "تم التسليم") {
      return "تم تسليم الطلب";
    }

    return "يتم تحضير طلبك";
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">

      <div className="bg-white rounded-3xl shadow-xl p-10 text-center w-full max-w-md">

        <h1 className="text-4xl font-bold text-slate-800">
          Nedaa Orders
        </h1>

        <p className="text-slate-500 mt-3">
          تتبع حالة الطلب
        </p>

        <h2 className="text-6xl font-bold mt-10">
          #{orderId}
        </h2>

        <div className="mt-10">

          <div
            className={`w-28 h-28 rounded-full mx-auto ${getColor()}`}
          ></div>

          <div className="mt-6">

            {loading ? (
              <p>جاري التحميل...</p>
            ) : (
              <>
                <span
                  className={`inline-block px-8 py-3 rounded-xl text-white text-lg ${getColor()}`}
                >
                  {status}
                </span>

                <p className="mt-4 text-slate-600">
                  {getText()}
                </p>
              </>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}