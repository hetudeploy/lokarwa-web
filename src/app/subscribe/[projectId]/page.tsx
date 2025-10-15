import Navbar from "@/components/Navbar";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

interface SubscribePageProps {
  params: {
    projectId: string;
  };
}

export default function SubscribePage({ params }: SubscribePageProps) {
  return (
    <>
      <Navbar currentPage="trade" />
      <Subscribe projectId={params.projectId} />
      <Footer />
    </>
  );
}
