"use client";

import { UpdateInvoice, DeleteInvoice } from '../core/button';
import Image from 'next/image';

import { ProductProps } from '@/type';

interface TableProps {
  products: ProductProps[];
}

export default function Table({ products }: TableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr className="text-center">
                <th className="px-3 py-5 w-[10%]">ISBN</th>
                <th className="px-3 py-5 w-[20%]">PRODUCT</th>
                <th className="px-3 py-5 w-[10%]">PRICE(EBAY)</th>
                <th className="px-3 py-5 w-[10%]">PRICE(SHIPPING)</th>
                <th className="px-3 py-5 w-[10%]">MAKEUP</th>
                <th className="px-3 py-5 w-[10%]">PRICE(AMAZON)</th>
                <th className="px-3 py-5 w-[20%]">STATUS</th>
                <th className="px-3 py-5 w-[10%]">EDIT</th>
              </tr>
            </thead>
            <tbody className="bg-white w-full">
              {products?.map((product: ProductProps) => (
                <tr key={product.id} className="border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="px-3 py-3 text-center">{product.isbn}</td>
                  <td className="py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {product?.image && (
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={50}
                          height={50}
                        />
                      )}
                      <p className="truncate w-full" title={product.title}>
                        {product.title.length > 30 ? `${product.title.substring(0, 25)}...` : product.title}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">${product?.price}</td>
                  <td className="px-3 py-3 text-center">$10</td>
                  <td className="px-3 py-3 text-center">50%</td>
                  <td className="px-3 py-3 text-center">${(Number(product?.price) * 1.5).toFixed(2)}</td>
                  <td className="px-3 py-3 text-center">Status</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={product.id.toString()} />
                      <DeleteInvoice id={product.id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
