import React from "react";
import Layout from "../components/Layout";
import Category from "../components/Category";
import Products from "../components/Products";
import TopProducts from "../components/LoadingProducts";
import Container from "../components/Container";
import { Box, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import Button from "../components/Button";
import InfoBox from "../components/InfoBox";
import { EmailIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { routes } from "../routes";
import { addToMailingList } from "../utils/api/mailingList";
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import { getMainCategories } from "../utils/api/categories";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const createNewMailingList = () => {
    if (email !== "") {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailRegex.test(email)) {
        setError("");
        addToMailingList(email)
          .then((res) => setEmail(""))
          .catch((err) => console.log(err));
      } else setError("אנא הכנס כתובת מייל תקינה");
    } else setError("אנא הכנס כתובת מייל תקינה");
  };

  useEffect(() => {
    getMainCategories()
      .then((res) => {
        setCategories(res.categories);
        console.log(res)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout home>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDir="column"
          >
            <Category categories={categories} />
            <Banner />
            <Products />
            <TopProducts />
          </Flex>

          {/* <Container>
            <Box
              display={{ base: "none", md: "block" }}
              dir="rtl"
              bg="naturalDark"
              mx="10%"
              py="8"
              px="6"
              my="10"
              mb="30"
              borderRadius="3xl"
              h="440px"
            >
              <Flex h="full" justifyContent="space-between" flexDir="column">
                <Box>
                  <Text fontSize="36px" my="2">
                    מבצעים חמים במחלקת הסלולר
                  </Text>
                  <Button w="145px" h="5">
                    לרכישה
                  </Button>
                </Box>
                <Image alt="logo" w="78px" src={process.env.PUBLIC_URL +"/assets/logocube2.svg"} />
              </Flex>
            </Box>
      </Container>*/}
          <Box dir="rtl" bg="aboutColor" py="20" mx="auto">
            <Container>
              <Flex
                w="full"
                alignItems="center"
                gap="10"
                justifyContent="center"
                flexDir={{ base: "column", md: "row" }}
              >
                <Flex flex="1" justifyContent="end">
                  <Image
                    alt="an image of a man"
                    src={process.env.PUBLIC_URL + "/assets/man.svg"}
                  />
                </Flex>
                <Box flex="1">
                  <Flex
                    flexDir="column"
                    gap="4"
                    w={{
                      base: "320px",
                      sm: "460px",
                      md: "360px",
                      lg: "460px",
                      xl: "504px",
                    }}
                  >
                    <Text
                      color="primary"
                      fontSize={{ base: "14px", md: "18px" }}
                      fontWeight="medium"
                    >
                      הבידול שלנו
                    </Text>
                    <Text
                      color="primaryDark"
                      fontSize={{
                        base: "20px",
                        md: "26px",
                        lg: "30px",
                        xl: "36px",
                      }}
                      fontWeight="bold"
                    >
                      שוק עולמי מקוון המאפשר מסחר מקומי ובינלאומי
                    </Text>
                    <Text
                      color="naturalDarkest"
                      fontSize={{ base: "14px", md: "18px", lg: "20px", xl: "22px" }}
                    >
                      שוק המסחר לעסקים קטנים עד גדולים המציע מיליוני פריטים
                      ומכירות פומביות שוק המסחר לעסקים קטנים עד גדולים המציע
                      מיליוני פריטים ומכירות פומביות
                    </Text>
                    <Flex alignItems="center" gap="5">
                      <Button
                        w={{ base: "140px", lg: "164px" }}
                        h={{ base: "52px", lg: "64px" }}
                        href={routes.CreateProduct.path}
                      >
                        בוא נתחיל
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box
            bg="aboutColor2"
            px="30px"
            py={{ base: "20px", sm: "30px", md: "50px", xl: "100px" }}
            pb={{ base: "20px", sm: "30px", md: "185px", xl: "235px" }}
          >
            <Container>
              <Flex
                flexWrap="wrap"
                w="full"
                justifyContent="center"
                gap={{ base: "30px", sm: "35px", xl: "50px", "2xl": "80px" }}
              >
                <InfoBox
                  image="returns"
                  title="החזרות עד 30 יום"
                  desc="החזרות על מוצרים פגומים"
                  link={() => (window.location.href = routes.Article.path)}
                />

                <InfoBox
                  image="payment"
                  title="100% תשלום מאובטח"
                  desc="האתר שלנו מאובטח עם אמצעי הגנה הטובים"
                  link={() => (window.location.href = routes.Article.path)}
                />
                <InfoBox
                  image="deliveries"
                  title="משלוח חינם ברחבי העולם"
                  desc="בכל הזמנה מעל 100$"
                  link={() => (window.location.href = routes.Article.path)}
                />
              </Flex>
            </Container>
          </Box>
          <Flex w="full" justifyContent="center">
            <Flex
              display={{ base: "none", md: "flex" }}
              flexDir="column"
              alignItems="center"
              textAlign="center"
              gap="10"
              py="10"
              bg="primary"
              w={{ md: "720px", lg: "820px" }}
              transform="translateY(-50%)"
              //mx="auto"
              borderRadius="3xl"
            >
              <Flex flexDir="column">
                <Heading fontSize="48px" color="white">
                  !להישאר מעודכן
                </Heading>
                <Text color="white" fontSize="24px">
                  קבל חדשות על מבצעים, קופונים ומתנות מפנקות, ישר לתיבת המייל
                  שלך
                </Text>
              </Flex>
              <Flex w="70%" alignItems="center" flexDir="column" gap="2">
                <Flex
                  dir="rtl"
                  w="100%"
                  alignItems="center"
                  bg="white"
                  p="2"
                  borderRadius="2xl"
                >
                  <Input
                    color="naturalDarkest"
                    border="none"
                    _active={{ border: "none" }}
                    _focus={{ border: "none", ring: "none" }}
                    placeholder="כתובת המייל שלכם"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Box
                    cursor="pointer"
                    bg="primary"
                    h="full"
                    p="1"
                    px="3"
                    borderRadius="xl"
                    color="white"
                    fontSize="20px"
                    onClick={() => createNewMailingList()}
                  >
                    <EmailIcon />
                  </Box>
                </Flex>
                <Text color="white" fontSize="14px" fontWeight="light">
                  {error}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* <Flex
            flexDir="column"
            gap="3"
            w="full"
            px="10px"
            pt="20px"
            pb="10px"
            bg="primaryDark"
            justifyContent="center"
            alignItems="center"
            display={{ base: "flex", md: "none" }}
          >
            <Flex dir="rtl" w="90%">
              <Text w="70%" color="white" fontSize="16px" lineHeight="21px">
                קבל חדשות על מבצעים, קופונים ומתנות מפנקות, ישר לתיבת המייל שלך
              </Text>
            </Flex>
            <Flex w="90%" alignItems="center" flexDir="column" gap="2">
              <Flex
                dir="rtl"
                w="100%"
                alignItems="center"
                bg="white"
                p="2"
                borderRadius="2xl"
              >
                <Input
                  color="naturalDarkest"
                  border="none"
                  _active={{ border: "none" }}
                  _focus={{ border: "none", ring: "none" }}
                  placeholder="כתובת המייל שלכם"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Box
                  cursor="pointer"
                  bg="primary"
                  h="full"
                  p="1"
                  px="3"
                  borderRadius="xl"
                  color="white"
                  fontSize="20px"
                  onClick={() => createNewMailingList()}
                >
                  <EmailIcon />
                </Box>
              </Flex>
              <Text color="white" fontSize="14px" fontWeight="light">
                {error}
              </Text>
            </Flex>
      </Flex>*/}
        </>
      )}
    </Layout>
  );
}
