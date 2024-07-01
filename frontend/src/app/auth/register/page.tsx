import { Metadata } from 'next';

import RegisterForm from '@/components/register/register-form';

export const metadata: Metadata = {
    title: "Register"
}

export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center h-screen border-2">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 -mt-16">
                <div className="flex w-full items-end rounded-lg bg-blue-500 p-3 h-36">
                    <div className="w-32 text-white md:w-36">
                        Logo
                    </div>
                </div>
                <RegisterForm />
            </div>
        </main>
    );
}