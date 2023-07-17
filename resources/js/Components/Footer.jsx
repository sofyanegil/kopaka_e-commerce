import { Link } from '@inertiajs/react';
import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mb-0  flex justify-center">
            <a
              href="https://kopaka.my.id/"
              className="flex items-center text-center"
            >
              <img
                src="/assets/images/logo.png"
                className="h-full w-80 text-center "
                alt="Kopaka Logo"
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                STORE
              </h2>
              <ul className="text-gray-500 font-light">
                <li className="mb-2">
                  <a
                    href="https://goo.gl/maps/Wkr2qK1GCGJq4PAP7"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kopo Bihbul
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://goo.gl/maps/k4Q2evxikHC2xD169"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    23 Paskal
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://goo.gl/maps/Nyua6jAi46MZgCdW9"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Maulana Yusuf
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://goo.gl/maps/wv2HkkhHqWDYjT1D7"
                    className="hover:underline"
                  >
                    Kelapa Gading, Jakarta
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                PRODUCTS
              </h2>
              <ul className="text-gray-500  font-light">
                <li className="mb-2">
                  <Link
                    href="/products"
                    className="hover:underline "
                  >
                    Taarts
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/products"
                    className="hover:underline "
                  >
                    Cakes
                  </Link>
                </li>
                <li className="mb-2">
                  <a
                    href="/products"
                    className="hover:underline "
                  >
                    Cookies
                  </a>
                </li>
                <li className="mb-2">
                  <Link
                    href="/products"
                    className="hover:underline "
                  >
                    Lapis Legit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase ">
                Contact
              </h2>
              <ul className="text-gray-500  font-light">
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    infokopaka@gmail.com
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="tel:+62225400506"
                    className="hover:underline"
                  >
                    (022) 5400506
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://goo.gl/maps/Wkr2qK1GCGJq4PAP7"
                    className="hover:underline"
                  >
                    Jl. Bihbul Raya No 101, Sayati,
                    Margahayu, Bandung.
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center ">
            {new Date().getFullYear()}
            {' '}
            {' - '}
            <a
              href="https://kopaka.com/"
              className="hover:underline"
            >
              Kopaka Taarts & Cakes
            </a>
            | All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a
                href="https://web.facebook.com/Kopaka.Jakarta"
                className="text-gray-500 hover:text-gray-900 "
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="w-4 h-4" />
                <span className="sr-only">Facebook page</span>
              </a>
            </div>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a
                href="https://www.instagram.com/kopakacakeofficial"
                className="text-gray-500 hover:text-gray-900 "
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="w-4 h-4" />
                <span className="sr-only">Instagram page</span>
              </a>
            </div>
            <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a
                href="https://api.whatsapp.com/send?phone=628112216677"
                className="text-gray-500 hover:text-gray-900 "
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="sr-only">Instagram page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
