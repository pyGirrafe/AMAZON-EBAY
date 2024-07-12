import { Metadata } from 'next';

import Amazon from "@/components/Amazon";

export const metadata: Metadata = {
  title: "Amazon Product"
}

export default function ProductPage() {
  return (
    <div className="w-full">
      <Amazon />
    </div>
  );
}
