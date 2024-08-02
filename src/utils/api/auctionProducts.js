import axios from "axios";

const baseURL = "http://localhost:3001/";
//const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
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

/*export const addAuctionProduct = (
  title,
  barcode,
  openingPrice,
  startTime,
  endTime,
  timeFrame,
  warranty,
  category,
  description,
  additionalInfo,
  properties,
  notes,
  kitInclude,
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
    formData.append("openingPrice", openingPrice);
    formData.append("warranty", warranty);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("additional-information", additionalInfo);
    formData.append("properties", properties);
    formData.append("notes", notes);
    formData.append("kit-include", kitInclude);
    formData.append("delivery-time", deliveryTime);
    formData.append("model-name", modelName);
    formData.append("specification", specification);
    formData.append("additional-fields", additionalBlob);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("timeFrame", timeFrame);
    formData.append("fragile", fragile);
    formData.append("status", status);
    formData.append("pin", false);
    axios
      .post(`${baseURL}auction-products`, formData, {
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

export const updateAuctionProduct = (
  id,
  title,
  barcode,
  openingPrice,
  startTime,
  endTime,
  timeFrame,
  warranty,
  category,
  description,
  additionalInfo,
  properties,
  notes,
  kitInclude,
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
    formData.append("openingPrice", openingPrice);
    formData.append("warranty", warranty);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("additional-information", additionalInfo);
    formData.append("properties", properties);
    formData.append("notes", notes);
    formData.append("kit-include", kitInclude);
    formData.append("delivery-time", deliveryTime);
    formData.append("model-name", modelName);
    formData.append("specification", specification);
    formData.append("additional-fields", additionalBlob);
    for (const image of images) {
      formData.append("images", image);
    }
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("timeFrame", timeFrame);
    formData.append("fragile", fragile);
    formData.append("status", status);
    formData.append("pin", false);
    axios
      .patch(`${baseURL}auction-products/${id}`, formData, {
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
};*/

export const getAuctionProduct = (id) => {
  return axios
    .get(`${baseURL}auction-products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching auction product:", err);
      throw err;
    });
};

export const getUserAProducts = () => {
  return axiosInstance
    .get('auction-products-user')
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching user auction products:", err);
      throw err;
    });
};

export const addAuctionProduct = (productData) => {
  const formData = createFormData(productData);
  return axiosInstance
    .post("auction-products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error adding auction product:", err);
      throw err;
    });
};

export const updateAuctionProduct = (id, productData) => {
  const formData = createFormData(productData);
  return axiosInstance
    .patch(`auction-products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error updating auction product:", err);
      throw err;
    });
};

export const deleteAuctionProduct = (id) => {
  return axiosInstance
    .delete(`auction-products/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error deleting auction product:", err);
      throw err;
    });
};

export const getAuctionProducts = (page = 1, limit = 30) => {
  return axios
    .get(`${baseURL}auction-products?page=${page}&limit=${limit}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching auction products:", err);
      throw err;
    });
};

export const getAProductsByCategory = (category, page = 1, limit = 30) => {
  return axios
    .get(
      `${baseURL}auction-products-category/${category}?page=${page}&limit=${limit}`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching auction products by category:", err);
      throw err;
    });
};

export const getAProductsByLetters = (letters, page = 1, limit = 10) => {
  return axios
    .get(
      `${baseURL}auction-products-by-letters?query=${letters}&page=${page}&limit=${limit}`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching auction products by letters:", err);
      throw err;
    });
};
