import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export const getEmailContactForms = (email) => {
  return axiosInstance.get(`contact-forms/?email=${email}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching email contact forms:", err);
      throw err;
    });
};

export const getContactForms = () => {
  return axiosInstance.get('contact-forms')
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching contact forms:", err);
      throw err;
    });
};

export const getContactForm = (id) => {
  return axiosInstance.get(`contact-forms/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error fetching contact form:", err);
      throw err;
    });
};

export const addContactForm = (fullName, email, subject, message) => {
  return axios.post(`${baseURL}contact-forms`, { fullName, email, subject, message })
    .then(res => res.data)
    .catch(err => {
      console.error("Error adding contact form:", err);
      throw err;
    });
};

export const updateContactForm = (id, fullName, email, subject, message) => {
  return axiosInstance.patch(`contact-forms/${id}`, { fullName, email, subject, message })
    .then(res => res.data)
    .catch(err => {
      console.error("Error updating contact form:", err);
      throw err;
    });
};

export const deleteContactForm = (id) => {
  return axiosInstance.delete(`contact-forms/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error("Error deleting contact form:", err);
      throw err;
    });
};