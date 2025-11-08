import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Music, Bell, Moon, Globe, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Настройки</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
        {/* Account Section */}
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-2xl font-semibold">Аккаунт</h2>
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-primary" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">@username</h3>
                <p className="text-muted-foreground">124.5K подписчиков</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Pro</Badge>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">TikTok подключение</p>
                    <p className="text-sm text-muted-foreground">Подключено</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Изменить</Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Настройки</h2>
          <Card className="p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Уведомления</p>
                  <p className="text-sm text-muted-foreground">Получать обновления статистики</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Тёмная тема</p>
                  <p className="text-sm text-muted-foreground">Автоматически по системе</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Язык</p>
                  <p className="text-sm text-muted-foreground">Русский</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Изменить</Button>
            </div>
          </Card>
        </div>

        {/* Subscription Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Подписка</h2>
          <Card className="p-6 shadow-card">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-1">PulseTok Pro</h3>
                <p className="text-muted-foreground">Активна до 15 февраля 2024</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Активна</Badge>
            </div>

            <div className="space-y-3 p-4 rounded-lg bg-muted/50 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Безлимитная статистика</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>AI-инсайты без ограничений</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Экспорт отчётов в HD</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">Управление подпиской</Button>
          </Card>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Опасная зона</h2>
          <Card className="p-6 shadow-card space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Выйти из аккаунта
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              Удалить аккаунт
            </Button>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pt-8">
          <p>PulseTok v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
