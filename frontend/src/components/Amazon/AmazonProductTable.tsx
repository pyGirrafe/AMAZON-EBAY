"use client";

import Image from 'next/image';

import Loader from '../common/Loading';
import StatusButton from '../common/StatusButton';

import { AmazonProductProps } from '@/type';

interface TableProps {
  products: AmazonProductProps[];
  loading: boolean;
}

export default function AmazonProductTable({ products, loading }: TableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr className="text-center">
                <th className="px-3 py-5">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-5">ID</th>
                <th className="px-3 py-5">ISBN</th>
                <th className="px-3 py-5">Product</th>
                <th className="px-3 py-5">Price (Amazon)</th>
                <th className="px-3 py-5">Shipping Price (Amazon)</th>
                <th className="px-3 py-5">MakeUP</th>
                <th className="px-3 py-5">Price (Ebay)</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Created Date</th>
                <th className="px-3 py-5">Updated Date</th>
                <th className="px-3 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white w-full">
              {products?.map((product: AmazonProductProps) => (
                <tr key={product.id} className="border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="px-3 py-3 text-center">
                    <input type='checkbox'/>
                  </td>
                  
                  <td className="px-3 py-3 text-center">{product.isbn}</td>
                  <td className="py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {product?.image && (
                        <Image
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: "50px",
                            height: "50px"
                          }}
                          width={50}
                          height={50}
                        />
                      )}
                      <p className="truncate w-full" title={product.title}>
                        {product.title.length > 30 ? `${product.title.substring(0, 25)}...` : product.title}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">{product?.ebayPrice && '$' + product?.ebayPrice}</td>
                  <td className="px-3 py-3 text-center">{product?.shippingPrice}</td>
                  <td className="px-3 py-3 text-center">{product?.makeup && Number(product?.makeup)*100 + '%'}</td>
                  <td className="px-3 py-3 text-center">{product?.amazonPrice && '$' + product?.amazonPrice}</td>
                  <td className="px-3 py-3 text-center">{product?.amount}</td>
                  <td className="px-3 py-3 text-center">{product?.createDate}</td>
                  <td className="px-3 py-3 text-center">{product?.updateDate}</td>
                  <td className="px-3 py-3 text-center">{product?.status && <StatusButton status={(product?.status)}/>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading ? (<div className="flex p-10"><Loader /></div>) : ''}
        </div>
      </div>
    </div>
  );
}
