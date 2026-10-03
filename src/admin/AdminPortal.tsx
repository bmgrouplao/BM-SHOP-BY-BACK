import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  ExternalLink,
  MapPin,
  Clock,
  AlertTriangle,
  Eye,
  Plus,
  Trash2,
  Edit,
  Save,
  ChevronRight,
  TrendingUp,
  Search,
  Filter,
  Truck,
  Type
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatKip, formatDate } from '../utils/formatters';
import { Order, OrderStatus, Product, ProductVariant } from '../types';
import { WordingEditor } from './WordingEditor';

interface AdminPortalProps {
  onBackToStore: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToStore }) => {
  const {
    adminAuth,
    orders,
    verifyPayment,
    rejectPayment,
    updateOrderStatus,
    products,
    setProducts,
    settings,
    updateSettings,
    language
  } = useStore();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'payments' | 'orders' | 'products' | 'reports' | 'settings' | 'wording'
  >('dashboard');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@bmshop.la');
  const [loginPass, setLoginPass] = useState('bmshop2026');
  const [loginError, setLoginError] = useState('');

  // Selected Order for Payment Review Modal
  const [selectedReviewOrder, setSelectedReviewOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState('Incorrect amount / Slip mismatch');
  const [customRejectNote, setCustomRejectNote] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  // Selected Order for detail view
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Product editing modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Filters for orders
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminAuth.login(loginEmail, loginPass);
    if (!success) {
      setLoginError('Invalid email or password. Please use demo credentials below.');
    } else {
      setLoginError('');
    }
  };

  // If not authenticated, show Admin Login Page
  if (!adminAuth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">BM SHOP ADMIN</h1>
            <p className="text-xs text-stone-500 font-medium">
              Payment Verification & Store Management Backend
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-800 block mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="font-bold text-stone-800 block mb-1">Password</label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 text-sm shadow-md transition-all active:scale-98"
            >
              Sign In to Admin Portal
            </button>
          </form>

          {/* Demo Login Reminder */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 space-y-1">
            <span className="font-bold block">Demo Credentials (Pre-filled):</span>
            <div>Email: <strong className="font-mono">admin@bmshop.la</strong></div>
            <div>Password: <strong className="font-mono">bmshop2026</strong></div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onBackToStore}
              className="text-xs text-stone-500 hover:text-stone-900 font-semibold"
            >
              ← Back to Customer Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pending Payments Queue
  const pendingOrders = orders.filter((o) => o.paymentStatus === 'pending_verification');
  const confirmedOrders = orders.filter((o) => o.orderStatus === 'confirmed');
  const outForDeliveryOrders = orders.filter((o) => o.orderStatus === 'out_for_delivery');
  const totalSales = orders
    .filter((o) => o.paymentStatus === 'verified')
    .reduce((sum, o) => sum + o.total, 0);

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    if (orderStatusFilter === 'pending_payment') return o.paymentStatus === 'pending_verification';
    return o.orderStatus === orderStatusFilter;
  });

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row text-stone-900">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-stone-900 text-stone-300 p-5 flex flex-col justify-between shrink-0 border-r border-stone-800">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div>
              <span className="text-xl font-black text-white tracking-tight">BM SHOP</span>
              <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                Admin Management
              </span>
            </div>
            <button
              onClick={onBackToStore}
              title="Return to Public Store"
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'dashboard' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'payments' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Payment Review</span>
              </div>
              {pendingOrders.length > 0 && (
                <span className="bg-amber-500 text-stone-950 font-black px-1.5 py-0.2 rounded-full text-[10px]">
                  {pendingOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'orders' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="text-stone-500 font-mono text-[11px]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'products' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products & Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'reports' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'settings' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store & Payment Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('wording')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'wording' ? 'bg-stone-800 text-white font-bold' : 'hover:bg-stone-800/60'
              }`}
            >
              <Type className="w-4 h-4 text-emerald-400" />
              <span>Words & Sentences (ປັບແຕ່ງຂໍ້ຄວາມ)</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-stone-800 space-y-3">
          <div className="text-xs text-stone-400">
            <span className="block text-white font-bold">Admin: Bounmy S.</span>
            <span className="text-[11px] truncate block">admin@bmshop.la</span>
          </div>
          <button
            onClick={adminAuth.logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-stone-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 max-h-screen overflow-y-auto">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-stone-500">Live operational overview of BM SHOP</p>
            </div>

            {/* KPI Cards (Section 37) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Total Verified Sales</span>
                <div className="text-2xl font-black text-stone-950 font-mono tracking-tight">
                  {formatKip(totalSales)}
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>From confirmed orders</span>
                </span>
              </div>

              <div
                onClick={() => setActiveTab('payments')}
                className="p-5 bg-amber-50 rounded-2xl border-2 border-amber-300 shadow-2xs space-y-2 cursor-pointer hover:bg-amber-100/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase">Pending Payments</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                </div>
                <div className="text-3xl font-black text-amber-950 font-mono">
                  {pendingOrders.length}
                </div>
                <span className="text-xs text-amber-800 font-bold flex items-center gap-1">
                  <span>Review receipts now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Confirmed & Preparing</span>
                <div className="text-2xl font-black text-stone-950 font-mono">
                  {confirmedOrders.length}
                </div>
                <span className="text-[11px] text-stone-500">Ready for packing</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Out for Delivery</span>
                <div className="text-2xl font-black text-stone-950 font-mono">
                  {outForDeliveryOrders.length}
                </div>
                <span className="text-[11px] text-blue-700 font-semibold">In transit to customers</span>
              </div>
            </div>

            {/* Quick Payment Verification Table */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-stone-900">
                    Payment Verification Queue ({pendingOrders.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Orders waiting for bank transfer slip review before dispatch
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="text-xs font-bold text-stone-900 hover:underline"
                >
                  View all pending →
                </button>
              </div>

              {pendingOrders.length === 0 ? (
                <div className="py-8 text-center text-xs text-stone-400">
                  ✓ All payment slips have been verified. No pending queue!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                      <tr>
                        <th className="py-2.5 px-3">Order Number</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Phone</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Slip Proof</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {pendingOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50/80">
                          <td className="py-3 px-3 font-mono font-bold text-stone-900">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3 px-3 font-medium text-stone-800">
                            {ord.customer.name}
                          </td>
                          <td className="py-3 px-3 font-mono text-stone-600">{ord.customer.phone}</td>
                          <td className="py-3 px-3 font-mono font-bold text-stone-950">
                            {formatKip(ord.total)}
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => setSelectedReviewOrder(ord)}
                              className="flex items-center gap-1.5 text-xs text-blue-700 hover:underline font-semibold"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Slip</span>
                            </button>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => setSelectedReviewOrder(ord)}
                              className="px-3 py-1.5 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 text-[11px]"
                            >
                              Review & Verify
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENT VERIFICATION QUEUE (Section 38-43) */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                  Payment Verification Queue
                </h1>
                <p className="text-xs text-stone-500">
                  Examine uploaded customer payment screenshots against expected amounts
                </p>
              </div>
              <span className="px-3 py-1.5 bg-amber-100 text-amber-900 font-bold rounded-xl text-xs">
                {pendingOrders.length} Pending Approval
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pendingOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-400 transition-all flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-stone-900">
                        {ord.orderNumber}
                      </span>
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Pending Verification
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="font-bold text-stone-900 text-sm">{ord.customer.name}</div>
                      <div className="text-stone-500 font-mono">Tel: {ord.customer.phone}</div>
                      <div className="text-stone-500 truncate">
                        {ord.customer.village}, {ord.customer.district}, {ord.customer.province}
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl flex items-center justify-between">
                      <span className="text-xs text-stone-500">Expected Total:</span>
                      <span className="font-mono font-black text-base text-stone-950">
                        {formatKip(ord.total)}
                      </span>
                    </div>

                    {/* Screenshot thumbnail */}
                    <div
                      onClick={() => setSelectedReviewOrder(ord)}
                      className="cursor-pointer group relative aspect-16/10 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center"
                    >
                      <img
                        src={ord.paymentProofUrl}
                        alt="Customer slip"
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>Inspect Receipt</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedReviewOrder(ord)}
                      className="w-full py-2.5 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800 transition-colors"
                    >
                      Open Verification Modal
                    </button>
                  </div>
                </div>
              ))}

              {pendingOrders.length === 0 && (
                <div className="col-span-full py-16 bg-white rounded-3xl border border-stone-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-bold text-stone-900">Zero Pending Payments</h3>
                  <p className="text-xs text-stone-500">
                    All customer payment proofs have been processed and confirmed.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">Orders Management</h1>
                <p className="text-xs text-stone-500">Track and advance order delivery statuses</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-stone-600">Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-stone-300 rounded-xl font-medium focus:outline-none"
                >
                  <option value="all">All Orders</option>
                  <option value="pending_payment">Pending Payment Review</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready_for_delivery">Ready for Delivery</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer & Phone</th>
                      <th className="py-3 px-4">Destination</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Delivery Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/60">
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-stone-900 block">{ord.customer.name}</span>
                          <span className="font-mono text-stone-500">{ord.customer.phone}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-stone-800 block truncate max-w-xs">
                            {ord.customer.district}, {ord.customer.province}
                          </span>
                          {ord.customer.gps && (
                            <a
                              href={`https://www.google.com/maps?q=${ord.customer.gps.latitude},${ord.customer.gps.longitude}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <MapPin className="w-3 h-3" />
                              <span>Open in Google Maps</span>
                            </a>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-stone-950">
                          {formatKip(ord.total)}
                        </td>
                        <td className="py-3.5 px-4">
                          {ord.paymentStatus === 'verified' && (
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ✓ Verified
                            </span>
                          )}
                          {ord.paymentStatus === 'pending_verification' && (
                            <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Pending
                            </span>
                          )}
                          {ord.paymentStatus === 'not_confirmed' && (
                            <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                              Not Confirmed
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as OrderStatus)
                            }
                            className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold focus:outline-none"
                          >
                            <option value="waiting_payment">Waiting Payment</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready_for_delivery">Ready for Delivery</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setViewingOrder(ord)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold text-[11px]"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                  Products & Inventory Matrix
                </h1>
                <p className="text-xs text-stone-500">
                  Manage shoe and clothing catalog, variants, and stock counts
                </p>
              </div>

              <button
                onClick={() => {
                  const newProd: Product = {
                    id: `prod-${Date.now()}`,
                    sku: `BM-NEW-${Math.floor(100 + Math.random() * 900)}`,
                    nameEN: 'New Premium Item',
                    nameLA: 'ສິນຄ້າໃໝ່ພຣີມ່ຽມ',
                    descriptionEN: 'High quality modern fashion apparel or footwear.',
                    descriptionLA: 'ສິນຄ້າແຟຊັ່ນຄຸນນະພາບສູງ ໃສ່ສະບາຍ ທັນສະໄໝ.',
                    price: 650000,
                    gender: 'unisex',
                    category: 'shoes',
                    subcategory: 'sneakers',
                    brand: 'BM Classic',
                    mainImage: products[0]?.mainImage || '',
                    images: {
                      side: products[0]?.mainImage || '',
                      front: '',
                      back: '',
                      sole: '',
                      detail: '',
                      model: ''
                    },
                    gallery: [],
                    colors: [{ nameEN: 'Black', nameLA: 'ດຳ', hex: '#1C1917' }],
                    sizes: ['40', '41', '42'],
                    variants: [
                      { color: 'Black', size: '40', stock: 5 },
                      { color: 'Black', size: '41', stock: 8 },
                      { color: 'Black', size: '42', stock: 6 }
                    ],
                    inStock: true,
                    isNew: true,
                    isPopular: false,
                    isSale: false,
                    featured: false,
                    active: true
                  };
                  setEditingProduct(newProd);
                  setIsNewProduct(true);
                }}
                className="px-4 py-2.5 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800 transition-colors flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock Matrix</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {products.map((p) => {
                      const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
                      return (
                        <tr key={p.id} className="hover:bg-stone-50/60">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={p.mainImage}
                              alt={p.nameEN}
                              className="w-11 h-11 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-stone-900 block">{p.nameEN}</span>
                              <span className="text-stone-500 text-[11px] block">{p.nameLA}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-stone-600">{p.sku}</td>
                          <td className="py-3 px-4 capitalize">
                            <span className="font-semibold text-stone-800">{p.category}</span>
                            <span className="text-stone-400 block text-[11px]">{p.gender}</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-stone-900">
                            {formatKip(p.price)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold font-mono ${totalStock <= 5 ? 'text-red-600' : 'text-stone-800'}`}>
                              {totalStock} units
                            </span>
                            <span className="text-stone-400 block text-[11px]">
                              {p.variants.length} variant combos
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                setProducts((prev) =>
                                  prev.map((item) =>
                                    item.id === p.id ? { ...item, active: !item.active } : item
                                  )
                                );
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.active
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-stone-200 text-stone-600'
                              }`}
                            >
                              {p.active ? 'Active' : 'Disabled'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsNewProduct(false);
                              }}
                              className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-700 mr-1"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete product ${p.nameEN}?`)) {
                                  setProducts((prev) => prev.filter((item) => item.id !== p.id));
                                }
                              }}
                              className="p-1.5 hover:bg-red-100 rounded-lg text-red-600"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REPORTS & ANALYTICS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">
                Store Reports & Analytics
              </h1>
              <p className="text-xs text-stone-500">Sales velocity and inventory health metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-stone-200 space-y-4">
                <span className="text-xs font-bold text-stone-500 uppercase">Total Revenue</span>
                <div className="text-3xl font-black text-stone-950 font-mono tracking-tight">
                  {formatKip(totalSales)}
                </div>
                <div className="text-xs text-stone-500">
                  {orders.length} total orders recorded in store
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-stone-200 space-y-4">
                <span className="text-xs font-bold text-stone-500 uppercase">Average Order Value</span>
                <div className="text-3xl font-black text-stone-950 font-mono tracking-tight">
                  {orders.length > 0 ? formatKip(totalSales / (orders.length || 1)) : '₭0'}
                </div>
                <div className="text-xs text-stone-500">Per completed customer order</div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-stone-200 space-y-4">
                <span className="text-xs font-bold text-stone-500 uppercase">Low Stock Alerts</span>
                <div className="text-3xl font-black text-amber-900 font-mono">
                  {products.filter((p) => p.variants.some((v) => v.stock <= 4)).length}
                </div>
                <div className="text-xs text-amber-700 font-medium">Variants with ≤ 4 items</div>
              </div>
            </div>

            {/* Best Sellers table */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-3">
              <h3 className="text-base font-bold text-stone-900">Featured Footwear & Apparel</h3>
              <div className="divide-y divide-stone-100">
                {products.slice(0, 5).map((p, idx) => (
                  <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-stone-400 font-mono w-4">#{idx + 1}</span>
                      <img
                        src={p.mainImage}
                        alt={p.nameEN}
                        className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                      />
                      <div>
                        <span className="font-bold text-stone-900 block">{p.nameEN}</span>
                        <span className="text-stone-500">{p.brand}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-stone-900">{formatKip(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: STORE & PAYMENT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h1 className="text-2xl font-black text-stone-900 tracking-tight">Store Settings</h1>
              <p className="text-xs text-stone-500">
                Configure BCEL One QR code, account owner, delivery fees, and contact details
              </p>
            </div>

            {savedSettingsNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Store settings updated successfully! Changes reflect on public checkout immediately.</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSettings(settingsForm);
                setSavedSettingsNotice(true);
                setTimeout(() => setSavedSettingsNotice(false), 2500);
              }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 space-y-5 text-xs shadow-xs"
            >
              <div className="space-y-1">
                <label className="font-bold text-stone-800 block">Store Name</label>
                <input
                  type="text"
                  value={settingsForm.shopName}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, shopName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block">Bank Name</label>
                  <input
                    type="text"
                    value={settingsForm.bankName}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, bankName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block">Account Owner Name</label>
                  <input
                    type="text"
                    value={settingsForm.accountOwner}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, accountOwner: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-stone-800 block">BCEL One Account Number</label>
                  <input
                    type="text"
                    value={settingsForm.accountNumber}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, accountNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block">Fixed Delivery Fee (₭)</label>
                  <input
                    type="number"
                    value={settingsForm.fixedDeliveryFee}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        fixedDeliveryFee: Number(e.target.value)
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block">Free Delivery Threshold (₭)</label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        freeDeliveryThreshold: Number(e.target.value)
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-stone-800 block">Customer Service Phone / Text Display</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-stone-800 block flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                    <span>Store WhatsApp Business Number (for Delivery Phase Communication)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8562055559988 or 020 5555 9988"
                    value={settingsForm.whatsappNumber || ''}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono"
                  />
                  <p className="text-[11px] text-stone-500">
                    When customers finish payment and fill in their address, they can tap the WhatsApp button to chat with your store's WhatsApp Business number with their order and address pre-filled for delivery coordination.
                  </p>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-stone-800 block">Store Showroom Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, address: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800 transition-colors shadow-md"
                >
                  Save Store Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 7: WORDS & SENTENCES RECONFIGURATION (ປັບແຕ່ງຂໍ້ຄວາມ) */}
        {activeTab === 'wording' && (
          <WordingEditor />
        )}
      </main>

      {/* MODAL 1: Dedicated Payment Slip Review & Verification Modal (Section 39-41) */}
      {selectedReviewOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto">
            {/* Header */}
            <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400">Order Payment Review</span>
                <h3 className="text-lg font-bold font-mono tracking-tight">
                  {selectedReviewOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedReviewOrder(null);
                  setShowRejectForm(false);
                }}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">
              {/* Slip Image (Left column) */}
              <div className="md:col-span-6 bg-stone-100 p-4 rounded-2xl border border-stone-200 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-stone-600 mb-2 uppercase">
                  Customer Uploaded Transfer Slip
                </span>
                <div className="max-h-96 overflow-y-auto rounded-xl border border-stone-300 shadow-xs bg-white">
                  <img
                    src={selectedReviewOrder.paymentProofUrl}
                    alt="Customer BCEL One slip"
                    className="w-full object-contain"
                  />
                </div>
              </div>

              {/* Order Details & Verification Controls (Right column) */}
              <div className="md:col-span-6 space-y-5 text-xs">
                {/* Customer Details */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <span className="font-bold text-stone-900 block text-sm">Customer & Address</span>
                  <div className="space-y-1 text-stone-700">
                    <div><strong>Name:</strong> {selectedReviewOrder.customer.name}</div>
                    <div><strong>Phone:</strong> <span className="font-mono">{selectedReviewOrder.customer.phone}</span></div>
                    <div><strong>Address:</strong> {selectedReviewOrder.customer.village}, {selectedReviewOrder.customer.district}, {selectedReviewOrder.customer.province} ({selectedReviewOrder.customer.address})</div>
                    {selectedReviewOrder.customer.gps && (
                      <a
                        href={`https://www.google.com/maps?q=${selectedReviewOrder.customer.gps.latitude},${selectedReviewOrder.customer.gps.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 font-bold hover:underline flex items-center gap-1 pt-1"
                      >
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        <span>Open in Google Maps ({selectedReviewOrder.customer.gps.latitude.toFixed(4)}, {selectedReviewOrder.customer.gps.longitude.toFixed(4)})</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Expected Amount */}
                <div className="p-4 bg-stone-900 text-white rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Expected Transfer Amount:</span>
                    <span className="text-xl font-black font-mono text-amber-400">
                      {formatKip(selectedReviewOrder.total)}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">Method: BCEL One QR</span>
                </div>

                {/* Items */}
                <div className="space-y-1.5">
                  <span className="font-bold text-stone-800">Ordered Products</span>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {selectedReviewOrder.items.map((i) => (
                      <div key={i.id} className="p-2 bg-stone-50 rounded-lg flex justify-between">
                        <span>{i.nameEN} ({i.color}, Size: {i.size}) × {i.quantity}</span>
                        <span className="font-mono font-bold">{formatKip(i.price * i.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rejection form conditional */}
                {showRejectForm ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-3">
                    <span className="font-bold text-red-900 block">Reason for Not Confirming:</span>
                    <select
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="w-full p-2 bg-white border border-red-300 rounded-xl text-xs"
                    >
                      <option value="Incorrect amount / Slip mismatch">Incorrect amount / Slip mismatch</option>
                      <option value="Payment not found in bank statement">Payment not found in bank statement</option>
                      <option value="Receipt image unclear or unreadable">Receipt image unclear or unreadable</option>
                      <option value="Transferred to wrong account">Transferred to wrong account</option>
                      <option value="Duplicate payment submission">Duplicate payment submission</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Optional details or note for customer..."
                      value={customRejectNote}
                      onChange={(e) => setCustomRejectNote(e.target.value)}
                      className="w-full p-2 bg-white border border-red-300 rounded-xl text-xs"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const note = customRejectNote.trim() ? `${rejectReason} - ${customRejectNote.trim()}` : rejectReason;
                          rejectPayment(selectedReviewOrder.id, note);
                          setSelectedReviewOrder(null);
                          setShowRejectForm(false);
                        }}
                        className="w-full py-2.5 bg-red-700 text-white font-bold rounded-xl text-xs hover:bg-red-800"
                      >
                        Submit Rejection Note
                      </button>
                      <button
                        onClick={() => setShowRejectForm(false)}
                        className="px-4 py-2.5 bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        verifyPayment(selectedReviewOrder.id, 'Admin Bounmy');
                        setSelectedReviewOrder(null);
                      }}
                      className="py-3.5 bg-emerald-700 text-white font-extrabold rounded-xl hover:bg-emerald-800 text-xs flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>✓ CONFIRM PAYMENT</span>
                    </button>

                    <button
                      onClick={() => setShowRejectForm(true)}
                      className="py-3.5 bg-stone-100 hover:bg-red-50 text-red-700 border border-stone-300 hover:border-red-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>✕ PAYMENT NOT CONFIRMED</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in fade-in space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-black text-stone-900">
                {isNewProduct ? 'Add New Product' : `Edit Product: ${editingProduct.sku}`}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-800 block mb-1">Product Name (EN)</label>
                <input
                  type="text"
                  value={editingProduct.nameEN}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nameEN: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Product Name (Lao)</label>
                <input
                  type="text"
                  value={editingProduct.nameLA}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nameLA: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Price (₭ Kip)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">SKU</label>
                <input
                  type="text"
                  value={editingProduct.sku}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value as 'shoes' | 'clothing'
                    })
                  }
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                >
                  <option value="shoes">Shoes (ເກີບ)</option>
                  <option value="clothing">Clothing (ເສື້ອຜ້າ)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">Gender</label>
                <select
                  value={editingProduct.gender}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      gender: e.target.value as 'men' | 'women' | 'unisex'
                    })
                  }
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl"
                >
                  <option value="men">Men (ຜູ້ຊາຍ)</option>
                  <option value="women">Women (ຜູ້ຍິງ)</option>
                  <option value="unisex">Unisex (ທຸກຄົນ)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-800 block mb-1">Description (EN)</label>
                <textarea
                  rows={2}
                  value={editingProduct.descriptionEN}
                  onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEN: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-800 block mb-1">Description (Lao)</label>
                <textarea
                  rows={2}
                  value={editingProduct.descriptionLA}
                  onChange={(e) => setEditingProduct({ ...editingProduct, descriptionLA: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl"
                />
              </div>
            </div>

            {/* MULTI-PICTURE GALLERY MANAGER (Requirement: Add multiple pictures for View Details from the beginning) */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-stone-900 text-sm">Product Detail Pictures & Angles</h4>
                  <p className="text-[11px] text-stone-500">
                    Upload or paste image URLs for side, front, back, sole, detail, and model wearing views
                  </p>
                </div>
              </div>

              {/* Main Cover Picture */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block">Main Cover Image <span className="text-red-500">*</span></span>
                <div className="flex items-center gap-3">
                  {editingProduct.mainImage && (
                    <img
                      src={editingProduct.mainImage}
                      alt="Main"
                      className="w-14 h-14 rounded-xl object-cover border border-stone-300 shrink-0"
                    />
                  )}
                  <input
                    type="text"
                    value={editingProduct.mainImage}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        mainImage: e.target.value,
                        images: { ...editingProduct.images, side: editingProduct.images?.side || e.target.value }
                      })
                    }
                    placeholder="Paste image URL..."
                    className="flex-1 p-2 bg-white border border-stone-300 rounded-xl font-mono text-xs"
                  />
                  <label className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs cursor-pointer shrink-0">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const res = ev.target?.result as string;
                            setEditingProduct({
                              ...editingProduct,
                              mainImage: res,
                              images: { ...editingProduct.images, side: editingProduct.images?.side || res }
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Gallery Angles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'side', label: 'Side Angle View (ມຸມຂ້າງ)' },
                  { key: 'front', label: 'Front Angle View (ມຸມໜ້າ)' },
                  { key: 'back', label: 'Back Angle View (ມຸມຫຼັງ)' },
                  { key: 'sole', label: 'Sole / Underside View (ພື້ນເກີບ)' },
                  { key: 'detail', label: 'Close-up Detail / Texture (ລາຍລະອຽດເນື້ອຜ້າ)' },
                  { key: 'model', label: 'On Model Wearing (ຕອນໃສ່ຕົວຈິງ)' }
                ].map((item) => {
                  const currentVal = editingProduct.images?.[item.key] || '';
                  return (
                    <div key={item.key} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                      <span className="font-bold text-stone-800 block text-[11px]">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {currentVal ? (
                          <img
                            src={currentVal}
                            alt={item.key}
                            className="w-10 h-10 rounded-lg object-cover border border-stone-300 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-stone-200 border border-dashed border-stone-300 flex items-center justify-center text-[10px] text-stone-500 shrink-0">
                            Empty
                          </div>
                        )}
                        <input
                          type="text"
                          value={currentVal}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              images: { ...editingProduct.images, [item.key]: e.target.value }
                            })
                          }
                          placeholder="Image URL..."
                          className="flex-1 p-1.5 bg-white border border-stone-300 rounded-lg font-mono text-[11px]"
                        />
                        <label className="p-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold text-[10px] cursor-pointer shrink-0">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  const res = ev.target?.result as string;
                                  setEditingProduct({
                                    ...editingProduct,
                                    images: { ...editingProduct.images, [item.key]: res }
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extra Gallery Photos (Unlimited additional pictures for View Details) */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">
                      Additional Gallery Photos (ຮູບພາບເພີ່ມເຕີມສຳລັບລາຍລະອຽດສິນຄ້າ)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Upload multiple photos at once or add extra angles/model photos for customer View Details
                    </span>
                  </div>
                  <label className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto shadow-2xs shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Upload Multiple Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          files.forEach((file) => {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const res = ev.target?.result as string;
                              if (res) {
                                setEditingProduct((prev) => {
                                  if (!prev) return prev;
                                  return {
                                    ...prev,
                                    gallery: [...(prev.gallery || []), res]
                                  };
                                });
                              }
                            };
                            reader.readAsDataURL(file);
                          });
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Gallery List Previews */}
                {(editingProduct.gallery || []).length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {(editingProduct.gallery || []).map((imgUrl, gIdx) => (
                      <div key={gIdx} className="relative group bg-white rounded-xl border border-stone-300 p-1.5 overflow-hidden">
                        <img
                          src={imgUrl}
                          alt={`Gallery photo ${gIdx + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-1.5 bg-stone-950/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            title="Set as Main Cover Photo"
                            onClick={() => {
                              setEditingProduct({
                                ...editingProduct,
                                mainImage: imgUrl
                              });
                            }}
                            className="px-2 py-1 bg-white text-stone-900 rounded-md text-[10px] font-bold hover:bg-amber-100"
                          >
                            Set Main
                          </button>
                          <button
                            type="button"
                            title="Remove Photo"
                            onClick={() => {
                              const updatedGallery = (editingProduct.gallery || []).filter((_, i) => i !== gIdx);
                              setEditingProduct({
                                ...editingProduct,
                                gallery: updatedGallery
                              });
                            }}
                            className="p-1 bg-red-600 text-white rounded-md text-[10px] font-bold hover:bg-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-xl border border-dashed border-stone-300 text-center text-[11px] text-stone-500">
                    No extra gallery photos yet. You can select multiple images from your computer to add to the View Details gallery.
                  </div>
                )}
              </div>
            </div>

            {/* VARIANT STOCK MATRIX (Requirement: Available sizes in stock, sold-out disappears) */}
            <div className="pt-3 border-t border-stone-200 space-y-3">
              <div>
                <h4 className="font-black text-stone-900 text-sm">Variant Stock Matrix (Color & Size)</h4>
                <p className="text-[11px] text-stone-500">
                  Set the quantity available in stock. Sizes set to 0 will immediately disappear from the public store!
                </p>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {editingProduct.variants.map((v, idx) => (
                  <div key={idx} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{v.color}</span>
                      <span className="text-stone-400">·</span>
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-stone-200">
                        Size: {v.size}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-500">Stock Count:</span>
                      <input
                        type="number"
                        min="0"
                        value={v.stock}
                        onChange={(e) => {
                          const newStock = Math.max(0, Number(e.target.value));
                          const updated = [...editingProduct.variants];
                          updated[idx] = { ...v, stock: newStock };
                          setEditingProduct({
                            ...editingProduct,
                            variants: updated,
                            inStock: updated.some((item) => item.stock > 0)
                          });
                        }}
                        className={`w-18 p-1.5 bg-white border rounded-lg text-center font-mono font-bold text-xs ${
                          v.stock === 0 ? 'border-red-400 text-red-600 bg-red-50/30' : 'border-stone-300 text-stone-900'
                        }`}
                      />
                      {v.stock === 0 ? (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                          Disappeared
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Visible ({v.stock})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Add Variant button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const defaultColor = editingProduct.colors[0]?.nameEN || 'Black';
                    const nextSize = prompt('Enter size to add (e.g. 45 or 3XL):');
                    if (nextSize) {
                      const updatedVariants = [
                        ...editingProduct.variants,
                        { color: defaultColor, size: nextSize.trim(), stock: 5 }
                      ];
                      const updatedSizes = Array.from(new Set([...editingProduct.sizes, nextSize.trim()]));
                      setEditingProduct({
                        ...editingProduct,
                        variants: updatedVariants,
                        sizes: updatedSizes,
                        inStock: true
                      });
                    }
                  }}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-bold text-xs"
                >
                  + Add New Size Variant
                </button>
              </div>
            </div>

            {/* Save Action */}
            <div className="pt-4 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewProduct) {
                    setProducts((prev) => [editingProduct, ...prev]);
                  } else {
                    setProducts((prev) =>
                      prev.map((item) => (item.id === editingProduct.id ? editingProduct : item))
                    );
                  }
                  setEditingProduct(null);
                }}
                className="px-6 py-2.5 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Order Details View */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="font-mono font-black text-sm text-stone-900">{viewingOrder.orderNumber}</span>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-stone-400 hover:text-stone-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div><strong>Recipient:</strong> {viewingOrder.customer.name} (Tel: {viewingOrder.customer.phone})</div>
              <div><strong>Address:</strong> {viewingOrder.customer.village}, {viewingOrder.customer.district}, {viewingOrder.customer.province}</div>
              <div><strong>Total Amount:</strong> <span className="font-mono font-black text-base">{formatKip(viewingOrder.total)}</span></div>
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-1">
              <span className="font-bold text-stone-800 block">Items</span>
              {viewingOrder.items.map((i) => (
                <div key={i.id} className="p-2 bg-stone-50 rounded-lg flex justify-between">
                  <span>{i.nameEN} ({i.color}, Size: {i.size}) × {i.quantity}</span>
                  <span className="font-mono">{formatKip(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setViewingOrder(null)}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
