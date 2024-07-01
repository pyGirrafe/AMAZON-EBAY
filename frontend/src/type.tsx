export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export interface UseAuthProps {
    url: string;
    requestData: any;
}

export interface UseDataProps {
    url: string;
    page: number;
    per_page: number;
}

export interface ProductProps {
    id: number;
    isbn: string;
    itemId: string;
    title: string;
    image?: string;
    price?: string;
    itemHref?: string;
    epid?: string;
    itemWebUrl?: string;
    itemCreationDate?: string;
}