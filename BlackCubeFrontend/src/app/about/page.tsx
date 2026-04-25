'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Target,
  Eye,
  Heart,
  Calendar,
  CheckCircle,
  ArrowRight,
  Trophy,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { defaultAboutPageData } from '@/data/about';
import { pageApi, getAssetUrl } from '@/lib/api';

const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aboutData, setAboutData] = useState(defaultAboutPageData);
  const milestones = aboutData.milestones;
  const values = aboutData.values.map(value => ({
    icon: value.icon === 'Target' ? Target : value.icon === 'Eye' ? Eye : Heart,
    title: value.title,
    description: value.description,
  }));

  // Hold API-driven lists
  const [awards, setAwards] = useState<Array<{ date: string; title: string; description: string; why: string }>>([]);
  const [achievements, setAchievements] = useState<Array<{ number: string; title: string; date: string; description: string }>>([]);
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; position: string; image?: string }>>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await pageApi.get('about');
        if (res.success && res.data) {
          const fields = res.data.fields || [];
          const next = { ...aboutData } as any;
          fields.forEach((f: any) => {
            if (f.id === 'heroContent' && f.value) next.heroContent = f.value;
            if (f.id === 'companyStats' && f.value) next.companyStats = f.value;
            if (f.id === 'values' && f.value) next.values = f.value;
            if (f.id === 'milestones' && f.value) next.milestones = f.value;
            if (f.id === 'journeySection' && f.value) next.journeySection = f.value;
            if (f.id === 'whyChooseUsSection' && f.value) next.whyChooseUsSection = f.value;
            if (f.id === 'whyChooseUs' && f.value) next.whyChooseUs = f.value;
            if (f.id === 'awards' && Array.isArray(f.value)) setAwards(f.value);
            if (f.id === 'achievements' && Array.isArray(f.value)) setAchievements(f.value);
            if (f.id === 'teamMembers' && Array.isArray(f.value)) {
              setTeamMembers(
                f.value.map((m: any) => ({
                  name: m.name,
                  position: m.position,
                  image: m.image || `https://i.pravatar.cc/200?u=${encodeURIComponent(m.name || '')}`,
                }))
              );
            }
          });
          setAboutData(next);
        }
      } catch {
      }
    };
    load();
  }, []);

  const [headings, setHeadings] = useState({
    awardsTitlePrefix: '',
    awardsTitleHighlight: '',
    awardsDescription:
      "",
    achievementsTitlePrefix: '',
    achievementsTitleHighlight: '',
    achievementsDescription:
      "",
    teamTitlePrefix: '',
    teamTitleHighlight: '',
    teamDescription:
      '',
  });

  useEffect(() => {
    const loadHeadings = async () => {
      try {
        const res = await pageApi.get('about');
        if (res.success && res.data) {
          const field = (res.data.fields || []).find((f: any) => f.id === 'headings');
          if (field?.value) setHeadings({ ...headings, ...field.value });
        }
      } catch { }
    };
    loadHeadings();
  }, []);

  // awards, achievements, and teamMembers now come from API via state above

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-10 overflow-hidden">
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
                  {aboutData.heroContent.title}{" "}
                  <span className="text-gray-400">
                    BlackCube
                  </span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {aboutData.heroContent.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors">
                    {aboutData.heroContent.primaryCta}
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                    {aboutData.heroContent.secondaryCta}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-12 md:py-16 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              {aboutData.companyStats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card hover className="h-full bg-[#0b0b0b] rounded-2xl p-4 sm:p-6 md:p-8 text-center ring-1 ring-white/5 hover:ring-white/10 transition-all duration-300 border-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{s.number}</div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-400">{s.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover className="h-full text-center group p-6 md:p-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 font-montserrat group-hover:text-primary-blue transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 lg:mb-20"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 font-montserrat">
                {aboutData.journeySection.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                {aboutData.journeySection.subtitle}
              </p>
            </motion.div>

            {/* Desktop Timeline */}
            <div className="relative hidden md:block">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-blue to-primary-purple"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-4 md:pr-8 text-right' : 'pl-4 md:pl-8 text-left'}`}>
                      <Card hover className="group p-4 md:p-6">
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xl md:text-2xl font-bold text-primary-blue font-montserrat group-hover:text-white transition-colors duration-300">
                              {milestone.year}
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2 font-montserrat group-hover:text-primary-blue transition-colors duration-300">
                              {milestone.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 group-hover:text-white transition-colors duration-300">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="w-8 h-8 bg-primary-blue rounded-full border-4 border-primary-black flex items-center justify-center z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="relative md:hidden">
              <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-primary-blue to-primary-purple"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    <div className="absolute left-3 w-6 h-6 bg-primary-blue rounded-full border-4 border-primary-black flex items-center justify-center z-10">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    <Card hover className="group p-4 md:p-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg sm:text-xl font-bold text-primary-blue font-montserrat mb-1 group-hover:text-white transition-colors duration-300">
                            {milestone.year}
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 font-montserrat group-hover:text-primary-blue transition-colors duration-300">
                            {milestone.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                {headings.awardsTitlePrefix} <span className="text-gray-400">{headings.awardsTitleHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto px-4">
                {headings.awardsDescription}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {awards.map((award: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <Card hover className="bg-[#0b0b0b] rounded-2xl p-6 md:p-8 ring-1 ring-white/5 hover:ring-white/10 transition-all duration-300 border-0">
                    {/* Top Section - Trophy Icon */}
                    <div className="relative flex flex-col items-center mb-4 md:mb-6">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3 md:mb-4">
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] rounded-full"></div>
                        <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" />
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{award.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-white text-center mb-3 md:mb-4">
                      {award.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-xs md:text-sm text-center mb-4 md:mb-6 leading-relaxed">
                      {award.description}
                    </p>

                    {/* Why Section */}
                    <div className="border-t border-gray-800 pt-4 md:pt-6">
                      <h4 className="text-white font-bold text-center mb-2 text-sm md:text-base">Why</h4>
                      <p className="text-gray-400 text-xs md:text-sm text-center">
                        {award.why}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                {headings.achievementsTitlePrefix} <span className="text-gray-400">{headings.achievementsTitleHighlight}</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto px-4">
                {headings.achievementsDescription}
              </p>
            </motion.div>

            <div className="space-y-6 md:space-y-8">
              {achievements.map((achievement: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="relative flex items-center gap-4 md:gap-8">
                    {/* Large Faded Number - Mobile */}
                    <div className="md:hidden absolute left-0 -z-10">
                      <div className="text-[4rem] sm:text-[5rem] font-bold text-white/10 leading-none">
                        {achievement.number}
                      </div>
                    </div>

                    {/* Large Faded Number - Desktop */}
                    <div className="hidden md:block flex-shrink-0">
                      <div className="text-[10rem] md:text-[12rem] lg:text-[15rem] font-bold text-white/10 leading-none">
                        {achievement.number}
                      </div>
                    </div>

                    {/* Content Card */}
                    <Card hover className="flex-1 bg-[#0b0b0b] rounded-2xl p-4 md:p-6 lg:p-8 ring-1 ring-white/5 hover:ring-white/10 transition-all duration-300 md:ml-0 ml-16 sm:ml-20 border-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                          {achievement.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm bg-[#1a1a1a] rounded-full px-3 md:px-4 py-1.5 md:py-2 ring-1 ring-white/5">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{achievement.date}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-bold mb-1 md:mb-2 text-sm md:text-base">Description</h4>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={ref} className="py-16 md:py-24 bg-[#1A1A1A] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
                {headings.teamTitlePrefix} <span className="text-gray-400">{headings.teamTitleHighlight}</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                {headings.teamDescription}
              </p>
            </motion.div>

            <div id="team" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card hover className="bg-[#0b0b0b] rounded-2xl p-4 sm:p-5 md:p-6 text-center ring-1 ring-white/5 hover:ring-white/10 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 border-0">
                    {/* Profile Image */}
                    <div className="mb-3 md:mb-4">
                      <img
                        src={getAssetUrl(member.image)}
                        alt={member.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full mx-auto object-cover"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-white font-bold mb-1 text-xs sm:text-sm md:text-base">
                      {member.name}
                    </h3>

                    {/* Position */}
                    <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mb-3 md:mb-4">
                      {member.position}
                    </p>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-2 sm:gap-3">
                      <a href="#" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors ring-1 ring-white/5">
                        <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                      </a>
                      <a href="#" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors ring-1 ring-white/5">
                        <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                      </a>
                      <a href="#" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors ring-1 ring-white/5">
                        <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-black via-gray-900 to-black pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-montserrat">
                  {aboutData.whyChooseUsSection.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12">
                  {aboutData.whyChooseUsSection.subtitle}
                </p>

                <div className="space-y-4 md:space-y-6">
                  {aboutData.whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-3 md:space-x-4"
                    >
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-primary-blue flex-shrink-0" />
                      <span className="text-sm md:text-base lg:text-lg text-gray-400">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 md:mt-8">
                  <Button size="lg" className="group w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <Card hover className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 p-6 md:p-8 group">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-montserrat group-hover:text-primary-blue transition-colors duration-300">
                      {aboutData.whyChooseUsSection.stats.satisfactionRate}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">{aboutData.whyChooseUsSection.stats.satisfactionLabel}</div>
                    <div className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6 group-hover:text-white transition-colors duration-300">{aboutData.whyChooseUsSection.stats.satisfactionSubtext}</div>

                    <div className="space-y-3 md:space-y-4">
                      {aboutData.whyChooseUsSection.stats.metrics.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-xs md:text-sm text-gray-400 mb-1">
                            <span>{item.label}</span>
                            <span>{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-primary-slate/50 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-blue to-primary-purple h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
