import { redirect } from 'next/navigation';

// 服务器端重定向到cashflow页面
export default function MarketPage() {
  redirect('/market/cashflow');
}