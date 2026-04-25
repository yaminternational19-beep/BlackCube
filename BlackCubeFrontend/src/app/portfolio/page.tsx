'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Zap,
  Palette,
  Users,
  Shield,
  Cog,
  Rocket,
  Target,
  PenTool,
  Code2,
  ExternalLink,
  Filter,
  Search,
  User,
  Calendar,
  Clock,
  Tag,
  ChevronDown,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageApi, portfolioApi, getAssetUrl } from '@/lib/api';

// Dynamic Icon Mapping (Emoji → Lucide Icon)
const iconMap: { [key: string]: React.FC<any> } = {
  'Lightning': Zap,
  'Paintbrush': Palette,
  'Users': Users,
  'Shield': Shield,
  'Wrench': Cog,
  'Rocket': Rocket,
  'Target': Target,
  'Pen': PenTool,
  'Code': Code2,
};

const PortfolioPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Dynamic States
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    primaryCta: '',
    secondaryCta: '',
  });

  const [keyFeatures, setKeyFeatures] = useState<Array<{ icon: string; title: string; desc: string }>>([]);
  const [searchSection, setSearchSection] = useState({
    placeholder: '',
    noResultsTitle: '',
    noResultsDescription: '',
  });
  const [categories, setCategories] = useState<string[]>(['All']);
  const [featuredSection, setFeaturedSection] = useState({
    title: '',
    description: '',
  });
  const [keyFeaturesSection, setKeyFeaturesSection] = useState({
    title: '',
    subtitle: '',
  });
  const [techList, setTechList] = useState<string[]>([]);

  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

  // Load Data
  useEffect(() => {
    const load = async () => {
      try {
        const pageRes = await pageApi.get('portfolio');
        if (pageRes.success && pageRes.data?.fields) {
          const fields = pageRes.data.fields;

          fields.forEach((f: any) => {
            switch (f.id) {
              case 'heroContent':
                setHeroContent(f.value);
                break;
              case 'keyFeatures':
                setKeyFeatures(f.value);
                break;
              case 'searchSection':
                setSearchSection(f.value);
                break;
              case 'categories':
                // Remove "All" from API to prevent duplicate
                const filteredCats = f.value.filter((c: string) => c !== 'All');
                setCategories(['All', ...filteredCats]);
                break;
              case 'featuredSection':
                setFeaturedSection(f.value);
                break;
              case 'techList':
                setTechList(f.value);
                break;
              case 'keyFeaturesSection':
                setKeyFeaturesSection(f.value);
                break;
            }
          });
        }

        const listRes = await portfolioApi.list();
        if (listRes.success && Array.isArray(listRes.data)) {
          setPortfolioItems(listRes.data);
          const firstFeatured = listRes.data.find((p: any) => p.featured);
          if (firstFeatured) setExpandedId(firstFeatured.id);
        }
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      }
    };
    load();
  }, []);


  // Filter Logic
  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.technologies || []).some((tech: string) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

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
                  <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {heroContent.primaryCta}
                  </a>
                  <a href="/contact" className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {heroContent.secondaryCta}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {keyFeaturesSection.title}
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {keyFeaturesSection.subtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((f, i) => {
                // Use a default icon since API doesn't provide icon field
                const Icon = Zap;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    <Card hover className="relative bg-[#111] rounded-2xl p-8 h-full text-center border-0">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] rounded-full blur-xl" />
                      <div className="relative z-10 w-16 h-16 bg-[#0f0f0f] rounded-full mx-auto mb-5 flex items-center justify-center ring-1 ring-white/10">
                        <Icon className="w-7 h-7 text-white/85" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <section id="search" className="py-16 bg-gray-900/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={searchSection.placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedCategory === cat
                      ? 'bg-neutral-800 text-white ring-1 ring-white/10'
                      : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800/60 hover:text-white ring-1 ring-white/5'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section ref={ref} className="py-20 relative overflow-hidden" id="projects">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">{searchSection.noResultsTitle}</h3>
                <p className="text-gray-400">{searchSection.noResultsDescription}</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card hover className="h-full group">
                      <div className="aspect-video rounded-2xl mb-6 relative overflow-hidden">
                        <img
                          src={getAssetUrl(item.image) || '/placeholder.svg'}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm">View Project <ExternalLink className="ml-2 w-4 h-4" /></Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">
                            {item.category}
                          </span>
                          {item.featured && (
                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full ring-1 ring-yellow-500/30">
                              Featured
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {(item.technologies || []).map((tech: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">{item.client}</span>
                          </div>
                          {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Projects */}
        <section id="featured" className="py-20 bg-gray-900/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {featuredSection.title}
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">{featuredSection.description}</p>
            </motion.div>

            <div className="space-y-12">
              {portfolioItems
                .filter((p) => p.featured)
                .map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card hover className="bg-[#0b0b0b] rounded-2xl ring-1 ring-white/5 overflow-hidden border-0">
                      <div className="relative">
                        <img
                          src={getAssetUrl(p.image) || '/freepik__it-company-project-banner-global-network-visualiza__30555.png'}
                          alt={p.title}
                          className="w-full h-[340px] object-cover"
                        />
                        <button
                          onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                          className="absolute right-4 bottom-4 px-4 py-2 bg-[#111] text-gray-300 rounded-full ring-1 ring-white/10 hover:bg-[#161616] flex items-center gap-1"
                        >
                          {expandedId === p.id ? 'Show Less' : 'Show More'}
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === p.id ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      <div className="px-6 pt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">{p.category}</span>
                        <span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">Case Study</span>
                      </div>

                      <div className="px-6 pb-2">
                        <h3 className="text-lg font-semibold text-white mt-3">{p.title}</h3>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: expandedId === p.id ? 'auto' : 0, opacity: expandedId === p.id ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="bg-[#0f0f0f] rounded-xl p-5 ring-1 ring-white/5 mb-6">
                            <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                              {[
                                { label: 'Category', value: p.category, icon: Tag },
                                { label: 'Time Taken', value: p.timeTaken || 'N/A', icon: Clock },
                                { label: 'Start Date', value: p.startDate || 'N/A', icon: Calendar },
                                { label: 'Completed', value: p.completedDate || 'N/A', icon: Calendar },
                              ].map((m, idx) => {
                                const I = m.icon;
                                return (
                                  <div key={idx} className="bg-[#0b0b0b] rounded-lg p-3 ring-1 ring-white/5">
                                    <div className="text-[11px] text-gray-500 mb-1">{m.label}</div>
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                      <I className="w-4 h-4" />
                                      {m.value}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="bg-[#0f0f0f] rounded-xl p-5 ring-1 ring-white/5 mb-6">
                            <div className="text-sm text-gray-300 mb-3">Technologies Used</div>
                            <div className="flex items-center gap-3">
                              {(p.technologies || []).map((t: string, idx: number) => (
                                <div key={idx} className="w-9 h-9 rounded-lg bg-[#0b0b0b] ring-1 ring-white/5 flex items-center justify-center text-gray-300 text-xs">
                                  {t[0]}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-[#0f0f0f] rounded-xl p-5 ring-1 ring-white/5">
                            <div className="text-sm text-gray-300 mb-3">Methods Used</div>
                            <div className="flex flex-wrap gap-2">
                              {(p.methods || ['Agile', 'User Testing']).map((m: string) => (
                                <span key={m} className="px-4 py-2 bg-[#0b0b0b] text-gray-300 text-xs rounded-lg ring-1 ring-white/5">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section id="technologies" className="py-20 bg-gray-900/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Technologies <span className="text-gray-400">We Use</span>
              </h2>
              <p className="text-gray-400 mt-3 max-w-3xl mx-auto">
                Leveraging cutting-edge technologies to build exceptional digital experiences
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techList.map((tech, i) => (
                <Card key={i} hover className="text-center group p-6">
                  <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    {tech}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioPage;