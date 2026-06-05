import React from "react";
import { Clock, Check, Plus, Star } from "lucide-react";
import { HairService } from "../types";

interface ServiceCardProps {
  key?: string;
  service: HairService;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function ServiceCard({ service, isSelected, onToggle }: ServiceCardProps) {
  return (
    <div 
      className={`relative flex flex-col justify-between p-6 rounded-none border transition-all duration-300 group ${
        isSelected 
          ? "border-editorial-accent bg-editorial-light shadow-sm"
          : "border-editorial-dark/10 bg-editorial-bg hover:border-editorial-accent hover:bg-editorial-light/30"
      }`}
    >
      {/* Popular tag badge */}
      {service.popular && (
        <span className="absolute -top-3 left-6 px-3 py-0.5 bg-editorial-charcoal text-white text-[9px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 border border-editorial-charcoal">
          <Star className="w-3 h-3 fill-current text-editorial-accent" />
          Populaire
        </span>
      )}

      <div>
        <div className="flex justify-between items-start gap-3 mt-1">
          <h4 className="font-serif text-[17px] font-normal text-editorial-charcoal group-hover:text-editorial-accent transition-colors duration-200">
            {service.name}
          </h4>
          <span className="font-serif text-lg text-editorial-charcoal block whitespace-nowrap">
            {service.basePrice} €
          </span>
        </div>

        <p className="text-[13px] text-editorial-muted mt-3 leading-relaxed font-light">
          {service.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mt-5 pt-4 border-t border-editorial-dark/10">
        <div className="flex items-center gap-1.5 text-editorial-muted text-xs font-light">
          <Clock className="w-3.5 h-3.5 text-editorial-accent/75" />
          <span>{service.duration} min environ</span>
        </div>

        <button
          onClick={() => onToggle(service.id)}
          className={`flex items-center justify-center gap-1 px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
            isSelected
              ? "bg-editorial-charcoal text-white"
              : "bg-transparent border border-editorial-dark/10 hover:border-editorial-accent hover:bg-editorial-light text-editorial-charcoal"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2]" />
              <span>Sélectionné</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
              <span>Ajouter</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
