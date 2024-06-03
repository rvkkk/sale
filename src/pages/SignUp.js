import React, { useState } from "react";
import { Flex, Heading, Image, Text, Link, Grid, Box } from "@chakra-ui/react";
import SignUpLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Checkbox from "../components/CheckBox";
import Input from "../components/Input";
import { PasswordField } from "../components/Input";
import SEOWrapper from "../components/SEO";
import { routes } from "../routes";
import { signup } from "../utils/api/users";
import { addToMailingList } from "../utils/api/mailingList";
import Loader from "../components/Loader";
//import { set } from "date-fns";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { RightIcon2 } from "../components/Icons";

export default function SignUp() {
  // const [isRemember, setIsRemember] = useState(false);
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
  const [tos, setTos] = useState(false);
  const [getEmail, setGetEmail] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handlePasswordChange = (password) => {
    // בדיקות תקינות על הסיסמה
    const isLengthValid = password.length >= 8 && password.length <= 16;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!isLengthValid || !hasUpperCase || !hasLowerCase || !hasNumber)
      setInvalidPassword(
        "סיסמה מורכבת מ8-16 תווים, אותיות באנגלית וספרות בלבד"
      );
    else setInvalidPassword("");
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
    if (userName.length < 4 || userName.length > 8)
      setInvalidUserName("שם משתמש אינו תקין");
    else setInvalidUserName("");
  };

  const handleSignup = () => {
    if (firstName === "") setInvalidFirstName("שדה חובה");
    if (lastName === "") setInvalidLastName("שדה חובה");
    if (userName === "") setInvalidUserName("שדה חובה");
    if (password === "") setInvalidPassword("שדה חובה");
    if (email === "") setInvalidEmail("שדה חובה");
    if (phoneNumber === "") setInvalidPhoneNumber("שדה חובה");
    if (country === "") setInvalidCountry("שדה חובה");
    if (city === "") setInvalidCity("שדה חובה");
    if (street === "") setInvalidStreet("שדה חובה");
    if (buildingNumber === "") setInvalidBuildingNumber("שדה חובה");
    if (floor === "") setInvalidFloor("שדה חובה");
    if (apartmentNumber === "") setInvalidApartmentNumber("שדה חובה");
    if (tos)
      if (
        firstName !== "" &&
        lastName !== "" &&
        userName !== "" &&
        password !== "" &&
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
        invalidPassword === "" &&
        invalidPhoneNumber === "" &&
        invalidCountry === "" &&
        invalidCity === "" &&
        invalidStreet === "" &&
        invalidBuildingNumber === "" &&
        invalidFloor === "" &&
        invalidBuildingNumber === "" &&
        invalidApartmentNumber === ""
      ) {
        setLoading(true);
        signup(
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
        )
          .then((res) => {
            console.log(res);
            if (res.status === "ok") {
              window.localStorage.setItem("token", res.token);
              if (getEmail)
                addToMailingList(email)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
              const p = window.localStorage.getItem("new product");
              if (p) window.location.href = routes.CreateProduct.path;
              else window.location.href = routes.HOME.path;
            } else {
              setError("ארעה שגיאה, אנא נסה שנית במועד מאוחר יותר");
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            setError('כתובת דוא"ל זו או שם משתמש זה כבר קיימים במערכת');
          });
      }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
            <SignUpLayout>
              <SEOWrapper
                title="SignUp"
                description="Sign up to your account"
              />
              <Flex
                flexDirection="column"
                mt="300"
                gap="6"
                w="60%"
                maxW="670px"
              >
                <Heading fontWeight="semibold" fontSize={24}>
                  הירשם ל- Sael BID
                </Heading>
                <Flex flexDirection="column">
                  <Grid gridTemplateColumns="1fr 1fr" gap="4">
                    <Input
                      label="שם פרטי"
                      isInvalid={invalidFirstName !== ""}
                      isInvalidMessage={invalidFirstName}
                      required
                      labelFontSize="14px"
                      labelFontWeight="medium"
                      w="329px"
                      borderRadius="8px"
                      borderColor="bright"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setInvalidFirstName("");
                      }}
                      value={firstName}
                    />
                    <Input
                      label="שם משפחה"
                      isInvalid={invalidLastName !== ""}
                      isInvalidMessage={invalidLastName}
                      required
                      w="329px"
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setInvalidLastName("");
                      }}
                      value={lastName}
                    />
                    <Input
                      label="שם משתמש"
                      isInvalid={invalidUserName !== ""}
                      isInvalidMessage={invalidUserName}
                      tip="שם משתמש יכיל בין 4 ל- 8 אותיות"
                      required
                      maxLength="8"
                      w="329px"
                      onChange={(e) => {
                        setUserName(e.target.value);
                        handleUserNameChange(e.target.value);
                      }}
                      value={userName}
                    />
                    <PasswordField
                      label="סיסמה"
                      isInvalid={invalidPassword !== ""}
                      isInvalidMessage={invalidPassword}
                      tip="יש להזין סיסמה המורכבת מ8-16 תווים, אותיות באנגלית (אות גדולה ואות קטנה אחת לפחות) וספרות בלבד."
                      required
                      w="329px"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        handlePasswordChange(e.target.value);
                      }}
                      value={password}
                    />
                    <Input
                      label="טלפון"
                      isInvalid={invalidPhoneNumber !== ""}
                      isInvalidMessage={invalidPhoneNumber}
                      required
                      w="329px"
                      type="tel"
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        handlePhoneNumberChange(e.target.value);
                      }}
                      value={phoneNumber}
                    />
                    <Input
                      type="email"
                      label='דוא"ל'
                      isInvalid={invalidEmail !== ""}
                      isInvalidMessage={invalidEmail}
                      required
                      w="329px"
                      tip='אנא הכנס כתובת דוא"ל תקינה'
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleEmailChange(e.target.value);
                      }}
                      value={email}
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
                      isInvalid={invalidCountry !== ""}
                      isInvalidMessage={invalidCountry}
                      required
                      w="329px"
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setInvalidCountry("");
                      }}
                      value={country}
                    />
                    <Input
                      label="עיר"
                      isInvalid={invalidCity !== ""}
                      isInvalidMessage={invalidCity}
                      required
                      w="329px"
                      onChange={(e) => {
                        setCity(e.target.value);
                        setInvalidCity("");
                      }}
                      value={city}
                    />
                    <Input
                      label="רחוב"
                      isInvalid={invalidStreet !== ""}
                      isInvalidMessage={invalidStreet}
                      required
                      w="329px"
                      onChange={(e) => {
                        setStreet(e.target.value);
                        setInvalidStreet("");
                      }}
                      value={street}
                    />
                    <Input
                      label="מספר בניין"
                      isInvalid={invalidBuildingNumber !== ""}
                      isInvalidMessage={invalidBuildingNumber}
                      required
                      w="329px"
                      onChange={(e) => {
                        setBuildingNumber(e.target.value);
                        setInvalidBuildingNumber("");
                      }}
                      value={buildingNumber}
                    />
                    <Input
                      label="קומה"
                      isInvalid={invalidFloor !== ""}
                      isInvalidMessage={invalidFloor}
                      required
                      w="329px"
                      type="number"
                      onChange={(e) => {
                        setFloor(e.target.value);
                        setInvalidFloor("");
                      }}
                      value={floor}
                    />
                    <Input
                      label="דירה"
                      isInvalid={invalidApartmentNumber !== ""}
                      isInvalidMessage={invalidApartmentNumber}
                      required
                      w="329px"
                      type="number"
                      onChange={(e) => {
                        setApartmentNumber(e.target.value);
                        setInvalidApartmentNumber("");
                      }}
                      value={apartmentNumber}
                    />
                  </Grid>
                  <Flex mx="3" flexDir="column" gap="15px" w="80%" mt="28px">
                    <Checkbox
                      size="big"
                      checked={tos}
                      default
                      fontSize="14px"
                      lineHeight="16px"
                      color="naturlDarkest"
                      onChange={() => setTos(!tos)}
                      text={`יצירת חשבון פירושה שאתה בסדר עם התנאים וההגבלות שלנו,
                      מדיניות הפרטיות והגדרות ברירת המחדל שלנו להודעות`}
                    ></Checkbox>
                    <Checkbox
                      size="big"
                      checked={getEmail}
                      fontSize="14px"
                      lineHeight="16px"
                      color="naturlDarkest"
                      onChange={() => setGetEmail(!getEmail)}
                      text={
                        "מעוניין לקבל התראות על מבצעים חדשים באתר ישירות למייל"
                      }
                    ></Checkbox>
                  </Flex>
                </Flex>
                {error && (
                  <Flex alignItems="center" justifyContent="center" w="full">
                    <Text fontSize="16px" fontWeight="light" color="otherError">
                      {error}
                    </Text>
                  </Flex>
                )}
                <Flex
                  flexDirection="column"
                  gap="3"
                  alignItems="center"
                  w="full"
                >
                  <Button h="64px" onClick={() => handleSignup()}>
                    צור חשבון
                  </Button>
                  <Button.Secondary
                    h="48px"
                    maxW={"420px"}
                    color="#6E6E73"
                    fontSize="16px"
                    fontWeight="normal"
                  >
                    <span>Sign in with Google</span>
                    <Image
                      width="25px"
                      src={process.env.PUBLIC_URL + "/assets/Google.svg"}
                    />
                  </Button.Secondary>
                </Flex>

                <Flex w="full" justifyContent="center" gap="2">
                  <Text fontSize="16px" color="naturalDarkest">
                    יש לך כבר חשבון?
                  </Text>
                  <Link
                    fontSize="16px"
                    fontWeight="medium"
                    href={routes.LOGIN.path}
                    textColor="primary"
                    style={{ textDecoration: "none" }}
                  >
                    התחבר
                  </Link>
                </Flex>
              </Flex>
            </SignUpLayout>
          </Flex>
          <Flex display={{ base: "block", md: "none" }}>
            <Layout logo>
              <Container>
                <Box pb="20px" dir="rtl" w="full" maxW="780px" m="auto">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    px="10%"
                    borderBottom="1px solid"
                    borderColor="naturalLight"
                    h="75px"
                    mb="20px"
                  >
                    <Flex position="absolute" right="10%">
                      <RightIcon2
                        onClick={() => {
                          window.location.href = routes.HOME.path;
                        }}
                      />
                    </Flex>
                    <Flex justifyContent="center">
                      <Text
                        fontSize={{ base: "20px", sm: "24px" }}
                        fontWeight="medium"
                        color="naturalDarkest"
                      >
                        פתח חשבון
                      </Text>
                    </Flex>
                  </Flex>
                  <Box w={{ base: "304px", sm: "420px" }} mx="auto">
                    <Text
                      fontSize={{ base: "14px", sm: "18px" }}
                      lineHeight="18px"
                      letterSpacing="0.005em"
                      color="naturalDarkest"
                    >
                      אנא מלא את כל השדות כדי להירשם ולהתחיל לפתוח מכירות באתר
                    </Text>
                    <Flex mt="20px" flexDirection="column" gap="5">
                      <Input
                        label="שם פרטי"
                        isInvalid={invalidFirstName !== ""}
                        isInvalidMessage={invalidFirstName}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          setInvalidFirstName("");
                        }}
                        value={firstName}
                      />
                      <Input
                        label="שם משפחה"
                        isInvalid={invalidLastName !== ""}
                        isInvalidMessage={invalidLastName}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setInvalidLastName("");
                        }}
                        value={lastName}
                      />
                      <Input
                        label="שם משתמש"
                        isInvalid={invalidUserName !== ""}
                        isInvalidMessage={invalidUserName}
                        tip="שם משתמש יכיל בין 4 ל- 8 אותיות"
                        required
                        maxLength="8"
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setUserName(e.target.value);
                          handleUserNameChange(e.target.value);
                        }}
                        value={userName}
                      />
                      <PasswordField
                        label="סיסמה"
                        isInvalid={invalidPassword !== ""}
                        isInvalidMessage={invalidPassword}
                        tip="יש להזין סיסמה המורכבת מ8-16 תווים, אותיות באנגלית (אות גדולה ואות קטנה אחת לפחות) וספרות בלבד."
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          handlePasswordChange(e.target.value);
                        }}
                        value={password}
                      />
                      <Input
                        label="טלפון"
                        isInvalid={invalidPhoneNumber !== ""}
                        isInvalidMessage={invalidPhoneNumber}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        type="tel"
                        borderColor="bright"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          handlePhoneNumberChange(e.target.value);
                        }}
                        value={phoneNumber}
                      />
                      <Input
                        type="email"
                        label='דוא"ל'
                        isInvalid={invalidEmail !== ""}
                        isInvalidMessage={invalidEmail}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        tip='אנא הכנס כתובת דוא"ל תקינה'
                        onChange={(e) => {
                          setEmail(e.target.value);
                          handleEmailChange(e.target.value);
                        }}
                        value={email}
                      />
                      {/* <Input
                  label="תעודת זהות"
                  isInvalid
                  required
                  labelFontSize="14px"
                  labelFontWeight="medium"
                  borderColor="bright"
                  isInvalidMessage="שדה חובה בשביל לפתוח מכירות באתר"
                  onChange={(e) => setID(e.target.value)}
                  value={ID}
                  />*/}
                      <Input
                        label="מדינה"
                        isInvalid={invalidCountry !== ""}
                        isInvalidMessage={invalidCountry}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setInvalidCountry("");
                        }}
                        value={country}
                      />
                      <Input
                        label="עיר"
                        isInvalid={invalidCity !== ""}
                        isInvalidMessage={invalidCity}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setCity(e.target.value);
                          setInvalidCity("");
                        }}
                        value={city}
                      />
                      <Input
                        label="רחוב"
                        isInvalid={invalidStreet !== ""}
                        isInvalidMessage={invalidStreet}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setStreet(e.target.value);
                          setInvalidStreet("");
                        }}
                        value={street}
                      />
                      <Input
                        label="מספר בניין"
                        isInvalid={invalidBuildingNumber !== ""}
                        isInvalidMessage={invalidBuildingNumber}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        borderColor="bright"
                        onChange={(e) => {
                          setBuildingNumber(e.target.value);
                          setInvalidBuildingNumber("");
                        }}
                        value={buildingNumber}
                      />
                      <Input
                        label="קומה"
                        isInvalid={invalidFloor !== ""}
                        isInvalidMessage={invalidFloor}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        type="number"
                        borderColor="bright"
                        onChange={(e) => {
                          setFloor(e.target.value);
                          setInvalidFloor("");
                        }}
                        value={floor}
                      />
                      <Input
                        label="דירה"
                        isInvalid={invalidApartmentNumber !== ""}
                        isInvalidMessage={invalidApartmentNumber}
                        required
                        labelFontSize="14px"
                        labelFontWeight="medium"
                        type="number"
                        borderColor="bright"
                        onChange={(e) => {
                          setApartmentNumber(e.target.value);
                          setInvalidApartmentNumber("");
                        }}
                        value={apartmentNumber}
                      />
                      <Flex flexDir="column" gap="15px" mt="28px">
                        <Checkbox
                          size="big"
                          default
                          checked={tos}
                          fontSize="14px"
                          lineHeight="16px"
                          color="naturlDarkest"
                          onChange={() => setTos(!tos)}
                          text={`יצירת חשבון פירושה שאתה בסדר עם התנאים וההגבלות שלנו,
                       מדיניות הפרטיות והגדרות ברירת המחדל שלנו להודעות`}
                        ></Checkbox>
                        <Checkbox
                          size="big"
                          checked={getEmail}
                          fontSize="14px"
                          lineHeight="16px"
                          color="naturlDarkest"
                          onChange={() => setGetEmail(!getEmail)}
                          text={
                            "מעוניין לקבל התראות על מבצעים חדשים באתר ישירות למייל"
                          }
                        ></Checkbox>
                      </Flex>
                    </Flex>
                    {error && (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        w="full"
                      >
                        <Text
                          fontSize="16px"
                          fontWeight="light"
                          color="otherError"
                        >
                          {error}
                        </Text>
                      </Flex>
                    )}
                    <Flex flexDirection="column" gap="5" mt="40px">
                      <Button
                        bg="primaryLight"
                        h="60px"
                        onClick={() => handleSignup()}
                      >
                        צור חשבון
                      </Button>
                      <Button.Secondary
                        h="60px"
                        color="#23263B"
                        bg="#F3F5F6"
                        border="none"
                      >
                        <Text fontSize="18px" fontWeight="medium">
                          Sign in with Google
                        </Text>
                        <Image
                          width="30px"
                          src={process.env.PUBLIC_URL + "/assets/Google.svg"}
                        />
                      </Button.Secondary>
                      <Flex w="full" justifyContent="center" gap="2">
                        <Text fontSize="16px" color="naturalDarkest">
                          יש לך כבר חשבון?
                        </Text>
                        <Link
                          fontSize="16px"
                          fontWeight="medium"
                          href={routes.LOGIN.path}
                          textColor="primary"
                          style={{ textDecoration: "none" }}
                        >
                          התחבר
                        </Link>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Container>
            </Layout>
          </Flex>
        </>
      )}
    </>
  );
}
