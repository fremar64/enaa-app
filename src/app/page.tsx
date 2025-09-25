import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Brain, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-learning-primary" />
            <span className="text-2xl font-bold text-gray-900">ENAA</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Tableau de bord</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="learning">Connexion</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Environnement Numérique d&apos;
            <span className="text-learning-primary">Apprentissage Adaptatif</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Une plateforme d&apos;apprentissage personnalisée pour l&apos;enseignement primaire, 
            utilisant l&apos;intelligence artificielle pour s&apos;adapter au rythme et aux besoins 
            de chaque élève.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/learn">
              <Button size="xl" variant="learning" className="text-lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Commencer l&apos;apprentissage
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="xl" variant="outline" className="text-lg">
                <Users className="mr-2 h-5 w-5" />
                Espace enseignant
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-learning-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-learning-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">IA Adaptative</h3>
            <p className="text-gray-600">
              L&apos;intelligence artificielle analyse en temps réel les patterns d&apos;apprentissage 
              et adapte automatiquement la difficulté et le type d&apos;exercices.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-learning-success/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-learning-success" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Modules Pédagogiques</h3>
            <p className="text-gray-600">
              Structures additives, multiplication et division conçues selon les 
              programmes officiels du Cycle 2 (CP, CE1, CE2).
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-learning-warning/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-learning-warning" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Suivi Enseignant</h3>
            <p className="text-gray-600">
              Dashboard complet pour suivre les progrès, identifier les difficultés 
              et recevoir des recommandations d&apos;intervention personnalisées.
            </p>
          </div>
        </div>

        {/* MVP Modules */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Modules Disponibles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-grade-ce1 rounded-lg p-6 hover:bg-grade-ce1/5 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Structures Additives</h3>
                <span className="bg-grade-ce1 text-white px-3 py-1 rounded-full text-sm">CE1</span>
              </div>
              <p className="text-gray-600 mb-4">
                Addition et soustraction avec les trois sens : 
                transformation, composition et comparaison.
              </p>
              <Link href="/learn/structures-additives">
                <Button variant="outline" className="w-full">
                  Découvrir
                </Button>
              </Link>
            </div>

            <div className="border-2 border-grade-ce2 rounded-lg p-6 hover:bg-grade-ce2/5 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Multiplication</h3>
                <span className="bg-grade-ce2 text-white px-3 py-1 rounded-full text-sm">CE2</span>
              </div>
              <p className="text-gray-600 mb-4">
                Construction du sens de la multiplication et 
                mémorisation progressive des tables.
              </p>
              <Link href="/learn/multiplication">
                <Button variant="outline" className="w-full">
                  Découvrir
                </Button>
              </Link>
            </div>

            <div className="border-2 border-grade-ce2 rounded-lg p-6 hover:bg-grade-ce2/5 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Division</h3>
                <span className="bg-grade-ce2 text-white px-3 py-1 rounded-full text-sm">CE2</span>
              </div>
              <p className="text-gray-600 mb-4">
                Partage vs quotition, construction progressive 
                de l&apos;algorithme de division euclidienne.
              </p>
              <Link href="/learn/division">
                <Button variant="outline" className="w-full">
                  Découvrir
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <Shield className="h-12 w-12 text-learning-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Sécurité et Conformité</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ENAA respecte strictement le RGPD et les normes de sécurité des données éducatives. 
            Consentement parental, chiffrement des données et anonymisation pour la recherche 
            sont intégrés dès la conception.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-learning-primary" />
            <span className="font-semibold">ENAA</span>
          </div>
          <p className="text-sm">
            Environnement Numérique d&apos;Apprentissage Adaptatif - 
            Recherche en ingénierie cognitive des expériences d&apos;apprentissage
          </p>
        </div>
      </footer>
    </div>
  );
}