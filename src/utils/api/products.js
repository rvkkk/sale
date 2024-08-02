import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";//"http://localhost:3001/"//

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === "additional-fields") {
      const json = JSON.stringify(data[key]);
      const blob = new Blob([json]);
      formData.append(key, blob);
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item) => formData.append(key, item));
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const getProduct = (id) => {
  return axios.get(`${baseURL}products/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching product:", err);
      throw err;
    });
};

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

export const addProduct = (productData) => {
  const formData = createFormData(productData);
  return axiosInstance.post('products', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding product:", err);
      throw err;
    });
};

export const updateProduct = (id, productData) => {
  const formData = createFormData(productData);
  return axiosInstance.patch(`products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating product:", err);
      throw err;
    });
};

export const deleteProduct = (id) => {
  return axiosInstance.delete(`products/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting product:", err);
      throw err;
    });
};

export const getProducts = (page = 1, limit = 30) => {
  return axios.get(`${baseURL}products?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products:", err);
      throw err;
    });
};

export const getProductsByCategory = (category, page = 1, limit = 30) => {
  return axios.get(`${baseURL}products-category/${category}?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products by category:", err);
      throw err;
    });
};

export const getProductsByMainCategory = (category, page = 1, limit = 30) => {
  return axios.get(`${baseURL}products-main-category/${category}?page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products by main category:", err);
      throw err;
    });
};

export const getProductsByLetters = (letters, page = 1, limit = 10) => {
  return axios.get(`${baseURL}products-by-letters?query=${letters}&page=${page}&limit=${limit}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching products by letters:", err);
      throw err;
    });
};

export const searchProducts = (searchData) => {
  return axios.post(`${baseURL}search-products`, searchData)
    .then(res => res.data)
    .catch(err => {
      console.error("Error searching products:", err);
      throw err;
    });
};