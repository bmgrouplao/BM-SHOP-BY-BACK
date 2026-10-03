import React from 'react';
import { Phone, MapPin, QrCode, ShieldCheck, Truck, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (view: string, filterParams?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t, settings, pendingPaymentsCount } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-14 pb-24 lg:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-2xl font-black text-white tracking-tight">BM SHOP</span>
              <span className="block text-[11px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">
                {language === 'lo' ? 'ເກີບ & ເສື້ອຜ້າ' : 'Shoes & Clothing'}
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              {t('footer.about')}
            </p>

            <div className="space-y-2 text-stone-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              {language === 'lo' ? 'ໝວດໝູ່' : 'Shop Collections'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('shop', { gender: 'men' })}
                  className="hover:text-white transition-colors"
                >
                  {t('common.men')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { gender: 'women' })}
                  className="hover:text-white transition-colors"
                >
                  {t('common.women')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'shoes' })}
                  className="hover:text-white transition-colors"
                >
                  {t('common.shoes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'clothing' })}
                  className="hover:text-white transition-colors"
                >
                  {t('common.clothing')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { onSaleOnly: true })}
                  className="text-red-400 hover:text-red-300 font-bold"
                >
                  {t('common.sale')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Services & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              {t('footer.customerService')}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{t('footer.trackOrder')}</span>
                </button>
              </li>
              <li className="flex items-center gap-1 text-stone-400">
                <Truck className="w-3.5 h-3.5" />
                <span>{language === 'lo' ? 'ຈັດສົ່ງທົ່ວປະເທດລາວ' : 'Nationwide Laos Delivery'}</span>
              </li>
              <li className="flex items-center gap-1 text-stone-400">
                <QrCode className="w-3.5 h-3.5" />
                <span>{language === 'lo' ? 'ຊຳລະ BCEL One QR' : 'BCEL One QR Payment'}</span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 pt-1 text-stone-400"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('common.adminPortal')}</span>
                  {pendingPaymentsCount > 0 && (
                    <span className="bg-amber-500 text-stone-950 font-bold px-1.5 rounded-full text-[10px]">
                      {pendingPaymentsCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Social Channels */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              {language === 'lo' ? 'ຕິດຕາມພວກເຮົາ' : 'Connect'}
            </h4>
            <div className="space-y-2">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors"
              >
                <span>Facebook Page</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-auto" />
              </a>
              <a
                href={settings.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-800 text-stone-200 hover:text-white hover:bg-stone-700 transition-colors"
              >
                <span>TikTok @bmshoplaos</span>
                <ExternalLink className="w-3 h-3 text-stone-400 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-xs">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Vientiane, Laos</span>
            <span aria-hidden="true">·</span>
            <span>Lao Kip (LAK)</span>
            <span aria-hidden="true">·</span>
            <span>2026 Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
