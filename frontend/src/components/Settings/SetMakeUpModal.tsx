/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useEffect, useState } from "react";

interface SetMakeUpModalProps {
    handleSetMakeUp: (ebayMakeUp?: number, amazonMakeUp?: number) => void;
    handeMakeUpModalView: () => void;
}

export default function SetMakeUpModal({ handleSetMakeUp, handeMakeUpModalView }: SetMakeUpModalProps) {
    const [ebayMakeUp, setEbayMakeUp] = useState<number>(50);
    const [amazonMakeUp, setAmazonMakeUp] = useState<number>(50);

    useEffect(() => {
        handleSetMakeUp(ebayMakeUp, amazonMakeUp);
    }, [ebayMakeUp, amazonMakeUp]);

    return (
        <div className="w-full mt-4 max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 fade-in">
            <form className="space-y-6">
                <h5 className="text-xl font-bold text-gray-900">Set Make Up</h5>
                <div>
                    <label htmlFor="ebayMakeUp" className="block mb-2 text-sm font-medium text-gray-900">Ebay Makeup</label>
                    <input
                        type="number"
                        name="ebayMakeUp"
                        id="ebayMakeUp"
                        defaultValue={50}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        onChange={(e) => setEbayMakeUp(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="amazonMakeUp" className="block mb-2 text-sm font-medium text-gray-900">Amazon Makeup</label>
                    <input
                        type="number"
                        name="amazonMakeUp"
                        id="amazonMakeUp"
                        defaultValue={50}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        onChange={(e) => setAmazonMakeUp(parseInt(e.target.value))}
                    />
                </div>
                <button
                    type="button"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handeMakeUpModalView()}
                >
                    Set Make Up
                </button>
            </form>
        </div>
    );
}