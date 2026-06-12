import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles, Phone, ArrowLeft, ArrowRight, RefreshCw,
  Shield, CheckCircle2, ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
  { code: "+55", flag: "🇧🇷", name: "BR" },
  { code: "+86", flag: "🇨🇳", name: "CN" },
  { code: "+971", flag: "🇦🇪", name: "AE" },
];

type Step = "phone" | "otp" | "success";

export default function OtpLoginPage() {
  const { loginDemo } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("phone");
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showCountryList, setShowCountryList] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 7) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const digits = phone.replace(/\D/g, "");
    setMaskedPhone(`${countryCode.code} ${"*".repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`);
    setStep("otp");
    setResendTimer(30);
    setIsLoading(false);
    toast.success("OTP sent to your mobile number");
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    // Auto advance
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    // Auto submit when all 6 filled
    if (newOtp.every((d) => d !== "") && digit) {
      handleVerifyOtp(newOtp);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) otpRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((d, i) => { if (i < 6) newOtp[i] = d; });
    setOtp(newOtp);
    const lastIndex = Math.min(pasted.length - 1, 5);
    otpRefs.current[lastIndex]?.focus();
    if (pasted.length === 6) handleVerifyOtp(newOtp);
  };

  const handleVerifyOtp = async (otpArr?: string[]) => {
    const code = (otpArr || otp).join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    // Demo: any 6-digit code works (show hint: 123456)
    setStep("success");
    setIsLoading(false);
    const user = await loginDemo("content-creator");
    toast.success(`Welcome, ${user.name}! Logged in via OTP.`);
    setTimeout(() => navigate("/dashboard/creator"), 1500);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(30);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("New OTP sent to " + maskedPhone);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl gradient-text-purple">PixiVisual</span>
          </Link>

          {/* Step: Phone */}
          {step === "phone" && (
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h1 className="font-heading font-black text-3xl">Mobile Login</h1>
                  <p className="text-muted-foreground text-sm">Verify with a one-time password</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-500/5 border border-primary-500/20 mb-8 mt-6">
                <Shield className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  We'll send a 6-digit OTP to your mobile. <span className="text-primary-500 font-medium">No password needed.</span>
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Mobile Number</label>
                  <div className="flex gap-2">
                    {/* Country Code Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryList((v) => !v)}
                        className="h-full px-3 py-3 bg-background border border-border rounded-xl flex items-center gap-1.5 hover:bg-muted transition-all text-sm font-medium min-w-[80px]"
                      >
                        <span>{countryCode.flag}</span>
                        <span>{countryCode.code}</span>
                        <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", showCountryList && "rotate-180")} />
                      </button>
                      {showCountryList && (
                        <div className="absolute top-full left-0 mt-1 w-40 bg-popover border border-border rounded-xl shadow-glass-lg z-50 overflow-hidden animate-fade-in-up">
                          {COUNTRY_CODES.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => { setCountryCode(c); setShowCountryList(false); }}
                              className={cn(
                                "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-muted transition-all text-left",
                                countryCode.code === c.code && "bg-primary-500/10 text-primary-500"
                              )}
                            >
                              <span>{c.flag}</span>
                              <span className="font-medium">{c.name}</span>
                              <span className="text-muted-foreground ml-auto">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Phone Input */}
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^\d\s\-()]/g, ""))}
                        placeholder="Enter phone number"
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition-all"
                        maxLength={15}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !phone}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-glow transition-all disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 mt-8">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or sign in with</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="flex gap-3 mt-4">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-all"
                >
                  Email & Password
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center py-2.5 rounded-xl border border-border hover:bg-muted text-sm font-medium transition-all"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}

          {/* Step: OTP Verification */}
          {step === "otp" && (
            <div>
              <button
                onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); }}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-primary-500" />
                </div>
                <h1 className="font-heading font-black text-3xl mb-2">Enter OTP</h1>
                <p className="text-muted-foreground text-sm">
                  We sent a 6-digit code to
                </p>
                <p className="font-semibold text-foreground mt-0.5">{maskedPhone}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Demo hint: use any 6 digits (e.g.{" "}
                  <button
                    type="button"
                    onClick={() => {
                      const demo = ["1","2","3","4","5","6"];
                      setOtp(demo);
                      handleVerifyOtp(demo);
                    }}
                    className="text-primary-500 font-semibold hover:underline"
                  >
                    123456
                  </button>
                  )
                </p>
              </div>

              {/* OTP Input Grid */}
              <div className="flex justify-center gap-3 mb-8" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={cn(
                      "w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-background transition-all focus:outline-none",
                      digit
                        ? "border-primary-500 bg-primary-500/5 text-primary-500"
                        : "border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    )}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={() => handleVerifyOtp()}
                disabled={isLoading || otp.some((d) => d === "")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-glow transition-all disabled:opacity-60 mb-5"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Resend */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend OTP in{" "}
                    <span className="font-bold text-primary-500">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="flex items-center gap-1.5 text-sm text-primary-500 hover:underline mx-auto font-medium"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step: Success */}
          {step === "success" && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-success/15 flex items-center justify-center mx-auto mb-6 animate-bounce-once">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h1 className="font-heading font-black text-3xl mb-2">Verified!</h1>
              <p className="text-muted-foreground mb-6">
                Your phone number has been verified. Redirecting to dashboard…
              </p>
              <div className="flex justify-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {step !== "success" && (
            <div className="text-center mt-8">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A]">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.2s" }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center w-full">
          {/* Mockup phone UI */}
          <div className="relative mb-8">
            <div className="w-48 h-80 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center shadow-glass-lg backdrop-blur-sm p-4">
              {/* Phone notch */}
              <div className="absolute top-4 w-16 h-4 bg-white/10 rounded-full" />
              <Phone className="w-10 h-10 text-primary-400 mb-3" />
              <p className="text-white/60 text-xs mb-4">OTP sent to</p>
              <p className="text-white font-bold text-sm mb-6">+1 ****1234</p>
              {/* Mock OTP boxes */}
              <div className="flex gap-2">
                {["•","•","•","6","•","•"].map((d, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-7 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                      d === "6"
                        ? "bg-primary-500 text-white"
                        : "bg-white/10 text-white/40"
                    )}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-5 w-full h-9 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">Verify</span>
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-[3rem] border border-primary-500/20 animate-pulse" />
          </div>

          <h2 className="font-heading font-black text-3xl text-white mb-3">
            Secure OTP Login
          </h2>
          <p className="text-white/50 text-base max-w-xs">
            No password to remember. Just enter your phone number and verify with a one-time code.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-xs">
            {[
              { icon: "🔐", label: "No Password" },
              { icon: "⚡", label: "Instant Access" },
              { icon: "🛡️", label: "Bank-Grade Security" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-white/60 text-[10px] font-medium leading-tight text-center">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
