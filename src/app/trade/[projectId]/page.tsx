import Navbar from "@/components/Navbar";
import TradeDetail from "@/components/TradeDetail";
import Footer from "@/components/Footer";

interface TradeDetailPageProps {
  params: {
    projectId: string;
  };
}

export default function TradeDetailPage({ params }: TradeDetailPageProps) {
  return (
    <>
      <Navbar currentPage="trade" />
      <TradeDetail projectId={params.projectId} />
      <Footer />
    </>
  );
}
