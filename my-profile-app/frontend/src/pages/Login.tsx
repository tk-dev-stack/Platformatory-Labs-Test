import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const auth = {
  login: (callback: () => void) => setTimeout(callback, 1000),
};

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (response: any) => {
    const user = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", response.credential);
    auth.login(() => navigate("/dashboard"));
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
    setError("Google login failed. Please try again.");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
       
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-0"></div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6">
          <div className="text-center">
            <img
              src="/src/image/svg/company_logo.svg"
              alt="Company Logo"
              className="mx-auto h-10 w-auto"
            />
            <h1 className="mt-4 text-2xl font-semibold text-gray-800">Sign In</h1>
            <p className="text-sm text-gray-500">Authenticate securely via Google</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              theme="filled_black"
              size="large"
              shape="pill"
              width="100%"
            />
          </div>

          <p className="text-center text-xs text-gray-400">
            Powered by OIDC • Secure access for trusted users only
          </p>
        </div>
      </div>
    </div>
  );
}
