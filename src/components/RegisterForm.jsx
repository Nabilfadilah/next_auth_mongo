"use client";

import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });

      const {user} = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 lg:w-5/12">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute ml-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              // stroke-width="2"
              // stroke-linecap="round"
              // stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full text-black"
              placeholder="Full Name"
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute ml-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              // stroke-width="2"
              // stroke-linecap="round"
              // stroke-linejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full text-black"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute ml-3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              // stroke-width="2"
              // stroke-linecap="round"
              // stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full text-black"
              placeholder="Password"
            />
          </div>

          <button className="bg-green-600 text-white p-2 md:p-4 font-bold cursor-pointer px-6 py-2 rounded">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 w-full p-2 md:p-4">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
