/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { useNotification } from "@/context/NotificationContext";

import useData from "@/hooks/useData";

interface ToggleButtonProps {
    userId: number;
    is_active: boolean;
}

export function ToggleButton({ userId, is_active }: ToggleButtonProps) {
    const [isActive, setIsActive] = useState<boolean>(is_active);

    const { setSuccessMessage, setErrorMessage } = useNotification();

    const { data, error, loading, fetchData } = useData({
        method: "get",
        url: `/user/user_allow?userId=${userId}&isActive=${!isActive}`
    });

    useEffect(() => {
        if (data) {
            setSuccessMessage(data?.message);
        };
    }, [data]);

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const handleChangeToggle = () => {
        setIsActive(!isActive);
        fetchData();
    }

    return (
        <div>
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    defaultChecked={is_active}
                    onChange={() => handleChangeToggle()}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900">{is_active}</span>
            </label>
        </div>
    );
}