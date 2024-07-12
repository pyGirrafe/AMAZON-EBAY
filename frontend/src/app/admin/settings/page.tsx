import { Metadata } from 'next';

import Settings from '@/components/Settings';

export const metadata: Metadata = {
  title: "Settings"
}

export default function IsbnPage() {
  return (
    <div className="w-full">
      <Settings />
    </div>
  );
}
