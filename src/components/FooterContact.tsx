/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Send, 
  CheckCircle, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { CONTACT_DATA } from '../data';

export default function FooterContact() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMess, setErrorMess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !senderMessage.trim()) {
      setErrorMess('All fields are required to send your message.');
      return;
    }
    setErrorMess('');
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setSenderName('');
      setSenderEmail('');
      setSenderMessage('');
      
      // Clear success alert after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  return (
    <footer id="footer-contact-wrapper" className="bg-slate-950 text-slate-100 relative overflow-hidden pt-16 pb-12 font-sans">
      {/* Decorative colored glow bubbles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div id="footer-content-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Grid: Contact Info Info Box vs Contact Inquiry Form */}
        <div id="footer-top-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block - Contact Box & Details (5 cols) */}
          <div id="footer-contact-details" className="lg:col-span-5 space-y-8">
            <div id="contact-intro-header">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3"
              >
                <Sparkles size={12} className="text-amber-400" />
                <span>Our Contact Information</span>
              </motion.div>
              <h2 id="footer-headline" className="text-3xl font-extrabold font-display tracking-tight text-white mb-4">
                Have Questions? Contact Our Shelter 🐾
              </h2>
              <p id="footer-subtext" className="text-slate-400 text-sm leading-relaxed leading-relaxed">
                Would you like to consult about the adoption process or visit our shelter in person? Our volunteer team is excited to welcome you with open arms for the welfare of our furry friends.
              </p>
            </div>

            {/* List of Contact cards */}
            <div id="contact-list" className="space-y-4">
              
              {/* Card - Address */}
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/60 transition-colors hover:bg-slate-900/80"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shelter Address</h4>
                  <p className="text-sm font-medium mt-1 text-slate-200 leading-relaxed">{CONTACT_DATA.address}</p>
                </div>
              </motion.div>

              {/* Card - Phone */}
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/60 transition-colors hover:bg-slate-900/80"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone / WhatsApp</h4>
                  <p className="text-sm font-medium mt-1 text-slate-200">{CONTACT_DATA.phone}</p>
                </div>
              </motion.div>

              {/* Card - Email */}
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/60 transition-colors hover:bg-slate-900/80"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Official Email</h4>
                  <p className="text-sm font-medium mt-1 text-slate-200">{CONTACT_DATA.email}</p>
                </div>
              </motion.div>

              {/* Card - Working Hours */}
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/60 transition-colors hover:bg-slate-900/80"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Working Hours</h4>
                  <p className="text-sm font-medium mt-1 text-slate-200">{CONTACT_DATA.workingHours}</p>
                </div>
              </motion.div>

            </div>

            {/* Quick Action Buttons */}
            <div id="contact-action-hubs" className="flex flex-wrap gap-3 pt-2">
              <a
                id="hub-whatsapp-link"
                href={CONTACT_DATA.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 duration-200"
              >
                <MessageCircle size={16} />
                <span>Service WhatsApp</span>
              </a>
              <a
                id="hub-instagram-link"
                href={`https://instagram.com/${CONTACT_DATA.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 hover:opacity-90 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 duration-200"
              >
                <Instagram size={16} />
                <span>Instagram {CONTACT_DATA.instagram}</span>
              </a>
            </div>

          </div>

          {/* Right Block - Inquiry Interactive Form & Map (7 cols) */}
          <div id="footer-inquiry-box" className="lg:col-span-1" /> {/* Spacer */}
          <div id="footer-contact-form" className="lg:col-span-6 space-y-6">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              id="form-card-container" 
              className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl"
            >
              <h3 className="text-xl font-bold font-display text-white mb-2">Send a Quick Message</h3>
              <p className="text-xs text-slate-400 mb-6">General questions regarding adoption steps, pet food donations, or volunteer inquiries.</p>

              <form id="contact-inquiry-form-element" onSubmit={handleInquirySubmit} className="space-y-4">
                {/* Error Box */}
                {errorMess && (
                  <div className="p-3 bg-red-950/40 border border-red-900/50 text-red-300 text-xs rounded-xl font-medium">
                    ⚠️ {errorMess}
                  </div>
                )}

                {/* Success Banner */}
                {success && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-emerald-950/40 border border-emerald-900/50 text-emerald-200 text-xs sm:text-sm rounded-xl font-medium flex items-start gap-2.5"
                  >
                    <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
                    <div>
                      <strong>Your inquiry was submitted!</strong> We will reach out to your email address with a friendly response very soon.
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sender Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>

                  {/* Sender Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="johndoe@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Message / Inquiry</label>
                  <textarea
                    rows={4}
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="e.g. I would like to check if I can visit Boni the golden retriever at the shelter this weekend?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-5 bg-amber-500 hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-amber-950/30 mt-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Illustrative Map Card Mock */}
            <div id="illustrative-map-box" className="p-4 rounded-3xl bg-slate-900 border border-slate-800/60 overflow-hidden relative">
              <div className="flex justify-between items-center mb-3 text-xs">
                <span className="font-bold text-slate-300">Our Map &amp; Shelter Location</span>
                <span className="text-amber-400 font-semibold text-[10px] uppercase bg-amber-500/10 px-2 py-0.5 rounded-md">View Map</span>
              </div>
              <div className="h-28 rounded-2xl bg-slate-950 relative overflow-hidden flex items-center justify-center border border-slate-800">
                {/* Decorative Map Pattern Graphics */}
                <div className="absolute inset-0 opacity-15" style={{ 
                  backgroundImage: `radial-gradient(circle, #f1b72b 1px, transparent 1px)`, 
                  backgroundSize: '16px 16px' 
                }} />
                
                {/* Stylized road lines representation */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-800 -translate-y-1/2" />
                <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-slate-800" />
                <div className="absolute left-2/3 top-0 bottom-0 w-3 bg-slate-800 -rotate-12" />
                
                {/* Pulse locator pin icon marker */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <div className="relative flex">
                    <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border border-white" />
                  </div>
                  <span className="mt-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md text-[9px] font-bold text-white shadow-md">Our Shelter</span>
                </div>
                
                <span className="text-[10px] text-slate-500 font-mono absolute bottom-2 right-2">Coordinates: -6.2297, 106.8164</span>
              </div>
            </div>

          </div>

        </div>

        {/* Brand Copyright and Disclaimers */}
        <div id="footer-copyright-row" className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-lg">🐾</span>
            <span className="font-semibold text-slate-400 font-display">Pet Adoption Harbor</span>
            <span>- Finding Loving Homes for Furry Buddies</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Donations</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Pet Adoption Harbor. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
