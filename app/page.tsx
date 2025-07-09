import FeatureSection from "./components/FeatureSection";
import HeroSection from "./components/HeroSection";
import CTAsection from "./components/CTAsection";
import Footer from "./components/Footer";
import UploadSection from "./components/UploadSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <HeroSection />
      <FeatureSection />
      <UploadSection />
      <CTAsection />
      <Footer />
    </div>
  );
}
