import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const Bag = () => {
  const { cart, removeFromCart, clearCart } = useContext(ProductsContext);

  // Ensure cart is defined before rendering the page
  if (!cart) {
    return <p>Loading your bag...</p>; // Show loading message if cart is undefined
  }

  // Calculate the total price of the items in the cart
  const total = cart?.reduce(
    (sum, item) =>
      sum + parseFloat(item?.price.replace(/[^0-9.-]+/g, "")) * item?.quantity,
    0
  );

  return (
    <div>
      {cart.length === 0 ? (
        <p>Your bag is empty 🍋</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>Price: ${parseFloat(item?.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div>
          <h4>Total: ${total?.toFixed(2)}</h4>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Bag;
