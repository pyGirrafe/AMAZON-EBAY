"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import Button from '../core/button';
import useAuth from '@/hooks/useAuth';

export default function RegisterForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [full_name, setFullName] = useState<string>('');
  const [submitted, setSubmitted] = useState<Boolean>(false);
  const router = useRouter();

  const { data, error, loading, fetchData } = useAuth({
    url: '/user/register',
    requestData: { email, password, full_name },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data.access_token);
      router.push('/auth/login');
    }
  }, [data, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    fetchData();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 font-bold text-2xl">Create new account</h1>
        <div className="w-full">
        <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Full Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="full_name"
                type="text"
                name="full_name"
                placeholder="Enter Full Name"
                required
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className='mt-4'>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="username">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          
        </div>
        <RegisterButton pending={loading} />
        <div className='flex justify-center p-6'>
          <Link href='/auth/login' className='flex items-center'>
            <div className='flex items-center gap-2'>
              <span className='text-sm'>Already have a account?</span> 
              <span className='hover:underline text-sm text-blue-600'>Login here</span>
            </div>
          </Link>
        </div>
        {submitted && (
          <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
            {error && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">Invalid credentials</p>
              </>
            )}
            {data && <p className="text-sm text-green-500">Login successful</p>}
          </div>
        )}
      </div>
    </form>
  );
}

function RegisterButton({ pending }: { pending: boolean }) {
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
