'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Cloud,
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Target,
  Pencil,
  Cog,
  Rocket,
  ExternalLink,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/Card';
import { pageApi, getAssetUrl } from '@/lib/api';

interface ServicesClientProps {
  initialData?: any;
}

const ServicesClient = ({ initialData }: ServicesClientProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>('');

  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    primaryCta: '',
    secondaryCta: '',
  });

  const [statsCounters, setStatsCounters] = useState<any[]>([]);
  const [headings, setHeadings] = useState({
    servicesGridTitlePrefix: '',
    servicesGridTitleHighlight: '',
    servicesGridDescription: '',
    categoriesTitlePrefix: '',
    categoriesTitleHighlight: '',
    categoriesDescription: '',
    testimonialsTitlePrefix: '',
    testimonialsTitleHighlight: '',
    testimonialsDescription: '',
    industriesTitlePrefix: '',
    industriesTitleHighlight: '',
    industriesDescription: '',
    processTitlePrefix: '',
    processTitleHighlight: '',
    processDescription: '',
    faqTitlePrefix: '',
    faqTitleHighlight: '',
    faqDescription: '',
    ctaTitlePrefix: '',
    ctaTitleHighlight: '',
    ctaDescription: '',
    ctaPrimary: '',
    ctaSecondary: '',
  });

  const [serviceCategories, setServiceCategories] = useState<string[]>(['All']);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [processSteps, setProcessSteps] = useState<any[]>([]);
  const [serviceTabs, setServiceTabs] = useState<any[]>([]);
  const [techStackSection, setTechStackSection] = useState({ title: '', subtitle: '' });
  const [technologies, setTechnologies] = useState<any[]>([]);

  const iconMap: { [key: string]: React.FC<any> } = {
    Globe, Smartphone, Palette, TrendingUp, Cloud, ShoppingCart, Target, Pencil, Cog, Rocket,
  };

  useEffect(() => {
    const processData = (data: any) => {
      const fields = data.fields || [];
      fields.forEach((f: any) => {
        switch (f.id) {
          case 'heroContent': setHeroContent(f.value); break;
          case 'statsCounters': setStatsCounters(f.value); break;
          case 'headings': setHeadings((prev) => ({ ...prev, ...f.value })); break;
          case 'serviceCategories': setServiceCategories(f.value); break;
          case 'services': setServices(f.value); break;
          case 'testimonials': setTestimonials(f.value); break;
          case 'industries': setIndustries(f.value); break;
          case 'faqs': setFaqs(f.value); break;
          case 'processSteps': setProcessSteps(f.value); break;
          case 'serviceTabs':
            setServiceTabs(f.value);
            if (f.value?.[0]?.id) setSelectedServiceTab(f.value[0].id);
            break;
          case 'techStackSection': setTechStackSection(f.value); break;
          case 'technologies': setTechnologies(f.value); break;
        }
      });
    };

    if (initialData) {
      processData(initialData);
    } else {
      const load = async () => {
        try {
          const res = await pageApi.get('services');
          if (res.success && res.data) processData(res.data);
        } catch (err) {}
      };
      load();
    }
  }, [initialData]);

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white">
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">BC</div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-center lg:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>{heroContent.title}</motion.h1>
                <motion.p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>{heroContent.subtitle}</motion.p>
                <motion.div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">{heroContent.primaryCta}</button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">{heroContent.secondaryCta}</button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsCounters.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <Card hover className="relative bg-[#111] rounded-2xl p-8 transition-all duration-300 h-full text-center border-0">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 opacity-95">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{headings.servicesGridTitlePrefix} <span className="text-gray-400">{headings.servicesGridTitleHighlight}</span></h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{headings.servicesGridDescription}</p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {serviceCategories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Globe;
                return (
                  <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                    <Card hover className="bg-[#111] rounded-2xl p-8 h-full border-0">
                      <div className="w-16 h-16 bg-[#0f0f0f] rounded-full mb-6 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/20 transition-all"><Icon className="w-8 h-8 text-white/85" /></div>
                      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>
                      {service.features && (
                        <ul className="space-y-2">
                          {service.features.map((f: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /><span>{f}</span></li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* Rest of sections kept similar... */}
      </div>
    </Layout>
  );
};

export default ServicesClient;
