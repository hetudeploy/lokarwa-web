import Navbar from "@/components/Navbar";
import Swap from "@/components/Swap";
import Footer from "@/components/Footer";

export default function SwapPage() {
  return (
    <>
      <Navbar currentPage="swap" />
      <Swap />
      <Footer />
    </>
  );
}
