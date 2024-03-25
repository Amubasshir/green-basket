// import Image from "next/image";

// const MyOrderItem = ({ orderItem }) => {
//   return (
//     <div className="w-[80%]">
//       <div className="mt-3 grid w-[90%] grid-cols-5  items-center">
//         <Image
//           src={
//             process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
//             orderItem.product.data.attributes.images.data[0].attributes.url
//           }
//           width={80}
//           height={80}
//           alt="image"
//           className="rounded-md border bg-gray-100 p-5"
//         />
//         <div className=" col-span-2 ">
//           <h2>{orderItem.product.data.attributes.name}</h2>
//           <h2>Item Price: {orderItem.product.data.attributes.mrp}</h2>
//         </div>
//         <h2>Quantity: {orderItem.quantity}</h2>
//         <h2>Price: {orderItem.amount}</h2>
//       </div>
//       <hr className="my-2" />
//     </div>
//   );
// };

// export default MyOrderItem;

import Image from "next/image";

const MyOrderItem = ({ orderItem, index_, totalItems }) => {
  const isLastItem = index_ === totalItems - 1;

  return (
    <div className="w-[80%]">
      <div className="mt-3 grid w-[90%] grid-cols-5  items-center">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            orderItem.product.data.attributes.images.data[0].attributes.url
          }
          width={80}
          height={80}
          alt="image"
          className="rounded-md border bg-gray-100 p-5"
        />
        <div className=" col-span-2 ">
          <h2>{orderItem.product.data.attributes.name}</h2>
          <h2>Item Price: {orderItem.product.data.attributes.mrp}</h2>
        </div>
        <h2>Quantity: {orderItem.quantity}</h2>
        <h2>Price: {orderItem.amount}</h2>
      </div>
      {!isLastItem && <hr className="my-2" />}
    </div>
  );
};

export default MyOrderItem;
