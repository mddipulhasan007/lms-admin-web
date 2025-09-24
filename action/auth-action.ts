'use server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {signIn} from "@/lib/auth";
export const loginUser = async (data: any) => {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
};

export async function requestOtp(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include", // important for cookies
  });
  return res.json();
}

export async function verifyOtp(email: string, otp: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
    credentials: "include",
  });
  const data = await res.json();

  if (data.access_token) {
    // save token to cookie manually (if backend not setting it)
    document.cookie = `token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
  }

  return data;
}