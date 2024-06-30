import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

const handleError = (error, message) => {
  console.error(message, error);
  throw error;
};

export const getOffers = async () => {
  try {
    const res = await axiosInstance.get('offers');
    return res.data;
  } catch (err) {
    handleError(err, "Error fetching offers:");
  }
};

export const getOffer = async (id) => {
  try {
    const res = await axiosInstance.get(`offers/${id}`);
    return res.data;
  } catch (err) {
    handleError(err, "Error fetching offer:");
  }
};

export const getUserOffers = async () => {
  try {
    const res = await axiosInstance.get('offers-user');
    return res.data;
  } catch (err) {
    handleError(err, "Error fetching user offers:");
  }
};

export const getProductOffers = async (productId) => {
  try {
    const res = await axiosInstance.get(`offers-product/${productId}`);
    return res.data;
  } catch (err) {
    handleError(err, "Error fetching product offers:");
  }
};

export const addOffer = async (productId, price) => {
  try {
    const res = await axiosInstance.post(`offers/${productId}`, { price });
    return res.data;
  } catch (err) {
    handleError(err, "Error adding offer:");
  }
};

export const updateOffer = async (id, price) => {
  try {
    const res = await axiosInstance.patch(`offers/${id}`, { price });
    return res.data;
  } catch (err) {
    handleError(err, "Error updating offer:");
  }
};

export const deleteOffer = async (id) => {
  try {
    const res = await axiosInstance.delete(`offers/${id}`);
    return res.data;
  } catch (err) {
    handleError(err, "Error deleting offer:");
  }
};