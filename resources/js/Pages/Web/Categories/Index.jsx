import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import LayoutWeb from '../../../Layouts/Web';

export default function Index() {
  const { categories } = usePage().props;

  return (
    <>
      <Head>
        <title>Categories | Kopaka</title>
      </Head>
      <LayoutWeb>
        <div className="container mx-auto px-4 mt-5">
          <h1 className="md:text-3xl text-center font-bold flex justify-center gap-2 text-2xl">
            Category Menu
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
            {categories.map((category, index) => (
              <div
                className="max-w-sm bg-white rounded-lg shadow"
                key={index}
              >
                <a
                  href={`/categories/${category.category_slug}`}
                >
                  <img
                    className="rounded-t-lg h-60 w-full"
                    src={category.category_image_url}
                    alt="x"
                  />
                </a>
                <div className="p-5">
                  <a
                    href={`/categories/${category.category_slug}`}
                  >
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 btn btn-primary ">
                      {category.category_name}
                    </h5>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutWeb>
    </>
  );
}
