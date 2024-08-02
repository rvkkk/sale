// wish list functions local storage

export const getWishList = () => {
  return new Promise((resolve, reject) => {
    try {
      const wishList = localStorage.getItem("wish-list");
      if (wishList) {
        resolve(JSON.parse(wishList));
      } else {
        resolve({ products: [] });
      }
    } catch (err) {
      clearWishList();
      reject(err);
    }
  });
};

export const addToWishList = (product) => {
  return new Promise((resolve, reject) => {
    const wishList = localStorage.getItem("wish-list");
    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      const index = wishListObj.products.findIndex(
        (p) => p.product.id === product.product.id
      );
      if (index !== -1) wishListObj.products[index].amount += product.amount;
      else wishListObj.products.push(product);
      localStorage.setItem("wish-list", JSON.stringify(wishListObj));
      resolve(wishListObj);
    } else {
      const wishListObj = {
        products: [product],
      };
      localStorage.setItem("wish-list", JSON.stringify(wishListObj));
      resolve(wishListObj);
    }
  });
};

export const removeFromWishList = (productId) => {
  return new Promise((resolve, reject) => {
    const wishList = localStorage.getItem("wish-list");
    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      const index = wishListObj.products.findIndex(
        (p) => p.product.id === productId
      );
      if (index !== -1) {
        let newProducts = wishListObj.products;
        for (const p of newProducts)
          if (p.product.id === productId) newProducts.pop(p);
        wishListObj.products = newProducts;
        localStorage.setItem("wish-list", JSON.stringify(wishListObj));
        resolve(wishListObj);
      } else reject("המוצר לא היה קיים ברשימת המשאלות");
    } else {
      console.log("no wish list");
      reject("No wish list");
    }
  });
};

export const clearWishList = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem("wish-list");
    resolve();
  });
};

export const getWishListCount = () => {
  return new Promise((resolve, reject) => {
    const wishList = localStorage.getItem("wish-list");

    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      resolve(wishListObj.products.length);
    } else {
      resolve(0);
    }
  });
};

export const checkIfProductInWishList = (product) => {
  console.log("to check:", product);
  const wishList = localStorage.getItem("wish-list");
  try {
    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      if (wishListObj.products.length >= 1) {
        const index = wishListObj.products.findIndex(
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

/*// wish list functions local storage

export const getWishList = () => {
  return new Promise((resolve, reject) => {
    try {
      const wishList = localStorage.getItem("wish-list");
      if (wishList) {
        resolve(JSON.parse(wishList));
      } else {
        resolve({products: []});
      }
    } catch (err) {
      clearWishList();
      reject(err);
    }
  });
};

export const addToWishList = (product) => {
  return new Promise((resolve, reject) => {
    const wishList = localStorage.getItem("wish-list");
    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      const index = wishListObj.products.findIndex(
        (p) =>
          p.product.id === product.product.id &&
          p.size === product.size &&
          p.model === product.model
      );
      if (index !== -1) wishListObj.products[index].amount += product.amount;
      else wishListObj.products.push(product);
      localStorage.setItem("wish-list", JSON.stringify(wishListObj));
      resolve(wishListObj);
    } else {
      const wishListObj = {
        products: [product]
      };
      localStorage.setItem("wish-list", JSON.stringify(wishListObj));
      resolve(wishListObj);
    }
  });
};

export const removeFromWishList = (product) => {
  return new Promise((resolve, reject) => {
    const wishList = localStorage.getItem("wish-list");
    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      const index = wishListObj.products.findIndex(
        (p) =>
          p.product.id === product.productId &&
          p.size === product.size &&
          p.model === product.model
      );
      if (index !== -1) {
        let newProducts = wishListObj.products;
        for (const p of newProducts)
          if (
            p.product.id === product.productId &&
            p.size === product.size &&
            p.model === product.model
          )
            newProducts.pop(p);
        wishListObj.products = newProducts;
        localStorage.setItem("wish-list", JSON.stringify(wishListObj));
        resolve(wishListObj);
      } else reject("המוצר לא היה קיים ברשימת המשאלות");
    } else {
      console.log("no wish list");
      reject("No wish list");
    }
  });
};

export const clearWishList = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem("wish-list");
    resolve();
  });
};

export const getWishListCount = () => {
  return new Promise((resolve, reject) => {
    const wishList = localStorage.getItem("wish-list");

    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      resolve(wishListObj.products.length);
    } else {
      resolve(0);
    }
  });
};

export const checkIfProductInWishList = (product) => {
  console.log("to check:", product);
  const wishList = localStorage.getItem("wish-list");
  try {
    if (wishList) {
      const wishListObj = JSON.parse(wishList);
      if (wishListObj.products.length >= 1) {
        const index = wishListObj.products.findIndex(
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
