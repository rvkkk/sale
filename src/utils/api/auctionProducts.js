import axios from "axios";

const baseURL = "http://localhost:3001/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getAuctionProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserAProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addAuctionProduct = (
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
};

export const deleteAuctionProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}auction-products/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getAuctionProducts = (page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products?page=${page}&limit=${limit}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getAProductsByCategory = (category, page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseURL}auction-products-category/${category}?page=${page}&limit=${limit}`
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

export const getAProductsByLetters = (letters, page = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseURL}auction-products-by-letters?query=${letters}&page=${page}&limit=${limit}`
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
