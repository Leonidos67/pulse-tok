import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<string>("Обработка авторизации...");

  useEffect(() => {
    // Get the authorization code from URL
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      // Redirect to login with error
      toast({
        title: "Ошибка авторизации",
        description: errorDescription || error,
        variant: "destructive",
      });
      navigate(`/login?error=${encodeURIComponent(errorDescription || error)}`, { replace: true });
      return;
    }

    if (code && state) {
      setStatus("Обмен кода на токен...");
      
      // Send code and state to server for token exchange
      fetch("/api/tiktok/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code, state }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to exchange token");
          }
          return response.json();
        })
        .then((data) => {
          // Store tokens temporarily and redirect to success page
          const successUrl = new URL("/auth/success", window.location.origin);
          successUrl.searchParams.set("access_token", data.access_token || "");
          if (data.refresh_token) {
            successUrl.searchParams.set("refresh_token", data.refresh_token);
          }
          if (data.expires_in) {
            successUrl.searchParams.set("expires_in", data.expires_in);
          }
          if (data.scope) {
            successUrl.searchParams.set("scope", data.scope);
          }
          
          navigate(successUrl.pathname + successUrl.search, { replace: true });
        })
        .catch((error) => {
          console.error("Callback error:", error);
          toast({
            title: "Ошибка",
            description: error.message || "Не удалось завершить авторизацию",
            variant: "destructive",
          });
          navigate("/login?error=token_exchange_failed", { replace: true });
        });
    } else {
      // Missing required parameters
      toast({
        title: "Ошибка",
        description: "Отсутствуют необходимые параметры авторизации",
        variant: "destructive",
      });
      navigate("/login?error=missing_parameters", { replace: true });
    }
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="p-8 shadow-card">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">{status}</p>
        </div>
      </Card>
    </div>
  );
};

export default AuthCallback;

