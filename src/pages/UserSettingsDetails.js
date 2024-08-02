import {
  Image,
  Box,
  Card,
  Flex,
  Divider,
  Grid,
  GridItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import {
  getUser,
  updateUser,
  updatePassword,
  updateProfileImage,
} from "../utils/api/users";
import Loader from "../components/Loader";
//import { set } from "date-fns";

export default function UserSettingsDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  //const [ID, setID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState("");
  const [invalidLastName, setInvalidLastName] = useState("");
  const [invalidUserName, setInvalidUserName] = useState("");
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidCountry, setInvalidCountry] = useState("");
  const [invalidCity, setInvalidCity] = useState("");
  const [invalidStreet, setInvalidStreet] = useState("");
  const [invalidBuildingNumber, setInvalidBuildingNumber] = useState("");
  const [invalidFloor, setInvalidFloor] = useState("");
  const [invalidApartmentNumber, setInvalidApartmentNumber] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidNewPassword, setInvalidNewPassword] = useState("");
  const [invalidValidPassword, setInvalidValidPassword] = useState("");

  const handlePasswordChange = (password) => {
    // בדיקות תקינות על הסיסמה
    const isLengthValid = password.length >= 8 && password.length <= 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!isLengthValid || !hasUpperCase || !hasLowerCase || !hasNumber)
      return true;
    return false;
  };

  const handleEmailChange = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) setInvalidEmail('כתובת דוא"ל אינה תקינה');
    else setInvalidEmail("");
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    const phoneRegex = /^05\d{1}-?\d{7}$/;
    const phoneHomeRegex = /^0\d{1}-?\d{7}$/;
    if (!phoneRegex.test(phoneNumber) && !phoneHomeRegex.test(phoneNumber))
    setInvalidPhoneNumber("מספר שגוי");
    else setInvalidPhoneNumber("");
  };

  const handleUserNameChange = (userName) => {
    if (userName.length <= 4 || userName.length >= 8) setInvalidUserName("שם משתמש אינו תקין");
    else setInvalidUserName("");
  };

  const handlePicture = (picture) => {
    console.log(picture);
    updateProfileImage(picture)
      .then((res) => {
        alert("התמונה נשמרה בהצלחה!");
      })
      .catch((err) => {
        alert("אנא נסה שנית");
        setPicture("");
      });
  };

  const handlePassword = () => {
    setLoading(true);
    if (password === "") setInvalidPassword("שדה חובה");
    if (newPassword === "") setInvalidNewPassword("שדה חובה");
    if (validNewPassword === "") setInvalidValidPassword("שדה חובה");
    if (
      password !== "" &&
      newPassword !== "" &&
      validNewPassword !== "" &&
      invalidPassword === "" &&
      invalidNewPassword === "" &&
      invalidValidPassword === ""
    )
      if (newPassword === validNewPassword) {
        updatePassword(password, newPassword)
          .then((res) => {
            alert("הסיסמה נשמרה בהצלחה!");
            setLoading(false);
            //window.location.reload();
          })
          .catch((err) => {
            alert("אנא נסה שנית");
            setLoading(false);
          });
      } else {
        alert("אימות הסיסמא החדשה שגוי");
      }
    setLoading(false);
  };

  const handleDetails = () => {
    if (firstName === "") setInvalidFirstName("שדה חובה");
    if (lastName === "") setInvalidLastName("שדה חובה");
    if (userName === "") setInvalidUserName("שדה חובה");
    if (email === "") setInvalidUserName("שדה חובה");
    if (phoneNumber === "") setInvalidUserName("שדה חובה");
    if (country === "") setInvalidCountry("שדה חובה");
    if (city === "") setInvalidCity("שדה חובה");
    if (street === "") setInvalidStreet("שדה חובה");
    if (buildingNumber === "") setInvalidBuildingNumber("שדה חובה");
    if (floor === "") setInvalidFloor("שדה חובה");
    if (apartmentNumber === "") setInvalidApartmentNumber("שדה חובה");
    if (
      firstName !== "" &&
      lastName !== "" &&
      userName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      country !== "" &&
      city !== "" &&
      street !== "" &&
      buildingNumber !== "" &&
      floor !== "" &&
      apartmentNumber !== "" &&
      invalidFirstName === "" &&
      invalidLastName === "" &&
      invalidUserName === "" &&
      invalidEmail === "" &&
      invalidPhoneNumber === "" &&
      invalidCountry === "" &&
      invalidCity === "" &&
      invalidStreet === "" &&
      invalidBuildingNumber === "" &&
      invalidFloor === "" &&
      invalidBuildingNumber === ""
    ) {
      setLoading(true);
      updateUser({
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
    })
        .then((res) => {
          alert("הנתונים נשמרו בהצלחה!");
          setLoading(false);
          //window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((res) => {
        setLoading(false);
        const user = res.user;
        console.log(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUserName(user.userName);
        setPhoneNumber(user.phoneNumber);
        setEmail(user.email);
        setCountry(user.country);
        setCity(user.city);
        setStreet(user.street);
        setBuildingNumber(user.buildingNumber);
        setFloor(user.floor);
        setApartmentNumber(user.apartmentNumber);
        setPicture(user.profileImage);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout withSidebar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box py="20" ml="15%">
            <Flex alignItems="center" justifyContent="space-between">
              <Text
                fontSize="32px"
                lineHeight="20px"
                fontWeight="medium"
                color="naturalBlack"
              >
                הגדרות חשבון
              </Text>
            </Flex>
            <Flex flexDir="column" gap="4" mt="4">
              <Card
                dir="rtl"
                w="full"
                p="4"
                borderRadius="3xl"
                bg="white"
                position="relative"
                border="2px solid"
                borderColor="naturalLightest"
                shadow="none"
              >
                <Flex flexDir="column" gap="4">
                  <Text
                    fontSize="18px"
                    lineHeight="22px"
                    fontWeight="semibold"
                    color="naturalDarkest"
                  >
                    תמונת פרופיל
                  </Text>
                  <Divider h="2px" bg="bright" w="full" />
                  <Flex
                    gap="8"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Flex
                      borderRadius="21.24px"
                      p="12px"
                      border="1px solid transparent"
                      borderColor="naturalLight"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        w="94.4px"
                        h="94.4px"
                        objectFit="cover"
                        borderRadius="14.16px"
                        src={picture ? picture : process.env.PUBLIC_URL + "/assets/Image.png"}
                      />
                    </Flex>
                    <Button
                      w="147px"
                      h="52px"
                      fontSize="18px"
                      lineHeight="20px"
                      onClick={handleButtonClick}
                    >
                      החלף תמונה
                    </Button>
                    <Input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setPicture(URL.createObjectURL(file));
                          handlePicture(file);
                        }
                      }}
                    />
                  </Flex>
                </Flex>
              </Card>
            </Flex>

            <Spacer h="2" />
            <Flex flexDir="column" gap="4" mt="4">
              <Card
                dir="rtl"
                w="full"
                p="4"
                borderRadius="3xl"
                bg="white"
                position="relative"
                border="2px solid"
                borderColor="naturalLightest"
                shadow="none"
              >
                <Flex flexDir="column" gap="4">
                  <Text
                    cursor="pointer"
                    fontSize="18px"
                    lineHeight="22px"
                    fontWeight="semibold"
                    color="naturalDarkest"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    ערוך פרופיל
                  </Text>
                  {/*</Flex><Flex alignItems="center" justifyContent="space-between">
            
          </Flex>*/}
                  {showProfile ? (
                    <>
                      <Divider h="2px" bg="bright" w="full" />
                      <Box w="60%">
                        <Grid gridTemplateColumns="1fr 1fr" gap="6">
                          <GridItem colSpan={2}>
                            <Input
                              label="שם משתשמש"
                              labelFontSize="14px"
                              labelFontWeight="medium"
                              isInvalid={invalidUserName !== ""}
                              isInvalidMessage={invalidUserName}
                              tip="שם משתמש יכיל בין 4 ל 8 אותיות"
                              borderRadius="8px"
                              borderColor="bright"
                              required
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                                handleUserNameChange(e.target.value);
                              }}
                            />
                          </GridItem>
                          <Input
                            label="שם פרטי"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidFirstName !== ""}
                            isInvalidMessage={invalidFirstName}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              setInvalidFirstName("");
                            }}
                          />
                          <Input
                            label="שם משפחה"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidLastName !== ""}
                            isInvalidMessage={invalidLastName}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                              setInvalidLastName("");
                            }}
                          />
                          <Input
                            label="טלפון"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidPhoneNumber !== ""}
                            isInvalidMessage={invalidPhoneNumber}
                            borderRadius="8px"
                            borderColor="bright"
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                              handlePhoneNumberChange(e.target.value);
                            }}
                          />
                          <Input
                            label='דוא"ל'
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidEmail !== ""}
                            isInvalidMessage={invalidEmail}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            value={email}
                            tip='אנא הכנס כתובת דוא"ל תקינה'
                            onChange={(e) => {
                              setEmail(e.target.value);
                              handleEmailChange(e.target.value);
                            }}
                          />
                          {/* <Input
                  label="תעודת זהות"
                  isInvalid
                  required
                  labelFontSize="14px"
                  labelFontWeight="medium"
                  w="329px"
                  borderRadius="8px"
                  borderColor="bright"
                  isInvalidMessage="שדה חובה בשביל לפתוח מכירות באתר"
                  onChange={(e) => setID(e.target.value)}
                  value={ID}
                  />*/}
                          <Input
                            label="מדינה"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidCountry !== ""}
                            isInvalidMessage={invalidCountry}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            onChange={(e) => {
                              setCountry(e.target.value);
                              setInvalidCountry("");
                            }}
                            value={country}
                          />
                          <Input
                            label="עיר"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidCity !== ""}
                            isInvalidMessage={invalidCity}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            onChange={(e) => {
                              setCity(e.target.value);
                              setInvalidCity("");
                            }}
                            value={city}
                          />
                          <Input
                            label="רחוב"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidStreet !== ""}
                            isInvalidMessage={invalidStreet}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            onChange={(e) => {
                              setStreet(e.target.value);
                              setInvalidStreet("");
                            }}
                            value={street}
                          />
                          <Input
                            label="מספר בניין"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidBuildingNumber !== ""}
                            isInvalidMessage={invalidBuildingNumber}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            onChange={(e) => {
                              setBuildingNumber(e.target.value);
                              setInvalidBuildingNumber("");
                            }}
                            value={buildingNumber}
                          />
                          <Input
                            label="קומה"
                            type="number"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidFloor !== ""}
                            isInvalidMessage={invalidFloor}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            onChange={(e) => {
                              setFloor(e.target.value);
                              setInvalidFloor("");
                            }}
                            value={floor}
                          />
                          <Input
                            label="דירה"
                            type="number"
                            labelFontSize="14px"
                            labelFontWeight="medium"
                            isInvalid={invalidApartmentNumber !== ""}
                            isInvalidMessage={invalidApartmentNumber}
                            borderRadius="8px"
                            borderColor="bright"
                            required
                            onChange={(e) => {
                              setApartmentNumber(e.target.value);
                              setInvalidApartmentNumber("");
                            }}
                            value={apartmentNumber}
                          />
                        </Grid>
                        <Spacer h="10"></Spacer>
                        <Flex gap="4">
                          <Button
                            w="147px"
                            h="52px"
                            fontSize="18px"
                            lineHeight="20px"
                            onClick={() => handleDetails()}
                          >
                            שמור שינויים
                          </Button>
                          <Button.Secondary
                            borderColor="primary"
                            color="primary"
                            w="93px"
                            h="52px"
                            fontSize="18px"
                            lineHeight="20px"
                            onClick={() => {
                              const a = window.confirm(
                                "האם אתה בטוח שברצונך לבטל?"
                              );
                              if (a) {
                                window.location.reload();
                              }
                            }}
                          >
                            ביטול
                          </Button.Secondary>
                        </Flex>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Card>
            </Flex>

            <Spacer h="2" />
            <Flex flexDir="column" gap="4" mt="4">
              <Card
                dir="rtl"
                w="full"
                p="4"
                borderRadius="3xl"
                bg="white"
                position="relative"
                border="2px solid"
                borderColor="naturalLightest"
                shadow="none"
              >
                <Flex flexDir="column" gap="4">
                  <Text
                    cursor="pointer"
                    fontSize="18px"
                    lineHeight="22px"
                    fontWeight="semibold"
                    color="naturalDarkest"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    החלף סיסמה
                  </Text>
                  {/*</Flex><Flex alignItems="center" justifyContent="space-between">
            
          </Flex>*/}
                  {showPassword ? (
                    <>
                      <Divider h="2px" bg="bright" w="full" />
                      <Box w="60%">
                        <Input
                          label="סיסמה נוכחית"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          isInvalid={invalidPassword !== ""}
                          isInvalidMessage={invalidPassword}
                          tip="יש להזין סיסמא המורכבת מ8-16 תווים, אותיות באנגלית (אות גדולה ואות קטנה אחת לפחות) וספרות בלבד."
                          borderRadius="8px"
                          borderColor="bright"
                          color="naturlDark"
                          required
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setInvalidPassword(
                              handlePasswordChange(e.target.value)
                                ? "סיסמא מורכבת מ8-16 תווים, אותיות באנגלית וספרות בלבד"
                                : ""
                            );
                          }}
                        />
                        <Spacer h="2" />
                        <Input
                          label="סיסמה חדשה"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          isInvalid={invalidNewPassword !== ""}
                          isInvalidMessage={invalidNewPassword}
                          tip="יש להזין סיסמא המורכבת מ8-16 תווים, אותיות באנגלית (אות גדולה ואות קטנה אחת לפחות) וספרות בלבד."
                          borderRadius="8px"
                          borderColor="bright"
                          color="naturlDark"
                          required
                          type="password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setInvalidNewPassword(
                              handlePasswordChange(e.target.value)
                                ? "סיסמא מורכבת מ8-16 תווים, אותיות באנגלית וספרות בלבד"
                                : ""
                            );
                          }}
                        />
                        <Spacer h="2" />
                        <Input
                          label="אישור סיסמה חדשה"
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          isInvalid={invalidValidPassword !== ""}
                          isInvalidMessage={invalidValidPassword}
                          borderRadius="8px"
                          borderColor="bright"
                          color="naturlDark"
                          required
                          type="password"
                          value={validNewPassword}
                          onChange={(e) => {
                            setValidNewPassword(e.target.value);
                            if (e.target.value === newPassword)
                              setInvalidValidPassword("");
                            else
                              setInvalidValidPassword("הסיסמאות אינן תואמות");
                          }}
                        />
                        <Spacer h="10"></Spacer>
                        <Flex gap="4">
                          <Button
                            w="147px"
                            h="52px"
                            fontSize="18px"
                            lineHeight="20px"
                            onClick={() => handlePassword()}
                          >
                            שמור שינויים
                          </Button>
                          <Button.Secondary
                            borderColor="primary"
                            color="primary"
                            w="93px"
                            h="52px"
                            fontSize="18px"
                            lineHeight="20px"
                            onClick={() => {
                              const a = window.confirm(
                                "האם אתה בטוח שברצונך לבטל?"
                              );
                              if (a) {
                                window.location.reload();
                              }
                            }}
                          >
                            ביטול
                          </Button.Secondary>
                        </Flex>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Card>
            </Flex>
          </Box>
        </>
      )}
    </Layout>
  );
}
