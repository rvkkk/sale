import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Flex,
  Input,
  Spacer,
  Text,
  Heading,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import Button from "../components/Button";
import {
  sendEmailAuth,
  checkEmailAuth,
  updatePasswordByEmail,
} from "../utils/api/users";
import { routes } from "../routes";
import { useLocation } from "react-router-dom";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { PasswordField } from "../components/Input";
import { RightIcon2 } from "../components/Icons";

export default function EmailAuth() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [showButton, setShowButton] = useState(false);
  const [showError, setShowError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState("");
  const [invalidNewPassword, setInvalidNewPassword] = useState("");
  const [invalidValidPassword, setInvalidValidPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const [className, setClassName] = useState("verify-code-input");
  const { state } = useLocation();
  const email = state;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCodeChange = (index, value) => {
    setClassName("verify-code-input");
    const newCode = [...code];
    newCode[index] = value[value.length - 1] ? value[value.length - 1] : "";
    setCode(newCode);

    // Auto-focus on the next input
    if (index < code.length - 1 && value !== "") {
      const nextInput = document.getElementById(
        `verify-code-input-${index + 1}`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const sendCodeAgain = () => {
    handleResetTimer();
    setCode(["", "", "", "", "", ""]);
    sendEmailAuth(email)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const checkIfValid = () => {
    console.log(code.join(""));
    checkEmailAuth(email, code.join(""))
      .then((res) => {
        console.log(res);
        if (res.status === "ok") setShowPassword(true);
        else {
          setShowError(true);
          setClassName("verify-code-input-error");
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
        setClassName("verify-code-input-error");
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
      if (seconds <= 1) {
        clearInterval(intervalId);
        setShowButton(true);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  const handleResetTimer = () => {
    setSeconds(60);
    setShowButton(false);
  };

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

  const updatePassword = () => {
    setChangePassword(true);
    updatePasswordByEmail(email, newPassword)
      .then((res) => {
        if (res.status === "ok") setIsChanged(true);
        else setIsChanged(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!showPassword) {
      //setLoading(true);
      onOpen();
      setTimeout(() => {
        onClose();
      }, 3000);
      /*sendEmailAuth(email)
        .then((res) => {
          if (res.status === "ok") setLoading(false);
        })
        .catch((err) => console.log(err));
    }*/
}}, []);

  return (
    <>
      <Flex flexDir="column">
        <Layout noFooter logo>
          <Flex
            display={{ base: "flex", md: "none" }}
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
                  window.location.href = routes.ForgetPassword.path;
                }}
              />
            </Flex>
            <Flex justifyContent="center">
              <Text
                fontSize={{ base: "20px", sm: "24px" }}
                fontWeight="medium"
                color="naturalDarkest"
              >
                אימות סיסמה
              </Text>
            </Flex>
          </Flex>
          <Box
            w={{ base: "304px", sm: "420px" }}
            mx="auto"
            mt={{ base: "100px", md: "200px" }}
          >
            <Flex
              flexDir="column"
              gap="5"
              justifyContent="center"
              dir="rtl"
              bg="white"
              py={{ md: "5%" }}
            >
              {!showPassword ? (
                <>
                  <Heading color="primary">קוד אימות לדוא"ל</Heading>
                  <Text color="primaryDark" fontSize="18px" fontWeight="medium">
                    הזינו את הקוד בן 6 הספרות ששלחנו אל {email}
                  </Text>
                  <FormControl>
                    <Box display="flex" className="code-box">
                      <Input
                        type="number"
                        pattern="\d*"
                        ml="8px"
                        className={className}
                        autocomplete="false"
                        value={code[0]}
                        fdprocessedid="anf2gm"
                        onChange={(e) => handleCodeChange(0, e.target.value)}
                      />
                      <Input
                        type="number"
                        pattern="\d*"
                        ml="8px"
                        className={className}
                        id="verify-code-input-1"
                        autocomplete="false"
                        value={code[1]}
                        fdprocessedid="inm9eu"
                        onChange={(e) => handleCodeChange(1, e.target.value)}
                      />
                      <Input
                        type="number"
                        pattern="\d*"
                        ml="8px"
                        className={className}
                        id="verify-code-input-2"
                        autocomplete="false"
                        value={code[2]}
                        fdprocessedid="rad99p"
                        onChange={(e) => handleCodeChange(2, e.target.value)}
                      />
                      <Input
                        type="number"
                        pattern="\d*"
                        ml="8px"
                        className={className}
                        id="verify-code-input-3"
                        autocomplete="false"
                        value={code[3]}
                        fdprocessedid="5zxo7"
                        onChange={(e) => handleCodeChange(3, e.target.value)}
                      />
                      <Input
                        type="number"
                        pattern="\d*"
                        ml="8px"
                        className={className}
                        id="verify-code-input-4"
                        autocomplete="false"
                        value={code[4]}
                        fdprocessedid="ha5rdf"
                        onChange={(e) => handleCodeChange(4, e.target.value)}
                      />
                      <Input
                        type="number"
                        pattern="\d*"
                        className={className}
                        id="verify-code-input-5"
                        autocomplete="false"
                        value={code[5]}
                        fdprocessedid="nothrl"
                        onChange={(e) => handleCodeChange(5, e.target.value)}
                      />
                    </Box>
                    {showError && (
                      <FormErrorMessage
                        display="flex"
                        alignItems="center"
                        gap="1"
                      >
                        <WarningIcon /> קוד שגוי! אנא נסו שנית
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  {!showButton ? (
                    <Text color="naturalDark">
                      שליחה מחדש בעוד {seconds} שניות
                    </Text>
                  ) : (
                    <Button.TextButton
                      mt="2"
                      color="primary"
                      onClick={() => sendCodeAgain()}
                    >
                      שליחת קוד מחדש
                    </Button.TextButton>
                  )}
                  <Spacer h="5"></Spacer>
                  <Button
                    bg={{ base: "primaryLight", md: "primary" }}
                    h={{ base: "60px", md: "52px" }}
                    isDisabled={!code.every((value) => value !== "")}
                    onClick={checkIfValid}
                  >
                    אימות
                  </Button>
                </>
              ) : !changePassword ? (
                <>
                  <Heading color="primary">שנה סיסמה</Heading>
                  <Text color="primaryDark" fontSize="18px" fontWeight="medium">
                    יש להזין סיסמה המורכבת מ8-16 תווים, אותיות באנגלית (אות
                    גדולה ואות קטנה אחת לפחות) וספרות בלבד
                  </Text>
                  <PasswordField
                    isInvalid={invalidNewPassword !== ""}
                    isInvalidMessage={invalidNewPassword}
                    borderRadius="8px"
                    borderColor="bright"
                    color="naturlDark"
                    placeholder="סיסמה חדשה"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setInvalidNewPassword(
                        handlePasswordChange(e.target.value)
                          ? "סיסמה מורכבת מ8-16 תווים, אותיות באנגלית וספרות בלבד"
                          : ""
                      );
                    }}
                  />
                  <PasswordField
                    isInvalid={invalidValidPassword !== ""}
                    isInvalidMessage={invalidValidPassword}
                    borderRadius="8px"
                    borderColor="bright"
                    color="naturlDark"
                    placeholder="אשר סיסמה"
                    value={validNewPassword}
                    onChange={(e) => {
                      setValidNewPassword(e.target.value);
                      if (e.target.value === newPassword)
                        setInvalidValidPassword("");
                      else setInvalidValidPassword("הסיסמאות אינן תואמות");
                    }}
                  />
                  <Spacer h="5"></Spacer>
                  <Button
                    bg={{ base: "primaryLight", md: "primary" }}
                    h={{ base: "60px", md: "52px" }}
                    isDisabled={
                      newPassword === "" ||
                      validNewPassword === "" ||
                      invalidNewPassword !== "" ||
                      invalidValidPassword !== ""
                    }
                    onClick={updatePassword}
                  >
                    עדכן סיסמה
                  </Button>
                </>
              ) : (
                <>
                  {isChanged ? (
                    <>
                      <Heading color="primary">הסיסמה שונתה בהצלחה</Heading>
                      <Text
                        color="primaryDark"
                        fontSize="18px"
                        fontWeight="medium"
                      >
                        סיסמתך עודכנה במערכת. כעת תוכל להכנס לחשבונך עם סיסמה זו
                      </Text>
                      <Spacer h="5px" />
                      <Spacer h="5px" />
                      <Spacer h="5px" />
                      <Button
                        bg={{ base: "primaryLight", md: "primary" }}
                        h={{ base: "60px", md: "52px" }}
                        onClick={() =>
                          (window.location.href = routes.LOGIN.path)
                        }
                      >
                        המשך
                      </Button>
                    </>
                  ) : (
                    <>
                      <Heading color="primary">קרתה שגיאה</Heading>
                      <Text
                        color="primaryDark"
                        fontSize="18px"
                        fontWeight="medium"
                      >
                        קרתה שגיאה במערכת. אנא נסה שנית במועד מאוחר יותר
                      </Text>
                      <Spacer h="5px" />
                      <Spacer h="5px" />
                      <Spacer h="5px" />
                      <Button
                        bg={{ base: "primaryLight", md: "primary" }}
                        h={{ base: "60px", md: "52px" }}
                        onClick={() =>
                          (window.location.href = routes.HOME.path)
                        }
                      >
                        המשך
                      </Button>
                    </>
                  )}
                </>
              )}
            </Flex>
          </Box>
        </Layout>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap={true}>
        <ModalContent w="200px" mt="380px">
          <ModalBody>
            <Flex dir="rtl" alignItems="center" justifyContent="center" gap="2">
              <Text>הקוד נשלח</Text>
              <CheckCircleIcon color="secendaryBase" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
