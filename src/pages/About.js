import { useState } from "react";
import {
  Box,
  Grid,
  Spacer,
  Flex,
  Text,
  Image,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import Button2 from "../components/Button";
import React from "react";
import Container from "../components/Container";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import { routes } from "../routes";
//import { searchArticles, getArticles } from "../utils/api/articles";
import { addToMailingList } from "../utils/api/mailingList";
import Loader from "../components/Loader";
import { EmailIcon } from "@chakra-ui/icons";
import { PlayIcon } from "../components/Icons";

export default function About() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box dir="rtl" bg="white" py="10" mx="auto">
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
                    <Text color="primary"
                      fontSize={{ base: "14px", md: "18px" }}
                      fontWeight="medium">
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
                      <Button2 w={{base: "140px", md: "120px", lg: "164px"}} h={{base: "52px", lg: "64px"}} href={routes.CreateProduct.path}>
                        בוא נתחיל
                      </Button2>
                      <Button
                        w={{ base: "180px", sm: "200px", lg: "260px" }}
                        h={{lg: "64px"}}
                        display="flex"
                        gap={{base: "2", sm: "3"}}
                        p="10px 10px"
                        minH="52px"
                        fontSize={{base: "16px", md: "18px", lg: "20px"}}
                        borderRadius="12px"
                        borderColor="primary"
                        variant="outline"
                        bg="white"
                        textColor="primary"
                        onClick={() => (window.location.href = routes.CreatePArticle.path.replace(":id", 1))}
                      >
                        <PlayIcon /> איך לפתוח מכירה
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Flex
            justifyContent="center"
            pb="10"
            alignItems="center"
            flexDir="column"
            dir="rtl"
            px={{ base: "5", md: "10" }}
          >
            <Heading dir="rtl" pb="10" color="primary">
              אודותינו
            </Heading>
            <Text
              color="naturalDarkest"
              fontSize={{ base: "14px", md: "18px" }}
            >
              חברת "SaleBid בע"מ מפעילה את אתר המכירות
              https://salebid.netlify.app אתר למכירת מוצרים במכירה רגילה או
              מכירה פומבית.
              <br />
              האתר הוקם בשנת 2024 על מנת לאפשר למשתמשים פרטיים למכור מוצרים גם
              בדרך רגילה וגם בדרך של מכירה פומבית מקוונת.
              <br />
              הרעיון מאחורי האתר הוא לספק פלטפורמה נוחה וידידותית למכירת מוצרים
              שונים, במחירים אטרקטיביים תוך שימוש במנגנון של הצעות מחיר
              תחרותיות.
              <br />
              האתר פונה לקהל מכירה רחב הכולל הן מוכרים פרטיים והן קונים מן
              השורה.
              <br />
              המוכרים יכולים להעלות מוצרים למכירה פומבית תוך קביעת מחיר מינימום,
              ולאחר מכן מתבצע תהליך הצעות מחיר תחרותי בין הקונים המעוניינים.
              <br />
              האתר מציע מערכת מאובטחת לביצוע העסקאות, מערכת ביטולים והחזרים,
              מערכת דירוג ומשוב על מוכרים וקונים, וכן שירות לקוחות מקצועי.
              <br />
              SaleBid שואפת לספק חווית משתמש איכותית ולהפוך לפלטפורמת המכירות
              המובילה מסוגה בישראל.
              <br />
              הצטרפו אלינו!
            </Text>
          </Flex>
          <Box bg="aboutColor">
            <Spacer h="100px" />
            <Flex alignItems="center" flexDir="column">
              <Flex alignItems="flex-start">
                <Heading
                  dir="rtl"
                  fontSize={{ base: "22px", md: "28px", xl: "32px" }}
                  lineHeight="18.6px"
                  letterSpacing="0.02em"
                  fontWeight="medium"
                >
                  עיין במאמרי עזרה
                </Heading>
              </Flex>
              <br />
              <Grid
                gridTemplateColumns={{
                  base: "1fr",
                  md: "1fr 1fr",
                  xl: "1fr 1fr 1fr",
                }}
                gap="4"
                dir="rtl"
              >
                <ArticleCard
                  text="חשבון"
                  imageUrl={process.env.PUBLIC_URL + "/assets/profile.svg"}
                  onClick={() =>
                    (window.location.href = "/article/6549020abdebf997ba25fb4d")
                  }
                ></ArticleCard>
                <ArticleCard
                  text="מכירות"
                  imageUrl={process.env.PUBLIC_URL + "/assets/sales.svg"}
                  onClick={() => (window.location.href = "/article/sales")}
                ></ArticleCard>
                <ArticleCard
                  text="קנייה"
                  imageUrl={process.env.PUBLIC_URL + "/assets/buying.svg"}
                  onClick={() => (window.location.href = "/article/buy")}
                ></ArticleCard>
                <ArticleCard
                  text="עמלות וחיובים"
                  imageUrl={process.env.PUBLIC_URL + "/assets/payment.svg"}
                  onClick={() => (window.location.href = "/article/")}
                ></ArticleCard>
                <ArticleCard
                  text="משלוחים"
                  imageUrl={process.env.PUBLIC_URL + "/assets/deliveries.svg"}
                  onClick={() => (window.location.href = "/article/shipping")}
                ></ArticleCard>
                <ArticleCard
                  text="החזרות"
                  imageUrl={process.env.PUBLIC_URL + "/assets/returns.svg"}
                  onClick={() => (window.location.href = "/article/returns")}
                ></ArticleCard>
              </Grid>
            </Flex>
            <Spacer h={{ base: "50px", md: "100px" }} />
          </Box>
          <Box display={{ base: "none", md: "block" }} py="10" bg="aboutColor2">
            <Flex
              flexDir="column"
              alignItems="center"
              textAlign="center"
              gap="10"
              py="10"
              bg="primary"
              w={{ md: "720px", lg: "820px" }}
              mx="auto"
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
                    type="email"
                    value={email}
                    onBlur={(e) => setEmail(e.target.value)}
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
          </Box>
        </>
      )}
    </Layout>
  );
}
