import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Package,
  Truck,
  CheckCheck,
  MapPin,
  Calendar,
  XCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatKip, formatDate } from '../utils/formatters';
import { Order, OrderStatus } from '../types';
import { WhatsAppDeliveryCard } from './WhatsAppDeliveryCard';

export const OrderTrackingView: React.FC = () => {
  const { language, t, findOrder, settings } = useStore();

  const [orderNumberInput, setOrderNumberInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumberInput.trim() || !phoneInput.trim()) return;

    const res = findOrder(orderNumberInput, phoneInput);
    setFoundOrder(res || null);
    setSearched(true);
  };

  // Timeline Step Status Mapping
  const timelineSteps = [
    { key: 'submitted', label: t('tracking.statusSubmitted'), statusKey: 'waiting_payment' },
    { key: 'payment', label: t('tracking.statusPaymentVerified'), statusKey: 'confirmed' },
    { key: 'confirmed', label: t('tracking.statusConfirmed'), statusKey: 'confirmed' },
    { key: 'preparing', label: t('tracking.statusPreparing'), statusKey: 'preparing' },
    { key: 'ready', label: t('tracking.statusReady'), statusKey: 'ready_for_delivery' },
    { key: 'out', label: t('tracking.statusOut'), statusKey: 'out_for_delivery' },
    { key: 'delivered', label: t('tracking.statusDelivered'), statusKey: 'delivered' }
  ];

  // Helper to determine step state
  const getStepState = (order: Order, index: number) => {
    const statusOrder: OrderStatus[] = [
      'waiting_payment',
      'confirmed',
      'preparing',
      'ready_for_delivery',
      'out_for_delivery',
      'delivered'
    ];

    if (order.orderStatus === 'cancelled') return 'cancelled';

    // Payment step index is 1
    if (index === 1) {
      if (order.paymentStatus === 'verified') return 'completed';
      if (order.paymentStatus === 'not_confirmed') return 'rejected';
      return 'pending';
    }

    const currentIdx = statusOrder.indexOf(order.orderStatus);
    const targetIdx = index === 0 ? 0 : index - 1;

    if (currentIdx > targetIdx) return 'completed';
    if (currentIdx === targetIdx) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-semibold">
          <Package className="w-3.5 h-3.5" />
          <span>{language === 'lo' ? 'ກວດສອບສະຖານະສິນຄ້າ' : 'Live Order Lookup'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {t('tracking.title')}
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          {t('tracking.subtitle')}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">
                {t('tracking.orderNumberLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={orderNumberInput}
                onChange={(e) => setOrderNumberInput(e.target.value)}
                placeholder="BM-20261002-0001"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">
                {t('tracking.phoneLabel')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="020 5555 1234"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>{t('tracking.button')}</span>
          </button>
        </form>

        {/* Demo Tip */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
          <span>
            {language === 'lo' ? 'ຕົວຢ່າງເລກອໍເດີທົດສອບ:' : 'Demo Order for testing:'}{' '}
            <strong className="text-stone-700 font-mono">BM-20261002-0001</strong> (Phone: <span className="font-mono">02055551234</span>)
          </span>
          <button
            type="button"
            onClick={() => {
              setOrderNumberInput('BM-20261002-0001');
              setPhoneInput('02055551234');
            }}
            className="text-stone-700 hover:underline font-bold"
          >
            {language === 'lo' ? 'ປ້ອນອັດຕະໂນມັດ' : 'Autofill'}
          </button>
        </div>
      </div>

      {/* Search Result */}
      {searched && !foundOrder && (
        <div className="p-8 bg-red-50 border border-red-200 rounded-3xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <p className="text-sm font-bold text-red-900">{t('tracking.notFound')}</p>
        </div>
      )}

      {foundOrder && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Order Header Summary */}
          <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
                  {t('success.orderNumber')}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                  {foundOrder.orderNumber}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Payment Status Badge */}
                <div className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-stone-800 border border-stone-700">
                  <span className="text-stone-400 mr-1.5">{t('success.paymentStatus')}:</span>
                  {foundOrder.paymentStatus === 'verified' && (
                    <span className="text-emerald-400">🟢 {t('tracking.paymentVerified')}</span>
                  )}
                  {foundOrder.paymentStatus === 'pending_verification' && (
                    <span className="text-amber-400">🟠 {t('tracking.paymentPending')}</span>
                  )}
                  {foundOrder.paymentStatus === 'not_confirmed' && (
                    <span className="text-red-400">🔴 {t('tracking.paymentRejected')}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-800 text-xs text-stone-300">
              <div>
                <span className="text-stone-500 block">Date Placed</span>
                <span className="font-medium text-white">{formatDate(foundOrder.createdAt, language)}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Recipient</span>
                <span className="font-medium text-white">{foundOrder.customer.name}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Total Amount</span>
                <span className="font-bold text-amber-400 font-mono text-sm">
                  {formatKip(foundOrder.total)}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">Destination</span>
                <span className="font-medium text-white truncate block">
                  {foundOrder.customer.district}, {foundOrder.customer.province}
                </span>
              </div>
            </div>

            {/* Admin Note if payment rejected */}
            {foundOrder.verification?.adminNote && foundOrder.paymentStatus === 'not_confirmed' && (
              <div className="p-3.5 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-red-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t('tracking.adminNote')}:</span>
                </span>
                <p className="leading-relaxed">{foundOrder.verification.adminNote}</p>
                <div className="pt-1 text-[11px] text-stone-300">
                  Please contact BM SHOP support via WhatsApp: <strong className="text-white">{settings.phone}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Timeline View (Section 34) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              {t('tracking.timelineTitle')}
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
              {timelineSteps.map((s, idx) => {
                const state = getStepState(foundOrder, idx);
                return (
                  <div key={s.key} className="relative flex items-start gap-4">
                    {/* Circle icon */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        state === 'completed'
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                          : state === 'current'
                          ? 'bg-stone-900 text-white ring-4 ring-stone-100 animate-pulse'
                          : state === 'rejected'
                          ? 'bg-red-600 text-white ring-4 ring-red-50'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {state === 'completed' ? (
                        <CheckCheck className="w-3.5 h-3.5" />
                      ) : state === 'rejected' ? (
                        <XCircle className="w-3.5 h-3.5" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <div className="space-y-0.5 pt-0.5">
                      <h4
                        className={`text-sm font-bold ${
                          state === 'completed' || state === 'current'
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {s.label}
                      </h4>
                      {idx === 1 && foundOrder.paymentStatus === 'pending_verification' && (
                        <p className="text-xs text-amber-700 font-medium">
                          Our admin team is currently reviewing your uploaded transfer screenshot.
                        </p>
                      )}
                      {idx === 1 && foundOrder.paymentStatus === 'verified' && (
                        <p className="text-xs text-emerald-700 font-medium">
                          Payment confirmed by {foundOrder.verification?.verifiedBy || 'Admin'}.
                        </p>
                      )}
                      {idx === 5 && foundOrder.orderStatus === 'out_for_delivery' && (
                        <p className="text-xs text-blue-700 font-medium flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Delivery driver is en route to your address.</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ordered Items Breakdown */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              {t('tracking.orderDetails')}
            </h3>

            <div className="divide-y divide-stone-100">
              {foundOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.nameEN}
                      className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200"
                    />
                    <div>
                      <span className="font-bold text-stone-900 block">
                        {language === 'lo' ? item.nameLA : item.nameEN}
                      </span>
                      <span className="text-stone-500 text-xs">
                        {item.color} · Size: {item.size} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-stone-900">
                    {formatKip(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
              <span>{t('cart.total')}</span>
              <span className="font-mono text-base font-black">{formatKip(foundOrder.total)}</span>
            </div>
          </div>

          {/* WhatsApp Delivery Communication Card */}
          <WhatsAppDeliveryCard
            order={foundOrder}
            settings={settings}
            language={language}
          />
        </div>
      )}
    </div>
  );
};
