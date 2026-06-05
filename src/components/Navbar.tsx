import React from "react";
import { Scissors, Sparkles, MapPin, Phone, Calendar } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onBookClick }: NavbarProps) {
  const navItems = [
    { id: "hero", label: "Accueil" },
    { id: "services", label: "Services & Tarifs" },
    { id: "beforeafter", label: "Avant / Après" },
    { id: "consultant", label: "Diagnostic IA" },
    { id: "faq", label: "Pratique & FAQ" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-editorial-bg/95 backdrop-blur-md border-b border-editorial-dark/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo Brand / Editorial signature */}
          <div 
            onClick={() => setActiveTab("hero")} 
            className="flex flex-col cursor-pointer group select-none"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-editorial-muted mb-1 leading-none">
              Mérignac & Métropole Bordelaise
            </span>
            <h1 className="text-2xl font-serif tracking-tighter uppercase font-medium text-editorial-dark">
              Aline <span className="italic font-normal lowercase tracking-normal text-editorial-accent">et</span> Coiffure
            </h1>
          </div>

          {/* Nav Links Desktop - Editorial Mode (Tracking + Uppercase) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-2 text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-editorial-dark font-bold"
                      : "text-editorial-muted hover:text-editorial-dark opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.id === "consultant" && (
                    <Sparkles className="inline-block w-3.5 h-3.5 mr-1 animate-pulse text-editorial-accent" />
                  )}
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-editorial-accent" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center gap-6">
            <a 
              href="tel:0612345678" 
              className="hidden md:flex items-center gap-2 text-editorial-dark hover:text-editorial-accent text-[11px] uppercase tracking-wider font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-editorial-accent" />
              <span>06 12 34 56 78</span>
            </a>
            
            <button
              id="book-now-header-btn"
              onClick={onBookClick}
              className="px-6 py-3.5 bg-editorial-charcoal hover:bg-editorial-accent text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Réserver en ligne
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
