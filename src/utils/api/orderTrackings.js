import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getOrdersTracking = () => {
  return axiosInstance.get('orderTrackings')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching orders tracking:", err);
      throw err;
    });
};

export const getOrderTracking = (id) => {
  return axiosInstance.get(`orderTrackings/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching order tracking:", err);
      throw err;
    });
};

export const getOrderOrdersTracking = (orderId) => {
  return axiosInstance.get(`orderTrackings-order/${orderId}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching order's order tracking:", err);
      throw err;
    });
};

export const addOrderTracking = (orderId, payload) => {
  return axiosInstance.post(`orderTrackings-order/${orderId}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding order tracking:", err);
      throw err;
    });
};

export const updateOrderTracking = (id, payload) => {
  return axiosInstance.patch(`orderTrackings/${id}`, payload)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating order tracking:", err);
      throw err;
    });
};

export const deleteOrderTracking = (id) => {
  return axiosInstance.delete(`orderTrackings/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting order tracking:", err);
      throw err;
    });
};

export const deleteOrderOTracking = (orderId) => {
  return axiosInstance.delete(`orderTrackings-order/${orderId}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting order's order tracking:", err);
      throw err;
    });
};