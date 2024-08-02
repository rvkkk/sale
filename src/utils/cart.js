// Shopping cart functions local storage

export const getCart = () => {
  return new Promise((resolve, reject) => {
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        resolve(JSON.parse(cart));
      } else {
        resolve({ products: [] });
      }
    } catch (err) {
      clearCart();
      reject(err);
    }
  });
};

export const addToCart = (product) => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      const index = cartObj.products.findIndex(
        (p) => p.product.id === product.product.id
      );
      if (index !== -1) cartObj.products[index].amount += product.amount;
      else cartObj.products.push(product);
      //cartObj.total += product.price * product.amount;
      localStorage.setItem("cart", JSON.stringify(cartObj));
      resolve(cartObj);
    } else {
      const cartObj = {
        products: [product],
      };
      localStorage.setItem("cart", JSON.stringify(cartObj));
      resolve(cartObj);
    }
  });
};

export const removeFromCart = (productId) => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      const index = cartObj.products.findIndex(
        (p) => p.product.id === productId
      );
      if (index !== -1) {
        let newProducts = cartObj.products;
        for (const p of newProducts)
          if (p.product.id === productId) newProducts.pop(p);
        cartObj.products = newProducts;
        localStorage.setItem("cart", JSON.stringify(cartObj));
        resolve(cartObj);
      } else reject("המוצר לא היה קיים בעגלה");
    } else {
      console.log("no cart");
      reject("No cart");
    }
  });
};

export const clearCart = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem("cart");
    resolve();
  });
};

export const getCartCount = () => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      resolve(cartObj.products.length);
    } else {
      resolve(0);
    }
  });
};

export const checkIfProductInCart = (product) => {
  console.log("to check:", product);
  const cart = localStorage.getItem("cart");
  try {
    if (cart) {
      const cartObj = JSON.parse(cart);
      if (cartObj.products.length >= 1) {
        const index = cartObj.products.findIndex(
          (p) => p.product.id === product.productId
        );
        return index !== -1;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

/*// Shopping cart functions local storage

export const getCart = () => {
  return new Promise((resolve, reject) => {
    try {
      const cart = localStorage.getItem("cart");
      if (cart) {
        resolve(JSON.parse(cart));
      } else {
        resolve({products: []});
      }
    } catch (err) {
      clearCart();
      reject(err);
    }
  });
};

export const addToCart = (product) => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      const index = cartObj.products.findIndex(
        (p) =>
          p.product.id === product.product.id &&
          p.size === product.size &&
          p.model === product.model
      );
      if (index !== -1) cartObj.products[index].amount += product.amount;
      else cartObj.products.push(product);
      //cartObj.total += product.price * product.amount;
      localStorage.setItem("cart", JSON.stringify(cartObj));
      resolve(cartObj);
    } else {
      const cartObj = {
        products: [product]
        //total: product.price * product.amount,
      };
      localStorage.setItem("cart", JSON.stringify(cartObj));
      resolve(cartObj);
    }
  });
};

export const removeFromCart = (product) => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      const index = cartObj.products.findIndex(
        (p) =>
          p.product.id === product.productId &&
          p.size === product.size &&
          p.model === product.model
      );
      if (index !== -1) {
        //const amount = cartObj.products[index].amount;
        //const price = cartObj.products[index].price; //לגבי מחיר לשמור או לא  האם כל פים לקבל מחיר עכשיוי
        let newProducts = cartObj.products;
        for (const p of newProducts)
          if (
            p.product.id === product.productId &&
            p.size === product.size &&
            p.model === product.model
          )
            newProducts.pop(p);
        cartObj.products = newProducts;
        //cartObj.total -= price * amount;
        localStorage.setItem("cart", JSON.stringify(cartObj));
        resolve(cartObj);
      } else reject("המוצר לא היה קיים בעגלה");
    } else {
      console.log("no cart");
      reject("No cart");
    }
  });
};

export const clearCart = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem("cart");
    resolve();
  });
};

export const getCartCount = () => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartObj = JSON.parse(cart);
      resolve(cartObj.products.length);
    } else {
      resolve(0);
    }
  });
};

export const checkIfProductInCart = (product) => {
  console.log("to check:", product);
  const cart = localStorage.getItem("cart");
  try {
    if (cart) {
      const cartObj = JSON.parse(cart);
      if (cartObj.products.length >= 1) {
        const index = cartObj.products.findIndex(
          (p) =>
            p.product.id === product.productId &&
            p.size === product.size &&
            p.model === product.model
        );
        return index !== -1;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
*/
