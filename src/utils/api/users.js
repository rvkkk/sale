import axios from "axios";

const baseURL = "http://localhost:3001/";
//const baseURL = "https://sale-bid.df.r.appspot.com/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const onTokenBroken = () => {
  localStorage.removeItem("token");
  //window.location.href = "/auth/login";
};
export const login = (email, userName, password) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}login`, {
        email,
        userName,
        password,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        onTokenBroken();
        reject(err);
      });
  });
};

export const checkIfUserExists = (input) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}login-no-password`, { input })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const sendEmailAuth = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}send_code`, { email })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const checkEmailAuth = (email, code) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}valid_code`, { email, code })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updatePasswordByEmail = (email, newPassword) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}update-password/email`, { email, newPassword })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const signup = (
  //ID,
  email,
  firstName,
  lastName,
  userName,
  password,
  phoneNumber,
  country,
  city,
  street,
  buildingNumber,
  floor,
  apartmentNumber
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}create-user`, {
        ID: 82468,
        email,
        firstName,
        lastName,
        userName,
        country,
        city,
        street,
        buildingNumber,
        floor,
        apartmentNumber,
        password,
        phoneNumber,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        onTokenBroken();
        reject(err);
      });
  });
};

export const getUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}user-profile`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateUser = (
  //ID,
  email,
  firstName,
  lastName,
  userName,
  password,
  phoneNumber,
  country,
  city,
  street,
  buildingNumber,
  floor,
  apartmentNumber
) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${baseURL}update-user`,
        {
          ID: 82468,
          email,
          firstName,
          lastName,
          userName,
          password,
          phoneNumber,
          country,
          city,
          street,
          buildingNumber,
          floor,
          apartmentNumber,
        },
        headers
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        // onTokenBroken();
        reject(err);
      });
  });
};

export const updatePassword = (oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}update-password`, { oldPassword, newPassword }, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateProfileImage = (image) => {
  const formData = new FormData();
  formData.append("image", image);
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}update-profileImage`, formData, {
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

export const deleteUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
