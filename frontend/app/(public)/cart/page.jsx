"use client";
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Grab, Trash2Icon, Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  //     Grab the cart items from the redux store
  const { cartItems, loading } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.list);

  //     dispatch function to dispatch actions to the redux store
  const dispatch = useDispatch();

  const [cartArray, setCartArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const createCartArray = () => {
    // Use an map to search for the proudcts in the cart in O(1) time
    const cartMap = Object.fromEntries(
      products.map((product) => [product.id, product])
    );
    const newCartArray = [];
    setTotalPrice(0);
    for (const [key, quantity] of Object.entries(cartItems)) {
      const proudct = cartMap[key];
      if (products) {
        newCartArray.push({
          ...proudct,
          quantity,
        });
        // updating Price of the products added to the cart based on the quantity
        setTotalPrice((prev) => prev + proudct.price * quantity);
      }
    }
    setCartArray(newCartArray);
  };
  //     const createCartArray = () => {
  //         setTotalPrice(0);
  //         const cartArray = [];
  //         for (const [key, value] of Object.entries(cartItems)) {
  //             // In the cartItems we have the productId as key and quantity as value
  //             const product = products.find(product => product.id === key);
  //             if (product) {
  //                 cartArray.push({
  //                     ...product,
  //                     quantity: value,
  //                 });
  //             //     Updating the price of the products added to the cart based on the quantity
  //                 setTotalPrice(prev => prev + product.price * value);
  //             }
  //         }
  //         setCartArray(cartArray);
  //     }

  const handleDeleteItemFromCart = (productId) => {
    // By sending an object we destructure it in the cartSlice
    dispatch(deleteItemFromCart({ productId }));
  };

  useEffect(() => {
    if (products.length > 0) {
      createCartArray();
    }
    // If the cartItems or products change, we need to update the cartArray
  }, [cartItems, products]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader className="animate-spin text-slate-500" size={40} />
      </div>
    );
  }

  return cartArray.length > 0 ? (
    // if the cart has items we show the cart
    <div className="min-h-screen mx-6 text-slate-800">
      <div className="max-w-7xl mx-auto ">
        {/* Title */}
        <PageTitle
          heading="My Cart"
          text="items in your cart"
          linkText="Add more"
        />

        <div className="flex items-start justify-between gap-5 max-lg:flex-col">
          <table className="w-full max-w-4xl text-slate-600 table-auto">
            <thead>
              <tr className="max-sm:text-sm">
                <th className="text-left">Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th className="max-md:hidden">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartArray.map((item, index) => (
                <tr key={index} className="space-x-2">
                  <td className="flex gap-3 my-4">
                    {/* This column has the maximun width, why? */}
                    <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                      <Image
                        src={item.images[0]}
                        className="h-14 w-auto"
                        alt=""
                        width={45}
                        height={45}
                      />
                    </div>
                    <div>
                      <p className="max-sm:text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                      <p>
                        {currency}
                        {item.price}
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <Counter productId={item.id} />
                  </td>
                  <td className="text-center">
                    {currency}
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                  <td className="text-center max-md:hidden">
                    {/* deleting the item from the cart */}
                    <button
                      onClick={() => handleDeleteItemFromCart(item.id)}
                      className=" text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <OrderSummary totalPrice={totalPrice} items={cartArray} />
        </div>
      </div>
    </div>
  ) : (
    // If the cart is empty we show this message taking 80vh of the screen height
    <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
      <h1 className="text-2xl sm:text-4xl font-semibold">Your cart is empty</h1>
    </div>
  );
}
