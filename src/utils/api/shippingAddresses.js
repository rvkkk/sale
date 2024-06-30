import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getUserShippingAddresses = () => {
  return axiosInstance.get('shipping-addresses')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching user shipping addresses:", err);
      throw err;
    });
};

export const getUserDefaultShippingAddress = () => {
  return axiosInstance.get('shipping-address/default')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching user default shipping address:", err);
      throw err;
    });
};

export const addShippingAddress = (payload) => {
  return axiosInstance.post('shipping-address', payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding shipping address:", err);
      throw err;
    });
};

export const updateShippingAddress = (id, payload) => {
  return axiosInstance.patch(`shipping-address/${id}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating shipping address:", err);
      throw err;
    });
};

export const deleteShippingAddress = (id) => {
  return axiosInstance.delete(`shipping-address/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting shipping address:", err);
      throw err;
    });
};