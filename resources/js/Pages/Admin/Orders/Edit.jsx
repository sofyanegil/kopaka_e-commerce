import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import { FaCakeCandles, FaCartShopping } from 'react-icons/fa6';
import LayoutAccount from '../../../Layouts/Account';
import Card from '../../../Components/Card';
import formatPrice from '../../../Utils/FormatPrice';
import formatDate from '../../../Utils/FormatDate';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../../Components/Button';

export default function Edit() {
  const { data } = usePage().props;
  const {
    order, orderDetails, store, deliveryArea,
  } = data;

  const [deliveryDate, setDeliveryDate] = useState(
    new Date(order.delivery_date),
  );
  const [orderStatus, setOrderStatus] = useState(order.order_status);
  const orderStatusData = ['PENDING', 'PROCESS', 'DELIVERED', 'CANCELED'];

  const editOrderHandler = async (e) => {
    e.preventDefault();

    router.put(
      `/admin/orders/${order.order_number}`,
      {
        order_id: order.order_id,
        delivery_date: deliveryDate.toISOString().split('T')[0],
        order_status: orderStatus,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Order Updated',
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
        <title>Edit Order | Kopaka</title>
      </Head>

      <LayoutAccount>
        <Card
          title={(
            <>
              <FaCartShopping />
              Edit Order :
              {' '}
              {order.order_number}
            </>
                      )}
        >
          <form onSubmit={editOrderHandler}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-black font-semibold">
                <tbody className="uppercase bg-gray-50">
                  <tr>
                    <td style={{ width: '15%' }}>
                      NO. ORDER
                    </td>
                    <td style={{ width: '1%' }}>:</td>
                    <td className="p-2">
                      {order.order_number}
                    </td>
                  </tr>
                  <tr>
                    <td>NAME</td>
                    <td>:</td>
                    <td className="p-2">{data.user}</td>
                  </tr>
                  <tr>
                    <td>PHONE</td>
                    <td>:</td>
                    <td className="p-2">
                      {order.delivery_phone}
                    </td>
                  </tr>
                  <tr>
                    <td>ORDER DATE</td>
                    <td>:</td>
                    <td className="p-2">
                      {formatDate(order.order_date)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        htmlFor="dob"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        DELIVERY DATE
                      </label>
                    </td>
                    <td>:</td>
                    <td className="p-2">
                      <DatePicker
                        id="dob"
                        dateFormat="dd MMMM yyyy"
                        selected={deliveryDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        minDate={
                                                    new Date(
                                                      order.delivery_date,
                                                    )
                                                }
                        dropdownMode="select"
                        onChange={(date) => setDeliveryDate(date)}
                        className="bg-gray-50 border border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>GRAND TOTAL</td>
                    <td>:</td>
                    <td className="p-2">
                      Rp.
                      {' '}
                      {formatPrice(order.grand_total)}
                    </td>
                  </tr>
                  <tr>
                    <td>PAYMENT STATUS</td>
                    <td>:</td>
                    <td className="p-2">
                      {order.payment_status}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        htmlFor="orderStatus"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Order Status
                      </label>
                    </td>
                    <td>:</td>
                    <td className="p-2">
                      <select
                        id="orderStatus"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(
                          e.target.value,
                        )}
                      >
                        {orderStatusData.map(
                          (status, index) => (
                            <option
                              key={index}
                              value={status}
                            >
                              {status}
                            </option>
                          ),
                        )}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>ORDER TYPE</td>
                    <td>:</td>
                    <td className="p-2">
                      {order.order_type}
                    </td>
                  </tr>
                  {order.order_type === 'PICKUP' && (
                    <tr>
                      <td>PICKUP LOCATION</td>
                      <td>:</td>
                      <td className="p-2">
                        {store.store_name}
                      </td>
                    </tr>
                  )}

                  {order.order_type === 'DELIVERY' && (
                    <>
                      <tr>
                        <td>ADRESS</td>
                        <td>:</td>
                        <td className="p-2">
                          {order.delivery_address}
                        </td>
                      </tr>
                      <tr>
                        <td>DELIVERY AREA</td>
                        <td>:</td>
                        <td className="p-2">
                          {
                                                        deliveryArea.delivery_area_name
                                                    }
                        </td>
                      </tr>
                      <tr>
                        <td>DELIVERY COST</td>
                        <td>:</td>
                        <td className="p-2">
                          Rp.
                          {' '}
                          {formatPrice(
                            deliveryArea.delivery_area_price,
                          )}
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td>NOTES</td>
                    <td>:</td>
                    <td className="p-2">
                      {order.order_note}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2">
              <Button color="success">SAVE</Button>
            </div>
          </form>
        </Card>

        <Card
          title={(
            <>
              <FaCakeCandles />
              Detail Product
            </>
                      )}
        >
          <div className="overflow-x-auto">
            <div className="w-full text-sm text-left text-gray-700">
              {orderDetails.map((detail, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img
                        src={
                                                    detail.product
                                                      .product_images[0]
                                                      .product_image_url
                                                }
                        className="w-full h-full rounded-3"
                        alt={
                                                    detail.product
                                                      .product_images
                                                      .product_image_url
                                                }
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="p-4">
                        <h4 className="text-xl font-bold mb-4">
                          {
                                                        detail.product
                                                          .product_name
                                                    }
                        </h4>

                        <div className="flex flex-wrap">
                          <div className="w-full md:w-1/2">
                            <div className="mt-2">
                              Variant :
                              {' '}
                              <strong>
                                {
                                                                    detail
                                                                      .product_variant
                                                                      .product_variant_name
                                                                }
                              </strong>
                            </div>
                            <div className="mt-2">
                              Qty :
                              {' '}
                              <strong>
                                {
                                                                    detail.product_quantity
                                                                }
                              </strong>
                            </div>
                            <div className="mt-2">
                              Price :
                              {' '}
                              <strong>
                                {formatPrice(
                                  detail
                                    .product_variant
                                    .product_variant_price,
                                )}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <hr className="my-4" />
                        <h5 className="font-semibold">
                          Total: Rp.
                          {' '}
                          {formatPrice(
                            detail.product_variant
                              .product_variant_price
                                                            * detail.product_quantity,
                          )}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </LayoutAccount>
    </>
  );
}
