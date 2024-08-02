import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

export const getCoupons = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}coupons`)
      .then(res => { resolve(res.data) })
      .catch((err) => { reject(err) });
  });
};

export const getCoupon = (code) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}coupons/${code}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addCoupon = ({ code, discount }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}coupons`, { code, discount })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateCoupon = ({ code, discount }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}coupons/${code}`, { discount })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteCoupon = (code) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}coupons/${code}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
