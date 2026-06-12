import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { useTheme } from "@/hooks/useTheme";

// Layouts
import MainLayout from "@/components/layout/MainLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Pages - Landing & Auth
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const OtpLoginPage = lazy(() => import("@/pages/auth/OtpLoginPage"));

// Dashboards
const ContentCreatorDashboard = lazy(() => import("@/pages/dashboard/ContentCreatorDashboard"));
const BusinessDashboard = lazy(() => import("@/pages/dashboard/BusinessDashboard"));
const DesignerDashboard = lazy(() => import("@/pages/dashboard/DesignerDashboard"));
const AgencyDashboard = lazy(() => import("@/pages/dashboard/AgencyDashboard"));
const FreelancerDashboard = lazy(() => import("@/pages/dashboard/FreelancerDashboard"));
const EnterpriseDashboard = lazy(() => import("@/pages/dashboard/EnterpriseDashboard"));
const AdminDashboard = lazy(() => import("@/pages/dashboard/AdminDashboard"));

// Feature Pages
const AIStudio = lazy(() => import("@/pages/studio/AIStudio"));
const GraphicEditor = lazy(() => import("@/pages/editor/GraphicEditor"));
const Marketplace = lazy(() => import("@/pages/marketplace/Marketplace"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));
const BrandingPage = lazy(() => import("@/pages/branding/BrandingPage"));
const AnalyticsPage = lazy(() => import("@/pages/analytics/AnalyticsPage"));
const TemplatesPage = lazy(() => import("@/pages/TemplatesPage"));
const SocialCreatorPage = lazy(() => import("@/pages/social/SocialCreatorPage"));
const CollaborationPage = lazy(() => import("@/pages/collaboration/CollaborationPage"));

// Common Pages (existing)
const AboutPage = lazy(() => import("@/pages/common/AboutPage"));
const ContactPage = lazy(() => import("@/pages/common/ContactPage"));
const BlogPage = lazy(() => import("@/pages/common/BlogPage"));
const CareersPage = lazy(() => import("@/pages/common/CareersPage"));
const HelpCenterPage = lazy(() => import("@/pages/common/HelpCenterPage"));
const PrivacyPage = lazy(() => import("@/pages/common/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/common/TermsPage"));
const ApiPage = lazy(() => import("@/pages/common/ApiPage"));
const CommunityPage = lazy(() => import("@/pages/common/CommunityPage"));
const NotFoundPage = lazy(() => import("@/pages/common/NotFoundPage"));

// Common Pages (new)
const CookiePolicyPage = lazy(() => import("@/pages/common/CookiePolicyPage"));
const DocumentationPage = lazy(() => import("@/pages/common/DocumentationPage"));
const PressPage = lazy(() => import("@/pages/common/PressPage"));
const PartnersPage = lazy(() => import("@/pages/common/PartnersPage"));
const AffiliatePage = lazy(() => import("@/pages/common/AffiliatePage"));
const StatusPage = lazy(() => import("@/pages/common/StatusPage"));
const RoadmapPage = lazy(() => import("@/pages/common/RoadmapPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function AppContent() {
  useTheme();

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/templates" element={<TemplatesPage />} />

            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/affiliate" element={<AffiliatePage />} />

            {/* Support & Legal */}
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />

            {/* Dev & Community */}
            <Route path="/api-docs" element={<ApiPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/login/otp" element={<OtpLoginPage />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="creator" element={<ContentCreatorDashboard />} />
            <Route path="business" element={<BusinessDashboard />} />
            <Route path="designer" element={<DesignerDashboard />} />
            <Route path="agency" element={<AgencyDashboard />} />
            <Route path="freelancer" element={<FreelancerDashboard />} />
            <Route path="enterprise" element={<EnterpriseDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          {/* Studio & Tools */}
          <Route path="/studio" element={<DashboardLayout />}>
            <Route index element={<AIStudio />} />
            <Route path=":type" element={<AIStudio />} />
          </Route>
          <Route path="/editor" element={<DashboardLayout />}>
            <Route index element={<GraphicEditor />} />
            <Route path=":id" element={<GraphicEditor />} />
          </Route>
          <Route path="/branding" element={<DashboardLayout />}>
            <Route index element={<BrandingPage />} />
          </Route>
          <Route path="/analytics" element={<DashboardLayout />}>
            <Route index element={<AnalyticsPage />} />
          </Route>
          <Route path="/social" element={<DashboardLayout />}>
            <Route index element={<SocialCreatorPage />} />
          </Route>
          <Route path="/collaborate" element={<DashboardLayout />}>
            <Route index element={<CollaborationPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </BrowserRouter>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-xl">P</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
