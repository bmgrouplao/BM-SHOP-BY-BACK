import { Order, StoreSettings } from '../types';
import { formatKip } from './formatters';

/**
 * Normalizes phone number to international WhatsApp format (e.g., 8562055559988)
 */
export const getCleanWhatsAppNumber = (phoneOrWhatsApp?: string): string => {
  if (!phoneOrWhatsApp) return '8562055559988';
  const digitsOnly = phoneOrWhatsApp.replace(/[^0-9]/g, '');

  if (digitsOnly.startsWith('020')) {
    return '85620' + digitsOnly.slice(3);
  }
  if (digitsOnly.startsWith('20') && digitsOnly.length === 10) {
    return '856' + digitsOnly;
  }
  if (digitsOnly.startsWith('856')) {
    return digitsOnly;
  }
  if (digitsOnly.length === 8) {
    return '85620' + digitsOnly;
  }
  return digitsOnly || '8562055559988';
};

/**
 * Prepares the formatted message text for order delivery coordination
 */
export const buildWhatsAppOrderMessage = (
  order: Order,
  lang: 'en' | 'lo' = 'lo'
): string => {
  const gpsLink = order.customer.gps
    ? `https://maps.google.com/?q=${order.customer.gps.latitude},${order.customer.gps.longitude}`
    : '';

  const itemsList = order.items
    .map(
      (item) =>
        `- ${lang === 'lo' ? item.nameLA : item.nameEN} (${item.color}, Size ${item.size}) x${item.quantity}`
    )
    .join('\n');

  if (lang === 'lo') {
    return `ສະບາຍດີ BM SHOP, ຂ້ອຍໄດ້ສັ່ງຊື້ສິນຄ້າ ແລະ ຊຳລະເງິນແລ້ວ!

📦 ເລກອໍເດີ (Order No): ${order.orderNumber}
👤 ຊື່ຜູ້ຮັບ (Name): ${order.customer.name}
📞 ເບີໂທ (Phone): ${order.customer.phone}
📍 ທີ່ຢູ່ຈັດສົ່ງ (Address): ບ້ານ ${order.customer.village}, ເມືອງ ${order.customer.district}, ${order.customer.province} (${order.customer.address})
${order.customer.deliveryNote ? `📝 ໝາຍເຫດ: ${order.customer.deliveryNote}\n` : ''}${gpsLink ? `🗺️ ແຜນທີ່ GPS: ${gpsLink}\n` : ''}🛍️ ລາຍການສິນຄ້າ:
${itemsList}

💰 ຍອດລວມທັງໝົດ: ${formatKip(order.total)}
💳 ຫຼັກຖານການໂອນ: ໄດ້ແນບສະລິບໃນລະບົບແລ້ວ

ກະລຸນາກວດສອບ ແລະ ແຈ້ງອັບເດດການຈັດສົ່ງສິນຄ້າໃຫ້ຂ້ອຍແດ່ເດີ້, ຂອບໃຈຫຼາຍໆ!`;
  }

  return `Hello BM SHOP, I have completed payment and address info for my order!

📦 Order Number: ${order.orderNumber}
👤 Recipient: ${order.customer.name}
📞 Phone: ${order.customer.phone}
📍 Delivery Address: ${order.customer.village}, ${order.customer.district}, ${order.customer.province} (${order.customer.address})
${order.customer.deliveryNote ? `📝 Note: ${order.customer.deliveryNote}\n` : ''}${gpsLink ? `🗺️ GPS Pin: ${gpsLink}\n` : ''}🛍️ Items Ordered:
${itemsList}

💰 Total Amount: ${formatKip(order.total)}
💳 Payment Proof: Attached in system

Please review my order and coordinate the delivery timeline with me. Thank you!`;
};

/**
 * Generates direct wa.me link with encoded order summary
 */
export const createWhatsAppOrderLink = (
  order: Order,
  settings: StoreSettings,
  lang: 'en' | 'lo' = 'lo'
): string => {
  const number = getCleanWhatsAppNumber(settings.whatsappNumber || settings.phone);
  const text = buildWhatsAppOrderMessage(order, lang);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};
