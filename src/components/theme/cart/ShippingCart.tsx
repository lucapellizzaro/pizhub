"use client";
import React, { useState } from "react";
import TrashButton from "../TrashButton";
import Price from "@/components/Price";

interface CartItem {
  title: string;
  price: number;
}

const ShoppingCart: React.FC = () => {
  const initialCart: CartItem[] = [
    { title: "Pizza Margerita", price: 6.7 },
    { title: "Pizza Margerita", price: 9.5 },
    { title: "Pizza Margerita", price: 7.9 },
    { title: "Pizza Margerita", price: 8.5 },
    { title: "Pizza Margerita", price: 5.8 },
    { title: "Pizza Margerita", price: 7.85 },
  ];

  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const calculateTotal = (cart: CartItem[]): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveItem = (idx: number) => {
    const updatedCart = cart.filter((_, i) => i !== idx);
    setCart(updatedCart);
  };

  if (!cart.length) {
    return <p>Nessuna pizza in ordine.</p>;
  }

  return (
    <section className="relative w-full">
      <ul className="relative w-full divide-y divide-stone-200">
        {cart.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-row items-center justify-between py-3"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-stone-500">
                <Price price={item.price} />
              </p>
            </div>
            <div>
              <TrashButton onClick={() => handleRemoveItem(idx)} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex w-full flex-row items-start justify-between border-t pt-4">
        <p className="text-sm text-stone-500">
          Totale: {cart.length} {cart.length > 1 ? "pizze" : "pizza"}
        </p>
        <p className="text-2xl font-semibold">
          <Price price={calculateTotal(cart)} />
        </p>
      </div>
    </section>
  );
};

export default ShoppingCart;
