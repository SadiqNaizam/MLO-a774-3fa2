import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Aperture, BookOpen, Brain, HomeIcon, Share2 } from 'lucide-react'; // Using Aperture for generic App Icon

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      {/* Header Section */}
      <header className="py-4 px-6 shadow-md bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
            <Aperture className="h-7 w-7" />
            <span>Angular Animation Explorer</span>
          </Link>
          <nav className="space-x-2 sm:space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-sky-400 hover:bg-slate-700/50" asChild>
              <Link to="/">
                <HomeIcon className="mr-1 sm:mr-2 h-4 w-4" /> Home
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-sky-400 hover:bg-slate-700/50" asChild>
              <Link to="/a-p-i-browser">
                <BookOpen className="mr-1 sm:mr-2 h-4 w-4" /> API Browser
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-sky-400 hover:bg-slate-700/50" asChild>
              <Link to="/key-concepts">
                <Brain className="mr-1 sm:mr-2 h-4 w-4" /> Key Concepts
              </Link>
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-sky-400 hover:bg-slate-700/50" asChild>
              <Link to="/interactive-diagram">
                <Share2 className="mr-1 sm:mr-2 h-4 w-4" /> Diagram
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl bg-slate-800/70 border-slate-700 shadow-xl text-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
              Angular Animation Internals Explorer
            </CardTitle>
            <CardDescription className="text-lg text-slate-400">
              Dive deep into the Angular animation system. Visualize, browse, and understand its core components and functionalities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>
              Welcome! This tool is designed to help developers demystify the complexities of Angular's animation engine.
              Whether you're new to Angular animations or an experienced developer looking for a deeper understanding,
              this explorer provides an accessible way to navigate its API structure.
            </p>
            <p>
              Explore TypeScript declarations, understand relationships between different animation entities,
              and grasp key concepts through curated explanations and diagrams.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-slate-900 font-semibold w-full sm:w-auto" asChild>
              <Link to="/a-p-i-browser">
                <BookOpen className="mr-2 h-5 w-5" /> Explore the API
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-sky-500 text-sky-400 hover:bg-sky-500/10 hover:text-sky-300 w-full sm:w-auto" asChild>
              <Link to="/key-concepts">
                <Brain className="mr-2 h-5 w-5" /> Learn Key Concepts
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <section className="mt-16 w-full max-w-3xl text-center">
            <h2 className="text-2xl font-semibold text-slate-300 mb-4">What You Can Do:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-sky-400 mb-2">Browse API</h3>
                    <p className="text-slate-400 text-sm">Navigate through detailed listings of interfaces, classes, functions, and types within the Angular animation system.</p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-sky-400 mb-2">Understand Concepts</h3>
                    <p className="text-slate-400 text-sm">Read clear explanations of core animation concepts, their roles, and how they interact.</p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-sky-400 mb-2">Visualize Relationships</h3>
                    <p className="text-slate-400 text-sm">See interactive diagrams illustrating the connections between different animation entities.</p>
                </div>
            </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="py-6 px-6 text-center text-sm text-slate-500 border-t border-slate-700/50 bg-slate-900/80">
        <p>&copy; {new Date().getFullYear()} Angular Animation Internals Explorer. For educational purposes.</p>
        <p className="mt-1">
          Built with React, Tailwind CSS, and shadcn/ui. Inspired by Angular's powerful animation capabilities.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;