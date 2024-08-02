import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  addCart,
  addLocalCart,
  updateCart,
  deleteCart,
  deleteFromCart,
  getUserCart,
} from "../../utils/api/carts";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../../utils/cart";
import {useAuth} from "./AuthContext"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { isAuthenticated } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  // פונקציה לקבלת סל הקניות
  const fetchCart = () => {
    if (isLoggedIn) {
      getUserCart()
        .then((res) => {
            console.log(res.cart)
          setCart(res.cart);
        })
        .catch((err) => console.log(err));
    } else {
      getCart().then((cart) => {
        setCart(cart);
      });
    }
  };

  const updateCartToLocal = (cart) => {
    addLocalCart(cart)
    .then((res) => {
        setCart(res.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateProductInCart = (product, newAmount, amount) => {
    if (isLoggedIn)
      updateCart({ product: product, amount: newAmount - amount })
        .then((res) => {
          console.log(res);
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.map((p) => {
              if (p.product.id === product.id) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addToCart({
        productId: product.id,
        amount: newAmount - amount,
      })
        .then((res) => {
          console.log(res);
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.map((p) => {
              if (p.product.id === product.id) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const addProductToCart = (product, amountToBuy) => {
    if (isLoggedIn)
      addCart({ productId: product.id, amount: amountToBuy })
        .then((res) => {
          setCart(res.cart);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addToCart({
        product: {
          //האם לשמור רק ID
          id: product.id,
          title: product.title,
          "english-title": product["english-title"],
          description: product.description,
          "english-description": product["english-description"],
          price: product.price,
          "price-before-discount": product["price-before-discount"],
          category: product.category,
          quantity: product.quantity,
          images: product.images,
          "shipping-cost": product["shipping-cost"],
          pin: product.pin,
        },
        amount: amountToBuy,
      })
        .then((res) => {
          setCart(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeProductFromCart = (productId) => {
    if (isLoggedIn)
      deleteFromCart(productId)
        .then((res) => {
          console.log(res)
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(
              (p) => !(p.product.id === productId)
            );
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      removeFromCart(productId)
        .then((res) => {
          console.log(res)
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(
              (p) => !(p.product.id === productId)
            );
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const deleteMyCart = () => {
    if (isLoggedIn) {
      deleteCart(cart.id)
        .then((res) => {
          setCart({});
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      clearCart()
        .then((res) => {
          setCart({});
        })
        .catch((err) => {
          console.log(err);
        });
  };

  // פונקציה לסנכרון הסל המקומי עם השרת בעת התחברות
  const syncCartOnLogin = () => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const parsedLocalCart = JSON.parse(localCart);
      updateCartToLocal(parsedLocalCart);
      localStorage.removeItem("cart");
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCart({});
    // כאן תוכלי להוסיף לוגיקה נוספת להתנתקות מהשרת
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        updateProductInCart,
        removeProductFromCart,
        deleteMyCart,
        updateCartToLocal,
        fetchCart,
        syncCartOnLogin,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
