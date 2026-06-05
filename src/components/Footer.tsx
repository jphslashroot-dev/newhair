import React from "react";
import { Scissors, Mail, Phone, MapPin, Clock, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-editorial-charcoal text-white pt-16 pb-8 border-t border-editorial-accent/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/5 pb-12">
          
          {/* Brand/Presentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/5 text-editorial-accent">
                <Scissors className="w-5 h-5 stroke-1" />
              </div>
              <div>
                <span className="font-serif text-2xl font-normal tracking-wide block leading-none text-white">
                  Aline
                </span>
                <span className="text-[10px] uppercase tracking-widest text-editorial-accent font-semibold block mt-1">
                  Élégance Capillaire à Domicile
                </span>
              </div>
            </div>
            <p className="text-white/65 text-xs leading-relaxed max-w-sm font-light">
              Artisan coiffeuse certifiée et passionnée, Aline réinvente la coiffure à domicile dans la région bordelaise avec des rituels bienveillants et des produits respectueux d’exception.
            </p>
          </div>

          {/* Zones et horaires */}
          <div className="space-y-4">
            <h4 className="font-serif text-md font-normal text-editorial-accent uppercase tracking-wider">Secteur & Horaires</h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-editorial-accent flex-shrink-0 mt-0.5" />
                <span>Mérignac, Pessac, Talence, Gradignan, Bordeaux et métropole proche.</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-editorial-accent flex-shrink-0" />
                <span>Lun - Sam : 09h00 - 19h30, sur rendez-vous</span>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-4">
            <h4 className="font-serif text-md font-normal text-editorial-accent uppercase tracking-wider">Contact & Conseils</h4>
            <p className="text-white/65 text-xs font-light">Un événement de dernière minute ou une question sur une coloration ? Écrivez ou téléphonez directement.</p>
            <div className="space-y-2 text-xs">
              <a href="tel:0612345678" className="flex items-center gap-2 text-white/80 hover:text-editorial-accent transition-colors">
                <Phone className="w-4 h-4 text-editorial-accent" />
                <span>06 12 34 56 78</span>
              </a>
              <a href="mailto:aline.elegance@example.com" className="flex items-center gap-2 text-white/80 hover:text-editorial-accent transition-colors">
                <Mail className="w-4 h-4 text-editorial-accent" />
                <span>contact@aline-coiffure.fr</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom footer credit, strictly human, respecting and anti-ai-slop rules */}
        <div className="pt-8 flex flex-wrap gap-4 justify-between items-center text-xs text-white/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-editorial-accent" />
            <span>Prestations assurées - Matériel désinfecté et serviettes biodégradables.</span>
          </div>

          <p className="flex items-center gap-1.5 font-light">
            Développé pour Mérignac & Bordeaux. © {new Date().getFullYear()} Élégance Capillaire. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
