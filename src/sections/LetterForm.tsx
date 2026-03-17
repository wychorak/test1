import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";

const schema = z.object({
  name: z.string().min(2, "Imię jest wymagane"),
  email: z.string().email("Nieprawidłowy adres email"),
  company: z.string().optional(),
  subject: z.string().min(3, "Temat jest wymagany"),
  message: z.string().min(10, "Treść wiadomości jest wymagana"),
});

type FormData = z.infer<typeof schema>;

export function LetterForm() {
  const { language } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const pl = language === "pl";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log(data);
    setSubmitted(true);
    reset();
    toast.success(pl ? "List wysłany pomyślnie." : "Letter sent successfully.");
  };

  return (
    <section
      id="letter-form"
      className="py-24 md:py-32 bg-[#060C18] relative z-10 overflow-hidden"
    >
      {/* subtle paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A1428' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Letter card */}
          <div className="bg-[#FFFDF7] shadow-[0_4px_60px_rgba(10,20,40,0.12),0_1px_4px_rgba(10,20,40,0.06)] rounded-sm relative">
            {/* Top edge fold effect */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-[#F5F0E8] border-l-[40px] border-l-transparent z-10" />

            {/* Letterhead */}
            <div className="border-b border-[#0A1428]/10 px-10 md:px-16 py-8 md:py-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-[0.25em] text-[#0A1428]/40 uppercase mb-1">
                  {pl ? "Kancelaria Prawna" : "Law Partners"}
                </div>
                <div className="text-3xl font-display font-semibold text-[#0A1428] tracking-tight">
                  LUMINA
                </div>
                <div className="text-xs text-[#0A1428]/40 mt-1 font-light tracking-wide">
                  Warsaw · London · New York
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#0A1428]/40 font-light">
                  {new Date().toLocaleDateString(pl ? "pl-PL" : "en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="text-xs text-[#0A1428]/40 font-light mt-0.5">
                  {pl ? "Nr ref. LLP-" : "Ref. LLP-"}
                  {Math.floor(Math.random() * 9000) + 1000}
                </div>
              </div>
            </div>

            {/* Letter body */}
            <div className="px-10 md:px-16 py-10 md:py-12">
              {/* Salutation */}
              <p className="text-sm font-light text-[#0A1428]/60 mb-2">
                {pl ? "Do:" : "To:"}
              </p>
              <p className="text-base font-medium text-[#0A1428] mb-8 font-display">
                {pl
                  ? "Lumina Law Partners – Dział Przyjęcia Klientów"
                  : "Lumina Law Partners – Client Intake Department"}
              </p>

              <p className="text-[#0A1428]/70 font-light leading-relaxed mb-10 text-sm md:text-base italic">
                {pl
                  ? "Szanowni Państwo, niniejszym zwracam się z prośbą o konsultację w poniższej sprawie:"
                  : "Dear Sirs and Madams, I hereby write to request a consultation regarding the following matter:"}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-4xl mb-4">✦</div>
                  <h3 className="text-2xl font-display font-semibold text-[#0A1428] mb-3">
                    {pl ? "List Otrzymany" : "Letter Received"}
                  </h3>
                  <p className="text-[#0A1428]/60 font-light">
                    {pl
                      ? "Skontaktujemy się w ciągu 24 godzin roboczych."
                      : "We will be in touch within 24 business hours."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs tracking-widest uppercase text-[#0A1428]/40 hover:text-[#0A1428] transition-colors font-medium"
                  >
                    {pl ? "Napisz kolejny list" : "Write another letter"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  {/* Two columns: name + company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#0A1428]/40 mb-2 font-medium">
                        {pl ? "Imię i Nazwisko" : "Full Name"} *
                      </label>
                      <input
                        {...register("name")}
                        className="w-full bg-transparent border-b border-[#0A1428]/20 focus:border-[#0A1428]/70 outline-none py-2 text-[#0A1428] text-sm font-light placeholder:text-[#0A1428]/25 transition-colors"
                        placeholder={pl ? "Jan Kowalski" : "John Smith"}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[#0A1428]/40 mb-2 font-medium">
                        {pl ? "Firma / Organizacja" : "Company / Organization"}
                      </label>
                      <input
                        {...register("company")}
                        className="w-full bg-transparent border-b border-[#0A1428]/20 focus:border-[#0A1428]/70 outline-none py-2 text-[#0A1428] text-sm font-light placeholder:text-[#0A1428]/25 transition-colors"
                        placeholder={pl ? "Nazwa firmy (opcjonalnie)" : "Company name (optional)"}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#0A1428]/40 mb-2 font-medium">
                      {pl ? "Adres Email" : "Email Address"} *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full bg-transparent border-b border-[#0A1428]/20 focus:border-[#0A1428]/70 outline-none py-2 text-[#0A1428] text-sm font-light placeholder:text-[#0A1428]/25 transition-colors"
                      placeholder="jan@firma.pl"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#0A1428]/40 mb-2 font-medium">
                      {pl ? "Temat Sprawy" : "Matter Subject"} *
                    </label>
                    <input
                      {...register("subject")}
                      className="w-full bg-transparent border-b border-[#0A1428]/20 focus:border-[#0A1428]/70 outline-none py-2 text-[#0A1428] text-sm font-light placeholder:text-[#0A1428]/25 transition-colors"
                      placeholder={pl ? "Krótki opis sprawy" : "Brief description of matter"}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#0A1428]/40 mb-2 font-medium">
                      {pl ? "Treść Listu" : "Letter Body"} *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full bg-transparent border-b border-[#0A1428]/20 focus:border-[#0A1428]/70 outline-none py-2 text-[#0A1428] text-sm font-light placeholder:text-[#0A1428]/25 transition-colors resize-none leading-7"
                      placeholder={
                        pl
                          ? "Proszę opisać swoją sprawę oraz oczekiwania wobec współpracy..."
                          : "Please describe your matter and expectations for our collaboration..."
                      }
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Closing & signature area */}
                  <div className="pt-4 border-t border-[#0A1428]/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <p className="text-sm font-light text-[#0A1428]/60 italic mb-3">
                        {pl ? "Z wyrazami szacunku," : "Yours faithfully,"}
                      </p>
                      <div className="h-8 w-36 border-b border-[#0A1428]/20" />
                      <p className="text-xs text-[#0A1428]/30 mt-1 tracking-wide">
                        {pl ? "Podpis / Pieczęć" : "Signature / Stamp"}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-3 bg-[#0A1428] text-white text-xs tracking-[0.2em] uppercase font-medium px-8 py-4 hover:bg-[#0A1428]/80 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                          {pl ? "Wysyłanie..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          <span>✦</span>
                          {pl ? "Wyślij List" : "Send Letter"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer rule */}
            <div className="border-t border-[#0A1428]/8 px-10 md:px-16 py-4 flex items-center justify-between">
              <p className="text-[10px] tracking-widest uppercase text-[#0A1428]/25 font-medium">
                Lumina Law Partners
              </p>
              <p className="text-[10px] text-[#0A1428]/20 font-light">
                {pl ? "Poufne — Tylko dla Adresata" : "Confidential — Addressee Only"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
