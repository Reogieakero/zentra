import type { ApiResponse } from "@/types/api";

export async function principalLogin(email: string, password: string): Promise<ApiResponse> {
  const res = await fetch("/api/principal-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function principalLogout(): Promise<void> {
  await fetch("/api/principal-logout", { method: "POST" });
}

export async function staffLogin(email: string, password: string): Promise<ApiResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
