import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, ChevronDown, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const getInTouch = [
  { title: 'Call Us', detail: '+91 98765 43210', sub: 'Mon - Sat: 9:00 AM - 7:00 PM', icon: Phone },
  { title: 'Email Us', detail: 'info@shamikaholidays.com', sub: 'We reply within 24 hours', icon: Mail },
  { title: 'WhatsApp', detail: '+91 98765 43210', sub: 'Chat with us on WhatsApp', icon: MessageCircle },
  { title: 'Our Office', detail: '123 Travel Street, Dehradun', sub: 'Uttarakhand, India - 248001', icon: MapPin }
];

const faqs = [
  { q: 'What is the best time to visit Uttarakhand?', a: 'The best time is between March-June and September-November, when the weather is pleasant for sightseeing and trekking.' },
  { q: 'Do you provide customized tour packages?', a: 'Yes, our travel experts can tailor any package to your dates, budget, and interests — just share your requirements with us.' },
  { q: 'How can I book a hotel or tour package?', a: 'You can book directly through our website, or reach out via call, WhatsApp, or the contact form and our team will assist you.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, all major debit/credit cards, and net banking for secure and convenient payments.' },
  { q: 'Do you offer 24/7 travel support?', a: 'Yes, our support desk is available round the clock to assist you during your trip for any assistance you may need.' }
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
    }, 4000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="w-full text-left bg-[#F8FAFC] pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&auto=format&fit=crop&q=80"
            alt="Contact Shamika Holidays"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-10 md:pb-20">
          <p className="text-xs font-bold text-slate-200 mb-3 flex items-center gap-1.5">
            <Link to="/" className="hover:text-[#F0C878] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#F0C878] font-extrabold">Contact Us</span>
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-xl">
            Contact Us
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            We're here to help! Reach out for any queries, assistance or travel support.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-white text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-[#D9A441]" /> Trusted & Reliable — We Care For Your Journey
          </div>
        </div>
      </section>

      {/* Get in Touch Cards */}
      <div className="relative z-20 -mt-10 md:-mt-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {getInTouch.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-5 border border-slate-200/90 soft-shadow-hover flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl sh-gradient-cta flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-900">{item.title}</h3>
                <p className="text-sm font-bold text-slate-800 mt-1">{item.detail}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form + FAQ + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Send Message Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 soft-shadow-hover">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">Send Us a Message</h2>
          <p className="text-xs text-slate-500 mb-6 font-medium">Fill out the form and our team will get back to you shortly.</p>

          {submitted && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been sent. Our team will connect with you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5B1F70] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                <input
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5B1F70] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5B1F70] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Subject *</label>
                <select
                  name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 cursor-pointer focus:border-[#5B1F70] focus:bg-white transition-all"
                >
                  <option>General Enquiry</option>
                  <option>Tour Package Booking</option>
                  <option>Hotel Booking</option>
                  <option>Custom Itinerary</option>
                  <option>Support & Complaints</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Message *</label>
              <textarea
                name="message" rows="5" required value={formData.message} onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5B1F70] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full sh-gradient-cta text-white font-bold py-4 rounded-2xl shadow-md text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* FAQ + Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 soft-shadow-hover">
            <h3 className="text-base font-extrabold text-slate-900 border-l-4 border-[#D6266B] pl-3 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#5B1F70] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <p className="px-4 pb-4 text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 soft-shadow-hover">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">Find Us Here</h3>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative bg-slate-100 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1601122650423-8a993369bf9a?w=700&auto=format&fit=crop&q=80" alt="Map location" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 flex items-center gap-2.5 shadow-md">
                <MapPin className="w-5 h-5 text-[#D6266B] shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Shamika Holidays</p>
                  <p className="text-[10px] text-slate-500 font-medium">123 Travel Street, Dehradun, Uttarakhand - 248001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
