"use client"

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

import Pagination from "../core/pagination";
import Search from '../core/search';
import Button from '../core/button';
import { PlusIcon } from '@heroicons/react/24/outline';

import useData from '@/hooks/useData';
import { ProductProps } from '@/type';

export default function Isbn() {
    const [page, setPage] = useState<number>(1);
    const [per_page, setPerPage] = useState<number>(20);
    const { data, error, loading, fetchData } = useData({
        url: '/product/get_all', page: page, per_page: per_page
    });

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, per_page]);

    const pageControl = ({ page, per_page }: { page: number, per_page: number }) => {
        setPage(page);
        setPerPage(per_page);
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl pl-6 font-bold">ISBNS</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search />
                <Link
                    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href='/admin/isbn/add'
                >
                    <span className="hidden md:block">ADD ISBN</span>{' '}
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
            </div>
            {/* <Table titles={titles} products={products} /> */}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={10} page={page} per_page={per_page} pageControl={pageControl} />
            </div>
        </div>
    );
}
