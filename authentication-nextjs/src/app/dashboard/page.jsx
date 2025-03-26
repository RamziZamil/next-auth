"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 space-y-6 transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 inline-block p-4 rounded-full mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            You're securely logged in
          </p>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Authentication Status
            </h2>
            <p className="text-green-600 font-medium">Active Session</p>
          </div>
          <div className="bg-green-500 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-md flex items-center justify-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
