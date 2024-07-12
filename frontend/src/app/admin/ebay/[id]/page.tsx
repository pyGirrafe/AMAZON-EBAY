/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import useData from '@/hooks/useData';
import { useNotification } from '@/context/NotificationContext';
import { EbayProductProps } from '@/type';

export default function EbayItemPage() {
    const [product, setProduct] = useState<EbayProductProps>();
    const { id } = useParams();

    const { data, error, loading, fetchData } = useData({
        method: "get",
        url: `/product/get_ebay_item?itemId=${id}`
    });

    const { setSuccessMessage, setErrorMessage } = useNotification();

    useEffect(() => {
        if (data) {
            setProduct(data);
        } else {
            setErrorMessage("Failure!")
        }
    }, [data]);

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full">
            <section className="py-8 bg-white md:py-16 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="grid grid-cols-2 gap-10">
                        <div className="p-4 items-center bg-gray-200 rounded-xl">
                            <p className='mb-4 bg-red-500'>{product?.eb_title}</p>
                            <Image 
                            src={product?.eb_image || ""}
                            alt='Product Image'
                            style={{width: "300px"}}
                            width={100}
                            height={100}
                            className='mx-auto'
                            />
                        </div>
                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1
                                className="text-xl font-semibold text-gray-900 sm:text-2xl"
                            >
                                {product?.eb_title}
                            </h1>
                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                <p
                                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
                                >
                                    ${product?.eb_price}<span className='text-lg'>(sh: {product?.eb_shippingCost})</span>
                                </p>
                                <span><ArrowRightIcon className='w-10 h-5'/></span>
                                <p
                                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl"
                                >
                                    ${product?.am_price}
                                </p>
                            </div>

                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <Link
                                    href={product?.eb_itemWebUrl || "#"}
                                    target='_blank'
                                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    role="button"
                                >
                                    <svg
                                        className="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                        />
                                    </svg>
                                    Ebay Link
                                </Link>
                            </div>

                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                            <p className="mb-6 text-gray-500">
                            </p>

                            <p className="text-gray-500">
                                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                                Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                                Magic Keyboard or Magic Keyboard with Touch ID.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}