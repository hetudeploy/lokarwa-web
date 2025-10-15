import Navbar from "@/components/Navbar";
import Trade from "@/components/Trade";
import Footer from "@/components/Footer";

export default function TradePage() {
  return (
    <>
      <Navbar currentPage="trade" />
      <Trade />
      <Footer />
    </>
  );
}
