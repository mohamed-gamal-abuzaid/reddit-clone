/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/auth';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'user@example.com';

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto focus first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle typing & auto-focus next input
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError(null);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Pasting full 6-digit code
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp.slice(0, 6));
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  // Submit OTP Verification
  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError(null);

    try {
  await authService.verifyEmail({ email, code });
  setSuccess('Email verified successfully! Redirecting...');
  setTimeout(() => {
    // التوجيه إلى صفحة الاهتمامات
    router.push('/interests');
  }, 1500);
} catch (err: any) {
      setError(err.response?.data?.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend Verification Code
  const handleResend = async () => {
    setResending(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.resendVerification(email);
      setSuccess('A new verification code has been sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 text-slate-900 font-sans">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white">
        {/* Top Header Logo & Back */}
        <div className="flex items-center justify-between">
          <Link href="/register" className="p-2 -ml-2 text-slate-400 hover:text-slate-700 transition">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 font-black text-indigo-600 text-lg tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
              RC
            </div>
            Reddit Clone
          </div>
          <div className="w-6" /> {/* Spacer */}
        </div>

        {/* Center Content */}
        <div className="max-w-md w-full mx-auto space-y-8 my-auto py-8">
          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto lg:mx-0">
            <Mail className="w-8 h-8 text-indigo-600" />
          </div>

          {/* Heading */}
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Check your email
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              We've sent a 6-digit verification code to{' '}
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                {email}
              </span>
              . Enter it below to confirm your identity.
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              {success}
            </div>
          )}

          {/* OTP Input Fields */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between items-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-bold rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition bg-slate-50 focus:bg-white text-slate-900 shadow-2xs"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.join('').length < 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3.5 rounded-2xl shadow-sm transition flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Verify <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Resend Action */}
          <div className="text-center text-xs text-slate-500">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-indigo-600 font-bold hover:underline disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend code'}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center lg:text-left text-[11px] text-slate-400 flex items-center justify-center lg:justify-start gap-1.5">
          <ShieldCheck size={14} /> Secured by Reddit Clone Identity Provider
        </div>
      </div>

      {/* Right Column - Hero Section (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white p-16 flex-col justify-between relative overflow-hidden">
        {/* Background Decorative Blur Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div />

        {/* Center Illustration Card */}
        <div className="max-w-md mx-auto space-y-10 text-center z-10">
          <div className="relative mx-auto w-full max-w-sm aspect-4/3 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col items-center justify-center shadow-2xl">
            {/* Glowing Lock Illustration Concept */}
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-400 to-indigo-200 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-12 h-12 text-indigo-950" />
            </div>
            <div className="mt-6 text-xs text-indigo-100 font-medium bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              Email Verification • Protected
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Secure your journey.</h2>
            <p className="text-sm text-indigo-100/80 leading-relaxed">
              Experience enterprise-grade security seamlessly integrated into your daily workflow,
              protecting your assets at every step.
            </p>
          </div>
        </div>

        <div />
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}