import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Play, Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const topVideos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop",
      title: "Летний влог 2024",
      views: "1.2M",
      likes: "89K",
      comments: "2.1K",
      shares: "3.4K",
      date: "2 дня назад"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=600&fit=crop",
      title: "Рецепт идеального утра",
      views: "890K",
      likes: "67K",
      comments: "1.8K",
      shares: "2.1K",
      date: "5 дней назад"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=600&fit=crop",
      title: "Танец челлендж",
      views: "765K",
      likes: "54K",
      comments: "1.2K",
      shares: "1.8K",
      date: "1 неделю назад"
    }
  ];

  const popularHashtags = [
    { tag: "#fyp", count: "45" },
    { tag: "#viral", count: "38" },
    { tag: "#trending", count: "32" },
    { tag: "#lifestyle", count: "28" },
    { tag: "#summer", count: "24" }
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
                <Button variant="ghost" className="font-medium">Статистика</Button>
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
        {/* Page Header */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold">Детальная статистика</h1>
          <p className="text-muted-foreground text-lg">Всё о ваших видео и аудитории</p>
        </div>

        {/* Top Videos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Топ видео</h2>
            <Button variant="outline" size="sm">Последние 30 дней</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVideos.map((video, index) => (
              <Card 
                key={video.id} 
                className="overflow-hidden shadow-card card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[9/16] relative bg-muted">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm opacity-90">{video.date}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{video.views}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{video.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{video.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{video.shares}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Hashtags & Audience */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Popular Hashtags */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4">Популярные хэштеги</h2>
            <div className="space-y-3">
              {popularHashtags.map((hashtag, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-primary">{hashtag.tag}</span>
                  <Badge variant="secondary">{hashtag.count} видео</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Audience Insights */}
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-4">Ваша аудитория</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">18-24 года</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: '45%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">25-34 года</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: '35%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">35+ лет</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: '20%' }} />
                </div>
              </div>

              <div className="pt-4 border-t border-border mt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-sm text-muted-foreground">Женщины</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">32%</p>
                    <p className="text-sm text-muted-foreground">Мужчины</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
