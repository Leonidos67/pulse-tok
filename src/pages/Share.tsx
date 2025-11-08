import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Download, Share2, TrendingUp, Users, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Share = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
              <span className="text-xl font-bold">PulseTok</span>
            </Link>
            <nav className="hidden md:flex gap-1">
              <Link to="/dashboard">
                <Button variant="ghost">Главная</Button>
              </Link>
              <Link to="/analytics">
                <Button variant="ghost">Статистика</Button>
              </Link>
              <Link to="/insights">
                <Button variant="ghost">Инсайты</Button>
              </Link>
              <Link to="/share">
                <Button variant="ghost" className="font-medium">Отчёты</Button>
              </Link>
            </nav>
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold">Мой отчёт</h1>
          <p className="text-muted-foreground text-lg">Создайте стильную карточку с вашими результатами</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Report Preview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Предпросмотр</h2>
            <Card className="p-8 bg-gradient-primary text-white shadow-hover animate-slide-up overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-24 -translate-x-24" />
              
              <div className="relative space-y-8">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-white/20" />
                    <span className="font-bold text-lg">PulseTok</span>
                  </div>
                  <h3 className="text-3xl font-bold">Мой месяц в TikTok</h3>
                  <p className="opacity-90">Январь 2024</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-90">
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Подписчики</span>
                    </div>
                    <p className="text-4xl font-bold">124.5K</p>
                    <p className="text-sm opacity-90">+12.3K за месяц</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-90">
                      <Eye className="h-5 w-5" />
                      <span className="text-sm">Просмотры</span>
                    </div>
                    <p className="text-4xl font-bold">2.4M</p>
                    <p className="text-sm opacity-90">+465K за месяц</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-90">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm">Лайки</span>
                    </div>
                    <p className="text-4xl font-bold">156K</p>
                    <p className="text-sm opacity-90">+24.5K за месяц</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-90">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm">Вовлечённость</span>
                    </div>
                    <p className="text-4xl font-bold">6.8%</p>
                    <p className="text-sm opacity-90">+2.4% за месяц</p>
                  </div>
                </div>

                {/* Top Achievement */}
                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                  <p className="text-sm opacity-90 mb-1">Топ достижение</p>
                  <p className="font-semibold">Видео "Летний влог 2024" набрало 1.2M просмотров! 🎉</p>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm opacity-75">@username</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Настройки</h2>

            <Card className="p-6 shadow-card space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Период</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="w-full">Неделя</Button>
                  <Button variant="default" className="w-full bg-gradient-primary">Месяц</Button>
                  <Button variant="outline" className="w-full">Год</Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Стиль</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border-2 border-primary rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="aspect-square bg-gradient-primary rounded mb-2" />
                    <p className="text-sm font-medium text-center">Градиент</p>
                  </div>
                  <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="aspect-square bg-foreground rounded mb-2" />
                    <p className="text-sm font-medium text-center">Минимализм</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Формат</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full">Квадрат</Button>
                  <Button variant="default" className="w-full">Сторис</Button>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1 bg-gradient-primary hover:opacity-90">
                <Download className="mr-2 h-5 w-5" />
                Скачать
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Share2 className="mr-2 h-5 w-5" />
                Поделиться
              </Button>
            </div>

            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                💡 Совет: Поделитесь отчётом в сторис TikTok или Instagram, чтобы показать вашей аудитории, как вы растёте!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
