import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, BookOpen, MessageSquare, Flame, Target, TrendingUp } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const stats = [
    { label: "Total Words", value: "127", icon: BookOpen, color: "text-emerald-400" },
    { label: "Chat Minutes", value: "342", icon: MessageSquare, color: "text-cyan-400" },
    { label: "Day Streak", value: "7", icon: Flame, color: "text-orange-400" },
    { label: "Weekly Goal", value: "85%", icon: Target, color: "text-purple-400" },
  ];

  const achievements = [
    { title: "First Word", description: "Added your first word", earned: true },
    { title: "Chatty Learner", description: "Completed 10 chat sessions", earned: true },
    { title: "Week Warrior", description: "7-day learning streak", earned: true },
    { title: "Vocabulary Master", description: "Learn 500 words", earned: false },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8 border-zinc-800 bg-zinc-900/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-24 w-24 rounded-full"
                  />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold mb-1">{session.user.name || "Learner"}</h1>
                <p className="text-zinc-400 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  {session.user.email}
                </p>
                <p className="text-zinc-500 text-sm flex items-center justify-center md:justify-start gap-2 mt-1">
                  <Calendar className="h-4 w-4" />
                  Member since {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-zinc-800 bg-zinc-900/50">
                <CardContent className="p-4 text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress & Achievements */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Learning Progress */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-zinc-400">Vocabulary</span>
                  <span className="text-sm font-medium">127/500 words</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" style={{ width: "25.4%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-zinc-400">Chat Practice</span>
                  <span className="text-sm font-medium">342/1000 min</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" style={{ width: "34.2%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-zinc-400">Weekly Goal</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    achievement.earned ? "bg-emerald-500/10" : "bg-zinc-800/30"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      achievement.earned
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    {achievement.earned ? "🏆" : "🔒"}
                  </div>
                  <div>
                    <p className={`font-medium ${achievement.earned ? "text-zinc-100" : "text-zinc-500"}`}>
                      {achievement.title}
                    </p>
                    <p className="text-xs text-zinc-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}