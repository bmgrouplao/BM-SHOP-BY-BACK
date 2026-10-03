import React from 'react';
import { ShieldCheck, ShoppingCart, QrCode, Truck, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrustSection: React.FC = () => {
  const { t, language } = useStore();

  const trustItems = [
    {
      icon: ShieldCheck,
      titleEN: 'Quality Products',
      titleLA: 'ສິນຄ້າຄຸນນະພາບ',
      descEN: 'Every pair of shoes & clothing piece inspected before packaging',
      descLA: 'ກວດສອບຢ່າງລະອຽດທຸກຊິ້ນ ກ່ອນຈັດສົ່ງເຖິງມືທ່ານ'
    },
    {
      icon: ShoppingCart,
      titleEN: 'Easy Ordering',
      titleLA: 'ສັ່ງຊື້ງ່າຍ',
      descEN: 'No customer account, password, or registration required',
      descLA: 'ບໍ່ຕ້ອງລົງທະບຽນ ຫຼື ສ້າງບັນຊີ ເລືອກແລ້ວສັ່ງຊື້ໄດ້ທັນທີ'
    },
    {
      icon: QrCode,
      titleEN: 'BCEL One QR Payment',
      titleLA: 'ຊຳລະເງິນສະດວກ',
      descEN: 'Transparent payment verification with your bank transfer slip',
      descLA: 'ສະແກນຈ່າຍຜ່ານ BCEL One ແລະ ທະນາຄານຊັ້ນນຳຂອງລາວ'
    },
    {
      icon: Truck,
      titleEN: 'Nationwide Delivery',
      titleLA: 'ມີບໍລິການຈັດສົ່ງ',
      descEN: 'Vientiane Capital 1-2 days, all Lao provinces 2-4 days',
      descLA: 'ນະຄອນຫຼວງວຽງຈັນ 1-2 ມື້, ຕ່າງແຂວງ 2-4 ມື້'
    },
    {
      icon: Headphones,
      titleEN: 'Lao Customer Support',
      titleLA: 'ມີບໍລິການລູກຄ້າ',
      descEN: 'Friendly phone & WhatsApp assistance for every age group',
      descLA: 'ພ້ອມໃຫ້ຄຳແນະນຳ ແລະ ຊ່ວຍເຫຼືອດ້ວຍຄວາມເຕັມໃຈ'
    }
  ];

  return (
    <section className="py-14 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {t('trust.title')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {t('trust.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-900 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-900">
                    {language === 'lo' ? item.titleLA : item.titleEN}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {language === 'lo' ? item.descLA : item.descEN}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
