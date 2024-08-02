import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";//"http://localhost:3001/"

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getCarts = () => {
  return axiosInstance.get('carts')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching carts:", err);
      throw err;
    });
};


export const getUserCart = () => {
return axiosInstance.get('carts-user')
.then(res => res.data)
.catch(err => {
  console.error("Error fetching user cart:", err);
  throw err;
});
};

export const addCart = (payload) => {
return axiosInstance.post('carts', payload)
.then(res => res.data)
.catch(err => {
  console.error("Error adding cart:", err);
  throw err;
});
};

export const addLocalCart = (payload) => {
return axiosInstance.post('carts-add-local', payload)
.then(res => res.data)
.catch(err => {
  console.error("Error adding local cart:", err);
  throw err;
});
};

export const updateCart = (payload) => {
return axiosInstance.patch('carts', payload)
.then(res => res.data)
.catch(err => {
  console.error("Error updating cart:", err);
  throw err;
});
};

export const deleteCart = (id) => {
return axiosInstance.delete(`carts/${id}`)
.then(res => res.data)
.catch(err => {
  console.error("Error deleting cart:", err);
  throw err;
});
};

export const deleteFromCart = (productId) => {
return axiosInstance.delete(`carts-remove/${productId}`)
.then(res => res.data)
.catch(err => {
  console.error("Error deleting product from cart:", err);
  throw err;
});
};