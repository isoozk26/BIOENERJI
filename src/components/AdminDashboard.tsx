import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, Download, Database, Phone, MessageSquare, 
  Trash2, RefreshCw, CheckCircle, Clock, AlertCircle, Search, Sparkles, ArrowLeft
} from 'lucide-react';
import { SITE_CONFIG } from '../data/content';

interface Appointment {
  id: number;
  name: string;
  phone: string;
  serviceTitle: string;
  notes: string;
  status: string;
  createdAt: string;
}

interface QuizResult {
  id: number;
  answerSummary: string;
  detectedBlockage: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'appointments' | 'quiz'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [refreshing, setRefreshing] = useState(false);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/status');
      const data = await res.json();
      setAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchData();
      }
    } catch {
      setAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthenticated(true);
        fetchData();
      } else {
        setLoginError(data.error || 'Şifre hatalı!');
      }
    } catch {
      setLoginError('Sunucu bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
    setPassword('');
  };

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [appRes, quizRes] = await Promise.all([
        fetch('/api/admin/appointments'),
        fetch('/api/admin/quiz-results')
      ]);

      if (appRes.ok) {
        const apps = await appRes.json();
        setAppointments(apps);
      }
      if (quizRes.ok) {
        const quizes = await quizRes.json();
        setQuizResults(quizes);
      }
    } catch (err) {
      console.error('Veri çekilemedi:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/appointments?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (err) {
      alert('Durum güncellenemedi');
    }
  };

  const deleteAppointment = async (id: number) => {
    if (!confirm('Bu randevu kaydını silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/appointments?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      alert('Kayıt silinemedi');
    }
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      a.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalCount = appointments.length;
  const newCount = appointments.filter(a => a.status === 'Yeni').length;
  const contactedCount = appointments.filter(a => a.status === 'Görüşüldü').length;
  const completedCount = appointments.filter(a => a.status === 'Tamamlandı').length;

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0D111D] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0D111D] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20"></div>

        <div className="w-full max-w-md p-8 rounded-3xl glass-panel bg-[#141A2C]/95 border border-purple-500/30 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
              Osman Özden Yönetim Paneli
            </h2>
            <p className="text-xs text-slate-300 font-light">
              Danışan ve randevu veritabanına erişmek için şifrenizi giriniz.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1.5">
                Admin Şifresi
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Giriş Yapılıyor...' : 'Panele Giriş Yap'}
            </button>
          </form>

          <div className="text-center pt-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Web Sitesine Geri Dön</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#0D111D] text-slate-200">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#101524]/90 backdrop-blur-md border-b border-purple-500/20 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <span>{SITE_CONFIG.practitioner}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Yönetim Paneli
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-light">
                SQLite Canlı Danışan & Randevu Veritabanı
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href="/"
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Siteyi Gör</span>
            </a>

            <a
              href="/api/admin/export/csv"
              download
              className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
              title="Excel/CSV formatında tüm danışanları indir"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Excel İndir</span>
            </a>

            <a
              href="/api/admin/backup/db"
              download
              className="px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 text-xs font-medium border border-indigo-500/30 flex items-center gap-1.5 transition-colors"
              title="bioenerji.db veritabanını tek tıkla yedekle"
            >
              <Database className="w-3.5 h-3.5" />
              <span>DB Yedek</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 text-xs font-medium border border-red-500/30 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-2xl glass-panel bg-[#141A2C]/90 border border-purple-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">Toplam Randevu</span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white">{totalCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Gelen toplam talep</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel bg-[#141A2C]/90 border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-amber-300 font-medium">Yeni / Bekleyen</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-amber-300">{newCount}</p>
            <p className="text-[11px] text-amber-200/70 mt-1">İletişim bekleyen danışan</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel bg-[#141A2C]/90 border border-sky-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-sky-300 font-medium">Görüşüldü</span>
              <MessageSquare className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-sky-300">{contactedCount}</p>
            <p className="text-[11px] text-sky-200/70 mt-1">Ön görüşmesi yapıldı</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel bg-[#141A2C]/90 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-emerald-300 font-medium">Tamamlandı</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-300">{completedCount}</p>
            <p className="text-[11px] text-emerald-200/70 mt-1">Seansı tamamlanan</p>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'appointments'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              📋 Randevu Talepleri ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              🧠 Enerji Testi Yanıtları ({quizResults.length})
            </button>
          </div>

          <button
            onClick={fetchData}
            disabled={refreshing}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Yenile</span>
          </button>
        </div>

        {/* Tab 1: Appointments Table */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            
            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="İsim, telefon veya seans ara..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                {['ALL', 'Yeni', 'Görüşüldü', 'Tamamlandı', 'İptal'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      statusFilter === status
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {status === 'ALL' ? 'Tümü' : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl glass-panel bg-[#141A2C]/90 border border-slate-700/60 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-[#101524] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700/60">
                    <tr>
                      <th className="px-4 py-3.5">Danışan Adı</th>
                      <th className="px-4 py-3.5">Telefon & Hızlı İletişim</th>
                      <th className="px-4 py-3.5">Talep Edilen Seans</th>
                      <th className="px-4 py-3.5">Tarih</th>
                      <th className="px-4 py-3.5">Durum</th>
                      <th className="px-4 py-3.5 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                          {searchQuery || statusFilter !== 'ALL' 
                            ? 'Filtreye uygun randevu bulunamadı.' 
                            : 'Henüz veritabanında kayıtlı randevu bulunmuyor.'}
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map(app => {
                        const cleanPhone = app.phone.replace(/[^0-9]/g, '');
                        const waUrl = `https://wa.me/${cleanPhone.startsWith('90') ? cleanPhone : '90' + cleanPhone}?text=${encodeURIComponent(`Merhaba ${app.name} Hanım/Bey, ben Osman Özden. Bioenerji web sitemiz üzerinden ilettiğiniz ön görüşme talebiniz üzerine yazıyorum.`)}`;

                        return (
                          <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-4 py-3.5 font-medium text-white">
                              {app.name}
                              {app.notes && (
                                <p className="text-[10px] text-slate-400 font-light mt-0.5 max-w-xs truncate">
                                  Not: {app.notes}
                                </p>
                              )}
                            </td>

                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-slate-300">{app.phone}</span>
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
                                  title="WhatsApp'tan Yaz"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`tel:${app.phone}`}
                                  className="p-1 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-colors"
                                  title="Telefonla Ara"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>

                            <td className="px-4 py-3.5">
                              <span className="px-2.5 py-1 rounded-md bg-purple-950/40 text-purple-200 border border-purple-500/30 text-[11px] font-medium">
                                {app.serviceTitle}
                              </span>
                            </td>

                            <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                              {app.createdAt}
                            </td>

                            <td className="px-4 py-3.5">
                              <select
                                value={app.status}
                                onChange={e => updateStatus(app.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border focus:outline-none cursor-pointer ${
                                  app.status === 'Yeni'
                                    ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                                    : app.status === 'Görüşüldü'
                                    ? 'bg-sky-950/40 text-sky-300 border-sky-500/40'
                                    : app.status === 'Tamamlandı'
                                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-900 text-slate-400 border-slate-700'
                                }`}
                              >
                                <option value="Yeni" className="bg-slate-900 text-amber-300">Yeni</option>
                                <option value="Görüşüldü" className="bg-slate-900 text-sky-300">Görüşüldü</option>
                                <option value="Tamamlandı" className="bg-slate-900 text-emerald-300">Tamamlandı</option>
                                <option value="İptal" className="bg-slate-900 text-slate-400">İptal</option>
                              </select>
                            </td>

                            <td className="px-4 py-3.5 text-right">
                              <button
                                onClick={() => deleteAppointment(app.id)}
                                className="p-1.5 rounded-lg hover:bg-red-950/40 text-slate-400 hover:text-red-300 transition-colors"
                                title="Kaydı Sil"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Quiz Results Table */}
        {activeTab === 'quiz' && (
          <div className="rounded-2xl glass-panel bg-[#141A2C]/90 border border-slate-700/60 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-[#101524] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700/60">
                  <tr>
                    <th className="px-4 py-3.5">No</th>
                    <th className="px-4 py-3.5">Tespit Edilen Enerji Blokajı</th>
                    <th className="px-4 py-3.5">Seçilen Yanıt Özeti</th>
                    <th className="px-4 py-3.5 text-right">Test Tarihi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {quizResults.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-slate-400">
                        Henüz çözülmüş bir enerji testi kaydı bulunmuyor.
                      </td>
                    </tr>
                  ) : (
                    quizResults.map(q => (
                      <tr key={q.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-slate-400">#{q.id}</td>
                        <td className="px-4 py-3.5 font-medium text-amber-300">
                          {q.detectedBlockage}
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          {q.answerSummary}
                        </td>
                        <td className="px-4 py-3.5 text-right text-slate-400 text-[11px]">
                          {q.createdAt}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
