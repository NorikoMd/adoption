/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Shield, Heart, Sparkles, Send, Calendar, Phone, Mail, User } from 'lucide-react';
import { Pet, AdoptionSubmission } from '../types';

interface AdoptionModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: AdoptionSubmission) => void;
}

export default function AdoptionModal({ pet, isOpen, onClose, onSubmit }: AdoptionModalProps) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [experience, setExperience] = useState('none');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!pet) return null;

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!userName.trim()) tempErrors.userName = 'Full name is required';
    if (!userEmail.trim()) {
      tempErrors.userEmail = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      tempErrors.userEmail = 'Please enter a valid email address';
    }
    if (!userPhone.trim()) {
      tempErrors.userPhone = 'Phone/WhatsApp number is required';
    } else if (!/^[0-9+ ]{8,16}$/.test(userPhone.replace(/\-/g, ''))) {
      tempErrors.userPhone = 'Please enter a valid phone number';
    }
    if (!userAddress.trim()) tempErrors.userAddress = 'Current residential address is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API request call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const submission: AdoptionSubmission = {
        petId: pet.id,
        petName: pet.name,
        userName,
        userEmail,
        userPhone,
        userAddress,
        experience,
        message
      };
      onSubmit(submission);
    }, 1500);
  };

  const resetFormAndClose = () => {
    setIsSuccess(false);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserAddress('');
    setExperience('none');
    setMessage('');
    setErrors({});
    onClose();
  };

  const isMale = pet.gender === 'Male';

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="adoption-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black Translucent Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetFormAndClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Card Content */}
          <motion.div
            id="modal-content-card"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-100 z-10 flex flex-col max-h-[90vh]"
          >
            {/* Modal Close Button */}
            <button
              id="modal-close-top-btn"
              onClick={resetFormAndClose}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100/80 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex items-center justify-center z-10"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header with Pet Info Bar */}
            <div id="modal-header-section" className="p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border-b border-amber-100/50 flex items-center gap-4">
              <img
                id="modal-pet-avatar"
                src={pet.photos[0]}
                alt={pet.name}
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-400/30"
                referrerPolicy="no-referrer"
              />
              <div id="modal-pet-title-box">
                <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">Adopt a Furry Friend</span>
                <h3 id="modal-pet-headline" className="text-xl font-bold font-display text-slate-900 leading-tight">
                  Adoption Form for {pet.name}
                </h3>
                <p id="modal-pet-caption" className="text-xs font-medium text-slate-500 mt-0.5">
                  {pet.breed} • {isMale ? 'Male' : 'Female'} • {pet.age}
                </p>
              </div>
            </div>

            {/* Main Modal Body (Scrollable if content overflows) */}
            <div id="modal-scroll-area" className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    id="adoption-entry-form"
                    key="adoption-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <p id="form-info-p" className="text-slate-600 text-sm leading-relaxed mb-1">
                      Thank you for your interest in caring for <strong>{pet.name}</strong>! Please fill out the form below so our shelter team can evaluate your adoption application.
                    </p>

                    {/* Full Name Input */}
                    <div id="field-box-name" className="flex flex-col gap-1.5">
                      <label id="lbl-user-name" className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                        <User size={12} className="text-amber-500" />
                        Your Full Name *
                      </label>
                      <input
                        id="input-user-name"
                        type="text"
                        value={userName}
                        onChange={(e) => {
                          setUserName(e.target.value);
                          if (errors.userName) setErrors(prev => ({ ...prev, userName: '' }));
                        }}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-2 ${
                          errors.userName 
                            ? 'border-red-400 focus:ring-red-200/50' 
                            : 'border-slate-200 focus:border-amber-400 focus:ring-amber-200/50'
                        }`}
                        placeholder="e.g. John Doe"
                      />
                      {errors.userName && (
                        <span id="err-user-name" className="text-xs font-medium text-red-500">{errors.userName}</span>
                      )}
                    </div>

                    {/* Two Column Contact Fields */}
                    <div id="form-double-col" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Input */}
                      <div id="field-box-email" className="flex flex-col gap-1.5">
                        <label id="lbl-user-email" className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <Mail size={12} className="text-amber-500" />
                          Email Address *
                        </label>
                        <input
                          id="input-user-email"
                          type="email"
                          value={userEmail}
                          onChange={(e) => {
                            setUserEmail(e.target.value);
                            if (errors.userEmail) setErrors(prev => ({ ...prev, userEmail: '' }));
                          }}
                          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-2 ${
                            errors.userEmail 
                              ? 'border-red-400 focus:ring-red-200/50' 
                              : 'border-slate-200 focus:border-amber-400 focus:ring-amber-200/50'
                          }`}
                          placeholder="johndoe@email.com"
                        />
                        {errors.userEmail && (
                          <span id="err-user-email" className="text-xs font-medium text-red-500">{errors.userEmail}</span>
                        )}
                      </div>

                      {/* Phone Input */}
                      <div id="field-box-phone" className="flex flex-col gap-1.5">
                        <label id="lbl-user-phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                          <Phone size={12} className="text-amber-500" />
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="input-user-phone"
                          type="tel"
                          value={userPhone}
                          onChange={(e) => {
                            setUserPhone(e.target.value);
                            if (errors.userPhone) setErrors(prev => ({ ...prev, userPhone: '' }));
                          }}
                          className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-2 ${
                            errors.userPhone 
                              ? 'border-red-400 focus:ring-red-200/50' 
                              : 'border-slate-200 focus:border-amber-400 focus:ring-amber-200/50'
                          }`}
                          placeholder="e.g. +628123456789"
                        />
                        {errors.userPhone && (
                          <span id="err-user-phone" className="text-xs font-medium text-red-500">{errors.userPhone}</span>
                        )}
                      </div>
                    </div>

                    {/* Address Input */}
                    <div id="field-box-address" className="flex flex-col gap-1.5">
                      <label id="lbl-user-address" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        🏠 Current Residential Address *
                      </label>
                      <textarea
                        id="input-user-address"
                        value={userAddress}
                        onChange={(e) => {
                          setUserAddress(e.target.value);
                          if (errors.userAddress) setErrors(prev => ({ ...prev, userAddress: '' }));
                        }}
                        rows={2}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:ring-2 ${
                          errors.userAddress 
                            ? 'border-red-400 focus:ring-red-200/50' 
                            : 'border-slate-200 focus:border-amber-400 focus:ring-amber-200/50'
                        }`}
                        placeholder="Please provide your full residential address where the pet will live..."
                      />
                      {errors.userAddress && (
                        <span id="err-user-address" className="text-xs font-medium text-red-500">{errors.userAddress}</span>
                      )}
                    </div>

                    {/* Pet Care Experience Selection */}
                    <div id="field-box-experience" className="flex flex-col gap-1.5">
                      <label id="lbl-user-experience" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        🐾 Pet Ownership Experience
                      </label>
                      <div id="experience-radio-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                        {[
                          { val: 'none', label: 'No Experience' },
                          { val: 'some', label: 'Some Experience' },
                          { val: 'expert', label: 'Highly Experienced' }
                        ].map((item) => (
                          <label
                            id={`experience-label-${item.val}`}
                            key={item.val}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                              experience === item.val
                                ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-200/40'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              id={`radio-experience-${item.val}`}
                              type="radio"
                              name="experience"
                              value={item.val}
                              checked={experience === item.val}
                              onChange={() => setExperience(item.val)}
                              className="accent-amber-500 w-4 h-4"
                            />
                            <span>{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message Details */}
                    <div id="field-box-message" className="flex flex-col gap-1.5">
                      <label id="lbl-user-message" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        ✉️ Additional Notes / Reason for Adopting (Optional)
                      </label>
                      <textarea
                        id="input-user-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm transition-all focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50"
                        placeholder="e.g. My family is highly excited to welcome a pet, and we have a grassy backyard for outdoor plays!"
                      />
                    </div>

                    {/* Safety Guarantee Card */}
                    <div id="safety-card" className="p-3.5 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-3 mt-4 text-xs">
                      <Shield size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
                      <div id="safety-text-box">
                        <strong className="text-sky-950 block">Information Safety Guarantee</strong>
                        <span className="text-sky-800 font-sans">
                          We are strictly committed to keeping your personal data secure. Filled information is only reviewed by our shelter team to evaluate a healthy match with our pets.
                        </span>
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div id="modal-form-actions" className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <button
                        id="form-cancel-btn"
                        type="button"
                        onClick={resetFormAndClose}
                        className="flex-shrink-0 px-5 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 active:scale-95 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        id="form-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 px-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl text-sm shadow-md shadow-orange-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing Form...</span>
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Submit Adoption Form</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    id="adoption-success-box"
                    key="adoption-success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="py-10 px-4 text-center flex flex-col items-center"
                  >
                    <motion.div
                      id="suc-icon-container"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-sm border border-emerald-200"
                    >
                      <CheckCircle size={44} className="stroke-[2.5px]" />
                    </motion.div>

                    <h3 id="suc-title" className="text-2xl font-bold font-display text-slate-900 mb-3">
                      Adoption Request Submitted!
                    </h3>
                    <p id="suc-desc" className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed mb-6 font-sans">
                      Thank you, <strong>{userName}</strong>! Your adoption application for our lovely <strong>{pet.name}</strong> has been received by our shelter coordinators.
                    </p>

                    <div id="suc-checklist-box" className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-3 text-xs mb-8">
                      <div id="suc-step-1" className="flex gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                        <div>
                          <strong>Internal Review (1-2 business days):</strong>
                          <p className="text-slate-500 mt-0.5">Our shelter counselors review your housing environment suitability and history.</p>
                        </div>
                      </div>
                      <div id="suc-step-2" className="flex gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                        <div>
                          <strong>Interview & Scheduling:</strong>
                          <p className="text-slate-500 mt-0.5">We will reach out to you via Phone/WhatsApp at <strong>{userPhone}</strong> for a brief friendly chat and family meet-up schedule.</p>
                        </div>
                      </div>
                      <div id="suc-step-3" className="flex gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                        <div>
                          <strong>Welcome Your New Companion:</strong>
                          <p className="text-slate-500 mt-0.5">Visit our adoption harbor with a secure pet carrier to sign final records and take them home!</p>
                        </div>
                      </div>
                    </div>

                    <button
                      id="suc-close-btn"
                      onClick={resetFormAndClose}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95"
                    >
                      Awesome, Return Home
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
