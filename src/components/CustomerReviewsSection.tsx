import React, { useState } from 'react';
import { Star, MessageSquarePlus, Check, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerReviewsSection: React.FC = () => {
  const { reviews, submitReview, language, t } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [productName, setProductName] = useState('Classic Minimal Leather Sneakers');
  const [comment, setComment] = useState('');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const approvedReviews = reviews.filter((r) => r.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    submitReview({
      customerName: name.trim(),
      rating,
      comment: comment.trim(),
      productName,
      ageGroup
    });

    setSubmittedNotice(true);
    setTimeout(() => {
      setSubmittedNotice(false);
      setModalOpen(false);
      setName('');
      setComment('');
    }, 2000);
  };

  return (
    <section className="py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{language === 'lo' ? 'ຄະແນນ 5/5 ຈາກລູກຄ້າຕົວຈິງ' : '4.9/5 from verified buyers'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {t('reviews.title')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('reviews.subtitle')}
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start sm:self-auto border border-stone-200"
          >
            <MessageSquarePlus className="w-4 h-4 text-stone-700" />
            <span>{t('reviews.leaveReview')}</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200/60 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{rev.customerName}</span>
                  {rev.ageGroup && (
                    <span className="text-[11px] text-stone-400">{rev.ageGroup} yrs</span>
                  )}
                </div>
                <div className="text-[11px] text-stone-500 truncate mt-0.5">
                  {rev.productName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">{t('reviews.leaveReview')}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedNotice ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-stone-900">{t('reviews.submittedNotice')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="font-bold text-stone-800 block mb-1">{t('reviews.name')}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Noy S."
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">{t('reviews.rating')}</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            num <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">Age Group</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  >
                    <option value="18-24">18–24 (Young Adult)</option>
                    <option value="25-34">25–34 (Young Adult)</option>
                    <option value="35-44">35–44 (Adult)</option>
                    <option value="45-54">45–54 (Middle-Age)</option>
                    <option value="55+">55+ (Mature)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-800 block mb-1">{t('reviews.comment')}</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with the fit, quality and delivery..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 text-xs shadow-xs"
                  >
                    {t('reviews.submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
