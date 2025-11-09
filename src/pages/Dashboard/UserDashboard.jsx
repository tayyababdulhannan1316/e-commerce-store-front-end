import React from "react";
import { useCart } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export default function UserDashboard() {
  const { orders } = useCart();
  const { user } = useContext(AuthContext);

  const userOrders = orders.filter(
    (order) => order.customer?.email === user?.email
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

      {userOrders.length === 0 ? (
        <p className="text-gray-600">You have no past orders.</p>
      ) : (
        <div className="grid gap-6">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order #{order.id}
                </h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-2">
                Placed on: {order.date}
              </p>

              <div className="border-t pt-3">
                <h3 className="font-semibold mb-2 text-gray-700">Items:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.title} × {item.quantity}
                      </span>
                      <span>Rs. {item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t mt-3 pt-3 flex justify-between text-gray-800 font-semibold">
                <span>Total:</span>
                <span>Rs. {order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



// import React, { useContext } from "react";
// import { CartContext } from "../../contexts/CartContext";
// import { AuthContext } from "../../contexts/AuthContext";

// export default function UserDashboard() {
//   const { orders } = useContext(CartContext);
//   const { user } = useContext(AuthContext);

//   // ✅ Filter only the logged-in user's orders
//   const userOrders = orders.filter(
//     (order) => order.customer?.email === user?.email
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         My Orders
//       </h1>

//       {userOrders.length === 0 ? (
//         <p className="text-gray-600">You have no past orders.</p>
//       ) : (
//         <div className="grid gap-6">
//           {userOrders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-lg font-semibold text-gray-700">
//                   Order #{order.id}
//                 </h2>
//                 <span
//                   className={`px-3 py-1 text-sm rounded-full font-medium ${
//                     order.status === "Delivered"
//                       ? "bg-green-100 text-green-700"
//                       : order.status === "Cancelled"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {order.status || "Pending"}
//                 </span>
//               </div>

//               <p className="text-gray-500 text-sm mb-2">
//                 Placed on: {order.date}
//               </p>

//               <div className="border-t pt-3">
//                 <h3 className="font-semibold mb-2 text-gray-700">
//                   Items:
//                 </h3>
//                 <ul className="text-sm text-gray-600 space-y-1">
//                   {order.items.map((item) => (
//                     <li key={item.id} className="flex justify-between">
//                       <span>
//                         {item.title} × {item.quantity}
//                       </span>
//                       <span>Rs. {item.price * item.quantity}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="border-t mt-3 pt-3 flex justify-between text-gray-800 font-semibold">
//                 <span>Total:</span>
//                 <span>Rs. {order.total}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
