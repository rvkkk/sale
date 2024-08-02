import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import Input from "../components/Input";
import Button from "../components/Button";
import { sendEmailAuth } from "../utils/api/users";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";
import { RightIcon2 } from "../components/Icons";

export default function ForgetPassword() {
  const [input, setInput] = useState("");
  const [invalidInput, setInvalidInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (input) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(input) && (input.length < 4 || input.length > 8))
      setInvalidInput('כתובת דוא"ל או שם משתמש אינו תקין');
    else setInvalidInput("");
  };
  const sendEmail = () => {
    if (input === "") setInvalidInput("שדה חובה");
    if (input !== "" && invalidInput === "")
      return sendEmailAuth(input).then((res) => {
        console.log(res.status);
        if (res.status === 404) setInvalidInput("משתמש לא קיים במערכת");
        else if (res.status === 201) navigate(routes.EmailAuth.path, { state: input });
        else setInvalidInput("קרתה תקלה, נסה שוב במועד מאוחר יותר");
      });
  };

  return (
    <>
      <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
        <Layout noFooter>
          <Box w="420px" mx="auto" mt="200px">
            <Flex
              flexDir="column"
              gap="5"
              justifyContent="center"
              dir="rtl"
              bg="white"
              py="5%"
            >
              <Heading color="primary">אפסו את הסיסמה</Heading>
              <Text color="primaryDark" fontSize="18px" fontWeight="medium">
                הזינו את כתובת הדוא"ל או את שם המשתמש שלכם כדי לחזור לחשבונכם
              </Text>
              <Input
                label='דוא"ל או שם משתמש'
                isInvalid={invalidInput !== ""}
                isInvalidMessage={invalidInput}
                tip='אנא הזינו כתובת דוא"ל תקינה או שם משתמש שיכיל בין 4 ל- 8 אותיות'
                required
                labelFontSize="14px"
                labelFontWeight="medium"
                borderRadius="8px"
                borderColor="bright"
                onChange={(e) => {
                  setInput(e.target.value);
                  handleInputChange(e.target.value);
                }}
                value={input}
              />
              <Spacer h="5"></Spacer>
              <Button
                isDisabled={input === "" || invalidInput !== ""}
                onClick={sendEmail}
              >
                המשך
              </Button>
            </Flex>
          </Box>
        </Layout>
      </Flex>
      <Flex display={{ base: "block", md: "none" }}>
        <Layout logo>
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
                  window.location.href = routes.LOGIN.path;
                }}
              />
            </Flex>
            <Flex justifyContent="center">
              <Text
                fontSize={{ base: "20px", sm: "24px" }}
                fontWeight="medium"
                color="naturalDarkest"
              >
                שכחת סיסמה
              </Text>
            </Flex>
          </Flex>
          <Box w={{ base: "304px", sm: "420px" }} mx="auto" mt="100px">
            <Flex flexDir="column" gap="5" dir="rtl" bg="white">
              <Heading color="primary">אפסו את הסיסמה</Heading>
              <Text color="primaryDark" fontSize="18px" fontWeight="medium">
                הזינו את כתובת הדוא"ל או את שם המשתמש שלכם כדי לחזור לחשבונכם
              </Text>
              <Input
                h="60px"
                label='דוא"ל או שם משתמש'
                isInvalid={invalidInput !== ""}
                isInvalidMessage={invalidInput}
                tip='אנא הזינו כתובת דוא"ל תקינה או שם משתמש שיכיל בין 4 ל- 8 אותיות'
                required
                labelFontSize="14px"
                labelFontWeight="medium"
                onChange={(e) => {
                  setInput(e.target.value);
                  handleInputChange(e.target.value);
                }}
                value={input}
              />
              <Spacer h="5" />
              <Button
                h="60px"
                bg="primaryLight"
                isDisabled={input === "" || invalidInput !== ""}
                onClick={sendEmail}
              >
                המשך
              </Button>
            </Flex>
          </Box>
        </Layout>
      </Flex>
    </>
  );
}
