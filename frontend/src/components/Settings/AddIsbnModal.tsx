"use client"

import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';

interface AddIsbnModaProps {
    handleSetIsbns: (isbns: string[], totalUploadCount: number) => void;
    handleAdIsbnModalView: () => void;
}

export default function AddIsbnModal({ handleSetIsbns, handleAdIsbnModalView }: AddIsbnModaProps) {
    const [isbns, setIsbns] = useState<string[]>([]);
    const [totalUploadCount, setTotalUploadCount] = useState<number>(0);

    useEffect(() => {
        setTotalUploadCount(isbns.length);
    }, [isbns]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsbns([]);
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const fileType = file.type;
            const data = e.target?.result;

            if (fileType === 'text/csv') {
                const text = data as string;
                const isbnArray = text
                    .split('\n')
                    .map(line => line.trim())
                    .slice(1)
                    .filter(line => line); // Filter out empty lines
                setIsbns(isbnArray);
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const isbnArray = (json as string[][])
                    .flat()
                    .map(line => line.trim())
                    .slice(1)
                    .filter(line => line); // Filter out empty lines
                setIsbns(isbnArray);
            }
        };

        if (file.type === 'text/csv') {
            reader.readAsText(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            reader.readAsBinaryString(file);
        }
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        const newIsbnArray = newValue
            .split('\n')
            .map(line => line.trim())
            .filter(line => line);
        setIsbns(newIsbnArray);
    };

    return (
        <div className='w-full mt-4 max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 fade-in space-y-6'>
            <div className="items-center justify-between space-y-6">
                <label className="block text-xl font-bold text-gray-900" htmlFor="multiple_files">Upload xlsx/csv files</label>
                <input
                    className="block w-full text-sm text-gray-900 border rounded-sm cursor-pointer bg-gray-50 focus:outline-none"
                    id="csv_files"
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={handleFileUpload}
                />
            </div>
            <div className="mt-4">
                <span className="font-bold text-sm">Total Counts:</span> {' '} <span className="text-sm">{isbns.length}</span>
            </div>
            <div className="mt-4 items-center">
                <textarea
                    className="block w-full h-[300px] p-2 text-sm text-gray-900 border rounded-lg focus:outline-none"
                    value={isbns.join('\n')}
                    onChange={handleTextareaChange}
                />
            </div>
            <div className="flex mt-4 justify-end">
                <button
                    className="flex h-10 w-full text-center items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={() => { handleSetIsbns(isbns, totalUploadCount); handleAdIsbnModalView() }}
                >
                    Upload ISBNs
                </button>
            </div>
        </div >
    );
}