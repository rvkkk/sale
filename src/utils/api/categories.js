import axios from "axios";

const baseURL = "http://localhost:3001/"//"https://sale-bid.df.r.appspot.com/"

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export const getCategories = () => {
  return axios.get(`${baseURL}categories`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching categories:", err);
      throw err;
    });
};

export const getMainCategories = () => {
  return axios.get(`${baseURL}categories-main`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching main categories:", err);
      throw err;
    });
};

export const getTopCategories = () => {
  return axios.get(`${baseURL}categories-top`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching top categories:", err);
      throw err;
    });
};

export const getCategory = (title) => {
  return axios.get(`${baseURL}category/${title}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching category:", err);
      throw err;
    });
};

export const addCategory = (title, name, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("name", name);
  formData.append("image", image);
  
  return axiosInstance.post('category', formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding category:", err);
      throw err;
    });
};

export const updateCategory = ({ title, name }) => {
  return axiosInstance.patch(`category/${title}`, { name })
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating category:", err);
      throw err;
    });
};

export const deleteCategory = (title) => {
  return axiosInstance.delete(`category/${title}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting category:", err);
      throw err;
    });
};