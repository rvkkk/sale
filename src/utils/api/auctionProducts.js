import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";
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
  timeFrame,
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
    axios
      .post(
        `${baseURL}auction-products`,
        {
          title,
          barcode,
          openingPrice,
          startTime,
          timeFrame,
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
          fragile,
        },
        headers
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

export const updateAuctionProduct = (
  id,
  title,
  barcode,
  openingPrice,
  startTime,
  timeFrame,
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
    axios
      .patch(
        `${baseURL}auction-products/${id}`,
        {
          title,
          barcode,
          openingPrice,
          startTime,
          timeFrame,
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
          fragile,
        },
        headers
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
