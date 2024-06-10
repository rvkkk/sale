import axios from "axios";

const baseURL = "http://localhost:3001/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}products/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}products-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addProducts = (userName, file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("file", file);
    axios
      .post(`${baseURL}products-many`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addProduct = (
  title,
  barcode,
  price,
  priceBefore,
  warranty,
  category,
  description,
  additionalInfo,
  properties,
  notes,
  kitInclude,
  quantity,
  deliveryTime,
  modelName,
  specification,
  additionalFields,
  images,
  status,
  fragile
  //YouTubeLink,
) => {
  return new Promise(async(resolve, reject) => {
   const json = JSON.stringify(additionalFields);
    const additionalBlob = new Blob([json]);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("main-barcode", barcode);
    formData.append("price", price);
    formData.append("price-before-discount", priceBefore);
    formData.append("warranty", warranty);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("additional-information", additionalInfo);
    formData.append("properties", properties);
    formData.append("notes", notes);
    formData.append("kit-include", kitInclude);
    formData.append("quantity", quantity);
    formData.append("delivery-time", deliveryTime);
    formData.append("model-name", modelName);
    formData.append("specification", specification);
    formData.append("additional-fields", additionalBlob);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("fragile", fragile);
    formData.append("status", status);
    formData.append("pin", false);
    axios
      .post(`${baseURL}products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateProduct = (
  id,
  title,
  barcode,
  price,
  priceBefore,
  warranty,
  category,
  description,
  additionalInfo,
  properties,
  notes,
  kitInclude,
  quantity,
  deliveryTime,
  modelName,
  specification,
  additionalFields,
  images,
  status,
  fragile
) => {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(additionalFields);
    const additionalBlob = new Blob([json]);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("main-barcode", barcode);
    formData.append("price", price);
    formData.append("price-before-discount", priceBefore);
    formData.append("warranty", warranty);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("additional-information", additionalInfo);
    formData.append("properties", properties);
    formData.append("notes", notes);
    formData.append("kit-include", kitInclude);
    formData.append("quantity", quantity);
    formData.append("delivery-time", deliveryTime);
    formData.append("model-name", modelName);
    formData.append("specification", specification);
    formData.append("additional-fields", additionalBlob);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("fragile", fragile);
    formData.append("status", status);
    axios
      .patch(`${baseURL}products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}products/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProducts = (page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}products?page=${page}&limit=${limit}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProductsByCategory = (category, page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseURL}products-category/${category}?page=${page}&limit=${limit}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProductsByMainCategory = (category, page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseURL}products-main-category/${category}?page=${page}&limit=${limit}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProductsByLetters = (letters, page = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseURL}products-by-letters?query=${letters}&page=${page}&limit=${limit}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const searchProducts = (
  category,
  filters,
  page,
  limit,
  minPrice,
  maxPrice,
  sortBy
) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}search-products`, {
        category,
        filters,
        page,
        limit,
        minPrice,
        maxPrice,
        sortBy,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
