import React, { useEffect, useState, Suspense } from "react";
import { Flex, Heading, Image, Text, Link, Box } from "@chakra-ui/react";
import LoginLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Checkbox from "../components/CheckBox";
import Input, { PasswordField } from "../components/Input";
import SEOWrapper from "../components/SEO";
import { routes } from "../routes";
import { googleLogin, googlelogin, login } from "../utils/api/users";
import { addProduct } from "../utils/api/products";
import Loader from "../components/Loader";
import { RightIcon2 } from "../components/Icons";
import Layout from "../components/Layout";
import Container from "../components/Container";
import { LoginFromGoogle } from "../utils/api/users";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useCart } from "../components/Contexts/CartContext";
import { useWishList } from "../components/Contexts/WishListContext";
const googleUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

export default function Login() {
  const savedInput = window.localStorage.getItem("input");
  const savedPassword = window.localStorage.getItem("password");
  const [isRemember, setIsRemember] = useState(savedInput !== null);
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const { syncCartOnLogin } = useCart();
  const {syncWishOnLogin} = useWishList();

  const handlePasswordChange = (password) => {
    setError("");
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
  const handleInputChange = (input) => {
    setError("");
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(input) && (input.length <= 4 || input.length >= 8))
      setInvalidInput('כתובת דוא"ל או שם משתמש אינו תקין');
    else setInvalidInput("");
  };

  const handleLogin = () => {
    if (window.localStorage.getItem("input") !== null && !isRemember) {
      window.localStorage.removeItem("input");
      window.localStorage.removeItem("password");
    }
    if (input === "") setInvalidInput("שדה חובה");
    if (password === "") setInvalidPassword("שדה חובה");
    if (
      input !== "" &&
      password !== "" &&
      invalidInput === "" &&
      invalidPassword === ""
    ) {
      setLoading(true);
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailRegex.test(input)) {
        login(input, "no", password)
          .then(async (res) => {
            console.log(res)
            if (res.status === "ok") {
              console.log(res)
             if (isRemember) {
                window.localStorage.setItem("input", input);
                window.localStorage.setItem("password", password);
              }
              await syncCartOnLogin();
              await syncWishOnLogin();
              const p = window.localStorage.getItem("new product");
              if (p) window.location.href = routes.CreateProduct.path;
              else window.location.href = routes.HOME.path;
            } else {
              setLoading(false);
              setError("שם משתמש או סיסמה שגויים");
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            setError("שם משתמש או סיסמה שגויים");
          });
      } else {
        login("no", input, password)
          .then(async (res) => {
            if (res.status === "ok") {
              if (isRemember) {
                window.localStorage.setItem("input", input);
                window.localStorage.setItem("password", password);
              }
              await syncCartOnLogin();
              await syncWishOnLogin();
              const p = window.localStorage.getItem("new product");
              if (p) {
                if (!p.auction) {//צריך לבדוק את זה מה עדיף
                  addProduct(
                    p.name,
                    p.barcode,
                    p.price,
                    p.priceBefore,
                    p.warranty,
                    p.subcategory,
                    p.description,
                    p.additionalInfo,
                    p.properties,
                    p.notes,
                    p.kitInclude,
                    p.quantity,
                    p.deliveryTime,
                    p.modelName,
                    p.specification,
                    p.additionalFields,
                    p.pictures,
                    p.status,
                    p.fragile
                  ).then((res) => {
                    console.log(res);
                    if (res.status === "ok") {
                      setLoading(false);
                      window.location.href = routes.UserSettingsMySales.path;
                    } else {
                      setLoading(false);
                      alert("שגיאה ביצירת מכירה חדשה");
                    }
                  });
                  // window.location.href = routes.CreateProduct.path;
                }
              } else window.location.href = routes.HOME.path;
            } else {
              setLoading(false);
              setError("שם משתמש או סיסמה שגויים");
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            setError("שם משתמש או סיסמה שגויים");
          });
      }
    }
  };

  const LoginFromGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get(googleUrl, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        console.log(data);
        if (data.email_verified) 
          googleLogin(data.email).then(async (res) => {
          if (res.status === "ok") {   
            await syncCartOnLogin();     
            await syncWishOnLogin();
            const p = window.localStorage.getItem("new product");
            if (p) window.location.href = routes.CreateProduct.path;
            else window.location.href = routes.HOME.path;
          } else {
            setLoading(false);
            setError("אינך שמור במערכת, עבור לדבר הרשמה");
          }
        })
        else setError("קרתה תקלה, אנא נסה שוב במועד מאוחר יותר");
      } catch (error) {
        console.log(error);
      }
    },
    onFailure: (response) =>
      setError("קרתה תקלה, אנא נסה שוב במועד מאוחר יותר"),
  });

  return (
    <Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
            <LoginLayout>
              <SEOWrapper title="Login" description="Login to your account" />
              <Flex flexDirection="column" gap="6" w="full" maxW="420px">
                <Heading fontWeight="semibold" fontSize={24}>
                  התחבר ל- Sael BID
                </Heading>
                <Flex flexDirection="column" gap="4">
                  <Input
                    label="שם משתמש או דוא״ל"
                    placeholder="שם משתמש או דוא״ל"
                    isInvalid={invalidInput !== ""}
                    isInvalidMessage={invalidInput}
                    tip='אנא הזינו כתובת דוא"ל תקינה או שם משתמש שיכיל בין 4 ל- 8 אותיות'
                    labelFontSize="14px"
                    labelFontWeight="medium"
                    borderRadius="8px"
                    onChange={(e) => {
                      setInput(e.target.value);
                      handleInputChange(e.target.value);
                    }}
                    value={input}
                  />
                  <PasswordField
                    desc="שכחת סיסמה?"
                    onClickDesc={() =>
                      (window.location.href = routes.ForgetPassword.path)
                    }
                    isInvalid={invalidPassword !== ""}
                    isInvalidMessage={invalidPassword}
                    tip="יש להזין סיסמה המורכבת מ8-16 תווים, אותיות באנגלית (אות גדולה ואות קטנה אחת לפחות) וספרות בלבד."
                    label="סיסמה"
                    required
                    labelFontSize="16px"
                    labelFontWeight="medium"
                    borderRadius="8px"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handlePasswordChange(e.target.value);
                    }}
                    value={password}
                  />
                  <Checkbox
                    size="big"
                    checked={isRemember}
                    default
                    onChange={() => setIsRemember(!isRemember)}
                    mt="10px"
                    text="זכור אותי"
                    color="naturlDarkest"
                  ></Checkbox>
                </Flex>
                {error && (
                  <Flex alignItems="center" justifyContent="center" w="full">
                    <Text fontSize="16px" fontWeight="light" color="otherError">
                      {error}
                    </Text>
                  </Flex>
                )}
                <Flex flexDirection="column" gap="3">
                  <Button h="64px" onClick={() => handleLogin()}>
                    התחבר
                  </Button>
                  <Button.Secondary h="48px" onClick={LoginFromGoogle}>
                    <span fontSize="14px">Sign in with Google</span>
                    <Image
                      width="25px"
                      src={process.env.PUBLIC_URL + "/assets/Google.svg"}
                    />
                  </Button.Secondary>
                </Flex>

                <Flex w="full" justifyContent="center" gap="2">
                  <Text fontSize="16px" color="naturalDarkest">
                    אין לך חשבון עדיין?{" "}
                  </Text>
                  <Link
                    fontSize="16px"
                    fontWeight="medium"
                    href={routes.SIGNUP.path}
                    textColor="primary"
                    style={{ textDecoration: "none" }}
                  >
                    פתח חשבון
                  </Link>
                </Flex>
              </Flex>
            </LoginLayout>
          </Flex>
          <Flex display={{ base: "block", md: "none" }}>
            <Layout logo>
              <Container>
                <Box
                  pb={{ base: "20px", md: "120px" }}
                  dir="rtl"
                  w="full"
                  maxW="780px"
                  m="auto"
                >
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
                        התחבר
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDir="column"
                    justifyContent="space-between"
                    h={`${window.innerHeight - 180}px`}
                  >
                    <Box w={{ base: "304px", sm: "420px" }} mx="auto">
                      <Text
                        fontSize={{ base: "14px", sm: "18px" }}
                        lineHeight="18px"
                        letterSpacing="0.005em"
                        color="naturalDarkest"
                      >
                        אנא מלא דואר אלקטרוני וסיסמה כדי להתחבר
                      </Text>
                      <Flex mt="20px" flexDirection="column" gap="5">
                        <Input
                          label="שם משתמש או דוא״ל"
                          placeholder="שם משתמש או דוא״ל"
                          isInvalid={invalidInput !== ""}
                          isInvalidMessage={invalidInput}
                          tip='אנא הזינו כתובת דוא"ל תקינה או שם משתמש שיכיל בין 4 ל- 8 אותיות'
                          labelFontSize="14px"
                          required
                          labelFontWeight="medium"
                          onChange={(e) => {
                            setInput(e.target.value);
                            handleInputChange(e.target.value);
                          }}
                          value={input}
                        />
                        <PasswordField
                          desc="שכחת סיסמה?"
                          onClickDesc={() =>
                            (window.location.href = routes.ForgetPassword.path)
                          }
                          isInvalid={invalidPassword !== ""}
                          isInvalidMessage={invalidPassword}
                          tip="יש להזין סיסמה המורכבת מ8-16 תווים, אותיות באנגלית (אות גדולה ואות קטנה אחת לפחות) וספרות בלבד."
                          label="סיסמה"
                          required
                          labelFontSize="14px"
                          labelFontWeight="medium"
                          onChange={(e) => {
                            setPassword(e.target.value);
                            handlePasswordChange(e.target.value);
                          }}
                          value={password}
                        />
                        <Checkbox
                          size="big"
                          checked={isRemember}
                          default
                          onChange={() => setIsRemember(!isRemember)}
                          mt="10px"
                          text="זכור אותי"
                          color="naturlDarkest"
                        ></Checkbox>
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
                          onClick={() => handleLogin()}
                        >
                          התחבר
                        </Button>
                        <Button.Secondary
                          h="60px"
                          color="#23263B"
                          bg="#F3F5F6"
                          border="none"
                          onClick={LoginFromGoogle}
                        >
                          <Text                         
                            fontSize="18px"
                            fontWeight="medium"
                          >
                            Sign in with Google
                          </Text>
                          <Image
                            width="30px"
                            src={process.env.PUBLIC_URL + "/assets/Google.svg"}
                          />
                        </Button.Secondary>
                        <Flex w="full" justifyContent="center" gap="2" pb="20px">
                      <Text fontSize="16px" color="naturalDarkest">
                        אין לך חשבון עדיין?
                      </Text>
                      <Link
                        fontSize="16px"
                        fontWeight="medium"
                        href={routes.SIGNUP.path}
                        textColor="primary"
                        style={{ textDecoration: "none" }}
                      >
                        פתח חשבון
                      </Link>
                    </Flex>
                      </Flex>
                    </Box>
                    
                  </Flex>
                </Box>
              </Container>
            </Layout>
          </Flex>
        </>
      )}
     </Suspense>
  );
}
