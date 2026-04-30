'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Zap, Palette, Users, Shield, Cog, Rocket, Target, PenTool, Code2, ExternalLink, Filter, Search, User, Calendar, Clock, Tag, ChevronDown,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { pageApi, portfolioApi, getAssetUrl } from '@/lib/api';

interface PortfolioClientProps {
  initialData?: any;
  initialPortfolioItems?: any[];
}

const PortfolioClient = ({ initialData, initialPortfolioItems }: PortfolioClientProps) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [heroContent, setHeroContent] = useState({ title: '', subtitle: '', primaryCta: '', secondaryCta: '' });
  const [keyFeatures, setKeyFeatures] = useState<any[]>([]);
  const [searchSection, setSearchSection] = useState({ placeholder: '', noResultsTitle: '', noResultsDescription: '' });
  const [categories, setCategories] = useState<string[]>(['All']);
  const [featuredSection, setFeaturedSection] = useState({ title: '', description: '' });
  const [keyFeaturesSection, setKeyFeaturesSection] = useState({ title: '', subtitle: '' });
  const [techList, setTechList] = useState<string[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

  useEffect(() => {
    const processPageData = (data: any) => {
      const fields = data.fields || [];
      fields.forEach((f: any) => {
        switch (f.id) {
          case 'heroContent': setHeroContent(f.value); break;
          case 'keyFeatures': setKeyFeatures(f.value); break;
          case 'searchSection': setSearchSection(f.value); break;
          case 'categories': setCategories(['All', ...f.value.filter((c: string) => c !== 'All')]); break;
          case 'featuredSection': setFeaturedSection(f.value); break;
          case 'techList': setTechList(f.value); break;
          case 'keyFeaturesSection': setKeyFeaturesSection(f.value); break;
        }
      });
    };

    if (initialData) processPageData(initialData);
    if (initialPortfolioItems) {
      setPortfolioItems(initialPortfolioItems);
      const firstFeatured = initialPortfolioItems.find((p: any) => p.featured);
      if (firstFeatured) setExpandedId(firstFeatured.id);
    }

    if (!initialData || !initialPortfolioItems) {
      const load = async () => {
        try {
          if (!initialData) {
            const pageRes = await pageApi.get('portfolio');
            if (pageRes.success) processPageData(pageRes.data);
          }
          if (!initialPortfolioItems) {
            const listRes = await portfolioApi.list();
            if (listRes.success) {
              setPortfolioItems(listRes.data);
              const firstFeatured = listRes.data.find((p: any) => p.featured);
              if (firstFeatured) setExpandedId(firstFeatured.id);
            }
          }
        } catch (err) {}
      };
      load();
    }
  }, [initialData, initialPortfolioItems]);

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || (item.technologies || []).some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start">
                  <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">{heroContent.primaryCta}</a>
                  <a href="/contact" className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">{heroContent.secondaryCta}</a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{keyFeaturesSection.title}</h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">{keyFeaturesSection.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((f, i) => (
                <Card key={i} hover className="relative bg-[#111] rounded-2xl p-8 h-full text-center border-0">
                  <div className="relative z-10 w-16 h-16 bg-[#0f0f0f] rounded-full mx-auto mb-5 flex items-center justify-center ring-1 ring-white/10"><Zap className="w-7 h-7 text-white/85" /></div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="search" className="py-16 bg-gray-900/30 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder={searchSection.placeholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl font-medium transition-all ${selectedCategory === cat ? 'bg-neutral-800 text-white ring-1 ring-white/10' : 'bg-neutral-900 text-gray-400 hover:bg-neutral-800/60 hover:text-white ring-1 ring-white/5'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </section>

        <section ref={ref} className="py-20 relative overflow-hidden" id="projects">
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20"><Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" /><h3 className="text-2xl font-semibold text-white mb-2">{searchSection.noResultsTitle}</h3><p className="text-gray-400">{searchSection.noResultsDescription}</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
                    <Card hover className="h-full group">
                      <div className="aspect-video rounded-2xl mb-6 relative overflow-hidden">
                        <img src={getAssetUrl(item.image) || '/placeholder.svg'} alt={item.title} className="w-full h-full object-cover rounded-2xl transition-transform group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Button size="sm">View Project <ExternalLink className="ml-2 w-4 h-4" /></Button></div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between"><span className="px-3 py-1 bg-[#0f0f0f] text-gray-300 text-xs rounded-full ring-1 ring-white/10">{item.category}</span>{item.featured && <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full ring-1 ring-yellow-500/30">Featured</span>}</div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                        <div className="flex flex-wrap gap-2">{(item.technologies || []).map((tech: string, idx: number) => <span key={idx} className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded">{tech}</span>)}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioClient;
