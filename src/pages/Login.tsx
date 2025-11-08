import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Loader2, Globe } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [isLoadingIp, setIsLoadingIp] = useState(false);
  const { toast } = useToast();

  // Check for error from OAuth callback
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast({
        title: "Ошибка авторизации",
        description: error,
        variant: "destructive",
      });
      // Clean URL
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, toast]);

  // Load IP address on mount
  useEffect(() => {
    const fetchIp = async () => {
      setIsLoadingIp(true);
      try {
        // Try external service first
        const response = await fetch("/api/ip/external");
        if (response.ok) {
          const data = await response.json();
          setIpAddress(data.ip);
        } else {
          // Fallback to server IP
          const fallbackResponse = await fetch("/api/ip");
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setIpAddress(fallbackData.ip);
          }
        }
      } catch (error) {
        console.error("Error fetching IP:", error);
      } finally {
        setIsLoadingIp(false);
      }
    };

    fetchIp();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Initiate OAuth flow by getting authorization URL from server
      const response = await fetch("/api/tiktok/oauth");
      
      if (!response.ok) {
        throw new Error("Failed to initiate OAuth flow");
      }

      const data = await response.json();
      
      // Redirect to TikTok authorization page
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (error) {
      console.error("OAuth initiation error:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось начать процесс авторизации. Попробуйте еще раз.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Music className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Добро пожаловать</h1>
          <p className="text-muted-foreground">
            Подключите TikTok чтобы начать анализ
          </p>
        </div>

        <Card className="p-8 shadow-card">
          <div className="space-y-6">
            {/* IP Address Display */}
            {ipAddress && (
              <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Ваш IP: <span className="font-mono font-medium text-foreground">{ipAddress}</span>
                </span>
              </div>
            )}

            {isLoadingIp && (
              <div className="flex items-center justify-center gap-2 p-3 bg-muted rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Загрузка IP адреса...</span>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 h-12"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Перенаправление...
                </>
              ) : (
                <>
                  <Music className="mr-2 h-5 w-5" />
                  Войти через TikTok
                </>
              )}
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              Нажимая продолжить, вы соглашаетесь с{" "}
              <a href="#" className="underline hover:text-foreground">
                условиями использования
              </a>{" "}
              и{" "}
              <a href="#" className="underline hover:text-foreground">
                политикой конфиденциальности
              </a>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
