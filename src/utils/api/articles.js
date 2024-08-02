import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";//"http://localhost:3001/"//

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const searchArticles = (search) => {
  return axios.get(`${baseURL}articles-search?q=${search}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error searching articles:", err);
      throw err;
    });
};

export const getArticles = () => {
  return axios.get(`${baseURL}articles`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching articles:", err);
      throw err;
    });
};

export const getArticle = (id) => {
  return axios.get(`${baseURL}articles/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching article:", err);
      throw err;
    });
};

export const addArticle = (articleData) => {
  return axiosInstance.post('articles', articleData)
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding article:", err);
      throw err;
    });
};

export const updateArticle = (id, articleData) => {
  return axiosInstance.patch(`articles/${id}`, articleData)
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating article:", err);
      throw err;
    });
};

export const deleteArticle = (id) => {
  return axiosInstance.delete(`articles/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting article:", err);
      throw err;
    });
};
