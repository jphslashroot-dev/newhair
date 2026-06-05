import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, ArrowRight, ArrowLeft, RefreshCw, Layers, Scissors, Check, Heart, Loader2 } from "lucide-react";
import { AIResponse } from "../types";

export default function AIConsultant() {
  const [step, setStep] = useState<number>(1);
  const [hairType, setHairType] = useState<string>("");
  const [hairLength, setHairLength] = useState<string>("");
  const [hairStatus, setHairStatus] = useState<string>("");
  const [mainConcern, setMainConcern] = useState<string>("");
  const [stylePreference, setStylePreference] = useState<string>("");
  const [answersText, setAnswersText] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIResponse | null>(null);

  // Form selections options in French
  const hairTypes = [
    { value: "fins", label: "Fins & plats", desc: "Manque de volume naturel" },
    { value: "epais", label: "Épais & denses", desc: "Matière généreuse à structurer" },
    { value: "boucles", label: "Bouclés", desc: "Ondulations définies ou floues" },
    { value: "crepus", label: "Crépus / Frisés", desc: "Spirales serrées nécessitant haute nutrition" },
    { value: "raides", label: "Raides / Lisses", desc: "Fibre droite, recherche de mouvement" }
  ];

  const hairLengths = [
    { value: "court", label: "Court", desc: "Au-dessus des oreilles / Nuque dégagée" },
    { value: "mi-long", label: "Mi-long", desc: "Niveau des clavicules / Épaules" },
    { value: "long", label: "Long", desc: "En-dessous des omoplates" }
  ];

  const hairStatuses = [
    { value: "naturel", label: "Totalement Naturel", desc: "Aucun traitement chimique récent" },
    { value: "colore", label: "Coloré", desc: "Coloration ton sur ton ou couverture de cheveux blancs" },
    { value: "decolore", label: "Décoloré / Balayage", desc: "Mèches claires nécessitant réhydratation" },
    { value: "permanent", label: "Lissé / Permanenté", desc: "Fibre modifiée thermiquement ou chimiquement" }
  ];

  const concerns = [
    { value: "sec", label: "Sécheresse & Ternes", desc: "Manque de brillance et de nutrition" },
    { value: "volume", label: "Manque de Volume", desc: "Cheveux raplapla en racine" },
    { value: "pellicules", label: "Cuir Chevelu Sensible", desc: "Inconfort ou excès de sébum" },
    { value: "casse", label: "Pointes Abîmées / Casse", desc: "Fourches insistantes et longueurs fragiles" }
  ];

  const styles = [
    { value: "classique-chic", label: "Classique Elegant", desc: "Intemporel, structuré et impeccable" },
    { value: "moderne-flou", label: "Moderne Décontracté", desc: "Esprit bohème, coiffé-décoiffé" },
    { value: "audacieux", label: "Audacieux / Graphique", desc: "Coupes courtes typées ou asymétriques" },
    { value: "facile", label: "Pratique & Facile", desc: "Coiffage ultra-rapide au quotidien sans effort" }
  ];

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const runDiagnostic = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/ai-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hairType,
          hairLength,
          hairStatus,
          mainConcern,
          stylePreference,
          answersText,
        }),
      });
      const data = await response.json();
      setResult(data);
      setStep(7); // Result screen
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setHairType("");
    setHairLength("");
    setHairStatus("");
    setMainConcern("");
    setStylePreference("");
    setAnswersText("");
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-gold-50 border border-rose-gold-200 text-rose-gold-600 rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-4 h-4 animate-spin text-gold-400" />
          <span>Conseiller Capillaire IA</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
          Votre Diagnostic Coiffure sur Mesure
        </h2>
        <p className="text-gray-650 mt-3 text-[15px] leading-relaxed">
          En s'appuyant sur l'expertise d'Bettyna couplée à l'intelligence artificielle, découvrez les coupes, styles de coiffage et soins profonds qui sublimeront votre chevelure.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-rose-gold-100/40 shadow-xl overflow-hidden min-h-[500px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: HAIR TYPE */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-8 flex-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-full bg-rose-gold-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">Quelle est la texture naturelle de vos cheveux ?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hairTypes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { setHairType(t.value); handleNext(); }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 transform active:scale-98 cursor-pointer ${
                      hairType === t.value
                        ? "border-rose-gold-400 bg-rose-gold-50/20 shadow-md shadow-rose-gold-100/30 ring-1 ring-rose-gold-300"
                        : "border-gray-100 hover:border-rose-gold-100 hover:bg-rose-gold-50/10"
                    }`}
                  >
                    <div className="font-bold text-charcoal-900 text-[15px]">{t.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{t.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: HAIR LENGTH */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-8 flex-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-full bg-rose-gold-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">Quelle est votre longueur de cheveux actuelle ?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hairLengths.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => { setHairLength(l.value); handleNext(); }}
                    className={`p-6 rounded-2xl border text-left transition-all duration-300 transform active:scale-98 cursor-pointer ${
                      hairLength === l.value
                        ? "border-rose-gold-400 bg-rose-gold-50/20 shadow-md shadow-rose-gold-100/30 ring-1 ring-rose-gold-300"
                        : "border-gray-100 hover:border-rose-gold-100 hover:bg-rose-gold-50/10"
                    }`}
                  >
                    <div className="font-bold text-charcoal-900 text-[15px]">{l.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{l.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: COLOR / STATUS */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-8 flex-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-full bg-rose-gold-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">Vos cheveux ont-ils subi des traitements spécifiques ?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hairStatuses.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { setHairStatus(s.value); handleNext(); }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 transform active:scale-98 cursor-pointer ${
                      hairStatus === s.value
                        ? "border-rose-gold-400 bg-rose-gold-50/20 shadow-md shadow-rose-gold-100/30 ring-1 ring-rose-gold-300"
                        : "border-gray-100 hover:border-rose-gold-100 hover:bg-rose-gold-50/10"
                    }`}
                  >
                    <div className="font-bold text-charcoal-900 text-[15px]">{s.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: MAIN CONCERN */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-8 flex-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-full bg-rose-gold-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">Quelle est votre préoccupation principale ?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {concerns.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => { setMainConcern(c.value); handleNext(); }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 transform active:scale-98 cursor-pointer ${
                      mainConcern === c.value
                        ? "border-rose-gold-400 bg-rose-gold-50/20 shadow-md shadow-rose-gold-100/30 ring-1 ring-rose-gold-300"
                        : "border-gray-100 hover:border-rose-gold-100 hover:bg-rose-gold-50/10"
                    }`}
                  >
                    <div className="font-bold text-charcoal-900 text-[15px]">{c.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{c.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: STYLE PREFERENCE */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-8 flex-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-8 rounded-full bg-rose-gold-500 text-white flex items-center justify-center font-bold text-sm">5</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">Quelle ambiance ou style cherchez-vous à projeter ?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {styles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { setStylePreference(s.value); handleNext(); }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 transform active:scale-98 cursor-pointer ${
                      stylePreference === s.value
                        ? "border-rose-gold-400 bg-rose-gold-50/20 shadow-md shadow-rose-gold-100/30 ring-1 ring-rose-gold-300"
                        : "border-gray-100 hover:border-rose-gold-100 hover:bg-rose-gold-50/10"
                    }`}
                  >
                    <div className="font-bold text-charcoal-900 text-[15px]">{s.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 6: ANY EXTRA NOTES + CONFIRMATION */}
          {step === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-8 flex-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-rose-gold-500 text-white flex items-center justify-center font-bold text-sm">6</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">Des précisions complémentaires ? (Optionnel)</h3>
              </div>
              <p className="text-gray-500 text-xs mb-4">Exemple : "J'ai les cheveux fins qui regraissent vite", "Je cherche une coiffure facile à attacher pour mes séances de sport", etc.</p>
              
              <div className="mt-2">
                <textarea
                  value={answersText}
                  onChange={(e) => setAnswersText(e.target.value)}
                  placeholder="Écrivez ici vos notes courtes à Bettyna l'IA..."
                  rows={4}
                  className="w-full p-4 border border-rose-gold-100 rounded-2xl focus:ring-1 focus:ring-rose-gold-400 focus:outline-none text-[14px]"
                />
              </div>

              {/* User Selection Recap panel */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-gray-100/50 flex flex-wrap gap-2 text-xs font-semibold text-gray-650">
                <span className="p-1 px-2.5 bg-white rounded-full border border-gray-100">Texture: {hairType}</span>
                <span className="p-1 px-2.5 bg-white rounded-full border border-gray-100">Longueur: {hairLength}</span>
                <span className="p-1 px-2.5 bg-white rounded-full border border-gray-100">Traitements: {hairStatus}</span>
                <span className="p-1 px-2.5 bg-white rounded-full border border-gray-100">Axe: {mainConcern}</span>
                <span className="p-1 px-2.5 bg-white rounded-full border border-gray-100">Style: {stylePreference}</span>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  id="submit-diagnostic-btn"
                  onClick={runDiagnostic}
                  className="px-8 py-3.5 bg-gradient-to-r from-charcoal-900 to-rose-gold-600 text-white hover:opacity-90 rounded-full font-bold text-[14px] shadow-lg flex items-center gap-2 hover:shadow-xl hover:shadow-rose-gold-200 transition-all duration-300 animate-pulse cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  Générer mon diagnostic personnalisé !
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: RESULTS DISPLAY */}
          {step === 7 && result && (
            <motion.div
              key="step-results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 flex-1"
            >
              {/* Bettyna Header badge */}
              <div className="flex items-center gap-3.5 pb-6 border-b border-rose-gold-100/40">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-gold-100 border-2 border-rose-gold-400 flex items-center justify-center">
                  <span className="font-serif font-bold text-rose-gold-600 text-lg">AL</span>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-charcoal-900">Bettyna — Votre Styliste Capillaire</h4>
                  <p className="text-xs text-gold-500 font-semibold tracking-wide">Conseils assistés par Intelligence Artificielle</p>
                </div>
              </div>

              {/* Diagnostic Box */}
              <div className="mt-6">
                <blockquote className="relative p-6 rounded-2xl bg-rose-gold-50/30 border-l-4 border-rose-gold-500 italic text-[14px] leading-relaxed text-gray-700">
                  <span className="absolute -top-3 -left-3 text-4xl text-rose-gold-300 leading-none select-none">“</span>
                  {result.diagnostic}
                </blockquote>
              </div>

              {/* Hairstyle suggestions */}
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-5">
                  <Scissors className="w-5 h-5 text-rose-gold-500" />
                  <h4 className="font-serif text-xl font-semibold text-charcoal-900">Coupes & Styles Recommandés</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {result.hairstyles.map((style, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-rose-gold-100/30 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <h5 className="font-serif text-[16px] font-bold text-charcoal-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-rose-gold-100 text-rose-gold-600 flex items-center justify-center text-[10px] font-sans font-bold">{idx + 1}</span>
                        {style.name}
                      </h5>
                      <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">{style.description}</p>
                      <div className="mt-3.5 pt-3.5 border-t border-dashed border-rose-gold-100/40 text-xs text-gold-600 flex items-start gap-1.5 font-medium">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span><strong className="text-charcoal-900">Pourquoi Bettyna valide :</strong> {style.whyMatched}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routine recommendations */}
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-5">
                  <Layers className="w-5 h-5 text-rose-gold-500" />
                  <h3 className="font-serif text-xl font-semibold text-charcoal-900">Routine de Soin Conseillée (À Domicile et au Quotidien)</h3>
                </div>
                <div className="space-y-4">
                  {result.routine.map((stage, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-gray-50/50 border border-gray-100/60">
                      <h4 className="font-sans font-bold text-[15px] text-charcoal-950 flex items-center justify-between flex-wrap gap-2">
                        <span>{stage.title}</span>
                        <span className="px-3 py-1 bg-white border border-gray-100 text-gray-500 rounded-full text-[10px] tracking-wide font-medium">
                          Indispensable : {stage.recommendedProducts}
                        </span>
                      </h4>
                      <ul className="mt-3 space-y-1.5 pl-4 list-disc text-gray-600 text-[13px] leading-relaxed">
                        {stage.steps.map((st, sidx) => (
                          <li key={sidx}>{st}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra professional stylist tips */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-charcoal-900 to-charcoal-950 text-white">
                <h4 className="font-serif text-lg font-bold mb-4 flex items-center gap-2 text-rose-gold-300">
                  <Heart className="w-5 h-5 text-rose-gold-400 fill-current" />
                  Les 3 commandements d'Bettyna
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {result.tips.map((tip, idx) => (
                    <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/5 flex gap-2.5">
                      <span className="font-serif font-black text-rose-gold-300 text-3xl opacity-50 select-none">0{idx + 1}</span>
                      <p className="text-white/80 text-[12.5px] leading-relaxed self-center">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4 justify-between items-center border-t border-gray-100 pt-6">
                <button
                  id="reset-diagnostic-btn"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-full border border-gray-200 hover:border-rose-gold-300 hover:bg-rose-gold-50/30 text-gray-600 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Recommencer un diagnostic
                </button>

                <p className="text-gray-400 text-xs text-center md:text-right">
                  Ces suggestions sont nées du mariage entre l'IA et l'intuition coiffure.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOADING STATE OVERLAY */}
        {loading && (
          <div className="absolute inset-0 z-40 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <Loader2 className="w-12 h-12 animate-spin text-rose-gold-500 mb-4" />
            <h4 className="font-serif text-xl font-bold text-charcoal-900">Analyse de vos cheveux en cours...</h4>
            <div className="max-w-md text-gray-500 text-[13px] leading-relaxed mt-2 space-y-1">
              <p>Bettyna l'IA croise les textures, les longueurs et l'historique chimique des mèches...</p>
              <p className="text-gold-500 font-semibold animate-pulse mt-1">Concoction d'un programme de soins de niveau salon...</p>
            </div>
          </div>
        )}

        {/* NAVIGATION BOTTOM BAR - EXCLUDING STEP 7 (RESULTS) AND STEPS DEPENDANCES ENTRÉES */}
        {step < 7 && !loading && (
          <div className="border-t border-gray-100 p-5 px-8 flex items-center justify-between bg-slate-50/50">
            <button
              id="back-diagnostic-btn"
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-1 text-xs font-bold leading-none ${
                step === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-rose-gold-600 cursor-pointer"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>

            {/* Step bubbles indicators for dynamic micro feel */}
            <div className="hidden sm:flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    num === step
                      ? "bg-rose-gold-500 w-6"
                      : num < step
                      ? "bg-rose-gold-300"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Skip or Next manual handles */}
            {step < 6 ? (
              <button
                id="next-diagnostic-btn"
                onClick={handleNext}
                className="px-5 py-2.5 bg-rose-gold-500 text-white rounded-full font-bold text-xs tracking-wider uppercase shadow-sm hover:bg-rose-gold-600 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                Suivant
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <span className="text-xs text-rose-gold-500 font-bold uppercase tracking-wider">Dernière étape !</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
