import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

const handleError = (error, message) => {
  console.error(message, error);
  throw error;
};

export const getMailingList = async () => {
  try {
    const res = await axiosInstance.get('mailing-list');
    return res.data;
  } catch (err) {
    handleError(err, "Error fetching mailing list:");
  }
};

export const addToMailingList = async (email) => {
  try {
    const res = await axiosInstance.post('mailing-list', { email });
    return res.data;
  } catch (err) {
    handleError(err, "Error adding to mailing list:");
  }
};

export const deleteFromMailingList = async (id) => {
  try {
    const res = await axiosInstance.delete(`mailing-list/${id}`);
    return res.data;
  } catch (err) {
    handleError(err, "Error deleting from mailing list:");
  }
};