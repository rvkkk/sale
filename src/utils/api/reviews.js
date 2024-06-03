import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getReview = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}reviews/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserReviews = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}reviews-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProductReviews = (productId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}reviews-product/${productId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        console.log(err)
        reject(err);
      });
  });
};

export const addReview = (productId, title, description, score, images) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${baseURL}reviews/${productId}`,
        {
          title,
          description,
          score,
          images
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

export const updateReview = (id, title, description, score) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${baseURL}reviews/${id}`,
        {
          title,
          description,
          score,
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

export const deleteReview = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}reviews/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
