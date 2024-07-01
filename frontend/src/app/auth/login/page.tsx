import { Metadata } from 'next';

import LoginForm from '@/components/login/login-form';

export const metadata: Metadata = {
    title: "Login"
}

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center h-screen border-2">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 -mt-16">
                <div className="flex w-full items-end rounded-lg bg-blue-500 p-3 h-36">
                    <div className="w-32 text-white md:w-36">
                        Logo
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}