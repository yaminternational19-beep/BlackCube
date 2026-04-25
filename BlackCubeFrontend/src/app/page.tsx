"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  Cloud,
  Code,
  Palette,
  Target,
  Zap,
  Shield,
  Globe,
  Star,
  Award,
  TrendingUp,
  Users,
  ChevronDown,
  Plus,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { pageApi, getAssetUrl } from "@/lib/api";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = (
      ref: HTMLDivElement | null,
      speed: number,
      reverse = false
    ) => {
      if (!ref) return;
      const el = ref;
      let scrollAmount = 0;

      const animate = () => {
        scrollAmount += reverse ? -speed : speed;
        if (reverse) {
          if (scrollAmount <= 0) scrollAmount = el.scrollWidth / 2;
        } else {
          if (scrollAmount >= el.scrollWidth / 2) scrollAmount = 0;
        }
        el.scrollLeft = scrollAmount;
        requestAnimationFrame(animate);
      };
      animate();
    };

    scroll(scrollRef1.current, 0.3); // right → left
    scroll(scrollRef2.current, 0.3, true); // left → right
  }, []);

  const [heroSlides, setHeroSlides] = useState([
    {
      title: "",
      titleHighlight: "",
      subtitle:
        "",
      cta: "",
      cta2: "",
    },
  ]);

  const [services, setServices] = useState([
    {
      icon: Globe,
      title: "",
      desc: "",
    },
    {
      icon: Code,
      title: "",
      desc: "",
    },
    {
      icon: Palette,
      title: "",
      desc: "",
    },
    {
      icon: Cloud,
      title: "",
      desc: "",
    },
  ]);

  const [reasons, setReasons] = useState([
    {
      icon: Target,
      title: "",
      desc: "",
    },
    {
      icon: Shield,
      title: "",
      desc: "",
    },
    {
      icon: Zap,
      title: "",
      desc: "",
    },
    {
      icon: Users,
      title: "",
      desc: "",
    },
    {
      icon: TrendingUp,
      title: "",
      desc: "",
    },
    {
      icon: Award,
      title: "",
      desc: "",
    },
  ]);

  const [works, setWorks] = useState([
    {
      title: "",
      category: "",
      client: "",
      year: "",
      bg: "",
    },
    {
      title: "",
      category: "",
      client: "",
      year: "",
      bg: "",
    },
    {
      title: "",
      category: "",
      client: "",
      year: "",
      bg: "",
    },
    {
      title: "",
      category: "",
      client: "",
      year: "",
      bg: "",
    },
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      text: "",
      name: "",
      role: "",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      text: "",
      name: "",
      role: "",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      text: "",
      name: "",
      role: "",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
  ]);

  const [faqs, setFaqs] = useState([
    {
      q: "",
      a: "",
    },
    {
      q: "",
      a: "",
    },
    {
      q: "",
      a: "",
    },
    {
      q: "",
      a: "",
    },
    {
      q: "",
      a: "",
    },
    {
      q: "",
      a: "",
    },
  ]);

  const [clients, setClients] = useState([
    {
      name: "",
      description:
        "",
    },
    {
      name: "",
      description:
        "",
    },
    {
      name: "",
      description:
        "",
    },
    {
      name: "",
      description:
        "",
    },
    {
      name: "",
      description:
        "",
    },
    {
      name: "",
      description:
        "",
    },
  ]);

  // Section headings and Final CTA
  const [headings, setHeadings] = useState({
    servicesTitlePrefix: "",
    servicesTitleHighlight: "",
    servicesDescription:
      "",
    reasonsTitlePrefix: "",
    reasonsTitleHighlight: "",
    reasonsTitleLine2: "",
    reasonsDescription:
      "",
    worksTitlePrefix: "",
    worksTitleHighlight: "",
    worksDescription:
      "",
    testimonialsTitlePrefix: "",
    testimonialsTitleHighlight: "",
    testimonialsDescription:
      "",
    faqsTitlePrefix: "",
    faqsTitleHighlight: "",
    faqsDescription:
      "",
    clientsTitlePrefix: "",
    clientsTitleHighlight: "",
    clientsDescription:
      "",
  });

  const [finalCta, setFinalCta] = useState({
    titlePrefix: "",
    titleHighlight: "",
    description:
      "",
    primaryButton: "",
    secondaryButton: "",
  });

  // Load content from CMS API
  useEffect(() => {
    const load = async () => {
      try {
        const res = await pageApi.get('home');
        if (res.success && res.data) {
          const fields = res.data.fields || [];
          fields.forEach((f: any) => {
            if (f.id === 'hero' && f.value) {
              setHeroSlides([{ ...heroSlides[0], ...f.value }]);
            }
            if (f.id === 'services' && Array.isArray(f.value)) {
              // Map to icon components where possible; fallback to Globe
              const iconMap: Record<string, any> = { Globe, Code, Palette, Cloud };
              setServices(
                f.value.map((s: any) => ({
                  icon: iconMap[s.icon] || Globe,
                  title: s.title,
                  desc: s.desc || s.description || '',
                }))
              );
            }
            if (f.id === 'reasons' && Array.isArray(f.value)) {
              const iconMap: Record<string, any> = { Target, Shield, Zap, Users, TrendingUp, Award };
              setReasons(
                f.value.map((r: any) => ({
                  icon: iconMap[r.icon] || Target,
                  title: r.title,
                  desc: r.desc || r.description || '',
                }))
              );
            }
            if (f.id === 'works' && Array.isArray(f.value)) setWorks(f.value);
            if (f.id === 'testimonials' && Array.isArray(f.value)) setTestimonials(f.value);
            if (f.id === 'faqs' && Array.isArray(f.value)) setFaqs(f.value);
            if (f.id === 'clients' && Array.isArray(f.value)) setClients(f.value);
            if (f.id === 'headings' && f.value) setHeadings(f.value);
            if (f.id === 'finalCta' && f.value) setFinalCta(f.value);
          });
        }
      } catch (e) {
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">
            BC
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {heroSlides[0].title}{" "}
                  <span className="text-gray-400">
                    {heroSlides[0].titleHighlight}
                  </span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {heroSlides[0].subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <button onClick={() => router.push('/contact')} className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {heroSlides[0].cta}
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {heroSlides[0].cta2}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reasons Section */}
        <section id="reasons" className="py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {headings.reasonsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.reasonsTitleHighlight}</span>
              </h2>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-300 mb-6">
                {headings.reasonsTitleLine2}
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {headings.reasonsDescription}
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Card hover className="h-full relative bg-[#111] rounded-2xl p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] ring-0">
                    {/* Radial glow behind icon */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] rounded-full blur-lg"></div>

                    {/* Icon */}
                    <div className="relative z-10 w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#222] transition-colors">
                      <reason.icon className="w-6 h-6 text-white opacity-90" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {reason.desc}
                    </p>

                    {/* Button */}
                    <button className="mt-6 text-sm flex items-center text-gray-400 hover:text-white transition-all">
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-black text-white py-16 px-6 md:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.servicesTitlePrefix}{" "}
                <span className="text-gray-400">{headings.servicesTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {headings.servicesDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card
                  hover
                  key={index}
                  className="h-full relative group bg-gradient-to-br from-neutral-900 via-black to-neutral-950 rounded-2xl p-10 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-0"
                >
                  {/* Subtle grid effect */}
                  <div
                    className="absolute inset-0 opacity-[0.03] rounded-2xl pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Soft inner shadow for depth */}
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"></div>

                  {/* Glow circle behind icon */}
                  <div className="absolute top-16 h-24 w-24 rounded-full bg-gradient-to-b from-neutral-700/20 to-transparent blur-2xl"></div>

                  {/* Card content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-neutral-800/80 backdrop-blur-sm p-4 rounded-full mb-6 flex items-center justify-center ring-1 ring-white/10 group-hover:bg-neutral-700 transition-all duration-300">
                      {(service as any).image ? (
                        <img src={getAssetUrl((service as any).image)} alt={service.title} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <service.icon className="w-6 h-6 text-white opacity-90" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">{service.desc}</p>
                    <button onClick={() => router.push('/services')} className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all ring-1 ring-white/10 rounded-full px-4 py-2 hover:bg-neutral-800">
                      Learn More →
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all border border-neutral-700 rounded-full px-5 py-2 hover:bg-neutral-800"
              >
                More
              </a>
            </div>
          </div>
        </section>

        <section id="works" className="py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {headings.worksTitlePrefix}{" "}
                <span className="text-gray-400">{headings.worksTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
                {headings.worksDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {works.map((work, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className=""
                >
                  <Card hover className="rounded-2xl bg-[#0b0b0b] overflow-hidden transition-all duration-300 ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-0">
                    {/* Top Card Section */}
                    <div className="relative h-56 bg-gradient-to-b from-[#0f172a] to-black flex items-center justify-center rounded-t-2xl">
                      {(work as any).image && (
                        <img src={getAssetUrl((work as any).image)} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
                      )}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

                      {/* Diamond Logo */}
                      <div className="w-16 h-16 bg-gray-400/10 border border-gray-700/30 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                        <div className="w-6 h-6 bg-gray-400/20 rotate-45 shadow-inner shadow-black/40" />
                      </div>

                      {/* Button */}
                      <button onClick={() => router.push('/portfolio')} className="absolute bottom-5 px-5 py-2 rounded-full bg-[#101010] ring-1 ring-white/10 text-gray-300 text-sm backdrop-blur-sm hover:bg-[#161616] transition-all duration-300">
                        View Projects Details →
                      </button>
                    </div>

                    {/* Bottom Info Section */}
                    <div className="px-6 py-5">
                      <h3 className="text-lg font-semibold mb-1">{work.title}</h3>
                      <div className="flex justify-between text-gray-400 text-sm">
                        <span>Category: {work.category}</span>
                        <span>{work.year}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-all border border-gray-700 rounded-full px-5 py-2 hover:bg-[#161616]"
              >
                More
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Section - slider */}
        <section id="testimonials" className="py-20 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                {headings.testimonialsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.testimonialsTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">
                {headings.testimonialsDescription}
              </p>
            </motion.div>

            {/* 🔹 Top Marquee (Right → Left) */}
            <div
              ref={scrollRef1}
              className="flex overflow-x-scroll no-scrollbar gap-6 mb-8"
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <Card
                  hover
                  key={`top-${i}`}
                  className="rounded-2xl p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] flex-shrink-0 border-0"
                >
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-[14px] mb-4 leading-relaxed">
                    {t.text}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={getAssetUrl(t.avatar)}
                      alt={t.name}
                      className="w-9 h-9 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-[14px]">
                        {t.name}
                      </h4>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 🔹 Bottom Marquee (Left → Right) */}
            <div
              ref={scrollRef2}
              className="flex overflow-x-scroll no-scrollbar gap-6"
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <Card
                  hover
                  key={`bottom-${i}`}
                  className="rounded-2xl p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] flex-shrink-0 border-0"
                >
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-[14px] mb-4 leading-relaxed">
                    {t.text}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={getAssetUrl(t.avatar)}
                      alt={t.name}
                      className="w-9 h-9 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-white text-[14px]">
                        {t.name}
                      </h4>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Hide Scrollbar */}
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {headings.clientsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.clientsTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                {headings.clientsDescription}
              </p>
            </motion.div>

            {/* Client Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {clients.map((client, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className=""
                >
                  <Card hover className="relative rounded-2xl bg-[#0b0b0b] overflow-hidden group transition-all duration-500 ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-0">
                    {/* Subtle grid pattern background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-10"></div>

                    {/* Icon Row */}
                    <div className="relative z-10 flex items-center justify-center gap-6 pt-10 pb-6">
                      {/* Left Icon (DX) */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] blur-md opacity-30 group-hover:opacity-50 transition-all"></div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 flex items-center justify-center text-gray-200 font-semibold text-lg shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                          BC
                        </div>
                      </div>

                      <span className="text-gray-500 text-2xl font-light">+</span>

                      {/* Right Icon (Client initial) */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] blur-md opacity-30 group-hover:opacity-50 transition-all"></div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 flex items-center justify-center text-gray-200 font-semibold text-lg shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                          {client.name[0]}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-6 pb-10 text-center">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {client.name}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {client.description}
                      </p>
                    </div>

                    {/* Overlay Glow Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_70%)] opacity-20 group-hover:opacity-30 transition-all"></div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {headings.faqsTitlePrefix}{" "}
                <span className="text-gray-400">{headings.faqsTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {headings.faqsDescription}
              </p>
            </motion.div>

            {/* FAQ Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] rounded-2xl transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left text-white font-medium hover:bg-[#1a1a1a] transition-all duration-300"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: openFaq === i ? "auto" : 0,
                        opacity: openFaq === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-8 pb-6 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {finalCta.titlePrefix}{" "}
                <span className="text-gray-400">{finalCta.titleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                {finalCta.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => router.push('/contact')} className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  {finalCta.primaryButton}
                </button>
                <button onClick={() => router.push('/services')} className="px-8 py-4 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors">
                  {finalCta.secondaryButton}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
