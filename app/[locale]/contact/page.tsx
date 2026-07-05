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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      // silently fail
    }
    setLoading(false);
  };

  return (
    <div className="container-page py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2">
          {t("title")}
        </h1>
        <p className="text-stone-500 text-lg mb-12">{t("subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-wood-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-800">{t("address")}</h3>
              <p className="text-stone-500 text-sm">{t("address_line")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-wood-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-800">{t("phone")}</h3>
              <p className="text-stone-500 text-sm">+30 210 123 4567</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <p className="text-emerald-700 font-medium">{t("success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                {t("name")}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                {t("email")}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                {t("message")}
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="input-field resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? "..." : t("send")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
