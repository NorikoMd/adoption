/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Search, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  Check, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { PETS_DATA } from './data';
import { Pet, AdoptionSubmission } from './types';
import PetCard from './components/PetCard';
import AdoptionModal from './components/AdoptionModal';
import FooterContact from './components/FooterContact';

export default function App() {
  // State elements
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dog' | 'cat'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'Male' | 'Female'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'youngest' | 'oldest'>('name');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Real-time local state to store completed submissions for dynamic user feedback!
  const [mySubmissions, setMySubmissions] = useState<AdoptionSubmission[]>([]);
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);
  const [successToastMessage, setSuccessToastMessage] = useState<string | null>(null);

  // Filter the list based on state selection
  const filteredPets = PETS_DATA.filter((pet) => {
    const matchCategory = selectedCategory === 'all' || pet.category === selectedCategory;
    const matchGender = selectedGender === 'all' || pet.gender === selectedGender;
    const matchSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        pet.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchGender && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    // Simple age sorting heuristic using simple extraction of numbers
    const getAgeVal = (ageStr: string) => {
      const yearMatch = ageStr.match(/(\d+)\s*Year/i);
      const monthMatch = ageStr.match(/(\d+)\s*Month/i);
      let months = 0;
      if (yearMatch) months += parseInt(yearMatch[1]) * 12;
      if (monthMatch) months += parseInt(monthMatch[1]);
      return months;
    };
    if (sortBy === 'youngest') {
      return getAgeVal(a.age) - getAgeVal(b.age);
    }
    if (sortBy === 'oldest') {
      return getAgeVal(b.age) - getAgeVal(a.age);
    }
    return 0;
  });

  const handleOpenAdoptionModal = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleNewSubmission = (submission: AdoptionSubmission) => {
    // Collect submission locally to show the real-time live notification/dashboard list
    setMySubmissions((prev) => [submission, ...prev]);
    setIsModalOpen(false);
    
    // Show top temporary toast feedback
    setSuccessToastMessage(`Adoption application for ${submission.petName} has been successfully submitted!`);
    setTimeout(() => setSuccessToastMessage(null), 6000);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQIndex(activeFAQIndex === index ? null : index);
  };

  const faqData = [
    {
      q: 'What are the main requirements to adopt a pet?',
      a: 'The number one requirement is a loving commitment! You must be at least 18 years old, possess a safe living environment for the pet, commit to nutritious food and regular medical check-ups, and agree to friendly periodic wellness checks by our volunteers.'
    },
    {
      q: 'Is there an adoption or registration fee?',
      a: 'Absolutely not! Adoption is 100% free and we never sell animals. However, we warmly welcome voluntary donations to help cover the costs of vaccines, neutering surgeries, food, and rescue medications for other street friends.'
    },
    {
      q: 'Can I return a pet if we are not a match?',
      a: 'We encourage a 2-week transition adjustment trial. If under extreme circumstances you are unable to keep the companion, we require returning them directly to our shelter for their safety. Please do not abandon them or hand them over to unverified third parties.'
    },
    {
      q: 'Are all pets vaccinated, sterilized, and healthy?',
      a: 'Yes, almost all adult companions are fully vaccinated, dewormed, and sterilized. For younger puppies or kittens who are too young for surgery, we schedule a free sterilization at our clinic partners once they come of age.'
    }
  ];

  return (
    <div id="app-root-container" className="min-h-screen bg-brand-50/40 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Floating Notification Toast */}
      <AnimatePresence>
        {successToastMessage && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: -80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 0.9 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-amber-400 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 w-[90vw] max-w-lg"
          >
            <span className="text-xl">🏆</span>
            <div className="flex-1 text-xs sm:text-sm">
              <strong className="text-amber-400 font-display">Success!</strong> {successToastMessage}
            </div>
            <button 
              id="close-toast-btn"
              onClick={() => setSuccessToastMessage(null)}
              className="text-white/60 hover:text-white font-bold ml-2 text-sm cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Navigation Header */}
      <header id="main-navigation-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100/50 shadow-xs">
        <div id="nav-inner-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo Identity */}
          <div id="brand-identity" className="flex items-center gap-3">
            <motion.div 
              id="logo-bubble"
              whileHover={{ rotate: 12, scale: 1.05 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-100"
            >
              <span className="text-2xl">🐾</span>
            </motion.div>
            <div id="logo-text-box">
              <h1 id="logo-headline" className="text-xl font-black font-display tracking-tight text-slate-900 flex items-center gap-1">
                Pet Adoption <span className="text-orange-500 text-sm">Harbor</span>
              </h1>
              <span id="logo-subhead" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block -mt-1">
                Endless Love • Since 2024
              </span>
            </div>
          </div>

          {/* Quick Stats and Action (Desktop Only) */}
          <div id="header-quick-links" className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1 animate-pulse">
                🟢 <span className="text-slate-700">8 Ready to Adopt</span>
              </span>
              <span className="flex items-center gap-1">
                ❤️ <span className="text-slate-700">140+ Warm Homes Found</span>
              </span>
            </div>
            <a 
              id="nav-contact-jump-btn"
              href="#footer-contact-wrapper" 
              className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors"
            >
              Contact &amp; Shelter Location
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        
        {/* Playful & Lively Hero Banner Section */}
        <section id="hero-banner-section" className="relative py-12 md:py-20 bg-gradient-to-b from-amber-100/50 via-orange-500/5 to-transparent overflow-hidden">
          {/* Cute decorative elements floating background */}
          <div className="absolute top-10 left-10 text-4xl opacity-10 animate-pulse pointer-events-none select-none">🍖</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-10 animate-bounce pointer-events-none select-none">🧶</div>
          <div className="absolute top-1/3 right-12 text-4xl opacity-10 pointer-events-none select-none">🐟</div>
          
          <div id="hero-grid-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left Content Column (7 cols) */}
            <div id="hero-text-col" className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div 
                initial={{ transform: 'translateY(15px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 1 }}
                id="hero-badge"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-800 border border-amber-200/40 text-xs font-bold leading-none mx-auto lg:mx-0"
              >
                <Sparkles size={14} className="text-amber-500 animate-pulse" />
                <span>Loyal Furry Friends are Waiting for Your Love</span>
              </motion.div>

              <motion.h2 
                initial={{ transform: 'translateY(15px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 1 }}
                transition={{ delay: 0.1 }}
                id="hero-header-text"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-slate-900"
              >
                Open Your Heart &amp; Home, <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-black">Find Your New Best Friend!</span>
              </motion.h2>

              <motion.p 
                initial={{ transform: 'translateY(15px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 1 }}
                transition={{ delay: 0.18 }}
                id="hero-description-p"
                className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
              >
                Lovely affectionate cats and playful energetic puppies at our harbor have received full health screenings, vaccinations, and are ready to bring endless joy to your warm family.
              </motion.p>

              {/* Quick Hero Actions */}
              <motion.div 
                initial={{ transform: 'translateY(15px)', opacity: 0 }}
                animate={{ transform: 'translateY(0px)', opacity: 1 }}
                transition={{ delay: 0.25 }}
                id="hero-actions-container"
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
              >
                <a 
                  id="hero-cta-button"
                  href="#adoption-catalogue-title"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold rounded-2xl text-sm shadow-lg shadow-orange-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Start Exploring Pets</span>
                  <ArrowRight size={16} />
                </a>
                <a 
                  id="hero-secondary-button"
                  href="#why-adopt-story"
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200/80 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <HelpCircle size={16} className="text-amber-500" />
                  <span>Adoption Steps</span>
                </a>
              </motion.div>

              {/* Key Trust Stats Box */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                id="hero-stats-line"
                className="pt-6 grid grid-cols-3 gap-4 border-t border-amber-200/30 max-w-md mx-auto lg:mx-0 text-left font-sans"
              >
                <div>
                  <span id="stat-count-1" className="block text-2xl font-black text-slate-950 font-display">100%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">Terms Free</span>
                </div>
                <div>
                  <span id="stat-count-2" className="block text-2xl font-black text-slate-950 font-display">8 Companions</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">Ready to Meet</span>
                </div>
                <div>
                  <span id="stat-count-3" className="block text-2xl font-black text-slate-950 font-display">Screened</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">Medically Verified</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Media Column (5 cols) */}
            <div id="hero-media-col" className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.15 }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                {/* Visual backdrops */}
                <div className="absolute inset-0 bg-amber-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animate-pulse" />
                <div className="absolute inset-0 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                
                {/* Playful Circle Card Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-tr from-amber-400/40 to-orange-500/30">
                  <img
                    id="hero-main-illustration"
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80"
                    alt="Cute puppy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-amber-100 shadow-lg flex items-center justify-between">
                    <div>
                      <strong className="text-xs text-slate-900 block font-display">Luna is waiting</strong>
                      <span className="text-[11px] text-slate-500 font-sans">Persian Peaknose, 1.5 Years</span>
                    </div>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">Sweet 🌸</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Dynamic Interactive User Submissions Panel (Shows up dynamically when they send applications!) */}
        <AnimatePresence>
          {mySubmissions.length > 0 && (
            <section id="my-submissions-panel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent p-6 rounded-3xl border border-emerald-500/30 shadow-xs animate-pulse"
              >
                <div id="sub-panel-header" className="flex items-center gap-2 mb-4">
                  <span className="text-2xl animate-spin">📋</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Your Active Adoption Submissions ({mySubmissions.length})</h3>
                    <p className="text-xs text-slate-500 font-sans">Your adoption form application is currently being processed by our shelter coordinators.</p>
                  </div>
                </div>

                {/* Submissions Cards Row/Grid */}
                <div id="sub-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mySubmissions.map((sub, index) => (
                    <motion.div
                      id={`submission-live-card-${sub.petId}`}
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                            🟢 Admin Reviewing
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {sub.petId}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 font-display border-b border-dashed border-slate-100 pb-2 mb-2">Adoption Request: {sub.petName}</h4>
                        <div className="text-xs text-slate-500 space-y-1 font-sans">
                          <p>👤 <strong>Applicant Name:</strong> {sub.userName}</p>
                          <p>📞 <strong>Contact Number:</strong> {sub.userPhone}</p>
                          <p>🐾 <strong>Experience:</strong> {
                            sub.experience === 'none' ? 'No Experience' :
                            sub.experience === 'some' ? 'Some Experience' : 'Highly Experienced'
                          }</p>
                        </div>
                      </div>
                      <div className="h-px bg-slate-100 my-3" />
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-sans">
                        <span>Submitted just now</span>
                        <span className="text-emerald-600 font-semibold cursor-help" title="Our volunteers are reviewing details. We will contact you via WhatsApp shortly.">
                          Awaiting WhatsApp Chat
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}
        </AnimatePresence>

        {/* Adoption Main Catalog & Search Filter Area */}
        <section id="adoption-catalogue" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
          
          {/* Section Section Header */}
          <div id="catalogue-section-header" className="text-center max-w-2xl mx-auto mb-10">
            <h3 id="adoption-catalogue-title" className="text-3xl font-extrabold font-display tracking-tight text-slate-900 mb-3">
              Furry Companions Ready for Adoption
            </h3>
            <p id="catalogue-subtitle" className="text-slate-500 text-sm leading-relaxed font-sans">
              We nurse and love our rescued dogs and cats with absolute care. Use the responsive filters below to find your perfect sweet companion.
            </p>
          </div>

          {/* Controls & Filter Panel Container */}
          <div id="controls-filter-panel" className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100/60 mb-8 space-y-4">
            
            {/* Top row: Category Tabs, Gender, and Sort Selector */}
            <div id="filters-top-row" className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* CATEGORY TABS (All / Dogs / Cats) */}
              <div id="category-tabs-wrapper" className="flex flex-wrap items-center gap-2">
                <span id="label-filter-title" className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline flex-shrink-0">
                  Animal Type:
                </span>
                
                <div id="tabs-group" className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50 w-full sm:w-auto">
                  {/* Tab - All */}
                  <button
                    id="filter-tab-all"
                    onClick={() => setSelectedCategory('all')}
                    className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 cursor-pointer'
                    }`}
                  >
                    🐾 All Pets ({PETS_DATA.length})
                  </button>

                  {/* Tab - Dogs */}
                  <button
                    id="filter-tab-dog"
                    onClick={() => setSelectedCategory('dog')}
                    className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedCategory === 'dog'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 cursor-pointer'
                    }`}
                  >
                    🐶 Dogs ({PETS_DATA.filter(p => p.category === 'dog').length})
                  </button>

                  {/* Tab - Cats */}
                  <button
                    id="filter-tab-cat"
                    onClick={() => setSelectedCategory('cat')}
                    className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedCategory === 'cat'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 cursor-pointer'
                    }`}
                  >
                    🐱 Cats ({PETS_DATA.filter(p => p.category === 'cat').length})
                  </button>
                </div>
              </div>

              {/* GENDER & SORT DROPDOWNS */}
              <div id="additional-selectors-wrapper" className="grid grid-cols-2 sm:flex items-center gap-2.5">
                
                {/* Gender Selective */}
                <div className="flex flex-col gap-1 w-full sm:w-36">
                  <select
                    id="gender-select"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-amber-400 text-xs sm:text-sm font-medium py-3 px-3.5 rounded-2xl outline-none transition-colors"
                  >
                    <option value="all">Gender (All)</option>
                    <option value="Male">♂️ Male</option>
                    <option value="Female">♀️ Female</option>
                  </select>
                </div>

                {/* Sort Option */}
                <div className="flex flex-col gap-1 w-full sm:w-44">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-amber-400 text-xs sm:text-sm font-medium py-3 px-3.5 rounded-2xl outline-none transition-colors"
                  >
                    <option value="name">Sort: Name (A-Z)</option>
                    <option value="youngest">Sort: Youngest First</option>
                    <option value="oldest">Sort: Oldest First</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Bottom row: Text Search Bar with icon */}
            <div id="filters-bottom-row" className="relative flex items-center flex-1">
              <div className="absolute left-4 text-slate-400 pointer-events-none">
                <Search size={18} />
              </div>
              <input
                id="text-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by pet name, breed (e.g. Persian, Golden, Poodle), or personality tags..."
                className="w-full pl-11 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none transition-all focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200/40 text-slate-800"
              />
              {searchQuery && (
                <button
                  id="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-200 hover:bg-slate-300 transition-colors text-slate-800 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter tags summarizer */}
            <div id="active-filters-tags" className="text-xs text-slate-500 flex flex-wrap items-center gap-2 pt-1 font-sans">
              <Filter size={13} className="text-amber-500" />
              <span>Filtered results:</span>
              <span className="bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-lg font-medium border border-amber-200/20 capitalize">
                Category: {selectedCategory === 'all' ? 'All' : selectedCategory}
              </span>
              <span className="bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-lg font-medium border border-amber-200/20">
                Gender: {selectedGender === 'all' ? 'All Genders' : selectedGender}
              </span>
              {searchQuery && (
                <span className="bg-orange-50 text-orange-950 px-2.5 py-0.5 rounded-lg font-medium border border-orange-200/20 max-w-xs truncate">
                  Search: "{searchQuery}"
                </span>
              )}
              <span className="ml-auto font-bold text-slate-700">
                Found {filteredPets.length} Companions
              </span>
            </div>

          </div>

          {/* Animate-ready grid for Card listings */}
          <motion.div 
            id="pets-catalogue-grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onAdoptClick={handleOpenAdoptionModal}
                  />
                ))
              ) : (
                <motion.div
                  id="empty-results-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-16 px-4 bg-white rounded-3xl border border-amber-100/60 shadow-xs text-center flex flex-col items-center max-w-lg mx-auto w-full"
                >
                  <span className="text-5xl mb-4 animate-bounce">😿</span>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 font-display">No Companion Found</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    We are so sorry! The furry friends you are searching for based on the keyword "{searchQuery}" or filters are not available in our shelter currently. Feel free to tweak the filters or inquire through our quick contact form.
                  </p>
                  <button
                    id="reset-search-btn"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setSelectedGender('all');
                    }}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Reset Filters &amp; Search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </section>

        {/* Informative Accordion & Tips Section (Educational content) */}
        <section id="why-adopt-story" className="bg-white py-16 border-t border-b border-amber-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Text & FAQS */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">Quick FAQs &amp; Tips</span>
                  <h3 className="text-3xl font-extrabold font-display leading-tight tracking-tight text-slate-900">
                    Everything You Need to Know About Adoption 🌸
                  </h3>
                  <p className="text-slate-600 text-sm mt-3 font-sans leading-relaxed">
                    We fully support the welfare of our street gems. Here are direct answers to our most frequently asked questions to help prepare you for your rewarding adoption journey.
                  </p>
                </div>

                {/* FAQ list */}
                <div id="faq-accordion-box" className="space-y-3">
                  {faqData.map((item, index) => {
                    const isOpen = activeFAQIndex === index;
                    return (
                      <div 
                        id={`faq-item-${index}`}
                        key={index} 
                        className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50 transition-colors"
                      >
                        <button
                          id={`faq-trigger-${index}`}
                          onClick={() => toggleFAQ(index)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-slate-800 hover:text-orange-500 text-sm sm:text-base outline-none transition-colors cursor-pointer"
                        >
                          <span className="pr-4">{item.q}</span>
                          <ChevronDown 
                            size={18} 
                            className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-orange-500' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`faq-ans-box-${index}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden bg-white border-t border-slate-100"
                            >
                              <p className="px-5 py-4 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column Image banner */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-8 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent rounded-3xl border border-amber-200/30 relative overflow-hidden">
                  <span className="text-3xl block mb-4">🏠</span>
                  <h4 className="text-xl font-bold text-slate-900 font-display mb-2">Adoption Saves Rescued Lives</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                    By choosing to adopt from our shelter instead of purchasing from commercial shops, you give a second life to a recovered street pet and open up a warm space for another homeless animal to be saved.
                  </p>
                  
                  <ul className="text-xs text-slate-700 space-y-2.5 font-sans font-medium">
                    <li className="flex items-center gap-2 text-emerald-800">
                      <Check size={14} className="text-emerald-500 stroke-[3px]" />
                      <span>Stops questionable puppy mills and commercial animal trading.</span>
                    </li>
                    <li className="flex items-center gap-2 text-emerald-800">
                      <Check size={14} className="text-emerald-500 stroke-[3px]" />
                      <span>Pets are already warm, socialized, and used to human companions.</span>
                    </li>
                    <li className="flex items-center gap-2 text-emerald-800">
                      <Check size={14} className="text-emerald-500 stroke-[3px]" />
                      <span>Receives transparent, fully certified medical health clearances.</span>
                    </li>
                  </ul>
                  
                  <div className="h-px bg-amber-300/30 my-6" />

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-sm font-bold">😊</div>
                    <div>
                      <strong className="text-xs text-slate-900 block font-sans">Compassionate Care</strong>
                      <span className="text-[10px] text-slate-400 font-mono">Managed by Passionate Volunteers</span>
                    </div>
                  </div>
                </div>

                {/* Small call to action banner info */}
                <div className="p-6 bg-slate-900 text-white rounded-3xl flex items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-sm font-display text-white">Just want to donate pet food?</h5>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans">We warmly welcome dry/wet pet food donations, clean pet blankets, and playing toys.</p>
                  </div>
                  <a 
                    href="#footer-contact-wrapper"
                    className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors flex-shrink-0"
                    aria-label="Contact us"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Footer Contact Area */}
      <FooterContact />

      {/* Adoption Form Modal Application popup */}
      <AdoptionModal
        pet={selectedPet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewSubmission}
      />

    </div>
  );
}
