import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import LayoutWeb from '../../../Layouts/Web';
import formatPrice from '../../../Utils/FormatPrice';
import NoDataFound from '../../../Components/NoDataFound';
import Pagination from '../../../Components/Pagination';

export default function Index() {
  const { products } = usePage().props;

  return (
    <>
      <Head>
        <title>Products | Kopaka</title>
      </Head>
      <LayoutWeb>
        <div className="container mx-auto px-4 my-5 min-h-[50vh]">
          <h1 className="md:text-3xl text-center font-bold flex justify-center gap-2 text-2xl">
            Our Menu
          </h1>
          {products.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
              {products.data.map((product, index) => (
                <div
                  className="max-w-sm bg-white rounded-lg shadow"
                  key={index}
                >
                  <a
                    href={`/products/${product.product_slug}`}
                  >
                    <div className="relative">
                      <img
                        className="rounded-t-lg h-60 w-full"
                        src={
                                                    product.product_images[0]
                                                      ?.product_image_url
                                                    ?? '/assets/images/no-image.png'
                                                }
                        alt={product.product_name}
                      />
                      <p className="absolute top-0 left-0 btn-warning backdrop-filter backdrop-blur  p-2   rounded-br-2xl rounded-tl font-semibold">
                        Rp.
                        {' '}
                        {formatPrice(
                          product.product_variants[0]
                            .product_variant_price,
                        )}
                      </p>
                    </div>
                  </a>
                  <div className="p-5">
                    <a
                      href={`/products/${product.product_slug}`}
                    >
                      <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 btn btn-primary">
                        {product.product_name}
                      </h5>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <NoDataFound />
            </div>
          )}
          {products.data.length > 0 && (
            <Pagination links={products.links} align="center" />
          )}
        </div>
      </LayoutWeb>
    </>
  );
}
