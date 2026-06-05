import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, Calculator, ClipboardList, CheckCircle, Gift, User, Phone, Home, Sparkles, ArrowRight } from "lucide-react";
import { HAIR_SERVICES, TRAVEL_FEES } from "../data";

interface BookingWizardProps {
  selectedServices: string[];
  toggleService: (id: string) => void;
  onSuccess: () => void;
}

export default function BookingWizard({ selectedServices, toggleService, onSuccess }: BookingWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [hairLength, setHairLength] = useState<'court' | 'mi-long' | 'long'>('mi-long');
  const [distanceOption, setDistanceOption] = useState<number>(0); // Index of TRAVEL_FEES
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // Date & Time picking
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Client Info inputs
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientAddress, setClientAddress] = useState<string>("");
  const [clientCity, setClientCity] = useState<string>("Montpellier");
  const [clientNotes, setClientNotes] = useState<string>("");

  // Final confirmation state
  const [showRecap, setShowRecap] = useState<boolean>(false);

  // Get active selected service items
  const activeServices = HAIR_SERVICES.filter((s) => selectedServices.includes(s.id));

  // Compute total service base price
  const servicesBaseSum = activeServices.reduce((sum, s) => sum + s.basePrice, 0);

  // Length modifier price adjustments (Court = 0, Mi-long = +5€, Long = +10€)
  const lengthModifier = hairLength === 'court' ? 0 : hairLength === 'mi-long' ? 5 : 10;
  
  // We apply the modifier only if there is a female service selected
  const hasFemaleService = activeServices.some(s => s.id.startsWith('femme') || s.id.includes('balayage') || s.id.includes('ombre') || s.id.includes('botox') || s.id.includes('chignon') || s.id.includes('mariage'));
  const actualLengthPrice = hasFemaleService ? lengthModifier : 0;

  // Travel Fee Calculation
  const travelFeeIndex = distanceOption;
  const currentTravelConfig = TRAVEL_FEES[travelFeeIndex];
  let actualTravelFee = currentTravelConfig.price;

  const totalBeforeTravel = servicesBaseSum + actualLengthPrice;

  // Apply conditional free shipping (or free travel)
  let travelFeeDiscounted = false;
  if (travelFeeIndex === 1 && totalBeforeTravel >= 50) {
    actualTravelFee = 0;
    travelFeeDiscounted = true;
  } else if (travelFeeIndex === 2 && totalBeforeTravel >= 80) {
    actualTravelFee = 0;
    travelFeeDiscounted = true;
  }

  const finalTotalPrice = totalBeforeTravel + actualTravelFee;
  const totalDuration = activeServices.reduce((dur, s) => dur + s.duration, 0);

  // Simulated operational dates (next 5 days)
  const availableDates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
    const formattedDate = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const isoString = d.toISOString().split('T')[0];
    return { iso: isoString, dayName, formattedDate };
  });

  const availableTimes = [
    "09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"
  ];

  const handleNextStep = () => {
    setErrorMessage("");
    if (step === 1 && activeServices.length === 0) {
      setErrorMessage("Veuillez sélectionner au moins une prestation dans le catalogue avant de formuler votre devis.");
      return;
    }
    if (step === 2 && (!selectedDate || !selectedTime)) {
      setErrorMessage("Veuillez choisir votre date d’intervention ainsi que votre horaire de prédilection.");
      return;
    }
    if (step === 3 && (!clientName || !clientPhone || !clientAddress)) {
      setErrorMessage("Veuillez renseigner votre nom complet, votre numéro de téléphone et l'adresse exacte d'intervention.");
      return;
    }

    if (step === 3) {
      setShowRecap(true);
    } else {
      setStep((p) => p + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    if (showRecap) {
      setShowRecap(false);
    } else {
      setStep((p) => Math.max(1, p - 1));
    }
  };

  const handleConfirmBooking = () => {
    // Save state in localStorage or memory as simulated database persistence
    const newBooking = {
      services: activeServices.map(s => s.name),
      hairLength,
      date: selectedDate,
      timeSlot: selectedTime,
      totalPrice: finalTotalPrice,
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      clientCity,
      clientNotes
    };

    localStorage.setItem("latest_booking", JSON.stringify(newBooking));
    onSuccess(); // Trigger modal or success toast in App.tsx
  };

  return (
    <div className="bg-editorial-bg rounded-none border border-editorial-dark/10 shadow-sm overflow-hidden max-w-4xl mx-auto my-8 p-6 sm:p-10">
      
      {/* Error display strictly built-in to skip window.alerts */}
      {errorMessage && (
        <div className="bg-editorial-accent/10 border border-editorial-accent/30 text-editorial-charcoal text-xs p-4 mb-6 tracking-wide font-sans font-semibold">
          * {errorMessage}
        </div>
      )}

      {/* Wizard Header Progress */}
      <div className="flex items-center justify-between pb-6 border-b border-editorial-dark/10 mb-8 flex-wrap gap-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-light text-editorial-charcoal flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-editorial-accent stroke-[1.5]" />
            Formulation du Devis
          </h3>
          <p className="text-editorial-muted text-xs mt-1.5 font-light font-sans">Sélectionnez vos détails pour dresser votre devis et réserver votre date.</p>
        </div>
        <div className="text-right">
          <span className="text-editorial-accent font-serif text-2.5xl font-light">{finalTotalPrice} €</span>
          <p className="text-[9px] text-editorial-muted uppercase tracking-[0.2em] font-semibold mt-0.5">Estimation Net</p>
        </div>
      </div>

      {/* Step Bubbles - Geometric square tags */}
      <div className="flex items-center justify-center gap-3 mb-10 select-none flex-wrap">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-editorial-accent font-semibold" : "text-editorial-muted"} text-[11px] uppercase tracking-wider`}>
          <div className={`w-7 h-7 rounded-none flex items-center justify-center text-[10px] font-bold ${step >= 1 ? "bg-editorial-charcoal text-white" : "bg-editorial-light text-editorial-muted border border-editorial-dark/10"}`}>1</div>
          <span>Config</span>
        </div>
        <div className="w-6 h-px bg-editorial-dark/15" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-editorial-accent font-semibold" : "text-editorial-muted"} text-[11px] uppercase tracking-wider`}>
          <div className={`w-7 h-7 rounded-none flex items-center justify-center text-[10px] font-bold ${step >= 2 ? "bg-editorial-charcoal text-white" : "bg-editorial-light text-editorial-muted border border-editorial-dark/10"}`}>2</div>
          <span>Date</span>
        </div>
        <div className="w-6 h-px bg-editorial-dark/15" />
        <div className={`flex items-center gap-2 ${step >= 3 ? "text-editorial-accent font-semibold" : "text-editorial-muted"} text-[11px] uppercase tracking-wider`}>
          <div className={`w-7 h-7 rounded-none flex items-center justify-center text-[10px] font-bold ${step >= 3 ? "bg-editorial-charcoal text-white" : "bg-editorial-light text-editorial-muted border border-editorial-dark/10"}`}>3</div>
          <span>Détails</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* RECAP FORM POPUP OVERLAY */}
        {showRecap ? (
          <motion.div
            key="recap"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="p-6 bg-editorial-light border border-editorial-dark/10 text-editorial-charcoal text-center rounded-none">
              <CheckCircle className="w-8 h-8 mx-auto text-editorial-accent mb-3 stroke-[1.5]" />
              <h4 className="font-serif text-xl font-normal text-editorial-charcoal">Vérification de vos choix</h4>
              <p className="text-xs text-editorial-muted mt-2 font-light">Veuillez parcourir ci-dessous le résumé contractuel de votre rendez-vous à domicile.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Recap items */}
              <div className="p-6 bg-editorial-bg border border-editorial-dark/10 rounded-none space-y-4">
                <h5 className="font-serif text-[15px] font-normal text-editorial-charcoal border-b border-editorial-dark/10 pb-3 flex items-center gap-2 uppercase tracking-wide">
                  <ClipboardList className="w-4 h-4 text-editorial-accent stroke-[1.5]" />
                  Prestations Estimées
                </h5>
                <ul className="space-y-2.5 text-xs text-editorial-charcoal font-light">
                  {activeServices.map((s) => (
                    <li key={s.id} className="flex justify-between items-center bg-editorial-light p-3 border border-editorial-dark/5">
                      <span className="font-medium">{s.name}</span>
                      <span>{s.basePrice} €</span>
                    </li>
                  ))}
                  {actualLengthPrice > 0 && (
                    <li className="flex justify-between items-center bg-editorial-light p-3 border border-editorial-accent/20 text-editorial-accent font-semibold">
                      <span>Supplément longueur ({hairLength})</span>
                      <span>+{actualLengthPrice} €</span>
                    </li>
                  )}
                  <li className="flex justify-between items-center bg-editorial-light p-3 border border-editorial-dark/5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-editorial-accent" />
                      Déplacement ({TRAVEL_FEES[distanceOption].zone})
                    </span>
                    <span>{actualTravelFee === 0 ? "Gratuit" : `${actualTravelFee} €`}</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-editorial-dark/10 flex justify-between items-center text-editorial-charcoal text-xs font-semibold uppercase tracking-wider">
                  <span>Temps estimé :</span>
                  <span>{totalDuration} min environ</span>
                </div>
              </div>

              {/* Right Column: Address and details */}
              <div className="p-6 bg-editorial-bg border border-editorial-dark/10 rounded-none space-y-4">
                <h5 className="font-serif text-[15px] font-normal text-editorial-charcoal border-b border-editorial-dark/10 pb-3 flex items-center gap-2 uppercase tracking-wide">
                  <User className="w-4 h-4 text-editorial-accent stroke-[1.5]" />
                  Vos Coordonnées
                </h5>
                <div className="space-y-3.5 text-xs text-editorial-dark font-light leading-relaxed">
                  <p><strong className="text-editorial-charcoal uppercase tracking-wider text-[10px] block mb-0.5">Nom complet :</strong> {clientName}</p>
                  <p><strong className="text-editorial-charcoal uppercase tracking-wider text-[10px] block mb-0.5">Téléphone :</strong> {clientPhone}</p>
                  <p><strong className="text-editorial-charcoal uppercase tracking-wider text-[10px] block mb-0.5">Horaire retenu :</strong> {availableDates.find(d => d.iso === selectedDate)?.formattedDate} à {selectedTime}</p>
                  <p>
                    <strong className="text-editorial-charcoal uppercase tracking-wider text-[10px] block mb-0.5">Lieu de l'intervention :</strong>
                    {clientAddress}, {clientCity}
                  </p>
                  {clientNotes && (
                    <p className="p-3 bg-editorial-light border border-editorial-dark/5 italic text-editorial-muted">
                      <strong className="text-editorial-charcoal uppercase tracking-wider text-[10px] block not-italic mb-1 font-bold">Notes logistiques :</strong> {clientNotes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Total recap banner */}
            <div className="p-6 bg-editorial-charcoal text-[#FDFCFB] flex justify-between items-center rounded-none border border-editorial-accent/30">
              <div>
                <span className="text-editorial-accent font-bold uppercase tracking-[0.15em] text-[10px]">Total Estimé</span>
                <p className="text-[10px] text-white/60 font-light mt-0.5">Règlement en fin de prestation</p>
              </div>
              <span className="text-2.5xl sm:text-3xl font-light font-serif text-editorial-accent">{finalTotalPrice} €</span>
            </div>

            <div className="flex justify-between items-center pt-4 flex-wrap gap-4">
              <button
                id="back-recap-btn"
                onClick={handlePrevStep}
                className="px-6 py-3.5 border border-editorial-dark/10 text-editorial-muted hover:text-editorial-charcoal transition-colors uppercase tracking-widest font-bold text-[10px] rounded-none cursor-pointer"
              >
                Retour
              </button>
              <button
                id="confirm-booking-btn"
                onClick={handleConfirmBooking}
                className="px-8 py-4.5 bg-editorial-charcoal text-white hover:bg-editorial-accent text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ClipboardList className="w-4 h-4 stroke-[1.5]" />
                Confirmer mon rendez-vous
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* STEP 1 WIDGET SCREEN */}
            {step === 1 && (
              <motion.div
                key="step1-wizard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Services list picked */}
                <div className="p-6 bg-editorial-light border border-editorial-dark/10 rounded-none">
                  <h4 className="font-serif text-[15px] font-normal text-editorial-charcoal mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <ClipboardList className="w-4 h-4 text-editorial-accent" />
                    Prestations Retenues ({activeServices.length})
                  </h4>
                  {activeServices.length === 0 ? (
                    <div className="text-center py-6 text-editorial-muted text-xs font-light">
                      Aucune prestation sélectionnée dans l'onglet principal. Veuillez faire votre choix dans le catalogue de prestations ci-dessus !
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {activeServices.map((s) => (
                        <div key={s.id} className="flex justify-between items-center bg-editorial-bg p-4 border border-editorial-dark/10 text-xs text-editorial-charcoal">
                          <div>
                            <span className="font-semibold block">{s.name}</span>
                            <span className="text-editorial-muted font-light block mt-0.5">{s.duration} min environ</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-serif font-normal">{s.basePrice} €</span>
                            <button
                              id={`remove-service-recap-${s.id}`}
                              onClick={() => toggleService(s.id)}
                              className="text-editorial-accent hover:text-editorial-charcoal uppercase tracking-widest font-bold font-sans transition-colors cursor-pointer text-[9px]"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hair length and Travel choices */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Length adjustments */}
                  <div className="p-6 bg-editorial-bg border border-editorial-dark/10 rounded-none">
                    <h4 className="font-serif text-[15px] font-normal text-editorial-charcoal mb-2 uppercase tracking-wide">Longueur de cheveux</h4>
                    <p className="text-editorial-muted text-[10px] mb-4 font-light uppercase tracking-wider">Ajustement de matière et temps d'application de rituels</p>
                    <div className="grid grid-cols-3 gap-3">
                      {(['court', 'mi-long', 'long'] as const).map((len) => (
                        <button
                          key={len}
                          id={`length-btn-${len}`}
                          onClick={() => setHairLength(len)}
                          className={`p-3.5 rounded-none border text-center transition-all duration-200 cursor-pointer ${
                            hairLength === len
                              ? "border-editorial-accent bg-editorial-light font-bold text-editorial-accent text-xs"
                              : "border-editorial-dark/10 hover:border-editorial-accent hover:bg-editorial-light text-xs font-light text-editorial-muted"
                          }`}
                        >
                          <span className="capitalize block">{len === 'mi-long' ? 'Mi-long' : len}</span>
                          <span className="text-[9px] text-editorial-muted font-medium mt-1 block tracking-wider font-semibold">
                            {len === 'court' ? 'Standard' : len === 'mi-long' ? '+5 €' : '+10 €'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Area choices */}
                  <div className="p-6 bg-editorial-bg border border-editorial-dark/10 rounded-none">
                    <h5 className="font-serif text-[15px] font-normal text-editorial-charcoal mb-2 flex items-center gap-2 uppercase tracking-wide">
                      <MapPin className="w-4 h-4 text-editorial-accent" />
                      Lieu du rendez-vous
                    </h5>
                    <p className="text-editorial-muted text-[10px] mb-4 font-light uppercase tracking-wider">Bettyna se déplace sur Montpellier et couronne métropolitaine</p>
                    <select
                      id="select-travel-distance"
                      value={distanceOption}
                      onChange={(e) => setDistanceOption(Number(e.target.value))}
                      className="w-full p-3.5 border border-editorial-dark/15 rounded-none focus:border-editorial-accent focus:outline-none text-xs text-editorial-charcoal bg-[#FDFCFB]"
                    >
                      {TRAVEL_FEES.map((fee, idx) => (
                        <option key={idx} value={idx}>
                          {fee.zone} ({fee.distance}) — {fee.price === 0 ? "Gratuit" : `${fee.price} €`}
                        </option>
                      ))}
                    </select>

                    {/* Conditional savings alerts */}
                    <div className="mt-4 p-3 bg-editorial-light border border-editorial-dark/5 text-[10px] text-editorial-accent flex items-center gap-2 font-bold tracking-wider uppercase">
                      <Gift className="w-3.5 h-3.5 text-editorial-accent" />
                      <span>{currentTravelConfig.desc}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2 WIDGET SCREEN */}
            {step === 2 && (
              <motion.div
                key="step2-wizard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Date Grid */}
                <div className="p-6 bg-editorial-bg border border-editorial-dark/10 rounded-none">
                  <h4 className="font-serif text-[15px] font-normal text-editorial-charcoal mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Calendar className="w-4 h-4 text-editorial-accent stroke-[1.5]" />
                    1. Choisissez le jour
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.iso}
                        id={`date-${date.iso}`}
                        onClick={() => setSelectedDate(date.iso)}
                        className={`p-3.5 rounded-none border text-center transition-all cursor-pointer ${
                          selectedDate === date.iso
                            ? "border-editorial-accent bg-editorial-light font-bold text-editorial-accent text-xs"
                            : "border-editorial-dark/10 hover:border-editorial-accent text-xs font-light text-editorial-muted"
                        }`}
                      >
                        <span className="text-[9px] uppercase font-bold text-editorial-muted block tracking-wide">{date.dayName}</span>
                        <span className="text-sm font-semibold text-editorial-charcoal block mt-0.5">{date.formattedDate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hour slots Picker */}
                <div className="p-6 bg-editorial-bg border border-editorial-dark/10 rounded-none">
                  <h4 className="font-serif text-[15px] font-normal text-editorial-charcoal mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Clock className="w-4 h-4 text-editorial-accent" />
                    2. Sélectionnez l'heure
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        id={`time-${time}`}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2.5 rounded-none border text-center text-xs font-semibold transition-all cursor-pointer ${
                          selectedTime === time
                            ? "border-editorial-accent bg-editorial-light text-editorial-accent font-bold"
                            : "border-editorial-dark/10 hover:border-editorial-accent"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-editorial-muted mt-5 leading-relaxed font-light italic">
                    Note : Travaillant à domicile, Bettyna prévoit une marge de battement d'environ 15 minutes selon les impératifs routiers locaux. Un SMS de suivi vous est délivré à son départ.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 3 WIDGET SCREEN */}
            {step === 3 && (
              <motion.div
                key="step3-wizard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 max-w-2xl mx-auto"
              >
                <h4 className="font-serif text-[16px] font-normal text-editorial-charcoal mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Home className="w-4 h-4 text-editorial-accent stroke-[1.5]" />
                  Adresse d'intervention & Contact
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-editorial-muted tracking-wider mb-1.5">Nom Complet *</label>
                    <input
                      type="text"
                      id="input-client-name"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Clara Martin"
                      className="w-full p-3 bg-[#FDFCFB] border border-editorial-dark/15 rounded-none focus:border-editorial-accent focus:outline-none text-xs text-editorial-charcoal font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-editorial-muted tracking-wider mb-1.5">Téléphone Portable *</label>
                    <input
                      type="tel"
                      id="input-client-phone"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ex: 06 12 34 56 78"
                      className="w-full p-3 bg-[#FDFCFB] border border-editorial-dark/15 rounded-none focus:border-editorial-accent focus:outline-none text-xs text-editorial-charcoal font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-editorial-muted tracking-wider mb-1.5">Email (Optionnel - Pour le suivi de Devis)</label>
                  <input
                    type="email"
                    id="input-client-email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Ex: clara.martin@example.com"
                    className="w-full p-3 bg-[#FDFCFB] border border-editorial-dark/15 rounded-none focus:border-editorial-accent focus:outline-none text-xs text-editorial-charcoal font-light"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase text-editorial-muted tracking-wider mb-1.5">Adresse de l'intervention chez vous *</label>
                    <input
                      type="text"
                      id="input-client-address"
                      required
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Ex: 14 Avenue de la république"
                      className="w-full p-3 bg-[#FDFCFB] border border-editorial-dark/15 rounded-none focus:border-editorial-accent focus:outline-none text-xs text-editorial-charcoal font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-editorial-muted tracking-wider mb-1.5">Ville d'intervention</label>
                    <input
                      type="text"
                      id="input-client-city"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      placeholder="Ex: Montpellier"
                      className="w-full p-3 bg-[#FDFCFB] border border-editorial-dark/15 rounded-none text-editorial-muted bg-editorial-light focus:outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-editorial-muted tracking-wider mb-1.5">Détails logistiques d'intervention (Étage, parking, etc.)</label>
                  <textarea
                    id="input-client-notes"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Ex: Parking allée, sonnette 14B, 2ème étage avec ascenseur."
                    rows={2.5}
                    className="w-full p-3 bg-[#FDFCFB] border border-editorial-dark/15 rounded-none focus:border-editorial-accent focus:outline-none text-xs text-editorial-charcoal font-light"
                  />
                  <p className="text-[10px] text-editorial-muted mt-2 font-light">
                    * Informations utilisées strictement afin d’établir l’itinéraire personnalisé de la coiffeuse.
                  </p>
                </div>
              </motion.div>
            )}

            {/* General bottom controls */}
            <div className="flex justify-between items-center pt-6 border-t border-editorial-dark/10 flex-wrap gap-4 mt-8">
              <button
                id="back-booking-wizard-step"
                onClick={handlePrevStep}
                disabled={step === 1}
                className={`py-2 text-[10px] uppercase tracking-widest font-bold ${
                  step === 1 ? "text-editorial-muted/30 cursor-not-allowed" : "text-editorial-muted hover:text-editorial-charcoal cursor-pointer"
                }`}
              >
                Précédent
              </button>

              <button
                id="next-booking-wizard-step"
                onClick={handleNextStep}
                className="px-8 py-4 bg-editorial-charcoal text-white hover:bg-editorial-accent text-[11px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{step === 3 ? "Voir le Récapitulatif" : "Étape Suivante"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
