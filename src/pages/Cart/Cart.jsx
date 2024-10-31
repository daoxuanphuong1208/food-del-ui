import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div>
      {getTotalCartAmount() > 0 ? (
        <div className="cart">
          <div className="cart-item">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <>
                    <div key={index} className="cart-item-list">
                      <div className="cart-item-title">
                        <img src={item.image} alt="" />
                        <div>
                          {item.name}
                          <div style={{ fontWeight: "bold" }}>
                            ${item.price}
                          </div>
                        </div>
                      </div>
                      {cartItems[item._id]}
                      <p>${item.price * cartItems[item._id]}</p>
                      <p
                        onClick={() => removeFromCart(item._id)}
                        className="cross"
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </>
                );
              }
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>{2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>
                    $
                    {getTotalCartAmount() > 0
                      ? getTotalCartAmount() + 2
                      : getTotalCartAmount()}
                  </b>
                </div>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promo-code">
              <div>
                <p>If you have promo code, Enter it here</p>
                <div className="cart-promo-code-input">
                  <input type="text" placeholder="promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="image-wrap">
          <img src={assets.cart_empty} alt="cart_empty" />
        </div>
      )}
    </div>
  );
}

export default Cart;
