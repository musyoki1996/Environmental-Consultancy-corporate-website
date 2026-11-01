import React, { useState } from 'react';
import {
  FileCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Phone,
  Mail,
  ShieldCheck,
  Download,
  Calendar,
  Layers,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RequestQuotePageProps {
  initialService?: string;
  navigate: (route: string, param?: string) => void;
}

export const RequestQuotePage: React.FC<RequestQuotePageProps> = ({ initialService, navigate }) => {
  const { services, submitQuote, settings } = useApp();

  const [form, setForm] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    serviceRequested: initialService || services[0]?.title || 'Environmental Consultancy',
    projectLocation: '',
    projectScope: '',
    estimatedTimeline: 'Within 30 Days',
    budgetRange: 'Standard Competitive RFP',
    attachmentsNote: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    referenceNo: string;
    message: string;
    date: string;
    service: string;
    client: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    const res = await submitQuote({
      fullName: form.fullName,
      company: form.company,
      email: form.email,
      phone: form.phone,
      serviceRequested: form.serviceRequested,
      projectLocation: form.projectLocation || 'East Africa',
      projectScope: form.projectScope,
      estimatedTimeline: form.estimatedTimeline,
      budgetRange: form.budgetRange,
      attachmentsNote: form.attachmentsNote
    });

    setSubmitting(false);

    if (res.success && res.referenceNo) {
      setReceipt({
        referenceNo: res.referenceNo,
        message: res.message,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        service: form.serviceRequested,
        client: `${form.fullName} (${form.company || 'Private Entity'})`
      });
    } else {
      setErrorMsg(res.message || 'Could not process quotation request. Please retry or contact technical desk directly.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF8]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#174B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="text-xs font-bold text-[#E85B22] uppercase tracking-wider">
            Commercial & Technical Procurement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Request a Technical Quotation
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Obtain a formal bill of quantities, sampling schedule, and statutory compliance proposal for your facility or infrastructure development.
          </p>
        </div>
      </section>

      {/* Main Form or Receipt */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {receipt ? (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-in fade-in duration-300">
              {/* Receipt Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/images__13__ac2b8989.jpeg"
                    alt="SEEL"
                    className="w-12 h-12 object-contain rounded-full bg-slate-50 p-1"
                  />
                  <div>
                    <h3 className="font-extrabold text-lg text-[#174B35]">Senior Environmental & Engineering Ltd</h3>
                    <p className="text-xs text-slate-500">Official Quotation Acknowledgement</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Reference Number</div>
                  <div className="text-base font-mono font-bold text-[#E85B22]">{receipt.referenceNo}</div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#36A853] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-[#174B35] text-base">
                    Quotation Request Successfully Registered
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {receipt.message}
                  </p>
                </div>
              </div>

              {/* Details table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                <div className="grid grid-cols-2 p-3 bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                  <span>Parameter</span>
                  <span>Specification</span>
                </div>
                <div className="divide-y divide-slate-100 text-slate-700">
                  <div className="grid grid-cols-2 p-3">
                    <span className="font-semibold text-slate-500">Service Requested</span>
                    <span className="font-bold text-[#174B35]">{receipt.service}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="font-semibold text-slate-500">Client / Organization</span>
                    <span>{receipt.client}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="font-semibold text-slate-500">Lodged Date</span>
                    <span>{receipt.date}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="font-semibold text-slate-500">Initial Review Desk</span>
                    <span>Lead Environmental & Engineering Assessor</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="font-semibold text-slate-500">Expected Scope Delivery</span>
                    <span>Within 24 to 48 business hours</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 no-print">
                <button
                  onClick={handlePrint}
                  className="border border-slate-300 hover:border-slate-400 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt / Save PDF</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setReceipt(null)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Submit Another Request
                  </button>
                  <button
                    onClick={() => navigate('home')}
                    className="bg-[#174B35] hover:bg-[#113827] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#36A853] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Procurement & Pricing</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174B35]">
                  Tell Us About Your Project Requirements
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Please provide the technical parameters so our engineering team can formulate an accurate, legally defensible, and cost-effective scope.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Service Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800">
                    1. Select Service Required *
                  </label>
                  <select
                    value={form.serviceRequested}
                    onChange={e => setForm({ ...form, serviceRequested: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none focus:bg-white focus:border-[#36A853]"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Project Location & Scope */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#174B35] uppercase tracking-wider">
                    2. Project Location & Scope
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Site Location & County *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.projectLocation}
                      onChange={e => setForm({ ...form, projectLocation: e.target.value })}
                      placeholder="e.g. Mombasa Port, Embakasi Industrial Area, or Kisumu County"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Detailed Project Requirements & Scope of Work *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.projectScope}
                      onChange={e => setForm({ ...form, projectScope: e.target.value })}
                      placeholder="Specify testing parameters, number of emission stacks, depth of boreholes, facility capacity, or statutory audit deadline..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated Project Timeline
                      </label>
                      <select
                        value={form.estimatedTimeline}
                        onChange={e => setForm({ ...form, estimatedTimeline: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      >
                        <option value="Immediate / Emergency (Within 7 Days)">Immediate / Emergency (Within 7 Days)</option>
                        <option value="Within 30 Days">Within 30 Days</option>
                        <option value="1 to 3 Months">1 to 3 Months</option>
                        <option value="Future Planning (3+ Months)">Future Planning (3+ Months)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Budget Range / Procurement Mode
                      </label>
                      <select
                        value={form.budgetRange}
                        onChange={e => setForm({ ...form, budgetRange: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      >
                        <option value="Standard Competitive RFP">Standard Competitive RFP</option>
                        <option value="Under KES 500,000">Under KES 500,000</option>
                        <option value="KES 500,000 - 1,500,000">KES 500,000 - 1,500,000</option>
                        <option value="KES 1,500,000 - 5,000,000">KES 1,500,000 - 5,000,000</option>
                        <option value="Above KES 5,000,000">Above KES 5,000,000</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Supporting Documents Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.attachmentsNote}
                      onChange={e => setForm({ ...form, attachmentsNote: e.target.value })}
                      placeholder="e.g. Terms of Reference (TOR) or site architectural layouts available upon request"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                    />
                  </div>
                </div>

                {/* 3. Organization & Primary Contact */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#174B35] uppercase tracking-wider">
                    3. Contact & Organization Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={e => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Eng. Samuel Kariuki"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Apex Industrial Manufacturing Ltd"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="samuel.kariuki@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+254 722 000 000"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#36A853]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit action */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500">
                    By submitting, you will receive an official quotation reference number.
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-[#E85B22] hover:bg-[#d64e17] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Processing Quotation...' : 'Submit Quotation Request'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
