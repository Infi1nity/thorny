import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MessageSquare,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Calendar,
  Target,
  Flame,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const stats = [
    {
      label: "Words Learned",
      value: "127",
      icon: BookOpen,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Chat Minutes",
      value: "342",
      icon: MessageSquare,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Current Streak",
      value: "7 days",
      icon: Flame,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Weekly Goal",
      value: "85%",
      icon: Target,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  const features = [
    {
      title: "AI Chat",
      description: "Practice English with our AI tutor",
      icon: MessageSquare,
      href: "/chat",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      title: "Flashcards",
      description: "Review and learn new vocabulary",
      icon: GraduationCap,
      href: "/flashcards",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Progress",
      description: "View your learning statistics",
      icon: TrendingUp,
      href: "/profile",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container mx-auto max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session.user.name || "Learner"}! 👋
          </h1>
          <p className="text-zinc-400">Continue your English learning journey today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-zinc-500">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href={feature.href}>
                <Card className="group h-full border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
                      Open →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 border-zinc-800 bg-zinc-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your learning journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm">AI Chat Session</span>
                </div>
                <span className="text-sm text-zinc-500">Today, 2:30 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-amber-400" />
                  <span className="text-sm">Added 10 new words</span>
                </div>
                <span className="text-sm text-zinc-500">Yesterday</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30">
                <div className="flex items-center gap-3">
                  <Flame className="h-5 w-5 text-orange-400" />
                  <span className="text-sm">7-day streak achieved!</span>
                </div>
                <span className="text-sm text-zinc-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}