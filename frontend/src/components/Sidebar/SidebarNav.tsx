import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    UserCircleIcon,
    DocumentDuplicateIcon,
    QueueListIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const links = [
    { name: 'Ebay', href: '/admin/ebay', icon: QueueListIcon },
    { name: 'Amazon', href: '/admin/amazon', icon: QueueListIcon },
    { name: 'Settings', href: '/admin/settings', icon: DocumentDuplicateIcon },
    { name: 'Users', href: '/admin/user', icon: UserCircleIcon },
];

export default function Navbar() {

    const pathname = usePathname()
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx("flex mt-4 h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3", { "bg-sky-100 text-blue-600": pathname === link.href })}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
