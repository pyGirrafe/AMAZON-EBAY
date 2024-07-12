"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Loader from '../common/Loading';
import StatusButton from '../common/StatusButton';

import { formatDate } from '@/lib/utils';
import { EbayProductProps } from '@/type';

interface TableProps {
  products: EbayProductProps[];
  loading: boolean;
}

export default function EbayProductTable({ products, loading }: TableProps) {
  const router = useRouter();

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
                <th className="px-3 py-5">Price (Ebay)</th>
                <th className="px-3 py-5">Shipping Price (Ebay)</th>
                <th className="px-3 py-5">MakeUP</th>
                <th className="px-3 py-5">Price (Amazon)</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Created Date</th>
                <th className="px-3 py-5">Updated Date</th>
                <th className="px-3 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white w-full">
              {products?.map((product: EbayProductProps) => (
                <tr 
                key={product.id} 
                className="border-b text-center py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-gray-100 hover:cursor-pointer"
                onClick={()=>router.push(`/admin/ebay/${product.eb_itemId}`)}
                >
                  <td className="px-3 py-3">
                    <input type='checkbox'/>
                  </td>
                  <td className="px-3 py-3">{product.id}</td>
                  <td className="px-3 py-3">{product.isbn}</td>
                  <td className="py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {product?.eb_image && (
                        <Image
                          src={product.eb_image}
                          alt={product.eb_title}
                          style={{
                            width: "50px",
                            height: "50px"
                          }}
                          width={50}
                          height={50}
                        />
                      )}
                      <p className="truncate w-full" title={product.eb_title}>
                        {product.eb_title.length > 30 ? `${product.eb_title.substring(0, 25)}...` : product.eb_title}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3">{product?.eb_price && '$' + product?.eb_price}</td>
                  <td className="px-3 py-3">{product?.eb_shippingCost && '$' + product?.eb_shippingCost}</td>
                  <td className="px-3 py-3">{product?.makeup && product?.makeup + '%'}</td>
                  <td className="px-3 py-3">{product?.am_price && '$' + Number(product?.am_price).toFixed(2)}</td>
                  <td className="px-3 py-3">{product?.eb_amount}</td>
                  <td className="px-3 py-3">{formatDate(product?.created_at)}</td>
                  <td className="px-3 py-3">{formatDate(product?.updated_at)}</td>
                  <td className="px-3 py-3">{product?.status && <StatusButton status={(product?.status)}/>}</td>
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
