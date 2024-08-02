import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";//"http://localhost:3001/"//

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getUserProducts = () => {
  return axiosInstance.get('products-user')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching user products:", err);
      throw err;
    });
};

export const addProducts = (userName, file) => {
  const formData = new FormData();
  formData.append("userName", userName);
  formData.append("file", file);
  return axiosInstance.post('products-many', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding products:", err);
      throw err;
    });
};

export const getAllProducts = (page = 1, limit = 30) => {
  return axios.get(`${baseURL}all-products?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products:", err);
      throw err;
    });
};

export const getAllProductsByCategory = (category, page = 1, limit = 30) => {
  return axios.get(`${baseURL}all-products-category/${category}?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products by category:", err);
      throw err;
    });
};

export const getAllProductsByMainCategory = (category, page = 1, limit = 30) => {
  return axios.get(`${baseURL}all-products-main-category/${category}?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products by main category:", err);
      throw err;
    });
};

export const getAllProductsByLetters = (letters, page = 1, limit = undefined) => {
  return axios.get(`${baseURL}all-products-by-letters?query=${letters}&page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products by letters:", err);
      throw err;
    });
};

export const searchAllProducts = (searchData) => {
  return axios.post(`${baseURL}search-all-products`, searchData)
    .then(res => res.data)
    .catch(err => {
      console.error("Error searching products:", err);
      throw err;
    });
};