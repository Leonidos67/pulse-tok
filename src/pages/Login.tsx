import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login - в реальном приложении здесь будет OAuth
    navigate("/dashboard");
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
            <Button 
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 h-12"
              onClick={handleLogin}
            >
              <Music className="mr-2 h-5 w-5" />
              Войти через TikTok
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
