import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getUserWishList = () => {
  return axiosInstance.get('wish-lists-user')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching user wish list:", err);
      throw err;
    });
};

export const checkIfInWishList = async (productId) => {
  try {
    const res = await getUserWishList();
    if (res.wishList && res.wishList.products && res.wishList.products.length >= 1) {
      return res.wishList.products.some(p => p.product.id === productId);
    }
    return false;
  } catch (err) {
    console.error("Error checking if product is in wish list:", err);
    return false;
  }
};

export const deleteWishList = (id) => {
  return axiosInstance.delete(`wish-lists/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting wish list:", err);
      throw err;
    });
};

export const deleteFromWishList = (productId) => {
  return axiosInstance.delete(`wish-lists-remove/${productId}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting product from wish list:", err);
      throw err;
    });
};

export const addNewWish = (payload) => {
  return axiosInstance.post('wish-lists', payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding new wish:", err);
      throw err;
    });
};

export const addLocalWishList = (payload) => {
  return axiosInstance.post('wish-lists-add-local', payload)
  .then(res => res.data)
  .catch(err => {
    console.error("Error adding local wish:", err);
    throw err;
  });
  };

export const updateWishList = (payload) => {
  return axiosInstance.patch('wish-lists', payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating wish list:", err);
      throw err;
    });
};