'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user);

  // الحصول على البريد إما من الـ Store أو من رابط الصفحة (Query Param)
  const email = searchParams.get('email') || user?.email || 'user@example.com';

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // مصفوفة المراجع لمربعات المدخلات لتسهيل الانتقال التلقائي
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // تركيز الماوس تلقائياً على أول مربع عند فتح الصفحة
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // التعامل مع كتابة كل رقم
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // قبول الأرقام فقط

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // حفظ الرقم الأخير فقط
    setOtp(newOtp);

    // الانتقال للمربع التالي تلقائياً
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // التعامل مع زر الحذف (Backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // التعامل مع لصق الكود الكامل (Paste)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // التركيز على المربع المناسب بعد اللصق
    const nextFocusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  // إرسال الكود للتحقق
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length < 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🔗 ربط الكود مع Backend لتأكيد الحساب
      // await authService.verifyOtp({ email, code });

      // التوجيه للصفحة الرئيسية بعد النجاح
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  // إعادة إرسال الكود
  const handleResend = async () => {
    setResending(true);
    setResendMessage(null);
    setError(null);

    try {
      // await authService.resendCode({ email });
      setResendMessage('Verification code sent successfully!');
    } catch (err: any) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* ================= Left Side (Verification Form) ================= */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between max-w-xl mx-auto w-full">
          
          {/* Brand Header */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">RedditClone</span>
          </div>

          {/* Main Content Box */}
          <div className="my-auto py-8">
            
            {/* Mail Icon Box */}
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-indigo-600 mb-6">
              <Mail size={22} />
            </div>

            {/* Title & Description */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Check your email
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
              We've sent a 6-digit verification code to{' '}
              <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                {email}
              </span>
              . Enter it below to confirm your identity.
            </p>

            {/* Error & Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                {error}
              </div>
            )}
            {resendMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-xl">
                {resendMessage}
              </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-between gap-2 sm:gap-3">
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
                    onPaste={handlePaste}
                    className="w-11 h-13 sm:w-13 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Resend Code Link */}
            <div className="mt-6 text-center text-xs text-slate-500">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-semibold text-indigo-600 hover:underline disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend code'}
              </button>
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="text-xs text-slate-400">
            Secured by RedditClone Identity Provider
          </div>
        </div>

        {/* ================= Right Side (Hero Graphic) ================= */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white relative overflow-hidden">
          
          {/* Card Container for Graphic Image */}
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl mb-12 border border-white/10">
            <Image
              src="/auth-banner.jpg" // استخدام نفس الصورة أو صورة الحماية
              alt="Security Graphic"
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Bottom Headline Text */}
          <div className="text-center max-w-md space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Secure your journey.
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
              Experience enterprise-grade security seamlessly integrated into your daily workflow, protecting your assets at every step.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}