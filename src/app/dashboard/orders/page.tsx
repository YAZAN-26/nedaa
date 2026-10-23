"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const querySnapshot = await getDocs(
      collection(db, "orders")
    );

    const data: Order[] = [];

    querySnapshot.forEach((document) => {
      data.push({
        id: document.id,
        ...document.data(),
      } as Order);
    });

    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (
    id: string,
    currentStatus: string
  ) => {
    if (currentStatus === "يتم التحضير") {
      await updateDoc(doc(db, "orders", id), {
        status: "جاهز للاستلام",
      });
    } else {
      await deleteDoc(doc(db, "orders", id));
    }

    loadOrders();
  };

  const cancelOrder = async (id: string) => {
    const confirmDelete = confirm(
      "هل تريد إلغاء الطلب؟"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "orders", id));

    loadOrders();
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          إدارة الطلبات
        </h1>

        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">
                  #{order.orderNumber}
                </h2>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    changeStatus(
                      order.id,
                      order.status
                    )
                  }
                  className={`px-4 py-3 rounded-xl text-white ${
                    order.status === "يتم التحضير"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {order.status}
                </button>

                <button
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                  className="bg-red-500 text-white px-4 py-3 rounded-xl"
                >
                  إلغاء
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}