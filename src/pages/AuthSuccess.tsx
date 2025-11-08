import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const expiresIn = searchParams.get("expires_in");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login?error=no_access_token", { replace: true });
      return;
    }

    // Store tokens first (always save tokens even if user info fails)
    localStorage.setItem("tiktok_access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("tiktok_refresh_token", refreshToken);
    }
    if (expiresIn) {
      const expiryTime = Date.now() + parseInt(expiresIn) * 1000;
      localStorage.setItem("tiktok_token_expiry", expiryTime.toString());
    }

    // Fetch user info from TikTok
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/tiktok/user-info", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          // User info fetch failed, but tokens are already stored
          console.warn("Failed to fetch user info, but tokens are saved");
          toast({
            title: "Предупреждение",
            description: "Не удалось получить информацию о пользователе, но авторизация успешна",
            variant: "default",
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Tokens are already stored, so this is not critical
        toast({
          title: "Предупреждение",
          description: "Не удалось получить информацию о пользователе, но авторизация успешна",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken, refreshToken, expiresIn, navigate, toast]);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="p-8 shadow-card max-w-md w-full">
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Загрузка информации...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-center">Успешная авторизация!</h1>
                <p className="text-muted-foreground text-center">
                  Вы успешно авторизовались через TikTok
                </p>
              </div>

              {userInfo && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {userInfo.data?.user?.display_name || "Пользователь"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @{userInfo.data?.user?.username || "unknown"}
                      </p>
                    </div>
                  </div>
                  {userInfo.data?.user?.avatar_url && (
                    <img
                      src={userInfo.data.user.avatar_url}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full mx-auto"
                    />
                  )}
                </div>
              )}

              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                Перейти в панель управления
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuthSuccess;

