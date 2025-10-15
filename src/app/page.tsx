import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIStablecoinSection from "@/components/AIStablecoinSection";
import GPURWASection from "@/components/GPURWASection";
import CashflowFinancingSection from "@/components/CashflowFinancingSection";
import InstitutionalStrategySection from "@/components/InstitutionalStrategySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar currentPage="home" />
      <Hero />
      <AIStablecoinSection />
      <GPURWASection />
      <CashflowFinancingSection />
      <InstitutionalStrategySection />
      <Footer />
    </>
  );
}
