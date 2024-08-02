import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {
    addNewWish,
    updateWishList,
    deleteWishList,
    deleteFromWishList,
    addLocalWishList,
    getUserWishList
} from "../../utils/api/wishLists"

import {
  addToWishList,
  clearWishList,
  getWishList,
  removeFromWishList,
  checkIfProductInWishList
} from "../../utils/wishList";
import {useAuth} from "./AuthContext"

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState({});
  const { isAuthenticated } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  const fetchWishList = () => {
    if (isAuthenticated) {
      getUserWishList()
        .then((res) => {
            console.log(res)
          setWishList(res.wishList);
        })
        .catch((err) => console.log(err));
    } else {
      getWishList().then((wishList) => {
        console.log(wishList)
        setWishList(wishList);
      });
    }
  };


  const updateWishListToLocal = (wishList) => {
    addLocalWishList(wishList)
    .then((res) => {
        setWishList(res.wishList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateProductInWishList = (product, newAmount, amount) => {
    if (isLoggedIn)
      updateWishList({ product: product, amount: newAmount - amount })
        .then((res) => {
          console.log(res);
          setWishList((prevCart) => {
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
      addToWishList({
        productId: product.id,
        amount: newAmount - amount,
      })
        .then((res) => {
          console.log(res);
          setWishList((prevCart) => {
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

  const addProductToWishList = (product, amountToBuy) => {
    if (isLoggedIn)
        addNewWish({ productId: product.id, amount: amountToBuy })
        .then((res) => {
          setWishList(res.wishList);
        })
        .catch((err) => {
          console.log(err);
        });
    else
    addToWishList({
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
          setWishList(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeProductFromWishList = (productId) => {
    if (isLoggedIn)
        deleteFromWishList(productId)
        .then((res) => {
          setWishList((prevCart) => {
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
    removeFromWishList(productId)
        .then((res) => {
          setWishList((prevCart) => {
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

  const deleteMyWishList = () => {
    if (isLoggedIn) {
      deleteWishList(wishList.id)
        .then((res) => {
          setWishList({});
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      clearWishList()
        .then((res) => {
          setWishList({});
        })
        .catch((err) => {
          console.log(err);
        });
  };

  // פונקציה לסנכרון הסל המקומי עם השרת בעת התחברות
  const syncWishOnLogin = () => {
    const localWishList = localStorage.getItem("wish-list");
    if (localWishList) {
      const parsedLocalWishList = JSON.parse(localWishList);
      updateWishList(parsedLocalWishList);//await
      localStorage.removeItem("wish-list");
    }
    setIsLoggedIn(true);
  };

  // פונקציה להתנתקות
  const logout = () => {
    setIsLoggedIn(false);
    setWishList({});
  };

  // טעינת הסל בעת טעינת האפליקציה
  useEffect(() => {
    fetchWishList();
  }, [isLoggedIn]);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addProductToWishList,
        updateProductInWishList,
        removeProductFromWishList,
        deleteMyWishList,
        updateWishListToLocal,
        fetchWishList,
        syncWishOnLogin,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => {
  return useContext(WishListContext);
};
