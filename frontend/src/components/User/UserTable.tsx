/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from 'next/image';

import { ToggleButton } from './UserTableToggleButton';

import { UsersProps } from '@/type';
import { formatDate } from '@/lib/utils';

export default function UserTable({ users }: { users: UsersProps[] }) {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr className="text-center">
                                <th className="px-3 py-5 w-[10%]">User</th>
                                <th className="px-3 py-5 w-[20%]">Full Name</th>
                                <th className="px-3 py-5 w-[20%]">Email</th>
                                <th className="px-3 py-5 w-[20%]">Register Date</th>
                                <th className="px-3 py-5 w-[20%]">Approved Date</th>
                                <th className="px-3 py-5 w-[10%]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white w-full">
                            {users?.map((user: UsersProps, index) => (
                                <tr key={index} className="border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                    <td className="py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            {user?.avtar && (
                                                <Image
                                                    src={user.avtar}
                                                    alt={user.full_name}
                                                    style={{
                                                        width: "50px",
                                                        height: "50px"
                                                    }}
                                                    width={50}
                                                    height={50}
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 text-center">{user.full_name}</td>
                                    <td className="px-3 py-3 text-center">{user.email}</td>
                                    <td className="px-3 py-3 text-center">{formatDate(user.created_at)}</td>
                                    <td className="px-3 py-3 text-center">{formatDate(user.updated_at)}</td>
                                    <td className="px-2 py-3 text-center"><ToggleButton userId={user.id} is_active={user.is_active} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
