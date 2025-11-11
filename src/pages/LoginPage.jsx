import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const LoginPage = ({ onBack, onLoginSuccess }) => {
  const [currentView, setCurrentView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetMessages = () => {
    setMessage("");
    setIsError(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
      });
      setIsError(false);
      setMessage(`${response.data.message} You can now log in.`);
      setCurrentView("login");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setIsError(false);
      setMessage(response.data.message || "Login successful.");
      // Call onLoginSuccess after a short delay to show success message
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 1000);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      setIsError(false);
      setMessage(response.data.message || "OTP sent to your email.");
      setCurrentView("verify-otp");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp,
      });
      setIsError(false);
      setMessage(response.data.message || "OTP verified.");
      setCurrentView("reset-password");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        email,
        newPassword,
      });
      setIsError(false);
      setMessage(response.data.message || "Password updated.");
      setCurrentView("login");
      setEmail("");
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setOtp("");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFormHandler = () => {
    switch (currentView) {
      case "login":
        return handleLogin;
      case "signup":
        return handleSignup;
      case "forgot-password":
        return handleForgotPassword;
      case "verify-otp":
        return handleVerifyOtp;
      case "reset-password":
        return handleResetPassword;
      default:
        return handleLogin;
    }
  };

  const renderTitle = () => {
    switch (currentView) {
      case "login":
        return "Sign In";
      case "signup":
        return "Create Account";
      case "forgot-password":
        return "Forgot Password";
      case "verify-otp":
        return "Verify OTP";
      case "reset-password":
        return "Reset Password";
      default:
        return "Sign In";
    }
  };

  return (
    <section className="min-h-[calc(100vh-88px)] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6 py-10">
      <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-500 text-white p-10 flex-col justify-between">
            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-white/80">Welcome back</p>
              <h2 className="mt-6 text-4xl font-bold leading-tight">Visualize, Learn, and Master Data Structures & Algorithms</h2>
            </div>
            <ul className="space-y-4 text-white/90">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Interactive visual walkthroughs
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Personalized learning paths
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Step-by-step debugging tools
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-10">
            {onBack && (
              <button
                onClick={onBack}
                className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                &larr; Back to Home
              </button>
            )}

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{renderTitle()}</h1>
                <p className="mt-2 text-sm text-slate-500">
                  {currentView === "login"
                    ? "Welcome back! Enter your credentials to continue."
                    : currentView === "signup"
                    ? "Create your account to explore personalized visualizations."
                    : currentView === "forgot-password"
                    ? "Enter your email to receive a verification code."
                    : currentView === "verify-otp"
                    ? "Enter the 6-digit code we emailed you."
                    : "Set a new password to regain access."}
                </p>
              </div>

              {message && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm transition-colors ${
                    isError
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-emerald-200 bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {message}
                </div>
              )}

              <form className="space-y-5" onSubmit={getFormHandler()}>
                {(currentView === "login" ||
                  currentView === "signup" ||
                  currentView === "forgot-password" ||
                  currentView === "reset-password") && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                )}

                {currentView === "verify-otp" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600" htmlFor="otp">
                      Verification Code
                    </label>
                    <input
                      id="otp"
                      type="text"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="••••••"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-2xl tracking-[1em] text-center font-semibold text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200"
                    />
                  </div>
                )}

                {(currentView === "login" ||
                  currentView === "signup" ||
                  currentView === "reset-password") && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600" htmlFor="password">
                      {currentView === "reset-password" ? "New Password" : "Password"}
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      value={currentView === "reset-password" ? newPassword : password}
                      onChange={(e) =>
                        currentView === "reset-password"
                          ? setNewPassword(e.target.value)
                          : setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                )}

                {(currentView === "signup" || currentView === "reset-password") && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-600" htmlFor="confirmPassword">
                      {currentView === "reset-password" ? "Confirm New Password" : "Confirm Password"}
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      value={
                        currentView === "reset-password" ? confirmNewPassword : confirmPassword
                      }
                      onChange={(e) =>
                        currentView === "reset-password"
                          ? setConfirmNewPassword(e.target.value)
                          : setConfirmPassword(e.target.value)
                      }
                      placeholder="Re-enter your password"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Loading..." : renderTitle()}
                </button>
              </form>

              <div className="space-y-3 text-center text-sm font-medium text-slate-500">
                {currentView === "login" && (
                  <>
                    <button
                      onClick={() => setCurrentView("signup")}
                      className="block w-full rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-400 hover:text-blue-600"
                    >
                      Don't have an account? Sign Up
                    </button>
                    <button
                      onClick={() => setCurrentView("forgot-password")}
                      className="block w-full px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Forgot Password?
                    </button>
                  </>
                )}

                {currentView === "signup" && (
                  <button
                    onClick={() => setCurrentView("login")}
                    className="block w-full px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Already have an account? Sign In
                  </button>
                )}

                {currentView === "forgot-password" && (
                  <button
                    onClick={() => setCurrentView("login")}
                    className="block w-full px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Back to Login
                  </button>
                )}

                {currentView === "verify-otp" && (
                  <button
                    onClick={() => setCurrentView("forgot-password")}
                    className="block w-full px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Resend or change email
                  </button>
                )}

                {currentView === "reset-password" && (
                  <button
                    onClick={() => setCurrentView("login")}
                    className="block w-full px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Back to Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
