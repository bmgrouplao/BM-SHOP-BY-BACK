import React, { useState } from 'react';
import {
  X,
  MapPin,
  Upload,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  QrCode,
  ShieldAlert,
  Loader2,
  Trash2,
  Navigation
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatKip } from '../utils/formatters';
import { LAO_PROVINCES, VIENTIANE_DISTRICTS } from '../data/initialData';
import { CustomerDeliveryInfo, Order } from '../types';
import { WhatsAppDeliveryCard } from './WhatsAppDeliveryCard';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const { cart, cartSubtotal, deliveryFee, cartTotal, settings, language, t, createOrder } =
    useStore();

  // Wizard Step: 1: Delivery, 2: Payment & Slip Upload, 3: Confirmation
  const [step, setStep] = useState<number>(1);

  // Delivery Form State
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [province, setProvince] = useState<string>('Vientiane Capital');
  const [district, setDistrict] = useState<string>('Chanthabouly');
  const [village, setVillage] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [deliveryNote, setDeliveryNote] = useState<string>('');

  // GPS State
  const [gpsLocation, setGpsLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [detectingGps, setDetectingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Payment Proof State
  const [proofFile, setProofFile] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Created Order Result (for Step 4 / Success)
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedOrderNum, setCopiedOrderNum] = useState<boolean>(false);

  if (!isOpen) return null;

  // Handle Geolocation capture
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsError(
        language === 'lo'
          ? 'ອຸປະກອນຂອງທ່ານບໍ່ຮອງຮັບ GPS'
          : 'Geolocation is not supported by your browser'
      );
      return;
    }

    setDetectingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        setDetectingGps(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setGpsError(
          language === 'lo'
            ? 'ບໍ່ສາມາດດຶງຕຳແໜ່ງໄດ້ ກະລຸນາປ້ອນທີ່ຢູ່ລະອຽດດ້ວຍຕົນເອງ'
            : 'Unable to retrieve location. Please fill manual address.'
        );
        setDetectingGps(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Validate Delivery Step
  const validateDeliveryStep = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = t('checkout.errorName');
    if (!phone.trim() || phone.trim().length < 8) errors.phone = t('checkout.errorPhone');
    if (!province) errors.province = t('checkout.errorProvince');
    if (!district) errors.district = t('checkout.errorDistrict');
    if (!village.trim()) errors.village = t('checkout.errorVillage');
    if (!address.trim()) errors.address = t('checkout.errorAddress');

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Proof Upload
  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'lo' ? 'ກະລຸນາເລືອກໄຟລ໌ຮູບພາບເທົ່ານັ້ນ (JPG, PNG)' : 'Please select an image file (JPG, PNG)');
      return;
    }

    setProofFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setProofFile(event.target?.result as string);
      setFormErrors((prev) => ({ ...prev, proof: '' }));
    };
    reader.readAsDataURL(file);
  };

  // Handle Order Submit
  const handleFinalSubmit = () => {
    if (!proofFile) {
      setFormErrors((prev) => ({ ...prev, proof: t('checkout.errorProof') }));
      return;
    }

    setIsSubmitting(true);

    const customerDelivery: CustomerDeliveryInfo = {
      name: name.trim(),
      phone: phone.trim(),
      province,
      district,
      village: village.trim(),
      address: address.trim(),
      deliveryNote: deliveryNote.trim() || undefined,
      gps: gpsLocation || undefined
    };

    setTimeout(() => {
      const order = createOrder(customerDelivery, proofFile);
      setCompletedOrder(order);
      setIsSubmitting(false);
      setStep(4);
      onOrderSuccess(order);
    }, 600);
  };

  const copyOrderNumber = () => {
    if (completedOrder) {
      navigator.clipboard.writeText(completedOrder.orderNumber);
      setCopiedOrderNum(true);
      setTimeout(() => setCopiedOrderNum(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto">
        {/* Top Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-stone-400">
              {t('checkout.noAccountNeeded')}
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {t('checkout.title')}
            </h2>
          </div>
          {step !== 4 && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="bg-stone-100 px-6 py-3 border-b border-stone-200 grid grid-cols-3 text-xs font-bold text-center">
            <div className={`flex items-center justify-center gap-1.5 ${step === 1 ? 'text-stone-900' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-stone-900 text-white' : 'bg-stone-200'}`}>1</span>
              <span>{t('checkout.step2')}</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 ${step === 2 ? 'text-stone-900' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-stone-900 text-white' : 'bg-stone-200'}`}>2</span>
              <span>{t('checkout.step3')}</span>
            </div>
            <div className={`flex items-center justify-center gap-1.5 ${step === 3 ? 'text-stone-900' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-stone-900 text-white' : 'bg-stone-200'}`}>3</span>
              <span>{t('checkout.step4')}</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Delivery Information */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t('checkout.step2')}</h3>
                <p className="text-xs text-stone-500">
                  {language === 'lo'
                    ? 'ກະລຸນາປ້ອນຂໍ້ມູນຈັດສົ່ງໃຫ້ຄົບຖ້ວນ ເພື່ອຄວາມວ່ອງໄວໃນການຈັດສົ່ງ'
                    : 'Please provide full delivery address in Laos.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('checkout.fullNamePlaceholder')}
                    className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                      formErrors.name ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-red-600 font-medium">{formErrors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('checkout.phonePlaceholder')}
                    className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                      formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-600 font-medium">{formErrors.phone}</p>
                  )}
                </div>

                {/* Province Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.province')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    {LAO_PROVINCES.map((p) => (
                      <option key={p.id} value={p.nameEN}>
                        {language === 'lo' ? p.nameLA : p.nameEN}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Dropdown / Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.district')} <span className="text-red-500">*</span>
                  </label>
                  {province === 'Vientiane Capital' ? (
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    >
                      {VIENTIANE_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.nameEN}>
                          {language === 'lo' ? d.nameLA : d.nameEN}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g. Luang Prabang District"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  )}
                </div>

                {/* Village */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.village')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={t('checkout.villagePlaceholder')}
                    className={`w-full px-4 py-3 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                      formErrors.village ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.village && (
                    <p className="text-[11px] text-red-600 font-medium">{formErrors.village}</p>
                  )}
                </div>

                {/* Detailed Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.address')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('checkout.addressPlaceholder')}
                    className={`w-full px-4 py-2.5 bg-stone-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 ${
                      formErrors.address ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-red-600 font-medium">{formErrors.address}</p>
                  )}
                </div>

                {/* Delivery Note */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-800">
                    {t('checkout.deliveryNote')}
                  </label>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder={t('checkout.deliveryNotePlaceholder')}
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Share Location (GPS) section */}
              <div className="pt-2">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{t('checkout.shareLocation')}</span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {t('checkout.locationHelp')}
                    </p>
                    {gpsLocation && (
                      <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                        ✓ {t('checkout.locationShared')}: {gpsLocation.latitude.toFixed(4)}, {gpsLocation.longitude.toFixed(4)}
                      </span>
                    )}
                    {gpsError && (
                      <span className="block text-[11px] text-amber-700 mt-1">{gpsError}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={detectingGps}
                    className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 active:scale-98 rounded-xl text-xs font-bold text-stone-900 transition-colors flex items-center justify-center gap-2 shrink-0"
                  >
                    {detectingGps ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t('checkout.gettingLocation')}</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{gpsLocation ? 'Update GPS' : t('checkout.shareLocation')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Navigation button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (validateDeliveryStep()) {
                      setStep(2);
                    }
                  }}
                  className="px-8 py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-md"
                >
                  <span>{t('common.next')}: {t('checkout.step3')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: QR Payment & Slip Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t('checkout.paymentTitle')}</h3>
                <p className="text-xs text-stone-500">
                  {language === 'lo'
                    ? 'ສະແກນ QR ໂຄ້ດເພື່ອຊຳລະເງິນຜ່ານແອັບ BCEL One ຫຼື ທະນາຄານຂອງທ່ານ'
                    : 'Scan QR code with BCEL One or any Lao banking app.'}
                </p>
              </div>

              {/* Prominent Safety Message (Section 27) */}
              <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wide">
                    {language === 'lo' ? 'ຂໍ້ຄວນລະວັງຄວາມປອດໄພ' : 'Payment Safety Verification'}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-amber-800 leading-relaxed">
                    {t('checkout.safetyNotice')}
                  </p>
                </div>
              </div>

              {/* QR and Account Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-stone-50 p-6 rounded-3xl border border-stone-200">
                {/* QR Code Container */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <div className="p-2 border-2 border-stone-900 rounded-xl bg-white">
                    <img
                      src={settings.qrCodeImage}
                      alt="BM SHOP BCEL One QR Code"
                      className="w-44 h-44 object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-stone-500 mt-2 flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-stone-700" />
                    <span>BCEL One / Lao QR</span>
                  </span>
                </div>

                {/* Account Details */}
                <div className="md:col-span-7 space-y-3">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[11px] text-stone-500 block">{t('checkout.bankName')}</span>
                    <span className="text-sm font-extrabold text-stone-900">{settings.bankName}</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[11px] text-stone-500 block">{t('checkout.accountName')}</span>
                    <span className="text-sm font-black text-stone-900">{settings.accountOwner}</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[11px] text-stone-500 block">{t('checkout.accountNumber')}</span>
                    <span className="text-base font-black text-stone-900 font-mono tracking-wider">
                      {settings.accountNumber}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-900 text-white rounded-xl flex items-center justify-between">
                    <span className="text-xs text-stone-300 font-medium">{t('checkout.totalToPay')}</span>
                    <span className="text-xl font-black font-mono tracking-tight text-amber-400">
                      {formatKip(cartTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upload Payment Proof (Section 29) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-stone-700" />
                    <span>{t('checkout.uploadProofTitle')}</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-stone-500">JPG, JPEG, PNG</span>
                </div>

                {proofFile ? (
                  <div className="p-4 bg-stone-50 border border-stone-300 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={proofFile}
                        alt="Payment slip preview"
                        className="w-16 h-16 object-cover rounded-xl border border-stone-300 shadow-xs"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 block truncate">
                          {proofFileName || 'payment_proof_slip.jpg'}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ready for verification</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl cursor-pointer transition-colors">
                        <span>{t('checkout.changeProof')}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProofUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setProofFile(null);
                          setProofFileName('');
                        }}
                        className="p-2 text-stone-400 hover:text-red-600 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-stone-50 transition-all ${
                      formErrors.proof
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-stone-400 mb-2" />
                    <span className="text-xs font-bold text-stone-900">
                      {t('checkout.uploadProofTitle')}
                    </span>
                    <span className="text-[11px] text-stone-500 mt-1 text-center">
                      {t('checkout.uploadProofHelp')}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProofUpload}
                      className="hidden"
                    />
                  </label>
                )}

                {formErrors.proof && (
                  <p className="text-xs text-red-600 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formErrors.proof}</span>
                  </p>
                )}
              </div>

              {/* Step Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 border border-stone-300 text-stone-800 font-bold rounded-xl hover:bg-stone-100 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('common.back')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!proofFile) {
                      setFormErrors((prev) => ({ ...prev, proof: t('checkout.errorProof') }));
                      return;
                    }
                    setStep(3);
                  }}
                  className="px-8 py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-md"
                >
                  <span>{t('common.next')}: {t('checkout.step4')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review & Final Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{t('checkout.step4')}</h3>
                <p className="text-xs text-stone-500">
                  {language === 'lo'
                    ? 'ກະລຸນາກວດສອບຂໍ້ມູນຄືນໃໝ່ ໃຫ້ຖືກຕ້ອງກ່ອນຢືນຢັນການສັ່ງຊື້'
                    : 'Review your order summary and delivery info before placing.'}
                </p>
              </div>

              {/* Delivery Recap */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-stone-900 border-b border-stone-200 pb-2">
                  <span>{t('checkout.step2')}</span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-stone-600 hover:text-stone-900 underline"
                  >
                    {t('common.edit')}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  <div>
                    <span className="font-semibold text-stone-700">Name:</span> {name}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-700">Phone:</span> {phone}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-stone-700">Address:</span> {village}, {district}, {province} ({address})
                  </div>
                  {gpsLocation && (
                    <div className="col-span-2 text-emerald-700 font-semibold">
                      ✓ GPS Coordinates attached for Google Maps navigation
                    </div>
                  )}
                </div>
              </div>

              {/* Items Recap */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-800">
                  Items ({cart.length})
                </span>
                <div className="divide-y divide-stone-100 max-h-44 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.nameEN}
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <span className="font-bold text-stone-900 block">
                            {language === 'lo' ? item.nameLA : item.nameEN}
                          </span>
                          <span className="text-stone-500">
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
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-stone-100 rounded-2xl space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-bold text-stone-900 font-mono">{formatKip(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{t('cart.deliveryFee')}</span>
                  <span className="font-bold font-mono">
                    {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : formatKip(deliveryFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-extrabold text-stone-950">
                  <span>{t('cart.total')}</span>
                  <span className="font-mono text-lg">{formatKip(cartTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 border border-stone-300 text-stone-800 font-bold rounded-xl hover:bg-stone-100 text-xs"
                >
                  {t('common.back')}
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-stone-900 text-white font-extrabold rounded-xl hover:bg-stone-800 active:scale-98 transition-all flex items-center gap-2 text-sm shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('checkout.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('checkout.submitOrder')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && completedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                  {t('success.title')}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {t('success.sub')}
                </p>
              </div>

              {/* Order Number Box */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl max-w-md mx-auto space-y-2">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
                  {t('success.orderNumber')}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-wider text-stone-950">
                    {completedOrder.orderNumber}
                  </span>
                  <button
                    onClick={copyOrderNumber}
                    className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition-colors"
                    title={t('success.copy')}
                  >
                    {copiedOrderNum ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Status indicators */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left">
                  <span className="text-[10px] text-amber-800 font-bold block">{t('success.paymentStatus')}</span>
                  <span className="text-xs font-black text-amber-900">🟠 {t('success.paymentPending')}</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left">
                  <span className="text-[10px] text-amber-800 font-bold block">{t('success.orderStatus')}</span>
                  <span className="text-xs font-black text-amber-900">🟠 {t('success.orderWaiting')}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                {t('success.notice')}
              </p>

              {/* WhatsApp Business Delivery Communication */}
              <div className="max-w-md mx-auto">
                <WhatsAppDeliveryCard
                  order={completedOrder}
                  settings={settings}
                  language={language}
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 text-xs shadow-md"
                >
                  {t('success.continueShopping')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
