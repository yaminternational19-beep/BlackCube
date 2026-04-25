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

const ServicesPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>('');

  // Dynamic State
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    primaryCta: '',
    secondaryCta: '',
  });

  const [statsCounters, setStatsCounters] = useState<Array<{ number: string; label: string }>>([]);

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

  // Icon Map
  const iconMap: { [key: string]: React.FC<any> } = {
    Globe,
    Smartphone,
    Palette,
    TrendingUp,
    Cloud,
    ShoppingCart,
    Target,
    Pencil,
    Cog,
    Rocket,
  };

  // Load Data from API
  useEffect(() => {
    const load = async () => {
      try {
        const res = await pageApi.get('services');
        if (res.success && res.data?.fields) {
          const fields = res.data.fields;

          fields.forEach((f: any) => {
            switch (f.id) {
              case 'heroContent':
                setHeroContent(f.value);
                break;
              case 'statsCounters':
                setStatsCounters(f.value);
                break;
              case 'headings':
                setHeadings((prev) => ({ ...prev, ...f.value }));
                break;
              case 'serviceCategories':
                setServiceCategories(f.value);
                break;
              case 'services':
                setServices(f.value);
                break;
              case 'testimonials':
                setTestimonials(f.value);
                break;
              case 'industries':
                setIndustries(f.value);
                break;
              case 'faqs':
                setFaqs(f.value);
                break;
              case 'processSteps':
                setProcessSteps(f.value);
                break;
              case 'serviceTabs':
                setServiceTabs(f.value);
                if (f.value?.[0]?.id) {
                  setSelectedServiceTab(f.value[0].id);
                }
                break;
              case 'techStackSection':
                setTechStackSection(f.value);
                break;
              case 'technologies':
                setTechnologies(f.value);
                break;
            }
          });
        }
      } catch (err) {
        console.error('Failed to load services page:', err);
      }
    };
    load();
  }, []);

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute right-0 lg:right-0 xl:right-15 2xl:right-70 top-1/2 -translate-y-1/2 opacity-5 text-[14rem] sm:text-[16rem] md:text-[28rem] lg:text-[40rem] font-bold leading-none pointer-events-none">
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
                  {heroContent.title}
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {heroContent.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {heroContent.primaryCta}
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {heroContent.secondaryCta}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Counters */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsCounters.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card hover className="relative bg-[#111] rounded-2xl p-8 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] h-full text-center border-0">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] rounded-full blur-lg" />
                    {/* <div className="relative z-10 w-16 h-16 bg-[#0f0f0f] rounded-full mx-auto mb-4 flex items-center justify-center ring-1 ring-white/10"></div> */}
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 opacity-95">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.servicesGridTitlePrefix} <span className="text-gray-400">{headings.servicesGridTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {headings.servicesGridDescription}
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {serviceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, i) => {
                const Icon = iconMap[service.icon] || Globe;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <Card hover className="bg-[#111] rounded-2xl p-8 h-full border-0">
                      <div className="w-16 h-16 bg-[#0f0f0f] rounded-full mb-6 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                        <Icon className="w-8 h-8 text-white/85" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description}</p>
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2">
                          {service.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
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

        {/* Service Categories Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.categoriesTitlePrefix} <span className="text-gray-400">{headings.categoriesTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {headings.categoriesDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Tabs */}
              <div className="lg:col-span-1">
                <div className="space-y-2">
                  {serviceTabs.map((tab) => {
                    const isActive = selectedServiceTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedServiceTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 text-left ${isActive
                          ? 'bg-neutral-800 text-white'
                          : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800/50 hover:text-gray-300'
                          }`}
                      >
                        <span className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}>•</span>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <motion.div
                  key={selectedServiceTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#111] rounded-2xl p-8 lg:p-10"
                >
                  {(() => {
                    const tab = serviceTabs.find((t) => t.id === selectedServiceTab);
                    if (!tab) return null;

                    return (
                      <>
                        <h3 className="text-3xl font-bold text-white mb-4">{tab.label}</h3>
                        {tab.intro && <p className="text-gray-400 mb-8 leading-relaxed">{tab.intro}</p>}

                        {tab.keyFeatures && tab.keyFeatures.length > 0 && (
                          <>
                            <h4 className="text-xl font-semibold text-white mb-6">Key Features</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                              {tab.keyFeatures.map((feature: any, idx: number) => (
                                <div key={idx} className="bg-[#0a0a0a] rounded-xl p-6">
                                  <h5 className="text-lg font-semibold text-white mb-2">{feature.title}</h5>
                                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {tab.process && tab.process.length > 0 && (
                          <div className="mb-12">
                            <h4 className="text-xl font-semibold text-white mb-6">Our Process</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {tab.process.map((step: any, idx: number) => (
                                <div key={idx} className="bg-[#0a0a0a] rounded-xl p-6">
                                  <h5 className="text-lg font-semibold text-white mb-3">{step.title}</h5>
                                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Portfolio */}
                        <div className="mb-12">
                          <h4 className="text-2xl font-bold text-white mb-2">
                            {tab.portfolioTitle || `${tab.label} Portfolio`}
                          </h4>
                          {tab.portfolioSubtext && <p className="text-gray-400 mb-6 text-sm">{tab.portfolioSubtext}</p>}

                          {tab.thumbnails && tab.thumbnails.filter(Boolean).length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              {tab.thumbnails.slice(0, 2).map((thumb: string, idx: number) => (
                                <div key={idx} className="bg-[#0a0a0a] rounded-xl overflow-hidden h-64 flex items-center justify-center">
                                  {thumb ? (
                                    <img src={getAssetUrl(thumb)} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="text-gray-500 text-sm">Project Thumbnail {idx + 1}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {tab.portfolioCtaText && (
                            <div className="flex justify-center mb-8">
                              <button className="px-6 py-3 bg-[#0a0a0a] text-white rounded-lg hover:bg-[#111] transition-colors flex items-center gap-2">
                                {tab.portfolioCtaText} <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          {tab.tableRows && tab.tableRows.length > 0 && (
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b border-gray-800">
                                    <th className="text-left py-4 px-4 text-white font-semibold">Name</th>
                                    {tab.tableRows[0].industry && (
                                      <th className="text-left py-4 px-4 text-white font-semibold">Industry</th>
                                    )}
                                    <th className="text-left py-4 px-4 text-white font-semibold">Info</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tab.tableRows.map((row: any, idx: number) => (
                                    <tr key={idx} className="border-b border-gray-800/50 hover:bg-[#0a0a0a] transition-colors">
                                      <td className="py-4 px-4 text-white">{row.name}</td>
                                      {row.industry && <td className="py-4 px-4 text-gray-400">{row.industry}</td>}
                                      <td className="py-4 px-4">
                                        {row.url && (row.url.includes('http') || row.url.includes('.com') || row.url.includes('.')) ? (
                                          <a
                                            href={row.url.startsWith('http') ? row.url : `https://${row.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                          >
                                            {row.url} <ExternalLink className="w-3 h-3" />
                                          </a>
                                        ) : (
                                          <span className="text-blue-400">{row.url}</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.testimonialsTitlePrefix} <span className="text-gray-400">{headings.testimonialsTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{headings.testimonialsDescription}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Card hover className="bg-[#111] rounded-2xl p-8 h-full border-0">
                    <div className="flex items-start gap-4">
                      <img src={getAssetUrl(t.avatar)} alt={t.name} className="w-14 h-14 rounded-full object-cover group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-white font-semibold mb-1">{t.name}</div>
                        <div className="text-sm text-gray-400 mb-3">{t.role}</div>
                        <p className="text-gray-400 text-sm leading-relaxed">"{t.text}"</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.industriesTitlePrefix} <span className="text-gray-400">{headings.industriesTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">{headings.industriesDescription}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((ind, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="bg-[#111] rounded-2xl p-8 h-full border-0">
                    <h3 className="text-xl font-semibold text-white mb-2">{ind.title}</h3>
                    <p className="text-gray-400 text-sm">{ind.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.processTitlePrefix} <span className="text-gray-400">{headings.processTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">{headings.processDescription}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => {
                const Icon = iconMap[step.icon] || Target;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="relative bg-[#111] rounded-2xl p-8 h-full text-center">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] rounded-full blur-lg" />
                      <div className="relative z-10 w-16 h-16 bg-[#0f0f0f] rounded-full mx-auto mb-4 flex items-center justify-center ring-1 ring-white/10">
                        <Icon size={36} />
                      </div>
                      <div className="text-2xl font-bold text-white mb-2 opacity-90">{step.step}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {techStackSection.title}
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">{techStackSection.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="bg-[#111] rounded-2xl p-6 h-full text-center border-0">
                    <div className="text-white font-medium mb-1">{tech.name}</div>
                    <div className="text-gray-400 text-xs">{tech.category}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {headings.faqTitlePrefix} <span className="text-gray-400">{headings.faqTitleHighlight}</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{headings.faqDescription}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-gradient-to-br from-[#111] to-[#0d0d0d] rounded-2xl">
                    <details className="group">
                      <summary className="cursor-pointer list-none px-8 py-6 flex items-center justify-between text-white font-medium hover:bg-[#1a1a1a] transition-all">
                        <span>{faq.q}</span>
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-8 pb-6 text-gray-400 text-sm">{faq.a}</div>
                    </details>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {headings.ctaTitlePrefix} <span className="text-gray-400">{headings.ctaTitleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">{headings.ctaDescription}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  {headings.ctaPrimary}
                </button>
                <button className="px-8 py-4 border border-gray-700 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors">
                  {headings.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ServicesPage;