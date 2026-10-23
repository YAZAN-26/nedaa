import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[420px] text-center">

        <h1 className="text-4xl font-bold text-slate-800">
          Nedaa Orders
        </h1>

        <p className="text-slate-500 mt-3">
          نظام تتبع الطلبات للمطاعم والكافيهات
        </p>

        <div className="mt-8 flex flex-col gap-4">

          <Link
            href="/login"
            className="bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="/register"
            className="bg-sky-500 text-white py-3 rounded-xl hover:bg-sky-600 transition"
          >
            إنشاء حساب
          </Link>

        </div>

      </div>

    </main>
  );
}