import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getOrders = () => {
  return axiosInstance.get('orders')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching orders:", err);
      throw err;
    });
};

export const getOrder = (id) => {
  return axiosInstance.get(`orders/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching order:", err);
      throw err;
    });
};

export const getUserOrders = () => {
  return axiosInstance.get('orders-user')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching user orders:", err);
      throw err;
    });
};

export const addOrder = (payload) => {
  return axiosInstance.post('orders', payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding order:", err);
      throw err;
    });
};

export const updateOrder = (id, payload) => {
  return axiosInstance.patch(`orders/${id}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating order:", err);
      throw err;
    });
};

export const deleteOrder = (id) => {
  return axiosInstance.delete(`orders/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting order:", err);
      throw err;
    });
};

// כנראה לא צריך
export const deleteAllOrders = () => {
  return axiosInstance.delete('orders-user')
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting all orders:", err);
      throw err;
    });
};