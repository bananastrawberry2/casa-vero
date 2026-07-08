"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {}
    setLoading(false);
  };

  return (
    <div className="bg-cream-bg min-h-screen">
      <div className="border-b border-stone-100">
        <div className="container-page py-16 md:py-20 text-center">
          <span className="text-wood-500 text-xs tracking-[0.3em] uppercase font-medium">Επικοινωνία</span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mt-4 mb-4">{t("title")}</h1>
          <p className="text-stone-400 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-4xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wood-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-wood-600" />
              </div>
              <div>
                <h3 className="font-medium text-stone-800 mb-1">{t("address")}</h3>
                <p className="text-stone-500 text-sm">{t("address_line")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wood-50 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-wood-600" />
              </div>
              <div>
                <h3 className="font-medium text-stone-800 mb-1">{t("phone")}</h3>
                <p className="text-stone-500 text-sm">+30 210 123 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wood-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-wood-600" />
              </div>
              <div>
                <h3 className="font-medium text-stone-800 mb-1">Email</h3>
                <p className="text-stone-500 text-sm">info@casavero.gr</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                <p className="text-emerald-700 font-medium">{t("success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("name")}</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-wood-300 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("email")}</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-wood-300 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">{t("message")}</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-wood-300 transition-all resize-none" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-3.5 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {loading ? "..." : t("send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
