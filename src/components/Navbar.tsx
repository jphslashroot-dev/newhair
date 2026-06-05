import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Accueil" },
    { id: "apropos", label: "À propos" },
    { id: "beforeafter", label: "Avant / Après" },
    { id: "faq", label: "Pratique & FAQ" },
    { id: "legal", label: "Mentions légales" }
  ];

  const handleNav = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

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
              Montpellier & sa Métropole
            </span>
            <h1 className="text-2xl font-serif tracking-tighter uppercase font-medium text-editorial-dark">
              Nouvel'<span className="text-[#C9A227]">hair</span>
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
              href="tel:0651018095" 
              className="hidden md:flex items-center gap-2 text-editorial-dark hover:text-editorial-accent text-[11px] uppercase tracking-wider font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-editorial-accent" />
              <span>06 51 01 80 95</span>
            </a>
            
            <a
              id="book-now-header-btn"
              href="https://wa.me/33651018095?text=Bonjour%2C%20je%20souhaite%20avoir%20des%20informations."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-editorial-charcoal hover:bg-editorial-accent text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Contacter
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-editorial-dark hover:text-editorial-accent transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-editorial-dark/10 bg-editorial-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left py-3.5 border-b border-editorial-dark/5 text-[12px] uppercase tracking-[0.18em] font-semibold transition-colors cursor-pointer ${
                    isActive ? "text-editorial-accent" : "text-editorial-dark hover:text-editorial-accent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <a
              href="tel:0651018095"
              className="flex items-center gap-2 py-4 text-editorial-dark text-[12px] uppercase tracking-wider font-bold"
            >
              <Phone className="w-4 h-4 text-editorial-accent" />
              06 51 01 80 95
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
