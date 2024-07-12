export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export interface EbayProductProps {
    id: number;
    isbn: string;
    makeup: string;
    am_price: string;
    eb_itemId: string;
    eb_title: string;
    eb_price: string;
    eb_categoryPath: string;
    eb_condition: string;
    eb_image: string;
    eb_gtin: string;
    eb_epid: string;
    eb_amount: string;
    eb_shippingServiceCode: string;
    eb_shippingCost: string;
    eb_author: string;
    eb_bookTitle: string;
    eb_publisher: string;
    eb_publisherYear: string;
    eb_language: string;
    eb_topic: string;
    eb_pageNumber: string;
    eb_itemWebUrl: string;
    eb_paymentMethodBrandType: string;
    eb_legacyItemId: string;
    amount: number;
    created_at: string;
    updated_at: string;
    status: string;
}

export interface AmazonProductProps {
    id: number;
    isbn: string;
    itemId: string;
    title: string;
    image?: string;
    ebayPrice?: string;
    amazonPrice: string;
    itemHref?: string;
    epid?: string;
    itemWebUrl?: string;
    itemCreationDate?: string;
    shippingPrice: number;
    amount: number;
    makeup: string;
    createDate: string;
    updateDate: string;
    status: string;
}

export interface UsersProps {
    id: number;
    avtar: string;
    full_name: string;
    email: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface IsbnProps {
    id: number;
    isbn: string;
    ebayTotalCount: number;
    amazonTotalCount: number;
    createDate: string;
    updateDate: string;
}