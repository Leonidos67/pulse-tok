import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Sparkles, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Рост в реальном времени",
      description: "Следите за ростом подписчиков и просмотров каждый день"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Детальная аналитика",
      description: "Узнайте какие видео работают лучше всего и почему"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-инсайты",
      description: "Получайте персональные советы по улучшению контента"
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Красивые отчёты",
      description: "Создавайте стильные карточки для ваших соцсетей"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary" />
            <span className="text-xl font-bold">PulseTok</span>
          </div>
          <Link to="/login">
            <Button variant="ghost">Войти</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block">
            <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Ваша TikTok аналитика
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Превратите данные
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              в инсайты
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PulseTok показывает вашу TikTok статистику в красивом и понятном виде. 
            Узнайте что работает, получите AI-советы и делитесь результатами.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link to="/login">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg h-12 px-8">
                Подключить TikTok
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg h-12 px-8">
              Посмотреть пример
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border shadow-card card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-primary text-white">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-lg mb-8 opacity-90">
            Подключите свой TikTok аккаунт за 2 минуты и получите полную картину вашего роста
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg h-12 px-8">
              Начать бесплатно
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 PulseTok. Сделано с любовью к контенту.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
