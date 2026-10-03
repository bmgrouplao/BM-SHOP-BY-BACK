import { Language } from '../types';

/**
 * Format currency in Lao Kip (LAK)
 * Example: 850000 -> "₭850,000"
 */
export const formatKip = (amount: number): string => {
  return `₭${Math.round(amount).toLocaleString('en-US')}`;
};

/**
 * Format date for display in Lao or English
 */
export const formatDate = (dateString: string, lang: Language = 'lo'): string => {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;

    if (lang === 'lo') {
      const day = d.getDate();
      const monthNames = [
        'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ',
        'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'
      ];
      const month = monthNames[d.getMonth()];
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return `${day} ${month} ${year}, ${hours}:${mins}`;
    }

    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
};
