"use client"

import { Suspense, useEffect, useState } from 'react';
import Image from "next/image";

import Table from "../core/table";
import Pagination from "../core/pagination";
import Search from '../core/search';
import CreateButton from '../core/createButton';

import useData from '@/hooks/useData';
import { ProductProps } from '@/type';

const titles = [
    {id: 1, name: "Isbn"},
    {id: 2, name: "Total products"},
    {id: 3, name: "Order products"},
]

export default function Isbn() {
    const [page, setPage] = useState<number>(1);
    const [per_page, setPerPage] = useState<number>(20);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const { data, error, loading, fetchData } = useData({
        url: '/product/get_all', page: page, per_page: per_page
    });

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, per_page]);

    useEffect(() => {
        setProducts(data)
    }, [data]);

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
                <CreateButton name="Add Isbn" />
            </div>
            {/* <Table titles={titles} products={products} /> */}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={10} page={page} per_page={per_page} pageControl={pageControl} />
            </div>
        </div>
    );
}
