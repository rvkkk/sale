import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getReview = (id) => {
  return axiosInstance.get(`reviews/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching review:", err);
      throw err;
    });
};

export const getUserReviews = () => {
  return axiosInstance.get('reviews-user')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching user reviews:", err);
      throw err;
    });
};

export const getProductReviews = (productId) => {
  return axiosInstance.get(`reviews-product/${productId}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching product reviews:", err);
      throw err;
    });
};

export const addReview = (productId, reviewData) => {
  return axiosInstance.post(`reviews/${productId}`, reviewData)
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding review:", err);
      throw err;
    });
};

export const updateReview = (id, reviewData) => {
  return axiosInstance.patch(`reviews/${id}`, reviewData)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating review:", err);
      throw err;
    });
};

export const deleteReview = (id) => {
  return axiosInstance.delete(`reviews/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting review:", err);
      throw err;
    });
};