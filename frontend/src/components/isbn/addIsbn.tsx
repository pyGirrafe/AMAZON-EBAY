"use client"
import React, { useState, useEffect } from "react";

import useIsbn from "@/hooks/useIsbn";

export default function AddIsbn() {
    const [isbns, setIsbns] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>();
    const [total_count, setTotalCount] = useState<number>(0);

    const { data, error, loading, fetchData } = useIsbn({
        url: '/product/search', isbns: isbns,
    });

    console.log(isSuccess)

    useEffect(() => {
        if (data && typeof data.total_count === 'number') {
            setTotalCount(data.total_count);
            setIsSuccess(data.total_count > 0); // Assuming success if total_count is greater than 0
        } else if (data && typeof data.total_count === 'undefined') {
            setIsSuccess(false); // Assuming failure if total_count is undefined
        }
    }, [data]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const isbnArray = text
                .split('\n')
                .map(line => line.trim())
                .slice(1)
            setIsbns(isbnArray);
        };
        reader.readAsText(file);
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        const newIsbnArray = newValue
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);
        setIsbns(newIsbnArray);
    };

    const handleSubmit = () => {
        fetchData();
    }

    console.log(isbns)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl pl-6 font-bold">Add ISBNS</h1>
            </div>
            <div className="mt-4 items-center justify-between md:mt-8">
                <label className="block mb-2 font-medium text-gray-900" htmlFor="multiple_files">Upload CSV files</label>
                <input
                    className="block w-full text-sm text-gray-900 border rounded-sm cursor-pointer bg-gray-50 focus:outline-none"
                    id="csv_files"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
            </div>
            <div className="mt-4">
                <span className="font-bold text-sm">Total Counts:</span> {' '} <span className="text-sm">{isbns.length}</span>
            </div>
            <div className="mt-4 items-center">
                <textarea
                    className="block w-full h-[500px] p-2 text-sm text-gray-900 border rounded-lg focus:outline-none"
                    value={isbns.join('\n')}
                    onChange={handleTextareaChange}
                />
            </div>
            <div className="mt-4 flex flex-row w-full">
                <div className="justify-start w-1/2 flex">
                    {isSuccess !== undefined && (
                        isSuccess ? (
                            <span>{total_count} is added in database</span>
                        ) : (
                            <span>Failed</span>
                        )
                    )}
                </div>
                <div className="justify-end w-1/2 flex">
                    <button
                        className="flex w-[150px] h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={handleSubmit}
                    >
                        <div className="mx-auto">
                            {loading ? (<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>) : (<span className="hidden md:block">SUBMIT ISBNS</span>)}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}