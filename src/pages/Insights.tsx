import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Sparkles, TrendingUp, Clock, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Insights = () => {
  const insights = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      category: "Рост аудитории",
      title: "Ваши подписчики растут быстрее в выходные",
      description: "Постинг в субботу и воскресенье приносит на 34% больше новых подписчиков. Попробуйте публиковать больше контента в эти дни.",
      priority: "high",
      actionable: true
    },
    {
      icon: <Clock className="h-6 w-6" />,
      category: "Время публикаций",
      title: "Лучшее время для постинга: 18:00-21:00",
      description: "Ваша аудитория наиболее активна вечером. Видео, опубликованные в это время, получают на 45% больше просмотров в первый час.",
      priority: "high",
      actionable: true
    },
    {
      icon: <Target className="h-6 w-6" />,
      category: "Контент",
      title: "Короткие видео работают лучше",
      description: "Ваши видео длиной 15-30 секунд имеют на 28% больше досмотров до конца. Попробуйте делать более динамичный и короткий контент.",
      priority: "medium",
      actionable: true
    },
    {
      icon: <Zap className="h-6 w-6" />,
      category: "Вовлечённость",
      title: "Используйте больше вопросов в описаниях",
      description: "Посты с вопросами получают на 52% больше комментариев. Это помогает алгоритму показывать ваш контент большему количеству людей.",
      priority: "medium",
      actionable: true
    }
  ];

  const recommendations = [
    {
      title: "Добавьте серию постов",
      description: "Создайте серию связанных видео — это увеличит время просмотра вашего профиля",
      impact: "+25% время на профиле"
    },
    {
      title: "Экспериментируйте с трендами",
      description: "Попробуйте участвовать в актуальных челленджах и использовать трендовую музыку",
      impact: "+40% охват"
    },
    {
      title: "Взаимодействуйте с комментариями",
      description: "Отвечайте на комментарии в первые 2 часа после публикации",
      impact: "+30% вовлечённость"
    }
  ];

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
                <Button variant="ghost" className="font-medium">Инсайты</Button>
              </Link>
              <Link to="/share">
                <Button variant="ghost">Отчёты</Button>
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
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">AI-инсайты</h1>
              <p className="text-muted-foreground text-lg">Персональные советы на основе вашей статистики</p>
            </div>
          </div>
        </div>

        {/* Main Insights */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Главные инсайты</h2>
          <div className="grid gap-6">
            {insights.map((insight, index) => (
              <Card 
                key={index}
                className="p-6 shadow-card card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    insight.priority === 'high' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {insight.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <Badge variant="secondary" className="mb-2">
                          {insight.category}
                        </Badge>
                        <h3 className="text-xl font-semibold">{insight.title}</h3>
                      </div>
                      {insight.priority === 'high' && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          Приоритет
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                    {insight.actionable && (
                      <Button variant="outline" size="sm" className="mt-2">
                        Применить совет
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Рекомендации для роста</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Card 
                key={index}
                className="p-6 shadow-card card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {rec.impact}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-8 bg-gradient-primary text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Хотите ещё больше инсайтов?</h3>
              <p className="opacity-90">Подключите Pro-версию для получения детального AI-анализа каждого видео</p>
            </div>
            <Button size="lg" variant="secondary" className="whitespace-nowrap">
              Узнать больше
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
