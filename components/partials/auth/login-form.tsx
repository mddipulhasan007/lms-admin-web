"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const LoginForm = () => {
  const router = useRouter();
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [isPending, startTransition] = React.useTransition();
  const [otpValues, setOtpValues] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Request OTP
  const requestOtp = async (email: string) => {
    const res = await fetch(`${apiBaseUrl}/api/v1/auth/login/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include", // ✅ allow session cookie
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send OTP");
    return data;
  };

  // Verify OTP
  const verifyOtp = async (otp: string) => {
    const email = localStorage.getItem("loginEmail");
    if (!email) throw new Error("Email not found. Please login again.");

    const res = await fetch(`${apiBaseUrl}/api/v1/auth/login/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include", // ✅ session cookie set here
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "OTP verification failed");
    return data;
  };

  // Submit email → send OTP
  const onSubmit = async (formData: any) => {
    startTransition(async () => {
      try {
        const res = await requestOtp(formData.email);
        toast.success(res.message || "OTP sent successfully");
        setStep("otp");
        localStorage.setItem("loginEmail", formData.email);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      }
    });
  };

  // Verify OTP → login
  // Verify OTP → login
  const handleVerifyOtp = () => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    startTransition(async () => {
      try {
        const res = await verifyOtp(otp); // your API call
        toast.success(res.message || "Login successful");

        // ✅ Save token in localStorage
        localStorage.setItem("access_token", res.access_token);

        // ✅ Save token in cookie so middleware can read it
        document.cookie = `access_token=${res.access_token}; path=/; secure; samesite=strict`;

        // 🚀 Redirect to the dashboard
        router.push("/en/dashboard/dash-ecom");
      } catch (err: any) {
        toast.error(err.message || "OTP verification failed");
      }
    });
  };

  // OTP input handling
  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Reset email
  const handleChangeEmail = () => {
    localStorage.removeItem("loginEmail");
    setStep("email");
    setOtpValues(["", "", "", "", "", ""]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      {step === "email" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              placeholder="example@gmail.com"
              disabled={isPending}
              className={cn({ "border-destructive": errors.email })}
            />
            {errors.email && (
              <p className="text-destructive mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending OTP..." : "Send OTP"}
          </Button>
        </>
      )}

      {step === "otp" && (
        <>
          <div className="space-y-2">
            <Label>Enter OTP</Label>
            <div className="flex gap-2">
              {otpValues.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center text-lg"
                />
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={handleVerifyOtp}
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="flex justify-between mt-2">
            <button
              type="button"
              onClick={handleChangeEmail}
              className="text-sm text-blue-500 underline"
            >
              Change Email
            </button>

            <button
              type="button"
              onClick={() =>
                onSubmit({ email: localStorage.getItem("loginEmail") || "" })
              }
              className="text-sm text-default-800"
            >
              Resend OTP
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;
