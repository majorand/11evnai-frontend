"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    let result;
    if (mode === "login") {
      result = await supabase.auth.signInWithPassword({
        email,
        password
      });
    } else {
      result = await supabase.auth.signUp({
        email,
        password
      });
    }

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/chat");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto mt-16">
      <h1 className="text-3xl font-semibold text-brand mb-6 text-center">
        {mode === "login" ? "Login to 11evnai" : "Create an Account"}
      </h1>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <div className="mb-4">
        <label className="text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded mt-1"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded mt-1"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <button
        onClick={submit}
        className="w-full bg-brand text-white py-2 rounded font-semibold hover:bg-brandDark transition"
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <div className="mt-4 text-center text-gray-600">
        {mode === "login" ? (
          <p>
            New to 11evnai?{" "}
            <a href="/signup" className="text-brand font-medium hover:underline">
              Create account
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-brand font-medium hover:underline">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
