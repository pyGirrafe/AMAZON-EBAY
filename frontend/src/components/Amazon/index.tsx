/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from "react"

import AmazonProductTable from "./AmazonProductTable";
import Pagination from "../common/Pagination";
import Search from '../common/SearchInput';
import SearchButton from '../common/SearchButton';

import useData from "@/hooks/useData";
import { AmazonProductProps } from "@/type";

export default function Amazon() {
    const [page, setPage] = useState<number>(1);
    const [per_page, setPerPage] = useState<number>(20);
    const [products, setProducts] = useState<AmazonProductProps[]>([]);
    const { data, error, loading, fetchData } = useData({
        method: "get",
        url: `/product/get_all_amazon?page=${page}&yper_page=${per_page}`
    });

    useEffect(() => {
        fetchData()
    }, [page, per_page]);

    useEffect(() => {
        setProducts(data?.products)
    }, [data]);

    const pageControl = ({ page, per_page }: { page: number, per_page: number }) => {
        setPage(page);
        setPerPage(per_page);
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl pl-6 font-bold">Amazon Products</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search />
                <SearchButton />
            </div>
            <div className="mt-4">
                <span className="font-bold text-sm">Total Counts:</span> {' '} <span className="text-sm">{data?.totalCount}</span>
            </div>
            <AmazonProductTable products={products} loading={loading}/>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={Math.ceil(Number(data?.totalCount)/per_page) || 1} pageControl={pageControl} />
            </div>
        </div>
    );
}