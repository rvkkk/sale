import axios from "axios";

const baseURL = "http://localhost:3001/";
//const baseURL = "https://sale-bid.df.r.appspot.com/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});
// {withCredentials: true, headers: {'Content-Type': 'application/json'}}

/*const handleError = (error, message) => {
  console.error(message, error);
  if (error.response && error.response.status === 401) {
    // אם יש שגיאת אימות, קרא ל-onTokenBroken
    onTokenBroken();
  }
  throw error;
};*/

export const login = (email, userName, password) => {
  return axiosInstance.post('/login', { email, userName, password })
    .then(res => {console.log(res); return res.data})
    .catch(err => {
      //onTokenBroken();
      throw err;
    });
};

export const checkIfUserExists = (input) => {
  return axiosInstance.patch('login-no-password', { input })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const sendEmailAuth = (email) => {
  return axiosInstance.patch('send_code', { email })
    .then(res => res)
    .catch(err => {
      throw err;
    });
};

export const checkEmailAuth = (email, code) => {
  return axiosInstance.patch('valid_code', { email, code })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const updatePasswordByEmail = (email, newPassword) => {
  return axiosInstance.patch('update-password/email', { email, newPassword })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const signup = (userData) => {
  return axiosInstance.post('create-user', userData)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      throw err;
    });
};

export const getUser = () => {
  return axiosInstance.get('user')
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const getUserProfile = () => {
  return axiosInstance.get('user-profile')
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const updateUser = (userData) => {
  return axiosInstance.patch('update-user', userData)
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const updatePassword = (oldPassword, newPassword) => {
  return axiosInstance.patch('update-password', { oldPassword, newPassword })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const updateProfileImage = (image) => {
  const formData = new FormData();
  formData.append("image", image);
  return axiosInstance.patch('update-profileImage', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const deleteUser = () => {
  return axiosInstance.delete('user')
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const googleLogin = (email) => {
  return axiosInstance.patch('google-login', { email })
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
};

export const googleSignin = (userData) => {
  return axiosInstance.post('create-user', userData)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => {
      console.log(err);
      if (err.response && err.response.data.error === "user already exists") {
        return "user already exists";
      }
      throw err;
    });
};