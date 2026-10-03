import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { sneakersImg, blazerImg, loafersImg, oxfordShirtImg } from '../data/initialData';

interface CategoryCardsProps {
  onSelectCategory: (params: { gender?: string; category?: string }) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const { t, language } = useStore();

  const categories = [
    {
      id: 'men',
      titleEN: 'MEN',
      titleLA: 'ຜູ້ຊາຍ',
      subtitleEN: 'Shoes, shirts, trousers & blazers',
      subtitleLA: 'ເກີບ, ເສື້ອເຊີ້ດ, ສົ້ງ ແລະ ສູດ',
      image: oxfordShirtImg,
      params: { gender: 'men' }
    },
    {
      id: 'women',
      titleEN: 'WOMEN',
      titleLA: 'ຜູ້ຍິງ',
      subtitleEN: 'Dresses, blazers, flats & sandals',
      subtitleLA: 'ຊຸດເດຣສ, ສູດ, ເກີບຄັດຊູ ແລະ ເກີບແຕະ',
      image: blazerImg,
      params: { gender: 'women' }
    },
    {
      id: 'shoes',
      titleEN: 'SHOES',
      titleLA: 'ເກີບ',
      subtitleEN: 'Sneakers, loafers, formal & running',
      subtitleLA: 'ເກີບຜ້າໃບ, ເກີບໜັງ, ເກີບແລ່ນ',
      image: sneakersImg,
      params: { category: 'shoes' }
    },
    {
      id: 'clothing',
      titleEN: 'CLOTHING',
      titleLA: 'ເສື້ອຜ້າ',
      subtitleEN: 'Linen blazers, shirts, tees & jeans',
      subtitleLA: 'ເສື້ອສູດລິນິນ, ເຊີ້ດ, ໂປໂລ ແລະ ຢີນສ໌',
      image: loafersImg,
      params: { category: 'clothing' }
    }
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
              {language === 'lo' ? 'ເລືອກຕາມໝວດໝູ່' : 'Browse Department'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {t('categories.title')}
            </h2>
          </div>
        </div>

        {/* Category Cards: Horizontal scroll on mobile, 4 columns on desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.params)}
              className="group relative flex-none w-[70vw] sm:w-[45vw] lg:w-auto snap-start rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 text-left transition-all duration-300 hover:shadow-lg hover:border-stone-400 focus:outline-none"
            >
              <div className="aspect-4/3 overflow-hidden bg-stone-200 relative">
                <img
                  src={cat.image}
                  alt={cat.titleEN}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/15 to-transparent"></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex items-end justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                    {language === 'lo' ? cat.titleEN : cat.titleLA}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    {language === 'lo' ? cat.titleLA : cat.titleEN}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1 font-medium">
                    {language === 'lo' ? cat.subtitleLA : cat.subtitleEN}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-stone-950 transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-stone-950" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
