"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle, User } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitCount, setSubmitCount] = useState(0);

  // Real-time validation
  const validateField = (field: keyof FormData, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[field];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0]?.message }));
      }
      return false;
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Real-time validation after user starts typing
    if (value.length > 0) {
      validateField(field, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: FormErrors = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof FormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setSubmitCount(prev => prev + 1);

    // Show loading toast
    const loadingToast = toast.loading('Sending your message...', {
      icon: '📤',
    });

    try {
      const response = await fetch('/api/send-email-modern', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success!
        toast.dismiss(loadingToast);
        toast.success(
          `✅ Message sent successfully! ${data.autoReply ? 'Check your email for confirmation.' : ''}`,
          {
            duration: 6000,
            icon: '🚀',
          }
        );

        // Reset form
        setFormData({ name: "", email: "", message: "" });
        setErrors({});

        // Show method used for debugging (only in dev)
        if (process.env.NODE_ENV === 'development') {
          toast(`📡 Sent via ${data.method}`, { icon: '🔧' });
        }

      } else {
        // Handle specific errors
        toast.dismiss(loadingToast);

        if (response.status === 429) {
          toast.error('⏰ Too many requests. Please wait an hour before trying again.', {
            duration: 8000,
          });
        } else if (response.status === 400) {
          toast.error('❌ Please check your input and try again.');
          if (data.details) {
            setErrors(data.details);
          }
        } else if (response.status === 503 && data.fallback) {
          // Offer mailto fallback
          toast.error(
            '⚠️ Email service temporarily unavailable. Opening your email client...',
            { duration: 6000 }
          );
          setTimeout(() => {
            window.open(data.fallback, '_blank');
          }, 2000);
        } else {
          toast.error('❌ Failed to send message. Please try again later.');
        }
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Contact form error:', error);

      // Network error fallback
      toast.error('🌐 Connection error. Check your internet and try again.', {
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "revorahmat@gmail.com",
      href: "mailto:revorahmat@gmail.com",
      description: "Best way to reach me"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+62 851 5689 5683",
      href: "tel:+6285156895683",
      description: "Available during business hours"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Indonesia",
      href: "https://goo.gl/maps/indonesia",
      description: "UTC+7 timezone"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-white/90 backdrop-blur-sm',
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
              I'm always excited to work on new challenges!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Send Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.name
                          ? 'border-red-500/50 focus:ring-red-500/50'
                          : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
                      }`}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email
                          ? 'border-red-500/50 focus:ring-red-500/50'
                          : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
                      }`}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                      <span className="text-xs text-gray-400 ml-2">
                        ({formData.message.length}/1000 characters)
                      </span>
                    </label>
                    <textarea
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                        errors.message
                          ? 'border-red-500/50 focus:ring-red-500/50'
                          : 'border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50'
                      }`}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Message {submitCount > 0 && `(${submitCount})`}
                      </>
                    )}
                  </button>

                  {/* Form Footer */}
                  <p className="text-center text-sm text-gray-400">
                    🔒 Your information is secure and will never be shared.
                    {submitCount > 0 && (
                      <span className="block mt-1">
                        ✨ Auto-reply confirmation will be sent to your email.
                      </span>
                    )}
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm currently available for freelance work and full-time opportunities.
                  Whether you have a question or just want to say hi, I'll do my best to get back to you!
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : '_self'}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{info.label}</h4>
                      <p className="text-purple-400 hover:text-cyan-400 transition-colors">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-400">{info.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Response Time Info */}
              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-lg font-semibold">Quick Response</h4>
                </div>
                <p className="text-gray-300">
                  I typically respond within <strong>24 hours</strong>.
                  For urgent matters, please call or send a WhatsApp message.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  🌏 Based in Indonesia (UTC+7)
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
