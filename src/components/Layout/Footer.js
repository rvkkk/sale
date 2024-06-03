import {
  Box,
  Flex,
  IconButton,
  Input,
  Button,
  Image,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Container from "../Container";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { routes } from "../../routes";
import {
  IsraelIcon,
  USAIcon,
  FranceIcon,
  BrazilIcon,
  ShekelIcon,
  DolarlIcon,
  EuroIcon,
} from "../Icons";
import { EmailIcon } from "@chakra-ui/icons";
import { addToMailingList } from "../../utils/api/mailingList";
import { getTopCategories } from "../../utils/api/categories";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [country, setCountry] = useState("Israel");
  const [language, setLanguage] = useState("עברית");
  const [coin, setCoin] = useState("שקל");
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    getTopCategories()
      .then((res) => {
        setTopCategories(res.categories);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const link1 = [
    { name: topCategories[0] && topCategories[0].name, path: topCategories[0] && `${routes.Categories.path.replace(
        ":category",
        ""
      )}${topCategories[0].title}`},
    { name: topCategories[0] && topCategories[1].name, path: topCategories[0] && `${routes.Categories.path.replace(
      ":category",
      ""
    )}${topCategories[1].title}`},
    { name: topCategories[0] && topCategories[2].name, path: topCategories[0] && `${routes.Categories.path.replace(
      ":category",
      ""
    )}${topCategories[2].title}`},
    { name: topCategories[0] && topCategories[3].name, path: topCategories[0] && `${routes.Categories.path.replace(
      ":category",
      ""
    )}${topCategories[3].title}`},
  ];
  const link2 = [
    { name: "אודות", path: routes.About.path },
    { name: "צור קשר", path: routes.ContactUs.path },
    { name: "תקנון האתר", path: routes.Regulations.path },
    { name: "מעקב הזמנות", path: "" },
  ];

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
    <Box
      bg="primaryDark"
      dir="rtl"
      px={{ lg: "50px", xl: "150px", "2xl": "250px" }}
    >
      <Container>
        <Flex
          flexDir="column"
          gap="3"
          w="full"
          px="3"
          pt="20px"
          bg="primaryDark"
          justifyContent="center"
          alignItems="center"
          display={{ base: "flex", md: "none" }}
        >
          <Flex dir="rtl" pr={{ base: "4.9%", sm: "0" }}>
            <Text
              w={{ base: "80%", sm: "100%" }}
              color="white"
              fontSize="16px"
              lineHeight="21px"
            >
              קבל חדשות על מבצעים, קופונים ומתנות מפנקות, ישר לתיבת המייל שלך
            </Text>
          </Flex>
          <Flex
            w="100%"
            maxW="460px"
            px={{ base: "4.9%", sm: "0" }}
            alignItems="center"
            flexDir="column"
            gap="2"
          >
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
        <Flex
          py="10"
          px={{ base: "3", xl: "0" }}
          justifyContent={{ sm: "center", md: "space-between" }}
        >
          <Flex className="footerLinks" pr={{ base: "4.9%", sm: "0" }}>
            <Flex className="footerLinks">
              <NavLinks title="מפת האתר" links={link2} />
              <NavLinks title="קטגוריות ראשיות" links={link1} />
            </Flex>
            <Info />
          </Flex>
          <Box display={{ base: "none", md: "flex" }}>
            <Image
              w="100px"
              h="100px"
              alt="logo"
              src={process.env.PUBLIC_URL + "/assets/logocube.svg"}
            />
          </Box>
        </Flex>
        <Box
          py="4"
          px="3"
          borderTop={{ md: "0.5px solid rgba(255,255,255, 0.2)" }}
        >
          <Flex
            textColor="white"
            justifyContent="space-between"
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Flex dir="ltr" alignItems="center" gap="3">
              <Text fontSize="15px" letterSpacing="-0.015em" lineHeight="24px">
                Follow us:
              </Text>
              <Flex className="contactLinks">
                <IconButton
                  aria-label="link to our whatsapp"
                  minW="16px"
                  bg="transparent"
                  cursor="pointer"
                  //onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaWhatsapp color="white" />}
                />
                <IconButton
                  aria-label="link to our instagram"
                  minW="16px"
                  bg="transparent"
                  cursor="pointer"
                  //onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaInstagram color="white" />}
                />
                <IconButton
                  aria-label="link to our facebook"
                  minW="16px"
                  bg="transparent"
                  cursor="pointer"
                  //onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaFacebookF color="white" />}
                />
                <IconButton
                  aria-label="link to our telegram"
                  minW="16px"
                  bg="transparent"
                  cursor="pointer"
                  //onClick=""
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<FaTelegramPlane color="white" />}
                />
              </Flex>
            </Flex>
            <Flex dir="ltr" gap={{ md: "3", lg: "6", "2xl": "8" }}>
              <Image alt="webmoney icon" src={process.env.PUBLIC_URL + "/assets/webmoney.svg"} />
              <Image alt="apple pay icon" src={process.env.PUBLIC_URL + "/assets/ApplePay.svg"} />
              <Image alt="master card icon" src={process.env.PUBLIC_URL + "/assets/Mastercard.svg"} />
              <Image alt="visa icon" src={process.env.PUBLIC_URL + "/assets/visa-logo.svg"} />
              <Image alt="paypal icon" src={process.env.PUBLIC_URL + "/assets/paypal.svg"} />
            </Flex>
            <Text
              dir="ltr"
              letterSpacing="-0.015em"
              lineHeight="24px"
              fontSize="15px"
            >
              © SaleBid SoferGroup. Safed, israel 2024
            </Text>
          </Flex>

          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            display={{ md: "none" }}
          >
            <Flex justifyContent="space-between" maxW="360px" mx="auto">
              <Menu direction="rtl">
                <MenuButton
                  as={Button}
                  aria-label="website country"
                  borderRadius="28px"
                  border="1px solid"
                  borderColor="naturalLight"
                  bg="primaryDark"
                  _hover={{ bg: "primary" }}
                  _active={{ bg: "primary" }}
                  _focus={{ bg: "primary" }}
                  textColor="white"
                  w="100px"
                  minW="100px"
                  dir="rtl"
                  pl="5px"
                >
                  <Flex gap="2" alignItems="center">
                    <Text fontWeight="normal">ישראל</Text>
                    <IsraelIcon />
                  </Flex>
                </MenuButton>
                <MenuList
                  borderColor="naturalLight"
                  dir="ltr"
                  w="224px"
                  p="6px"
                  borderRadius="8px"
                >
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("Israel")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex
                      color="naturalDrakest"
                      gap="2"
                      h="44px"
                      w="full"
                      alignItems="center"
                    >
                      <IsraelIcon />
                      <Text fontSize="16px">{country}</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("USA")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex
                      color="naturalDrakest"
                      gap="2"
                      h="44px"
                      alignItems="center"
                    >
                      <USAIcon />
                      <Text fontSize="16px">USA</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("France")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex
                      color="naturalDrakest"
                      gap="2"
                      h="44px"
                      alignItems="center"
                    >
                      <FranceIcon />
                      <Text fontSize="16px">France</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCountry("Brazil")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex
                      color="naturalDrakest"
                      gap="2"
                      h="44px"
                      alignItems="center"
                    >
                      <BrazilIcon />
                      <Text fontSize="16px">Brazil</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu direction="rtl">
                <MenuButton
                  as={Button}
                  aria-label="website language"
                  borderRadius="28px"
                  border="1px solid"
                  borderColor="naturalLight"
                  bg="primaryDark"
                  _hover={{ bg: "primary" }}
                  _active={{ bg: "primary" }}
                  _focus={{ bg: "primary" }}
                  textColor="white"
                  w="100px"
                  minW="100px"
                  dir="rtl"
                >
                  <Flex alignItems="center" justifyContent="center">
                    <Text fontWeight="normal">{language}</Text>
                  </Flex>
                </MenuButton>
                <MenuList
                  borderColor="naturalLight"
                  dir="ltr"
                  w="106px"
                  p="6px"
                >
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("עברית")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">עברית</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("English")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">English</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("español")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">español</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setLanguage("Русский")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex color="naturalDrakest" h="44px" alignItems="center">
                      <Text fontSize="14px">Русский</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Menu direction="rtl">
                <MenuButton
                  as={Button}
                  aria-label="website coin"
                  borderRadius="28px"
                  border="1px solid"
                  borderColor="naturalLight"
                  bg="primaryDark"
                  _hover={{ bg: "primary" }}
                  _active={{ bg: "primary" }}
                  _focus={{ bg: "primary" }}
                  textColor="white"
                  w="100px"
                  minW="100px"
                  dir="rtl"
                >
                  <Flex alignItems="center" justifyContent="center">
                    <Text fontWeight="normal">{coin}</Text>
                  </Flex>
                </MenuButton>
                <MenuList
                  borderColor="naturalLight"
                  dir="ltr"
                  w="106px"
                  p="6px"
                >
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCoin("שקל")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex gap="2" h="44px" alignItems="center">
                      <ShekelIcon />
                      <Text fontSize="16px">שקל</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    color="naturalDarkest"
                    borderRadius="6px"
                    onClick={() => setCoin("USD")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex h="44px" gap="2" alignItems="center">
                      <DolarlIcon />
                      <Text fontSize="14px">USD</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem
                    bg="white"
                    borderRadius="6px"
                    color="naturalDarkest"
                    onClick={() => setCoin("Euro")}
                    _hover={{ bg: "othersLight", color: "primary" }}
                  >
                    <Flex h="44px" gap="2" alignItems="center">
                      <EuroIcon />
                      <Text fontSize="14px">Euro</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Flex
              px="10px"
              py="40px"
              gap={{ base: "20px", sm: "40px" }}
              justifyContent="center"
            >
              <Image
              alt="footer links"
                src={process.env.PUBLIC_URL + "/assets/footerMobile.svg"}
              ></Image>
              <Flex justifyContent="center" alignItems="center">
                <Image
                  w="65px"
                  h="65px"
                  alt="logo"
                  src={process.env.PUBLIC_URL + "/assets/logocube.svg"}
                />
              </Flex>
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              fontWeight="normal"
              color="white"
              dir="ltr"
              fontSize="12px"
              lineHeight="15px"
              letterSpacing="-0.015em"
            >
              © SaleBid SoferGroup. Safed, israel 2024
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

const NavLinks = ({ links = [], title }) => {
  return (
    <Flex flexDir="column" gap="4" dir="rtl">
      <Text
        fontSize="15px"
        letterSpacing="-0.015em"
        lineHeight="24px"
        fontWeight="medium"
        textColor="white"
      >
        {title}
      </Text>
      <Flex flexDirection="column">
        {links.map((link, key) => {
          return (
            <Link
              key={key}
              textColor="rgba(255,255,255,1)"
              fontSize="15"
              letterSpacing="-0.015em"
              lineHeight="24px"
              fontWeight="light"
              href={link.path}
            >
              {link.name}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

const Info = () => {
  return (
    <Flex
      flexDir="column"
      gap="4"
      dir="rtl"
      id="footer"
      display={{ base: "none", sm: "flex" }}
    >
      <Text fontSize="15px" fontWeight="medium" textColor="white">
        דברו איתנו
      </Text>
      <Flex
        flexDirection="column"
        textColor="rgba(255,255,255,1)" //white
        // maxW="170px"
        fontSize="15"
        fontWeight="light"
      >
        <Text>
          טלפון: <a href="tel:1700-505-500">1700-505-500</a>
        </Text>
        <Text>ירושלים 14, צפת ישראל</Text>
        <Text>
          שעות פעילות א-ה: <br /> 10:00 - 18:00
        </Text>
        <Text>
          מייל: <a href="mailto:salebid@salebid.com">salebid@salebid.com</a>
        </Text>
      </Flex>
    </Flex>
  );
};
