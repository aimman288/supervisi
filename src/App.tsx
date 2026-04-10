/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Printer, FileText, Upload, Image as ImageIcon, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormData {
  nama: string;
  mataPelajaran: string;
  kelas: string;
  materi: string;
  atp: string;
  metode: string;
  model: string;
  semesterTahun: string;
  hariTanggal: string;
  catatanSupervisi: string;
  foto1: string | null;
  foto2: string | null;
  foto3: string | null;
}

const initialData: FormData = {
  nama: '',
  mataPelajaran: '',
  kelas: '',
  materi: '',
  atp: '',
  metode: '',
  model: '',
  semesterTahun: '',
  hariTanggal: '',
  catatanSupervisi: '',
  foto1: null,
  foto2: null,
  foto3: null,
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [showReport, setShowReport] = useState(false);
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [`foto${index + 1}`]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setFormData(initialData);
    setShowReport(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation / Header for App (Hidden in Print) */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Portofolio Generator</h1>
          </div>
          <div className="flex gap-3">
            {showReport && (
              <button
                onClick={() => setShowReport(false)}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={18} />
                Edit Data
              </button>
            )}
            {showReport && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg shadow-sm transition-all active:scale-95"
              >
                <Printer size={18} />
                Print ke PDF
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {!showReport ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-2xl font-bold text-slate-800">Input Data Pembelajaran</h2>
                <p className="text-slate-500 mt-1">Lengkapi formulir di bawah untuk membuat laporan portofolio.</p>
              </div>

              <div className="p-8 space-y-8">
                {/* Section 1: Identitas */}
                <section>
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Identitas Guru & Mata Pelajaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Contoh: Ahmad Fauzi, S.Pd."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Mata Pelajaran</label>
                      <input
                        type="text"
                        name="mataPelajaran"
                        value={formData.mataPelajaran}
                        onChange={handleChange}
                        placeholder="Contoh: Sains Al Qur'an"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Kelas</label>
                      <input
                        type="text"
                        name="kelas"
                        value={formData.kelas}
                        onChange={handleChange}
                        placeholder="Contoh: VII - A"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Materi</label>
                      <input
                        type="text"
                        name="materi"
                        value={formData.materi}
                        onChange={handleChange}
                        placeholder="Contoh: Tajwid dan Sains"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 2: Perencanaan */}
                <section>
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Perencanaan & Metode</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">ATP</label>
                      <input
                        type="text"
                        name="atp"
                        value={formData.atp}
                        onChange={handleChange}
                        placeholder="Alur Tujuan Pembelajaran"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Metode</label>
                      <input
                        type="text"
                        name="metode"
                        value={formData.metode}
                        onChange={handleChange}
                        placeholder="Contoh: Ceramah, Diskusi"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Model</label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Contoh: PBL, Discovery"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 3: Waktu */}
                <section>
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Waktu Pelaksanaan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Semester / Tahun</label>
                      <input
                        type="text"
                        name="semesterTahun"
                        value={formData.semesterTahun}
                        onChange={handleChange}
                        placeholder="Contoh: Ganjil / 2023-2024"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Hari / Tanggal</label>
                      <input
                        type="text"
                        name="hariTanggal"
                        value={formData.hariTanggal}
                        onChange={handleChange}
                        placeholder="Contoh: Senin, 10 April 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 4: Supervisi */}
                <section>
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Catatan Supervisi</h3>
                  <div className="space-y-2">
                    <textarea
                      name="catatanSupervisi"
                      value={formData.catatanSupervisi}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Masukkan catatan hasil supervisi atau evaluasi kegiatan..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                    />
                  </div>
                </section>

                {/* Section 5: Dokumentasi */}
                <section>
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">Dokumentasi (3 Foto)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        onClick={() => fileInputRefs[idx].current?.click()}
                        className={`relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                          formData[`foto${idx + 1}` as keyof FormData]
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'
                        }`}
                      >
                        {formData[`foto${idx + 1}` as keyof FormData] ? (
                          <>
                            <img
                              src={formData[`foto${idx + 1}` as keyof FormData] as string}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                              <p className="text-white text-xs font-medium">Ganti Foto</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="text-slate-400 mb-2" size={24} />
                            <p className="text-xs text-slate-500 font-medium">Upload Foto {idx + 1}</p>
                          </>
                        )}
                        <input
                          type="file"
                          ref={fileInputRefs[idx]}
                          onChange={handleFileChange(idx)}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-6 border-t border-slate-100">
                  <button
                    onClick={() => setShowReport(true)}
                    className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={20} />
                    Generate Report
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="report"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white shadow-2xl print:shadow-none print:m-0 print:p-0"
            >
              {/* A4 Container */}
              <div className="w-full max-w-[210mm] mx-auto bg-white p-[10mm] md:p-[20mm] min-h-[297mm] flex flex-col">
                
                {/* KOP SURAT */}
                <div className="relative border-b-4 border-double border-black pb-4 mb-6">
                  <div className="flex items-center gap-6">
                    {/* Logo Placeholder */}
                    <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center border-2 border-emerald-800 rounded-full p-1">
                      <div className="w-full h-full rounded-full bg-emerald-800 flex flex-col items-center justify-center text-white text-center p-2">
                        <div className="text-[10px] font-bold leading-tight">SMP SAINS AL QUR'AN</div>
                        <div className="w-8 h-8 my-1 border border-white rounded-full flex items-center justify-center">
                          <ImageIcon size={16} />
                        </div>
                        <div className="text-[8px] leading-tight">Yahtadi Islamic Education Center</div>
                      </div>
                    </div>

                    <div className="flex-grow text-center">
                      <h3 className="text-lg font-medium text-slate-800 leading-tight">Yahtadi Islamic Education Center</h3>
                      <h1 className="text-3xl font-serif font-bold text-black tracking-wide my-1">SMP SAINS AL QUR’AN</h1>
                      <div className="text-sm font-bold text-black mb-1">Terakreditasi A</div>
                      <div className="text-xs text-slate-800 space-x-4">
                        <span>NSS : 20205211902</span>
                        <span>NPSN : 70007863</span>
                      </div>
                      <div className="text-xs text-slate-800 mt-0.5">Akte Notaris No. 06 Tanggal 13 Januari 2021</div>
                      <div className="text-xs text-slate-800">SK. Menkumham Nomor AHU-0001110.AH.01.04 Tahun 2021</div>
                      <div className="text-xs text-blue-700 underline mt-0.5">Email: yahtadilumajang08@gmail.com</div>
                    </div>
                  </div>
                  
                  {/* Header Footer (Black Bar) */}
                  <div className="mt-4 bg-black text-white text-[10px] py-1.5 px-4 text-center font-medium">
                    Sekretariat :Jl. Raya Klakah No. 157 Desa Mlawang, Kecamatan Klakah, Lumajang. Kode Pos: 67356
                  </div>
                </div>

                {/* REPORT TITLE */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold underline decoration-1 underline-offset-4">PORTOFOLIO KEGIATAN PEMBELAJARAN</h2>
                </div>

                {/* CONTENT TABLE */}
                <div className="flex-grow">
                  <table className="w-full border-collapse border border-black text-sm">
                    <tbody>
                      <tr>
                        <td className="border border-black p-2 font-bold w-1/3">Nama Guru</td>
                        <td className="border border-black p-2">{formData.nama || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Mata Pelajaran</td>
                        <td className="border border-black p-2">{formData.mataPelajaran || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Kelas</td>
                        <td className="border border-black p-2">{formData.kelas || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Materi</td>
                        <td className="border border-black p-2">{formData.materi || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">ATP</td>
                        <td className="border border-black p-2">{formData.atp || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Metode Pembelajaran</td>
                        <td className="border border-black p-2">{formData.metode || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Model Pembelajaran</td>
                        <td className="border border-black p-2">{formData.model || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Semester / Tahun</td>
                        <td className="border border-black p-2">{formData.semesterTahun || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold">Hari / Tanggal</td>
                        <td className="border border-black p-2">{formData.hariTanggal || '-'}</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-2 font-bold align-top h-24">Catatan Supervisi</td>
                        <td className="border border-black p-2 align-top italic text-slate-700">
                          {formData.catatanSupervisi || 'Tidak ada catatan.'}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* DOCUMENTATION SECTION */}
                  <div className="mt-8">
                    <h3 className="font-bold text-sm mb-3">DOKUMENTASI KEGIATAN:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[formData.foto1, formData.foto2, formData.foto3].map((foto, i) => (
                        <div key={i} className="border border-black aspect-video flex items-center justify-center bg-slate-50 overflow-hidden">
                          {foto ? (
                            <img src={foto} alt={`Dokumentasi ${i+1}`} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Foto {i+1}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SIGNATURE SECTION */}
                <div className="mt-12 grid grid-cols-2 text-sm">
                  <div className="text-center">
                    <p>Mengetahui,</p>
                    <p className="font-bold">Kepala Sekolah</p>
                    <div className="h-20"></div>
                    <p className="font-bold underline">................................................</p>
                    <p>NIP. .......................................</p>
                  </div>
                  <div className="text-center">
                    <p>Lumajang, {formData.hariTanggal?.split(',').pop()?.trim() || '.......................'}</p>
                    <p className="font-bold">Guru Mata Pelajaran</p>
                    <div className="h-20"></div>
                    <p className="font-bold underline">{formData.nama || '................................................'}</p>
                    <p>NIP. .......................................</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons for Report View (Hidden in Print) */}
      {showReport && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 print:hidden">
          <button
            onClick={resetForm}
            className="p-4 bg-white text-rose-600 border border-rose-100 rounded-full shadow-xl hover:bg-rose-50 transition-all active:scale-90"
            title="Reset Form"
          >
            <FileText size={24} />
          </button>
        </div>
      )}

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white;
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          main {
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .shadow-2xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
