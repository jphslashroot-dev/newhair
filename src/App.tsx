import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Scissors, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Star, 
  Heart, 
  Check, 
  X, 
  CalendarCheck, 
  PhoneCall, 
  Gift, 
  ArrowRight,
  ChevronDown
} from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ServiceCard from "./components/ServiceCard";
import BookingWizard from "./components/BookingWizard";

import { 
  HAIR_SERVICES, 
  REVIEWS, 
  HOME_HAIRDRESSER_BENEFITS, 
  BEFORE_AFTER_CASES,
  FAQ_ITEMS 
} from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeServiceTab, setActiveServiceTab] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First accordion default open
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [savedBooking, setSavedBooking] = useState<any>(null);

  // Check if we have old booking saved in current state
  useEffect(() => {
    const cached = localStorage.getItem("latest_booking");
    if (cached) {
      setSavedBooking(JSON.parse(cached));
    }
  }, [bookingSuccess]);

  // Toggle service selection
  const handleToggleService = (id: string) => {
    setSelectedServices((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Quick select category services
  const filteredServices = HAIR_SERVICES.filter((s) => {
    if (activeServiceTab === "all") return true;
    return s.category === activeServiceTab;
  });

  // Calculate dynamic pricing metrics on list page
  const selectedBasePrice = HAIR_SERVICES
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.basePrice, 0);

  // Success Callback from Booking Wizard
  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    // Move to top view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseSuccessModal = () => {
    setBookingSuccess(false);
    setSelectedServices([]);
    setActiveTab("hero");
  };

  // Navigate to book tab and focus on reservation flow
  const handleScrollToBooking = () => {
    setActiveTab("services");
    setTimeout(() => {
      const el = document.getElementById("quote-booking-calculator-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-dark font-sans selection:bg-editorial-neutral selection:text-editorial-dark transition-colors duration-300">
      
      {/* Top Banner Message with Editorial aesthetic */}
      <div className="w-full bg-editorial-charcoal text-editorial-light text-center py-2.5 px-4 text-[10px] tracking-[0.2em] font-bold uppercase flex items-center justify-center gap-2 border-b border-editorial-dark/10">
        <Sparkles className="w-3.5 h-3.5 text-editorial-accent animate-pulse" />
        <span>Bettyna se déplace à domicile à Montpellier, Lattes & Pérols — <strong className="text-editorial-accent underline decoration-1">Déplacement gratuit</strong></span>
      </div>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBookClick={handleScrollToBooking} 
      />

      {/* SUCCESS MODAL FOR BOOKING CONFIRMATION - Editorial Modern Refinement */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-editorial-dark/80 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-editorial-bg p-8 max-w-lg w-full text-center border border-editorial-dark/15 shadow-xl space-y-6 rounded-none"
            >
              <div className="w-12 h-12 bg-editorial-light border border-editorial-accent rounded-none flex items-center justify-center mx-auto text-editorial-accent">
                <CalendarCheck className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-3xl tracking-tight uppercase font-medium text-editorial-charcoal">Rendez-vous pré-enregistré</h3>
              
              <div className="bg-editorial-light p-6 text-xs space-y-3 text-left border border-editorial-dark/5 text-editorial-dark">
                <p className="flex justify-between border-b border-editorial-dark/5 pb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-editorial-muted">Prestation :</span>
                  <span className="font-semibold text-right max-w-[250px] truncate">{savedBooking?.services?.join(', ')}</span>
                </p>
                <p className="flex justify-between border-b border-editorial-dark/5 pb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-editorial-muted">Date & Heure :</span>
                  <span className="font-semibold">{savedBooking?.date} à {savedBooking?.timeSlot}</span>
                </p>
                <p className="flex justify-between border-b border-editorial-dark/5 pb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px] text-editorial-muted">Adresse d'intervention :</span>
                  <span className="font-semibold text-right max-w-[250px] truncate">{savedBooking?.clientAddress}, {savedBooking?.clientCity}</span>
                </p>
                <p className="pt-2 font-serif text-base text-editorial-dark flex justify-between">
                  <span>Montant de l'estimation :</span>
                  <span className="font-bold underline text-editorial-accent">{savedBooking?.totalPrice} €</span>
                </p>
              </div>

              <p className="text-editorial-muted text-xs leading-relaxed font-light">
                Merci pour votre confiance, {savedBooking?.clientName}. Un message SMS ou un e-mail de confirmation officielle vous sera transmis par Bettyna sous quelques heures pour valider définitivement le créneau proposé.
              </p>

              <button
                id="close-success-booking-modal-btn"
                onClick={handleCloseSuccessModal}
                className="w-full py-4.5 bg-editorial-charcoal hover:bg-editorial-accent text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer"
              >
                Retourner à l'accueil
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-16">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HERO VIEW */}
          {activeTab === "hero" && (
            <motion.div
              key="view-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-24"
            >
              {/* Hero Banner Grid section in pure premium style */}
              <section className="relative overflow-hidden pt-12 pb-20 border-b border-editorial-dark/10 bg-editorial-bg">
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Luxury Rotated Sidebar (Extracted from the Editorial Aesthetic specs) */}
                  <div className="hidden lg:flex lg:col-span-1 items-end h-[420px]">
                    <span className="rotate-[-90deg] origin-bottom-left whitespace-nowrap text-[10px] uppercase tracking-[0.55em] text-editorial-accent font-bold pb-2 select-none">
                      EXPÉRIENCE LUXE À DOMICILE
                    </span>
                  </div>

                  {/* Left Column Content - Main Editorial Column */}
                  <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-editorial-light border border-editorial-dark/10 text-editorial-accent text-[9px] font-bold tracking-[0.25em] uppercase">
                      <Star className="w-3 h-3 fill-current text-editorial-accent animate-pulse" />
                      <span>Artisan Coiffeuse certifiée • bordeaux</span>
                    </div>

                    <h2 className="font-serif text-[48px] sm:text-[64px] lg:text-[72px] leading-[0.95] tracking-tight text-editorial-charcoal font-medium">
                      Le salon <br />
                      <span className="italic font-normal ml-8 lg:ml-12 text-editorial-accent lowercase tracking-normal">
                        s’invite
                      </span> <br />
                      chez vous.
                    </h2>

                    <p className="text-editorial-dark font-light text-base sm:text-md leading-relaxed max-w-lg mx-auto lg:mx-0 pt-2 opacity-95">
                      Une expertise haute-coiffure personnalisée prodiguée dans la quiétude et l'intimité de votre foyer. Bettyna réinvente la coiffure à domicile montpelliéraine avec des rituels bienveillants et des soins professionnels d'exception.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                      <button
                        id="hero-go-book-btn"
                        onClick={handleScrollToBooking}
                        className="px-10 py-5 bg-editorial-charcoal hover:bg-editorial-accent text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        Créer mon devis à domicile
                      </button>
                    </div>

                    {/* Quality Badges */}
                    <div className="pt-8 border-t border-editorial-dark/10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                      <div>
                        <span className="font-serif block text-2xl font-normal text-editorial-charcoal">4.9 / 5</span>
                        <span className="text-[9px] uppercase font-bold text-editorial-muted tracking-[0.15em]">Sur 140+ avis</span>
                      </div>
                      <div className="border-l border-editorial-dark/10 pl-6">
                        <span className="font-serif block text-2xl font-normal text-editorial-charcoal">Montpellier</span>
                        <span className="text-[9px] uppercase font-bold text-editorial-muted tracking-[0.15em]">Secteur d'action</span>
                      </div>
                      <div className="border-l border-editorial-dark/10 pl-6">
                        <span className="font-serif block text-2xl font-normal text-editorial-charcoal">Inclus</span>
                        <span className="text-[9px] uppercase font-bold text-editorial-muted tracking-[0.15em]">Bac de lavage</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Visual layout - Elegant flat frame */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    <div className="relative w-72 h-[350px] sm:w-[320px] sm:h-[430px] bg-editorial-neutral p-4 border border-editorial-dark/5 shadow-sm">
                      <div className="w-full h-full relative overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600&h=800"
                          alt="Bettyna Home Hairdresser setup"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Overlapping Editorial Floating Tag */}
                      <div className="absolute bottom-6 left-6 right-6 bg-editorial-bg p-4 border border-editorial-dark/10 flex items-center gap-3">
                        <div className="p-2 bg-editorial-light text-editorial-accent">
                          <ShieldCheck className="w-5 h-5 stroke-1" />
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-editorial-charcoal">Bac autonome fourni</p>
                          <p className="text-[10px] text-editorial-muted font-light">Rinçage propre dans toute pièce</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Home Hair Benefits Grid section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-accent block mb-2">Prestige & Simplicité</span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-charcoal">La coiffure chez vous, mode d'emploi</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {HOME_HAIRDRESSER_BENEFITS.map((benefit, idx) => (
                    <div key={idx} className="bg-editorial-bg p-8 border border-editorial-dark/10 hover:border-editorial-accent transition-all duration-300 flex flex-col justify-between min-h-[220px]">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-editorial-accent font-semibold mb-4 block">
                          Rituel 0{idx + 1}
                        </div>
                        <h4 className="font-serif text-[18px] font-normal text-editorial-charcoal">{benefit.title}</h4>
                        <p className="text-editorial-muted text-[13px] leading-relaxed mt-3 font-light">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews & Testimonials Carousel Slider layout */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-accent block mb-2">Témoignages</span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-charcoal">Elles l’adorent, ils en parlent</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {REVIEWS.map((review, idx) => (
                    <div key={idx} className="bg-editorial-bg p-6 border border-editorial-dark/10 flex flex-col justify-between min-h-[240px]">
                      <div>
                        {/* Rating stars layout */}
                        <div className="flex items-center gap-0.5 text-editorial-accent mb-4">
                          {Array.from({ length: review.rating }).map((_, rIdx) => (
                            <Star key={rIdx} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <p className="text-editorial-dark text-[13px] leading-relaxed italic font-light">
                          "{review.comment}"
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-editorial-dark/10 mt-6 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[12px] text-editorial-charcoal block tracking-wide">{review.name}</span>
                          <span className="text-[10px] text-editorial-muted font-medium block">{review.city}</span>
                        </div>
                        <span className="px-2.5 py-1 bg-editorial-light border border-editorial-dark/5 text-[9px] uppercase tracking-wider font-bold text-editorial-accent">
                          {review.services}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* TAB 2: SERVICES & TIER PRICES */}
          {activeTab === "services" && (
            <motion.div
              key="view-services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              
              {/* Category selector pill filters */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-accent block mb-2">Prestations & Rituels</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-charcoal">Prestations de Coiffure à Domicile</h2>
                  <p className="text-editorial-muted text-xs mt-3 leading-relaxed font-light">
                    Sélectionnez vos prestations favorites en cliquant sur "Ajouter". Elles seront automatiquement consolidées dans le devis dynamique interactif situé juste en dessous !
                  </p>
                </div>

                {/* Filter Pills in Editorial Grid borders */}
                <div className="flex flex-wrap justify-center items-center gap-2.5 border-b border-editorial-dark/10 pb-8 mb-12">
                  {[
                    { id: "all", label: "Tous les services" },
                    { id: "coupe", label: "Coupes & Coiffages" },
                    { id: "couleur", label: "Couleurs & Balayages" },
                    { id: "soin", label: "Soins & Massages triphasés" },
                    { id: "evenement", label: "Événements & Mariage" }
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveServiceTab(category.id)}
                      className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer ${
                        activeServiceTab === category.id
                          ? "bg-editorial-charcoal text-white border border-editorial-charcoal"
                          : "bg-transparent text-editorial-muted border border-editorial-dark/10 hover:border-editorial-accent hover:text-editorial-dark"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {/* Services cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedServices.includes(service.id)}
                      onToggle={handleToggleService}
                    />
                  ))}
                </div>
              </section>

              {/* FLOATING CALCULATION HOOK PANEL */}
              <span id="quote-booking-calculator-anchor"></span>

              {/* BOOKING FLOW SECTION CONTAINER */}
              <section className="bg-editorial-light/40 py-16 border-y border-editorial-dark/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="px-4 py-1.5 bg-editorial-charcoal text-white text-[9px] font-bold tracking-[0.25em] uppercase">
                      Calculateur de Devis & Réservation
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-editorial-charcoal mt-4">Dresser votre devis interactif estimé</h3>
                    <p className="text-xs text-editorial-muted mt-2 leading-relaxed font-light">
                      L'estimation prend en compte vos services sélectionnés, les suppléments longueur et l'adresse d'intervention pour calculer instantanément le coût net.
                    </p>
                  </div>

                  <BookingWizard
                    selectedServices={selectedServices}
                    toggleService={handleToggleService}
                    onSuccess={handleBookingSuccess}
                  />
                </div>
              </section>

            </motion.div>
          )}

          {/* TAB 3: BEFORE / AFTER INTERACTIVE SLIDER PORTFOLIO */}
          {activeTab === "beforeafter" && (
            <motion.div
              key="view-beforeafter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
            >
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-accent block mb-2">Galerie d'Art Capillaire</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-editorial-charcoal">Avant / Après en mouvement</h2>
                <p className="text-editorial-muted text-xs mt-3 leading-relaxed font-light">
                  Chaque chevelure a son histoire unique. Faites glisser le curseur central pour visualiser en direct le changement de structure et de lumière de nos transformations.
                </p>
              </div>

              {/* Render BEFORE_AFTER cases sequentially */}
              <div className="space-y-16">
                {BEFORE_AFTER_CASES.map((item, index) => (
                  <BeforeAfterSlider
                    key={index}
                    title={item.title}
                    duration={item.duration}
                    description={item.desc}
                    beforeUrl={item.beforeUrl}
                    afterUrl={item.afterUrl}
                  />
                ))}
              </div>

              {/* Quality assurance footer block with editorial look */}
              <div className="max-w-4xl mx-auto p-8 bg-editorial-light border border-editorial-dark/10 flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
                <div className="p-3 bg-editorial-bg text-editorial-accent border border-editorial-dark/5">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-serif text-[18px] font-normal text-editorial-charcoal">Des clichés réels & sans filtre artificiel</h4>
                  <p className="text-editorial-muted text-xs mt-2 leading-relaxed font-light">
                    Toutes ces transformations sont réalisées en situation de déplacement par Bettyna avec des techniques de balayage doux et des rituels capillaires reconstructeurs. Le rendu final reste fidèle aux rituels appliqués et à la nature du cheveu original.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: PRACTICAL INFOS, FAQ, MAP ACCORDION */}
          {activeTab === "faq" && (
            <motion.div
              key="view-faq"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16 pt-6"
            >
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-accent block mb-2">Informations Pratiques</span>
                <h2 className="font-serif text-3xl font-normal text-editorial-charcoal">Fonctionnement <span className="italic font-light text-editorial-accent font-serif lowercase">et</span> FAQ</h2>
              </div>

              {/* Accordion FAQ items list - Crisp and refined */}
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index}
                      className="bg-editorial-bg border border-editorial-dark/10 overflow-hidden hover:border-editorial-accent transition-all duration-300"
                    >
                      <button
                        id={`faq-btn-${index}`}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-6 flex items-center justify-between text-left font-sans font-bold text-editorial-charcoal text-sm select-none cursor-pointer hover:bg-editorial-light"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[9px] text-editorial-accent font-extrabold px-2 py-0.5 bg-editorial-light border border-editorial-dark/10 rounded-none tracking-wider uppercase">
                            {item.category}
                          </span>
                          {item.question}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-editorial-accent transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-editorial-dark/5 bg-editorial-light text-editorial-dark text-[13px] leading-relaxed p-6 font-light"
                          >
                            {item.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Area Coverage Card visual - High-Contrast Editorial Block */}
              <div className="bg-editorial-charcoal text-white p-10 flex flex-col md:flex-row items-center gap-8 justify-between border border-editorial-accent/30 shadow-sm">
                <div className="space-y-3 text-center md:text-left">
                  <span className="px-3.5 py-1 text-[9px] tracking-[0.2em] uppercase text-editorial-accent font-bold border border-editorial-accent/20 bg-white/5">Secteur d'activité</span>
                  <h4 className="font-serif text-2xl font-light">Un doute sur votre commune ?</h4>
                  <p className="text-[#E5E1DA] text-[13px] leading-relaxed max-w-sm font-light">
                    Bettyna intervient principalement sur l'agglomération montpelliéraine (Montpellier, Lattes, Saint-Jean-de-Védas, Pérols, Villeneuve-lès-Maguelone et banlieue proche). Écrivez-nous directement pour valider d'autres régions.
                  </p>
                </div>
                <a
                  href="tel:0651018095"
                  className="px-8 py-4 bg-editorial-accent hover:bg-neutral-800 text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
                >
                  Appeler Bettyna (0651018095)
                </a>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
