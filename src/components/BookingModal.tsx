import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, User, Mail } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/Button";
import { toast } from "sonner";
import { useState } from "react";
import { translations } from "@/lib/translations";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function BookingModal() {
  const { isModalOpen, closeModal, language } = useAppStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const t = translations[language].modal;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
    toast.success(t.successTitle);
    setTimeout(() => {
      closeModal();
      setIsSuccess(false);
      reset();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-navy/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white/80 backdrop-blur-3xl border border-white/50 shadow-[0_24px_80px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8)] rounded-3xl overflow-hidden"
          >
            <div className="p-8">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-navy/50 hover:text-navy transition-colors"
              >
                <X size={24} />
              </button>

              {isSuccess ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mb-6"
                  >
                    <div className="w-10 h-10 bg-cyan rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-display font-semibold text-navy mb-2">{t.successTitle}</h3>
                  <p className="text-navy/70">{t.successDesc}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-display font-semibold text-navy mb-2">{t.title}</h2>
                  <p className="text-navy/80 mb-8">{t.subtitle}</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" size={18} />
                        <input
                          {...register("name")}
                          placeholder={t.namePlaceholder}
                          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:bg-white transition-all"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name.message}</p>}
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" size={18} />
                        <input
                          {...register("email")}
                          placeholder={t.emailPlaceholder}
                          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:bg-white transition-all"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" size={18} />
                          <input
                            type="date"
                            {...register("date")}
                            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:bg-white transition-all text-navy/80"
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" size={18} />
                          <select
                            {...register("time")}
                            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:bg-white transition-all text-navy/80 appearance-none"
                          >
                            <option value="">{t.timePlaceholder}</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">02:00 PM</option>
                            <option value="16:00">04:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                      {isSubmitting ? t.processing : t.submit}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
