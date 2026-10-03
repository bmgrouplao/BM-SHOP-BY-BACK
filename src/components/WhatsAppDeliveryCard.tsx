import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Check, Copy, Truck, ShieldCheck } from 'lucide-react';
import { Order, StoreSettings } from '../types';
import { createWhatsAppOrderLink, buildWhatsAppOrderMessage, getCleanWhatsAppNumber } from '../utils/whatsapp';

interface WhatsAppDeliveryCardProps {
  order: Order;
  settings: StoreSettings;
  language: 'en' | 'lo';
  compact?: boolean;
}

export const WhatsAppDeliveryCard: React.FC<WhatsAppDeliveryCardProps> = ({
  order,
  settings,
  language,
  compact = false
}) => {
  const [copied, setCopied] = useState(false);

  const whatsappUrl = createWhatsAppOrderLink(order, settings, language);
  const displayPhone = settings.whatsappNumber || settings.phone || '+856 20 5555 9988';
  const cleanNumber = getCleanWhatsAppNumber(displayPhone);

  const handleCopyMessage = () => {
    const text = buildWhatsAppOrderMessage(order, language);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-emerald-50/80 border-2 border-emerald-500/30 rounded-3xl p-5 sm:p-6 text-left shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* WhatsApp Logo Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0">
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.838.814 2.791.814 3.18 0 5.766-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.523-4.477 10-10 10-1.758 0-3.411-.453-4.857-1.246l-5.143 1.347 1.373-5.018c-.868-1.488-1.373-3.224-1.373-5.083 0-5.523 4.477-10 10-10s10 4.477 10 10z"/>
            </svg>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Truck className="w-3 h-3 text-emerald-700" />
              <span>{language === 'lo' ? 'ການປະສານງານຈັດສົ່ງ' : 'Delivery Coordination'}</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
              {language === 'lo'
                ? "ຕິດຕໍ່ຜ່ານ WhatsApp Business ເພື່ອຈັດສົ່ງ"
                : "Connect via WhatsApp Business for Delivery"}
            </h4>
          </div>
        </div>

        <span className="hidden sm:inline-flex text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg font-bold shrink-0">
          +{cleanNumber}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
        {language === 'lo'
          ? "ທ່ານໄດ້ຊຳລະເງິນ ແລະ ປ້ອນທີ່ຢູ່ສຳເລັດແລ້ວ! ກົດປຸ່ມດ້ານລຸ່ມເພື່ອເຊື່ອມຕໍ່ກັບ WhatsApp Business ຂອງຮ້ານເຮົາ ພ້ອມສົ່ງເລກອໍເດີ ແລະ ລາຍລະອຽດທີ່ຢູ່ ເພື່ອໃຫ້ທີມງານປະສານງານຈັດສົ່ງສິນຄ້າໃຫ້ທ່ານຢ່າງວ່ອງໄວ."
          : "Your payment slip and delivery address are recorded! Click below to open our store's WhatsApp Business with your order details pre-filled so our team can coordinate fast delivery with you."}
      </p>

      {/* Action Buttons */}
      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Primary WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.838.814 2.791.814 3.18 0 5.766-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.523-4.477 10-10 10-1.758 0-3.411-.453-4.857-1.246l-5.143 1.347 1.373-5.018c-.868-1.488-1.373-3.224-1.373-5.083 0-5.523 4.477-10 10-10s10 4.477 10 10z"/>
          </svg>
          <span>
            {language === 'lo'
              ? "ເປີດ WhatsApp Business ຕິດຕໍ່ຈັດສົ່ງ"
              : "Chat on WhatsApp Business"}
          </span>
          <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
        </a>

        {/* Copy Details Button */}
        <button
          type="button"
          onClick={handleCopyMessage}
          className="px-4 py-3.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          title="Copy Order Summary for WhatsApp"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{language === 'lo' ? 'ສຳເນົາແລ້ວ' : 'Copied!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-stone-600" />
              <span>{language === 'lo' ? 'ສຳເນົາຂໍ້ມູນອໍເດີ' : 'Copy Summary'}</span>
            </>
          )}
        </button>
      </div>

      {/* Safety Notice */}
      <div className="flex items-center gap-2 text-[11px] text-emerald-900/80 font-medium pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        <span>
          {language === 'lo'
            ? 'ເລກອໍເດີ ແລະ ຂໍ້ມູນຂອງທ່ານຈະຖືກສົ່ງໃຫ້ຮ້ານຢ່າງຖືກຕ້ອງ ແລະ ປອດໄພ'
            : 'Your order details will be securely sent directly to our official business line.'}
        </span>
      </div>
    </div>
  );
};
