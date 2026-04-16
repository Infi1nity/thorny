"use client";

import { useState } from "react";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Plus, RotateCw, Check, X, BookOpen } from "lucide-react";

interface Flashcard {
  id: string;
  word: string;
  translation: string;
  example?: string;
}

export default function FlashcardsPage() {
  const [session, setSession] = useState<any>(null);
  const [cards, setCards] = useState<Flashcard[]>([
    { id: "1", word: "Eloquent", translation: "Красноречивый", example: "She gave an eloquent speech." },
    { id: "2", word: "Ubiquitous", translation: "Вездесущий", example: "Smartphones have become ubiquitous." },
    { id: "3", word: "Serendipity", translation: "Счастливая случайность", example: "It was pure serendipity that we met." },
    { id: "4", word: "Ephemeral", translation: "Мимолётный", example: "Fame can be ephemeral." },
    { id: "5", word: "Pragmatic", translation: "Практичный", example: "She took a pragmatic approach to the problem." },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [newTranslation, setNewTranslation] = useState("");
  const [newExample, setNewExample] = useState("");

  // Load session
  if (typeof window !== "undefined" && !session) {
    auth().then(setSession);
  }

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const addCard = () => {
    if (!newWord.trim() || !newTranslation.trim()) return;
    
    const newCard: Flashcard = {
      id: Date.now().toString(),
      word: newWord.trim(),
      translation: newTranslation.trim(),
      example: newExample.trim() || undefined,
    };
    
    setCards([...cards, newCard]);
    setNewWord("");
    setNewTranslation("");
    setNewExample("");
    setShowAddForm(false);
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
    if (currentIndex >= cards.length - 1) {
      setCurrentIndex(Math.max(0, cards.length - 2));
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Flashcards</h1>
              <p className="text-sm text-zinc-400">Learn and review vocabulary</p>
            </div>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </div>

        {/* Add Card Form */}
        {showAddForm && (
          <Card className="mb-8 border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle>Add New Card</CardTitle>
              <CardDescription>Create a new flashcard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-1 block">Word</label>
                  <Input
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="e.g., Paradigm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-300 mb-1 block">Translation</label>
                  <Input
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    placeholder="e.g., Парадигма"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300 mb-1 block">Example Sentence (optional)</label>
                <Input
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="e.g., This represents a paradigm shift in thinking."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addCard}>Add Card</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Flashcard */}
        {cards.length > 0 ? (
          <div className="space-y-6">
            <Card 
              className="border-zinc-800 bg-zinc-900/50 cursor-pointer hover:bg-zinc-900 transition-all duration-300"
              onClick={flipCard}
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                  {!isFlipped ? (
                    <>
                      <BookOpen className="h-12 w-12 text-emerald-400 mb-4" />
                      <h2 className="text-3xl font-bold mb-2">{currentCard.word}</h2>
                      <p className="text-zinc-500">Click to see translation</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold mb-4 text-emerald-400">{currentCard.translation}</h2>
                      {currentCard.example && (
                        <p className="text-zinc-400 italic">"{currentCard.example}"</p>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={prevCard}>
                <X className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={flipCard}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteCard(currentCard.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={nextCard}>
                Next
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Progress */}
            <div className="text-center text-zinc-500">
              Card {currentIndex + 1} of {cards.length}
            </div>
          </div>
        ) : (
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No flashcards yet</h3>
              <p className="text-zinc-400 mb-4">Add your first flashcard to start learning</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Card
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}