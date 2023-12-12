import axios from "axios";
import React, { useState } from 'react';

const ProductItem = ({product}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <li>
            <a href="#" class="group block overflow-hidden">
              <img
                src={product.images?.[0]}
                alt=""
                class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[400px]"
              />

              <div class="relative bg-white pt-3 text-center">
                <h3
                  class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                >
                  {product.title}
                </h3>

                <p class="mt-2">
                  <span class="sr-only"> Regular Price </span>

                  <span class="tracking-wider text-gray-900"> {formatter.format(product.price)} VND </span>
                </p>
              </div>
            </a>
          </li>         
  );
};

export default ProductItem;
