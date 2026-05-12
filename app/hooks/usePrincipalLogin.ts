import { useState, FormEvent } from "react";

export function usePrincipalLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const emailInput = (document.getElementById("principal-email") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("principal-password") as HTMLInputElement).value;

    try {
      const response = await fetch("/api/principal-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      if (!response.ok && response.headers.get("content-type")?.includes("text/html")) {
        throw new Error("API route not found.");
      }

      const data = await response.json();

      if (data.success) {
        window.location.href = data.redirectTo;
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Principal login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { showPassword, setShowPassword, isLoading, error, handleSubmit };
}