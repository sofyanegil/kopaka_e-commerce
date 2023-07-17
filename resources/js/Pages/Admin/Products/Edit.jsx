import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import Swal from 'sweetalert2';
import {
  FaCakeCandles, FaInfo, FaPlus, FaTrash,
} from 'react-icons/fa6';
import LayoutAccount from '../../../Layouts/Account';
import Card from '../../../Components/Card';
import TextInput from '../../../Components/TextInput';
import Button from '../../../Components/Button';
import 'react-quill/dist/quill.snow.css';

export default function Edit() {
  const { errors, categories, product } = usePage().props;
  const [productName, setProductName] = useState(product.product_name);
  const [productDescription, setProductDescription] = useState(
    product.product_description,
  );
  const [productWeight, setProductWeight] = useState(product.product_weight);
  const [categoryID, setCategoryID] = useState(product.category_id);
  const [productVariant, setProductVariant] = useState(
    product.product_variants,
  );

  const addMoreFields = () => {
    setProductVariant([
      ...productVariant,
      { product_variant_name: '', product_variant_price: 0 },
    ]);
  };

  const removeFields = (index) => {
    const newProductVariant = [...productVariant];
    newProductVariant.splice(index, 1);
    setProductVariant(newProductVariant);
  };

  const setProductVariantPrice = (i, e) => {
    const newProductVariant = [...productVariant];
    newProductVariant[i][e.target.name] = e.target.value;
    setProductVariant(newProductVariant);
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();

    router.put(
      `/admin/products/${product.product_id}}`,
      {
        category_id: categoryID,
        product_name: productName,
        product_description: productDescription,
        product_weight: productWeight,
        product_variants: productVariant,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: 'Success!',
            text: 'Product Updated.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      },
    );
  };

  return (
    <>
      <Head>
        <title>Edit Product | Kopaka</title>
      </Head>
      <LayoutAccount>
        <Card
          title={(
            <>
              <FaCakeCandles />
              Edit Product
            </>
                      )}
        >
          <form onSubmit={updateProductHandler}>
            <TextInput
              type="text"
              label="product name"
              placeholder="Product name"
              value={productName}
              onChange={setProductName}
              error={errors.product_name}
            />
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
              >
                <option value="">
                  ---- Select Category ----
                </option>
                {categories.map((category) => (
                  <option
                    value={category.category_id}
                    key={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.category_id}
                </div>
              )}
            </div>
            <TextInput
              type="number"
              label="product weight"
              placeholder="Product Weight"
              value={productWeight}
              onChange={setProductWeight}
              error={errors.product_weight}
            />
            <div className="mb-4">
              <label
                htmlFor="product-description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Product Description
              </label>
              <ReactQuill
                id="product-description"
                theme="snow"
                rows="10"
                value={productDescription}
                onChange={(content) => setProductDescription(content)}
              />
              {errors.product_description && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.product_description}
                </div>
              )}
            </div>
            <div className="mt-3 mb-5">
              <div className="col-span-full">
                <div
                  className="bg-yellow-200 text-yellow-800 border-l-4 border-yellow-600 p-4 flex items-center"
                  role="alert"
                >
                  <FaInfo />
                  add variant and price for product.
                </div>
              </div>

              {errors.product_variants && (
                <div className="bg-red-200 text-red-800 border-l-4 border-red-600 p-4 mt-4">
                  {errors.product_variants}
                </div>
              )}
              {productVariant.map((element, index) => (
                <div
                  className="grid grid-cols-5 gap-4"
                  key={index}
                >
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Variants
                    </label>
                    <input
                      type="text"
                      name="product_variant_name"
                      value={
                                                element.product_variant_name
                                                || ''
                                            }
                      onChange={(e) => setProductVariantPrice(index, e)}
                      className={`bg-gray-50 border ${
                        errors.product_variants
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="Enter Variant"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Price
                    </label>
                    <input
                      type="number"
                      name="product_variant_price"
                      value={
                                                element.product_variant_price
                                                || ''
                                            }
                      onChange={(e) => setProductVariantPrice(index, e)}
                      className={`bg-gray-50 border ${
                        errors.product_variants
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                      placeholder="Enter Price"
                      required
                    />
                  </div>
                  {index ? (
                    <div className="col-span-1">
                      <label className="block text-white">
                        .
                      </label>
                      <button
                        type="button"
                        className="w-full btn btn-danger btn-md border-0 shadow-sm"
                        onClick={() => removeFields(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="col-span-full">
                <button
                  type="button"
                  className="btn bg-blue-500 text-white mt-2 border-0 shadow-sm"
                  onClick={() => addMoreFields()}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <Button color="success">Save</Button>
          </form>
        </Card>
      </LayoutAccount>
    </>
  );
}
