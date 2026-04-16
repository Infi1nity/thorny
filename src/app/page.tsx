import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  GraduationCap,
  TrendingUp,
  Zap,
  BookOpen,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Chat",
      description:
        "Practice English with an intelligent AI that adapts to your level and helps you improve.",
    },
    {
      icon: GraduationCap,
      title: "Smart Flashcards",
      description:
        "Create and review flashcards with spaced repetition to memorize vocabulary effectively.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with detailed stats, streaks, and personalized insights.",
    },
    {
      icon: Zap,
      title: "Instant Corrections",
      description:
        "Get real-time grammar and pronunciation feedback to accelerate your learning.",
    },
  ];

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Powered by OpenRouter AI</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up stagger-1 opacity-0">
              Master English with{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Learning
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-zinc-400 animate-slide-up stagger-2 opacity-0">
              Thorny is your personal English tutor. Practice conversations, learn new words,
              and track your progress — all in one beautiful app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-slide-up stagger-3 opacity-0">
              <Link href="/auth/signin">
                <Button size="lg" className="gap-2 text-base">
                  Start Learning Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="text-base">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-emerald-400">succeed</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with proven learning methods
              to help you achieve fluency faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className={`group border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all duration-300 hover:border-emerald-500/30 stagger-${index + 1} opacity-0 animate-slide-up`}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-zinc-400">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-zinc-900">
            <CardContent className="p-8 md:p-12 text-center">
              <BookOpen className="h-12 w-12 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to start your journey?
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of learners who are already improving their English with
                Thorny. It's free to get started.
              </p>
              <Link href="/auth/signin">
                <Button size="lg" className="gap-2 text-base">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-emerald-500" />
            <span className="font-semibold">Thorny</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Thorny. Built with Next.js & AI.
          </p>
        </div>
      </footer>
    </div>
  );
}