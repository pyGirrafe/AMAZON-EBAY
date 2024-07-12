import { Metadata } from 'next';

import Ebay from '@/components/Ebay'

export const metadata: Metadata = {
    title: "Ebay Product"
}

export default function EbayPage() {
    return(
        <div className="w-full">
            <Ebay />
        </div>
    );
}