import { Cookie } from "lucide-react";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-editorial-charcoal text-editorial-light border border-editorial-accent/30 shadow-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-white/5 text-editorial-accent shrink-0">
            <Cookie className="w-5 h-5 stroke-1" />
          </div>
          <p className="text-[12.5px] leading-relaxed text-white/80 font-light">
            Pour vous offrir une navigation fluide, nous conservons localement vos préférences d'affichage.
            Ces informations ne servent pas à exploiter vos données personnelles : elles permettent uniquement
            d'optimiser et de personnaliser votre expérience sur le site.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <button
            onClick={onDecline}
            className="px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] font-bold text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            Refuser
          </button>
          <button
            onClick={onAccept}
            className="px-6 py-2.5 bg-editorial-accent hover:bg-white hover:text-editorial-charcoal text-white text-[10px] uppercase tracking-[0.18em] font-bold transition-all cursor-pointer"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
