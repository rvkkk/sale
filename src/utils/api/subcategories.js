import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getSubcategory = (title) => {
  return axiosInstance.get(`subcategory/${title}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching subcategory:", err);
      throw err;
    });
};

export const getSubcategoriesOfCategory = (title) => {
  return axiosInstance.get(`subcategories-category/${title}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching subcategories of category:", err);
      throw err;
    });
};

export const getSubcategoriesOfSubcategory = (title) => {
  return axiosInstance.get(`subcategories/${title}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching subcategories of subcategory:", err);
      throw err;
    });
};

export const addSubcategory = (categoryName, title, name, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("name", name);
  formData.append("image", image);

  return axiosInstance.post(`subcategory/${categoryName}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding subcategory:", err);
      throw err;
    });
};

export const updateCategory = (title, name, image) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  return axiosInstance.patch(`subcategory/${title}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating category:", err);
      throw err;
    });
};

export const deleteCategory = (title) => {
  return axiosInstance.delete(`subcategory/${title}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting category:", err);
      throw err;
    });
};