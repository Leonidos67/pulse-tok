import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Eye, Heart, BarChart3, Sparkles, Share2, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const Dashboard = () => {
  // Mock data
  const stats = [
    { label: "Подписчики", value: "124.5K", change: "+12.3%", icon: Users, trend: "up" },
    { label: "Просмотры", value: "2.4M", change: "+24.1%", icon: Eye, trend: "up" },
    { label: "Лайки", value: "156.2K", change: "+18.7%", icon: Heart, trend: "up" },
    { label: "Вовлечённость", value: "6.8%", change: "+2.4%", icon: TrendingUp, trend: "up" }
  ];

  const growthData = [
    { date: "Пн", followers: 110 },
    { date: "Вт", followers: 115 },
    { date: "Ср", followers: 112 },
    { date: "Чт", followers: 118 },
    { date: "Пт", followers: 122 },
    { date: "Сб", followers: 120 },
    { date: "Вс", followers: 124.5 }
  ];

  const engagementData = [
    { time: "0:00", value: 4.2 },
    { time: "4:00", value: 2.8 },
    { time: "8:00", value: 5.1 },
    { time: "12:00", value: 7.3 },
    { time: "16:00", value: 8.9 },
    { time: "20:00", value: 9.2 },
    { time: "24:00", value: 6.8 }
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
                <Button variant="ghost" className="font-medium">Главная</Button>
              </Link>
              <Link to="/analytics">
                <Button variant="ghost">Статистика</Button>
              </Link>
              <Link to="/insights">
                <Button variant="ghost">Инсайты</Button>
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
        {/* Profile Header */}
        <div className="flex items-center gap-4 animate-fade-in">
          <div className="h-20 w-20 rounded-2xl bg-gradient-primary" />
          <div>
            <h1 className="text-3xl font-bold">@username</h1>
            <p className="text-muted-foreground">Ваш TikTok аккаунт</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-6 shadow-card card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Рост подписчиков</h3>
                <p className="text-sm text-muted-foreground">Последние 7 дней</p>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(258 90% 58%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(258 90% 58%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="hsl(258 90% 58%)" 
                  strokeWidth={2}
                  fill="url(#colorFollowers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Engagement Chart */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Активность аудитории</h3>
                <p className="text-sm text-muted-foreground">По времени суток</p>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(258 90% 58%)" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(258 90% 58%)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/analytics">
            <Card className="p-6 shadow-card card-hover cursor-pointer">
              <BarChart3 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Детальная статистика</h3>
              <p className="text-sm text-muted-foreground">Посмотрите полную аналитику</p>
            </Card>
          </Link>

          <Link to="/insights">
            <Card className="p-6 shadow-card card-hover cursor-pointer">
              <Sparkles className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">AI-инсайты</h3>
              <p className="text-sm text-muted-foreground">Получите советы по контенту</p>
            </Card>
          </Link>

          <Link to="/share">
            <Card className="p-6 shadow-card card-hover cursor-pointer">
              <Share2 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Создать отчёт</h3>
              <p className="text-sm text-muted-foreground">Поделитесь результатами</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
