import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { heroLifestyleImg } from '../data/initialData';

interface HeroProps {
  onNavigate: (view: string, filterParams?: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, language } = useStore();

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Generation inclusiveness kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800/80 border border-stone-700 text-stone-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('hero.kicker')}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t('hero.headline')}
              </h1>
              <p className="text-lg sm:text-xl text-stone-300 font-normal leading-relaxed max-w-xl">
                {t('hero.subheading')}
              </p>
            </div>

            {/* Value props bullets */}
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-stone-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.propQuality')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.propPayment')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.propNoLogin')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('hero.propShipping')}</span>
              </div>
            </div>

            {/* Action Buttons: Large and accessible */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => onNavigate('shop', { gender: 'men' })}
                className="px-7 py-3.5 bg-white text-stone-950 font-bold rounded-xl hover:bg-stone-100 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <span>{t('hero.shopMen')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('shop', { gender: 'women' })}
                className="px-7 py-3.5 bg-stone-800 text-white font-bold rounded-xl hover:bg-stone-700 border border-stone-700 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>{t('hero.shopWomen')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-800 aspect-16/10 sm:aspect-16/9 lg:aspect-4/3">
              <img
                src={heroLifestyleImg}
                alt="BM SHOP Modern Fashion Campaign for all generations"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none"></div>

              {/* Floating label inside hero */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-center justify-between bg-stone-900/90 backdrop-blur-md px-4 py-3 rounded-xl border border-stone-700 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">
                    {t('hero.bannerTitle')}
                  </div>
                  <div className="text-stone-400">
                    {t('hero.bannerSubtitle')}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('shop')}
                  className="px-3.5 py-1.5 bg-white text-stone-950 font-bold rounded-lg hover:bg-stone-200 transition-colors shrink-0 text-xs"
                >
                  {language === 'lo' ? 'ເບິ່ງທັງໝົດ' : 'Explore'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
