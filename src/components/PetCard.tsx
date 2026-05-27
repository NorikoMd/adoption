/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Check, 
  Activity, 
  Sparkles,
  ShieldAlert,
  Calendar,
  Weight
} from 'lucide-react';
import { Pet } from '../types';

interface PetCardProps {
  key?: string | number;
  pet: Pet;
  onAdoptClick: (pet: Pet) => void;
}

export default function PetCard({ pet, onAdoptClick }: PetCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % pet.photos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + pet.photos.length) % pet.photos.length);
  };

  const isMale = pet.gender === 'Male';

  return (
    <motion.div
      id={`pet-card-${pet.id}`}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-amber-100 flex flex-col h-full group transition-all duration-300"
    >
      {/* Photo Carousel Container */}
      <div id={`carousel-container-${pet.id}`} className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            id={`carousel-image-${pet.id}-${currentImageIndex}`}
            key={currentImageIndex}
            src={pet.photos[currentImageIndex]}
            alt={`${pet.name} photo`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        {pet.photos.length > 1 && (
          <>
            <button
              id={`prev-photo-btn-${pet.id}`}
              onClick={handlePrevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md hover:bg-white hover:text-brand-600 hover:scale-110 active:scale-95 transition-all z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id={`next-photo-btn-${pet.id}`}
              onClick={handleNextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md hover:bg-white hover:text-brand-600 hover:scale-110 active:scale-95 transition-all z-10"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Carousel Dots Indicators */}
        <div id={`carousel-dots-${pet.id}`} className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
          {pet.photos.map((_, idx) => (
            <button
              id={`dot-btn-${pet.id}-${idx}`}
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex 
                  ? 'bg-amber-400 w-4' 
                  : 'bg-white/75 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Category & Breed Badge Card Overlay */}
        <div id={`badges-overlay-${pet.id}`} className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span 
            id={`badge-category-${pet.id}`}
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1 text-white backdrop-blur-md ${
              pet.category === 'dog' ? 'bg-amber-500/90' : 'bg-orange-500/90'
            }`}
          >
            <span>{pet.category === 'dog' ? '🐶 Dog' : '🐱 Cat'}</span>
          </span>
          <span 
            id={`badge-breed-${pet.id}`}
            className="px-3 py-1 rounded-full text-xs font-medium text-slate-800 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/50"
          >
            {pet.breed}
          </span>
        </div>

        {/* Favorite Heart Trigger */}
        <button
          id={`favorite-btn-${pet.id}`}
          onClick={(e) => {
            e.stopPropagation();
            setFavorite(!favorite);
          }}
          className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md shadow-md transition-all duration-300 active:scale-90 ${
            favorite 
              ? 'bg-red-50 text-red-500 scale-105 border border-red-200/30' 
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={20} fill={favorite ? "currentColor" : "none"} className={favorite ? "animate-heartbeat" : ""} />
        </button>
      </div>

      {/* Pet Information & Content Area */}
      <div id={`pet-info-area-${pet.id}`} className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Title row */}
          <div id={`title-row-${pet.id}`} className="flex justify-between items-start mb-3">
            <div>
              <h3 id={`pet-name-${pet.id}`} className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
                {pet.name}
              </h3>
              <p id={`pet-breed-sub-${pet.id}`} className="text-sm font-medium text-amber-600/90 font-sans mt-0.5">
                Breed: {pet.breed}
              </p>
            </div>

            {/* Gender Badge */}
            <span
              id={`gender-badge-${pet.id}`}
              className={`px-3 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1 ${
                isMale 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50' 
                  : 'bg-pink-50 text-pink-700 border border-pink-200/50'
              }`}
            >
              {isMale ? '♂️ Male' : '♀️ Female'}
            </span>
          </div>

          {/* Core Info Badges Mini-Grid (Age, Weight, Color) */}
          <div id={`info-grid-${pet.id}`} className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div id={`info-age-${pet.id}`} className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl text-slate-700">
              <Calendar size={13} className="text-amber-500 flex-shrink-0" />
              <span className="truncate"><strong>Age:</strong> {pet.age}</span>
            </div>
            <div id={`info-weight-${pet.id}`} className="flex items-center gap-1.5 p-2 bg-slate-50 rounded-xl text-slate-700">
              <Weight size={13} className="text-amber-500 flex-shrink-0" />
              <span className="truncate"><strong>Weight:</strong> {pet.weight}</span>
            </div>
          </div>

          {/* Personality Description Text */}
          <p id={`pet-description-${pet.id}`} className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed italic border-l-2 border-amber-300 pl-3">
            "{pet.description}"
          </p>

          {/* Personality tags */}
          <div id={`personality-tags-box-${pet.id}`} className="flex flex-wrap gap-1 mb-5">
            {pet.personality.map((tag, index) => (
              <span
                id={`personality-tag-${pet.id}-${index}`}
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs bg-amber-50 text-amber-800 border border-amber-200/40 font-medium"
              >
                🏷️ {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 my-4" />

          {/* Health Status Box */}
          <div id={`health-status-box-${pet.id}`} className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
            <h4 id={`health-title-${pet.id}`} className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Activity size={14} className="text-amber-600" />
              Health & Medical Status
            </h4>
            <div id={`health-checklist-${pet.id}`} className="grid grid-cols-3 gap-2 mb-2.5">
              <div 
                id={`health-check-vac-${pet.id}`}
                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md justify-center ${
                  pet.healthStatus.vaccinated ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/30' : 'bg-amber-50/50 text-slate-400'
                }`}
              >
                {pet.healthStatus.vaccinated ? (
                  <Check size={11} className="text-emerald-600 stroke-[3px]" />
                ) : (
                  <ShieldAlert size={11} className="text-slate-300" />
                )}
                <span>Vaccine</span>
              </div>

              <div 
                id={`health-check-deworm-${pet.id}`}
                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md justify-center ${
                  pet.healthStatus.dewormed ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/30' : 'bg-amber-50/50 text-slate-400'
                }`}
              >
                {pet.healthStatus.dewormed ? (
                  <Check size={11} className="text-emerald-600 stroke-[3px]" />
                ) : (
                  <ShieldAlert size={11} className="text-slate-300" />
                )}
                <span>Dewormed</span>
              </div>

              <div 
                id={`health-check-neutered-${pet.id}`}
                className={`flex items-center gap-1 text-[11px] font-medium px-1.5 py-1 rounded-md justify-center ${
                  pet.healthStatus.neutered ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/30' : 'bg-amber-50/50 text-slate-400'
                }`}
              >
                {pet.healthStatus.neutered ? (
                  <Check size={11} className="text-emerald-600 stroke-[3px]" />
                ) : (
                  <ShieldAlert size={11} className="text-slate-300" />
                )}
                <span>Neutered</span>
              </div>
            </div>

            <div id={`health-summary-${pet.id}`} className="text-xs text-slate-600 flex items-start gap-1">
              <span className="text-amber-600 font-bold">Health:</span>
              <span>{pet.healthStatus.condition}</span>
            </div>
          </div>
        </div>

        {/* Adopt Button */}
        <button
          id={`adopt-btn-${pet.id}`}
          onClick={() => onAdoptClick(pet)}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-md shadow-orange-100 hover:shadow-lg hover:shadow-orange-200 active:scale-98 transform transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
        >
          <Sparkles size={16} className="animate-pulse" />
          <span>I Want to Adopt {pet.name}</span>
        </button>
      </div>
    </motion.div>
  );
}
