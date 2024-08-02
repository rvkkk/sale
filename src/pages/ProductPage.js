import React, { useState, useEffect, lazy } from "react";
import ReactStars from "react-rating-stars-component";
import { AiFillExclamationCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  Link,
} from "@chakra-ui/react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import ProductBanner from "../components/ProductBanner";
import QuantityInput from "../components/QuantityInput";
import Button from "../components/Button";
import ImageGallery from "../components/ImageGallery";
import ProductTabs from "../components/ProductTabs";
import Tab1Component from "../components/ProductTab1/Tab1Component";
import Tab2Component from "../components/ProductTab1/Tab2Component";
import Tab3Component from "../components/ProductTab1/Tab3Component";
import Products from "../components/Products";
import { getProduct } from "../utils/api/products";
import { addCart, deleteFromCart } from "../utils/api/carts";
import {
  addToWishList,
  checkIfProductInWishList,
  removeFromWishList,
} from "../utils/wishList";
import { addToCart, removeFromCart } from "../utils/cart";
import {
  addNewWish,
  getUserWishList,
  deleteFromWishList,
} from "../utils/api/wishLists";
import { routes } from "../routes";
import Loader from "../components/Loader";
//import { useWebSocket } from "../components/WebSocketProvider";
import {
  CartBigIcon2,
  CartIcon4,
  FlagIcon,
  HeartFullIcon,
  HeartFullMobileIcon,
  HeartIcon,
  HeartMobileIcon,
  StarEmptyIcon,
  StarFullIcon,
  StarHalfIcon,
} from "../components/Icons";
import ProductAccordings from "../components/ProductAccordings";
import TopProducts from "../components/LoadingProducts";
import { useAuth } from "../components/Contexts/AuthContext";
import { useCart } from "../components/Contexts/CartContext";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [didAddedToCart, setDidAddedToCart] = useState(false);
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  // const [size, setSize] = useState("S");
  //const [model, setModel] = useState("1");
  const [inWishList, setInWishList] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isTextShort, setIsTextShort] = useState(true);
 // const [change, setChange] = useState("");
  ///const [number, setNumber] = useState(1);
  const { isAuthenticated } = useAuth();
  const { cart,
    addProductToCart,
    updateProductInCart,
    removeProductFromCart,
    deleteMyCart } = useCart();

const LazyTab2Component = lazy(() => import("../components/ProductTab1/Tab2Component"));

const tabs = [
  {
    name: "מידע נוסף",
    component: Tab1Component,
    props: { additionalInfo },
  },
  { 
    name: "המלצות", 
    component: LazyTab2Component,
    props: { productId: product._id },
  },
  {
    name: "משלוחים והחזרות",
    component: Tab3Component,
    props: { shippingCost: product["shipping-cost"], deliveryTime: product["delivery-time"] },
  },
];

  useEffect(() => {
    const textElement = document.getElementById("text-element");
    if (textElement) {
      setIsTextShort(textElement.clientHeight <= 2.5 * 20);
    }
  }, [showFullText, setIsTextShort]);

  /*const socket = useWebSocket();

  socket.addEventListener("error", (event) => {
    console.error("WebSocket Error:", event);
    // כאן תוכל להשתמש ב-metrics או לעשות דברים נוספים לטיפול בשגיאות
  });

  socket.addEventListener("close", (event) => {
    console.log("WebSocket Closed:", event);
    // כאן תוכל לטפל בסגירת החיבור
  });*/

  /*const handleAddToCart = () => {
    console.log("Connected to WebSocket");
    //socket.send("הוסף לסל");
  };

  const handleRemoveFromCart = () => {
    console.log("Connected to WebSocket");
    //socket.send("הסר מהסל");
  };
  /*socket.onopen = () => {
      socket.send("הסר מהסל");
      socket.close();
    };*/

 /* const addProductToCart = () => {
    if (token === null)
      addToCart({
        product: {
          //האם לשמור רק ID
          id: product.id,
          title: product.title,
          "english-title": product["english-title"],
          description: product.description,
          "english-description": product["english-description"],
          price: product.price,
          "price-before-discount": product["price-before-discount"],
          cateegory: product.category,
          quantity: product.quantity,
          images: product.images,
          "shipping-cost": product["shipping-cost"],
          pin: product.pin,
        },
        amount: amountToBuy,
      })
        .then((res) => {
          console.log("added:", res);
          setDidAddedToCart(true);
          setChange("נוסף מוצר לסל");
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addCart({ productId: product.id, amount: amountToBuy })
        .then((res) => {
          //handleAddToCart();
          setDidAddedToCart(true);
          console.log(res);
          setChange("נוסף מוצר לסל " + number);
          setNumber(number + 1);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeProductFromCart = () => {
    if (token === null)
      removeFromCart({ productId: product.id })
        .then((res) => {
          console.log(res);
          setDidAddedToCart(false);
          setChange("הוסר מוצר מהסל");
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromCart(product.id)
        .then((res) => {
          //handleRemoveFromCart();
          console.log(res);
          setDidAddedToCart(false);
          setChange("הוסר מוצר מהסל");
        })
        .catch((err) => {
          console.log(err);
        });
  };*/

  const addWish = () => {
    if (!isAuthenticated)
      addToWishList({
        product: {
          id: product.id,
          title: product.title,
          "english-title": product["english-title"],
          description: product.description,
          "english-description": product["english-description"],
          price: product.price,
          "price-before-discount": product["price-before-discount"],
          cateegory: product.category,
          quantity: product.quantity,
          images: product.images,
          "shipping-cost": product["shipping-cost"],
          pin: product.pin,
        },
        amount: amountToBuy,
      })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addNewWish({ productId: product.id, amount: amountToBuy })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeWish = () => {
    if (!isAuthenticated)
      removeFromWishList({
        productId: product.id,
      })
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromWishList(product.id)
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    setLoading(true);
    getProduct(window.location.href.split("/").pop().split("?")[0])
      .then((res) => {
        setProduct(res.product);
        console.log(res.product);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("מוצר לא נמצא");
        window.location.href = routes.HOME.path;
      });
  }, []);

  useEffect(() => {
    if (product.title)
    {
    const array = [
      {
        title: "מידע נוסף",
        "english-title": "additional information",
        desc: product["additional-information"],
      },
      {
        title: "מאפיינים",
        "english-title": "properties",
        desc: product.properties,
      },
      { title: "הערות", "english-title": "notes", desc: product.notes },
      {
        title: "הערכה כוללת",
        "english-title": "the kit includes",
        desc: product["kit-include"],
      },
      {
        title: "שם הדגם",
        "english-title": "model name",
        desc: product["model-name"],
      },
      {
        title: "מפרט",
        "english-title": "specification",
        desc: product.specification,
      },
    ];
    for (const field of product["additional-fields"]) array.push(field);
    setAdditionalInfo(array);
  }
  }, [product]);

  useEffect(() => {
    if (!isAuthenticated)
      if (checkIfProductInWishList({ productId: product.id }))
        setInWishList(true);
      else setInWishList(false);
    else
      getUserWishList()
        .then((res) => {
          if (res.wishList.products.length >= 1) {
            const index = res.wishList.products.findIndex(
              (p) => p.product.id === product.id
            );
            if (index !== -1) setInWishList(true);
            else setInWishList(false);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
  }, [product, isAuthenticated]);

  const breadcrumb = product.title && [
    { name: "דף הבית", href: routes.HOME.path },
    {
      name: product.mainCategory.name,
      href: routes.Categories.path.replace(
        ":category",
        product.mainCategory.title
      ),
    },
    {
      name: product.category.name,
      href: routes.Category.path
        .replace(":main-category", product.mainCategory.title)
        .replace(":category", product.category.title),
    },
    { name: product.title, href: "#" },
  ];

  return (
    <Layout breadcrumb={breadcrumb} z-index="1">
      {loading ? (
        <Loader />
      ) : (
        <>
          {product && (
            <>
              <Box
                pt="20px"
                pb="20"
                dir="rtl"
                mx="auto"
                display={{ base: "none", md: "block" }}
              >
                <Container>
                  <ProductBanner sellerDetails={product["seller-details"]}/>
                  <Flex mt="10" gap={{ md: "5", lg: "10" }} mx="auto">
                    <Flex justifyContent="end" w="50%">
                      <ImageGallery images={product.images} />
                    </Flex>

                    <Box w="50%">
                      <Box w="80%">
                        <Flex flexDir="column" gap="4">
                          {product.status !== "לא רלוונטי" && (
                            <Flex
                              alignItems="center"
                              textAlign="center"
                              justifyContent="center"
                              bg="white"
                              border="1px solid transparent"
                              borderColor="bright"
                              color="naturalDarkest"
                              w={{ md: "100px", lg: "150px" }}
                              h={{ md: "30px", lg: "39px" }}
                              borderRadius="8px"
                            >
                              <Text
                                fontWeight="medium"
                                fontSize={{ md: "14px", lg: "16px" }}
                              >
                                {product.status}
                              </Text>
                            </Flex>
                          )}
                          <Text
                            fontWeight="medium"
                            fontSize={{ md: "28px", lg: "32px" }}
                            lineHeight={{ md: "30px", lg: "35px" }}
                            color="naturalBlack"
                          >
                            {product.title}
                          </Text>
                          <Flex
                            dir="ltr"
                            gap="3"
                            alignItems="center"
                            justifyContent="end"
                          >
                            <Text
                              fontSize="16px"
                              color="naturalDark"
                              lineHeight="18px"
                              letterSpacing="-0.02em"
                              dir="rtl"
                            >
                              {product.reviews ? product.reviews.length : "0"}{" "}
                              דירוגים
                            </Text>
                            <ReactStars
                              count={5}
                              value={
                                product.reviews &&
                                product.reviews.reduce(
                                  (a, b) => a + b.score,
                                  0
                                ) / product.reviews.length
                              }
                              size={30}
                              edit={false}
                              emptyIcon={<StarEmptyIcon />}
                              halfIcon={<StarHalfIcon />}
                              filledIcon={<StarFullIcon />}
                              activeColor="#69D6CF"
                            />
                          </Flex>
                          <Text
                            fontSize="18px"
                            lineHeight={{ md: "18px", lg: "26px" }}
                            color="naturalDarkest"
                          >
                            {product.description}
                          </Text>
                          <Text
                            fontWeight="medium"
                            fontSize={{ md: "24px", lg: "28px" }}
                            color="primary"
                            lineHeight="26px"
                            letterSpacing="-0.02em"
                          >
                            {product.price} ₪
                          </Text>
                        </Flex>
                        <Spacer h="8" />
                        {/*<Box>
                          <Text
                            fontSize="14px"
                            lineHeight="20px"
                            color="naturalDarkest"
                          >
                            בחר מידה:
                          </Text>
                          <Spacer h={{ md: "1", lg: "2" }} />
                          <Flex alignItems="center" gap="2">
                            <IconButton
                              //size="md"
                              bg="white"
                              border="1px solid transparent"
                              borderColor="naturalLight"
                              color="naturalDarkest"
                              icon={
                                <Text
                                  fontSize={{ md: "14px", lg: "16px" }}
                                  lineHeight={{ md: "16px", lg: "20px" }}
                                >
                                  S
                                </Text>
                              }
                              w={{ md: "30px", lg: "40px" }}
                              h={{ md: "30px", lg: "40px" }}
                              borderRadius="10px"
                              _active={{
                                bg: "primary",
                                color: "white",
                                borderColor: "primary",
                              }}
                              isActive={size === "S" ? true : false}
                              onClick={() => setSize("S")}
                            />
                            <IconButton
                              //size="md"
                              bg="white"
                              border="1px solid transparent"
                              borderColor="naturalLight"
                              color="naturalDarkest"
                              icon={
                                <Text
                                  fontSize={{ md: "14px", lg: "16px" }}
                                  lineHeight={{ md: "16px", lg: "20px" }}
                                >
                                  M
                                </Text>
                              }
                              w={{ md: "30px", lg: "40px" }}
                              h={{ md: "30px", lg: "40px" }}
                              borderRadius="10px"
                              _active={{
                                bg: "primary",
                                color: "white",
                                borderColor: "primary",
                              }}
                              isActive={size === "M" ? true : false}
                              onClick={() => setSize("M")}
                            />
                            <IconButton
                              //size="md"
                              bg="white"
                              border="1px solid transparent"
                              borderColor="naturalLight"
                              color="naturalDarkest"
                              icon={
                                <Text
                                  fontSize={{ md: "14px", lg: "16px" }}
                                  lineHeight={{ md: "16px", lg: "20px" }}
                                >
                                  L
                                </Text>
                              }
                              w={{ md: "30px", lg: "40px" }}
                              h={{ md: "30px", lg: "40px" }}
                              borderRadius="10px"
                              _active={{
                                bg: "primary",
                                color: "white",
                                borderColor: "primary",
                              }}
                              isActive={size === "L" ? true : false}
                              onClick={() => setSize("L")}
                            />
                            <IconButton
                              //size="md"
                              bg="white"
                              border="1px solid transparent"
                              borderColor="naturalLight"
                              color="naturalDarkest"
                              icon={
                                <Text
                                  fontSize={{ md: "14px", lg: "16px" }}
                                  lineHeight={{ md: "16px", lg: "20px" }}
                                >
                                  XL
                                </Text>
                              }
                              borderRadius="10px"
                              w={{ md: "30px", lg: "40px" }}
                              h={{ md: "30px", lg: "40px" }}
                              _active={{
                                bg: "primary",
                                color: "white",
                                borderColor: "primary",
                              }}
                              isActive={size === "XL" ? true : false}
                              onClick={() => setSize("XL")}
                            />
                          </Flex>
                        </Box>
                        <Spacer h={{ md: "2", xl: "4" }} />
                        <Box>
                          <Text
                            fontSize="14px"
                            lineHeight="20px"
                            color="naturalDarkest"
                          >
                            בחר דגם:
                          </Text>
                          <Spacer h={{ md: "1", lg: "2" }} />
                          <Flex alignItems="center" gap="2">
                            <IconButton
                              w={{ md: "60px", lg: "80px" }}
                              h={{ md: "60px", lg: "80px" }}
                              borderRadius="16px"
                              opacity="40%"
                              _active={{ opacity: "100%" }}
                              isActive={model === "1" ? true : false}
                              onClick={() => setModel("1")}
                              icon={
                                <Image
                                  w={{ md: "60px", lg: "80px" }}
                                  h={{ md: "60px", lg: "80px" }}
                                  objectFit="cover"
                                  borderRadius="16px"
                                  src={
                                    process.env.PUBLIC_URL + "/assets/Image.png"
                                  }
                                />
                              }
                            />
                            <IconButton
                              w={{ md: "60px", lg: "80px" }}
                              h={{ md: "60px", lg: "80px" }}
                              borderRadius="16px"
                              opacity="40%"
                              _active={{ opacity: "100%" }}
                              isActive={model === "2" ? true : false}
                              onClick={() => setModel("2")}
                              icon={
                                <Image
                                  w={{ md: "60px", lg: "80px" }}
                                  h={{ md: "60px", lg: "80px" }}
                                  objectFit="cover"
                                  borderRadius="16px"
                                  src={
                                    process.env.PUBLIC_URL + "/assets/Image.png"
                                  }
                                />
                              }
                            />
                            <IconButton
                              w={{ md: "60px", lg: "80px" }}
                              h={{ md: "60px", lg: "80px" }}
                              borderRadius="16px"
                              opacity="40%"
                              _active={{ opacity: "100%" }}
                              isActive={model === "3" ? true : false}
                              onClick={() => setModel("3")}
                              icon={
                                <Image
                                  w={{ md: "60px", lg: "80px" }}
                                  h={{ md: "60px", lg: "80px" }}
                                  objectFit="cover"
                                  borderRadius="16px"
                                  src={
                                    process.env.PUBLIC_URL + "/assets/Image.png"
                                  }
                                />
                              }
                            />
                          </Flex>
                            </Box>*/}
                        <Spacer h={{ md: "3", xl: "6" }} />
                        <Flex alignItems="center" gap="4">
                          <Text
                            fontSize="14px"
                            lineHeight="20px"
                            color="naturalDarkest"
                          >
                            כמות:
                          </Text>

                          <QuantityInput
                            value={amountToBuy}
                            onChange={(e) => setAmountToBuy(e)}
                            limit={product.quantity}
                          />
                          <Flex alignItems="center" gap="2">
                            <Text
                              fontSize="14px"
                              lineHeight="20px"
                              color="naturalDarkest"
                            >
                              מלאי:
                            </Text>
                            <Text
                              fontSize="16px"
                              lineHeight="20px"
                              letterSpacing="-0.02em"
                            >
                              {product.quantity}
                            </Text>
                          </Flex>
                        </Flex>
                        <Spacer h={{ md: "4", xl: "6" }} />
                      </Box>
                      <Box>
                        <Flex gap={{ md: "2", lg: "4" }}>
                          <Button
                            h={{ md: "52px", lg: "60px", xl: "64px" }}
                            w={{ md: "140px", lg: "180px", xl: "219.5px" }}
                            onClick={() => {
                              addProductToCart();
                              window.location.href = routes.ShoppingCart.path;
                            }}
                          >
                            קנו עכשיו
                          </Button>
                          {didAddedToCart ? (
                            <Button.Secondary
                              color="primary"
                              borderColor="primary"
                              gap={{ md: "0", lg: "3" }}
                              px={{ md: "auto", lg: "30px" }}
                              py="20px"
                              h={{ md: "52px", lg: "60px", xl: "64px" }}
                              w={{ md: "140px", lg: "180px", xl: "219.5px" }}
                              borderRadius="12px"
                              fontWeight="bold"
                              onClick={() => removeProductFromCart(product.id)}
                            >
                              <CartIcon4 />
                              הסירו מהעגלה
                            </Button.Secondary>
                          ) : (
                            <Button.Secondary
                              color="primary"
                              borderColor="primary"
                              gap={{ md: "0", lg: "8px", xl: "3" }}
                              px={{ md: "auto", lg: "10px", xl: "30px" }}
                              py="20px"
                              h={{ md: "52px", lg: "60px", xl: "64px" }}
                              w={{ md: "140px", lg: "180px", xl: "219.5px" }}
                              borderRadius="12px"
                              fontWeight="bold"
                              onClick={() => addProductToCart(product, amountToBuy)}
                            >
                              <CartIcon4 />
                              הוסיפו לעגלה
                            </Button.Secondary>
                          )}
                          <IconButton
                            w={{ md: "52px", lg: "60px", xl: "64px" }}
                            h={{ md: "52px", lg: "60px", xl: "64px" }}
                            bg="naturalLightest"
                            borderRadius="15px"
                            //color={!inWishList ? "naturalDark" : "primary"}
                            //fontSize="30px"
                            icon={
                              inWishList ? <HeartFullIcon /> : <HeartIcon />
                            }
                            onClick={() =>
                              !inWishList ? addWish() : removeWish()
                            }
                          />
                          {/*<Checkbox  w="64px"
                            h="64px"
                            //bg="naturalLightest"
                            borderRadius="15px"
                            //color="naturalDark"
                            fontSize="30px"
                            onClick={() => addWish()}
                            icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />} />*/}
                        </Flex>
                        <Spacer h="6" />

                        <Flex alignItems="center" gap="2" fontSize="16px">
                          <Text
                            lineHeight="22px"
                            fontWeight="medium"
                            color="naturalBlack"
                          >
                            משלוח תוך {product["delivery-time"]} ימים
                          </Text>
                          <Text color="naturalLight">
                            <AiFillExclamationCircle />
                          </Text>
                        </Flex>
                        <Flex alignItems="center" gap="2" fontSize="14px">
                          <Text color="#1C274C">
                            <GrLocation />
                          </Text>
                          <Text lineHeight="22px" color="naturalBlack">
                            נשלח אל ישראל באמצעות Fast Deliver Shipping
                          </Text>
                        </Flex>

                        <Spacer h={{ md: "4", lg: "6" }} />

                        <Box
                          border="1px solid transparent"
                          borderColor="naturalLight"
                          borderRadius="2xl"
                          w={{ md: "350px", lg: "450px", xl: "535px" }}
                        >
                          <Flex
                            alignItems="center"
                            gap="2"
                            p="4"
                            justifyContent="center"
                          >
                            <Image
                              w="30px"
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/Shield Check.png"
                              }
                            />
                            <Text
                              fontSize="13px"
                              lineHeight="14.5px"
                              color="naturalDarkest"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight="medium"
                                as="span"
                              >
                                הגנת הקונה למשך 45 ימים
                              </Text>{" "}
                              החזר כספי באחריות
                            </Text>
                          </Flex>
                          <Divider />
                          <Flex
                            gap="2"
                            alignItems="center"
                            p="4"
                            justifyContent="center"
                          >
                            <Text
                              color="naturalDarkest"
                              fontSize="14px"
                              lineHeight="17.7px"
                            >
                              תשלום מאובטח ומוגן
                            </Text>
                            <Image
                              h="24px"
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/Norton Icon.png"
                              }
                            />
                            <Image
                              h="17.19px"
                              src={process.env.PUBLIC_URL + "/assets/logo1.png"}
                            />
                          </Flex>
                        </Box>

                        <Spacer h="4" />
                        <Flex
                          alignItems="center"
                          gap="1"
                          justifyContent="center"
                          w={{ md: "350px", lg: "450px", xl: "535px" }}
                        >
                          <Text
                            color="naturalDark"
                            fontSize="14px"
                            lineHeight="22px"
                          >
                            נתקלתם בבעיה עם מוצר זה?
                          </Text>
                          <Flex gap="1" w="max" alignItems="center">
                            <FlagIcon />
                            <Link
                              fontSize="14px"
                              lineHeight="22px"
                              href={routes.ContactUs.path}
                              textColor="primary"
                            >
                              דווחו לנו
                            </Link>
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                  <ProductTabs tabs={tabs} />
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="5"
                  >
                    <Products
                      title="מוצרים דומים"
                      category={product.Category && product.category.title}
                    />
                    <TopProducts />
                  </Flex>
                </Container>
              </Box>
              <Box
                pb="18px"
                dir="rtl"
                display={{ base: "block", md: "none" }}
                mx="auto"
              >
                <Container>
                  <Image
                    w={{ base: "360px", sm: "480px" }}
                    h={{ base: "302px", sm: "400px" }}
                    mx="auto"
                    src={product.images && product.images[0]}
                  />
                  <Flex
                    flexDir="column"
                    pt="18px"
                    gap="18px"
                    w={{ base: "320px", sm: "460px" }}
                    mx="auto"
                  >
                    <Flex flexDir="column" gap="10px">
                      <Flex justifyContent="space-between">
                        <Text
                          fontWeight="medium"
                          fontSize="20px"
                          lineHeight="21px"
                          color="naturalBlack"
                        >
                          {product.title}
                        </Text>
                        <Text
                          fontWeight="medium"
                          fontSize="20px"
                          color="primary"
                          lineHeight="21px"
                        >
                          {product.price} ₪
                        </Text>
                      </Flex>
                      <ProductBanner sellerDetails={product["seller-details"]}/>
                      <Box
                        onClick={() => setShowFullText(!showFullText)}
                        className="text-container"
                      >
                        <Text
                          id="text-element"
                          fontSize="14px"
                          lineHeight="20px"
                          color="naturalDarkest"
                          className={`description-text ${
                            showFullText ? "show-full-text" : ""
                          }`}
                        >
                          {product.description}
                        </Text>
                        {!isTextShort && (
                          <Text
                            fontSize="14px"
                            lineHeight="20px"
                            color="primaryLight"
                          >
                            {!showFullText ? "ראה עוד" : "הצג פחות"}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                    {/* <Flex pt="8px" flexDir="column" gap="14px">
                      <Text
                        fontSize="14px"
                        fontWeight="medium"
                        lineHeight="21px"
                        color="naturalDarkest"
                      >
                        צבע
                      </Text>
                      <Flex alignItems="center" gap="3">
                        <IconButton
                          w="50px"
                          h="50px"
                          borderRadius="12px"
                          opacity="40%"
                          _active={{
                            opacity: "100%",
                          }}
                          isActive={model === "1" ? true : false}
                          onClick={() => setModel("1")}
                          icon={
                            <Image
                              w="50px"
                              h="50px"
                              objectFit="cover"
                              borderRadius="12px"
                              border={model === "1" ? "2px solid" : "none"}
                              borderColor="primaryLight"
                              src={process.env.PUBLIC_URL + "/assets/Image.png"}
                            />
                          }
                        />
                        <IconButton
                          w="50px"
                          h="50px"
                          borderRadius="12px"
                          opacity="40%"
                          _active={{
                            opacity: "100%",
                          }}
                          isActive={model === "2" ? true : false}
                          onClick={() => setModel("2")}
                          icon={
                            <Image
                              w="50px"
                              h="50px"
                              objectFit="cover"
                              borderRadius="12px"
                              border={model === "2" ? "2px solid" : "none"}
                              borderColor="primaryLight"
                              src={process.env.PUBLIC_URL + "/assets/Image.png"}
                            />
                          }
                        />
                        <IconButton
                          w="50px"
                          h="50px"
                          borderRadius="12px"
                          opacity="40%"
                          _active={{
                            opacity: "100%",
                          }}
                          isActive={model === "3" ? true : false}
                          onClick={() => setModel("3")}
                          icon={
                            <Image
                              w="50px"
                              h="50px"
                              objectFit="cover"
                              borderRadius="12px"
                              border={model === "3" ? "2px solid" : "none"}
                              borderColor="primaryLight"
                              src={process.env.PUBLIC_URL + "/assets/Image.png"}
                            />
                          }
                        />
                      </Flex>
                    </Flex>
                    <Flex pb="8px" flexDir="column" gap="14px">
                      <Text
                        fontSize="14px"
                        fontWeight="medium"
                        lineHeight="21px"
                        color="naturalDarkest"
                      >
                        מידה
                      </Text>
                      <Flex alignItems="center" gap="3">
                        <IconButton
                          bg="inputBg"
                          color="naturalDarkest"
                          icon={
                            <Text fontSize="16px" lineHeight="20px">
                              S
                            </Text>
                          }
                          w="50px"
                          h="50px"
                          borderRadius="12px"
                          _active={{
                            bg: "primaryLight",
                            color: "white",
                          }}
                          isActive={size === "S" ? true : false}
                          onClick={() => setSize("S")}
                        />
                        <IconButton
                          bg="inputBg"
                          color="naturalDarkest"
                          icon={
                            <Text fontSize="16px" lineHeight="20px">
                              M
                            </Text>
                          }
                          w="50px"
                          h="50px"
                          borderRadius="12px"
                          _active={{
                            bg: "primaryLight",
                            color: "white",
                          }}
                          isActive={size === "M" ? true : false}
                          onClick={() => setSize("M")}
                        />
                        <IconButton
                          bg="inputBg"
                          color="naturalDarkest"
                          icon={
                            <Text fontSize="16px" lineHeight="20px">
                              L
                            </Text>
                          }
                          w="50px"
                          h="50px"
                          borderRadius="12px"
                          _active={{
                            bg: "primaryLight",
                            color: "white",
                          }}
                          isActive={size === "L" ? true : false}
                          onClick={() => setSize("L")}
                        />
                        <IconButton
                          bg="inputBg"
                          color="naturalDarkest"
                          icon={
                            <Text fontSize="16px" lineHeight="20px">
                              XL
                            </Text>
                          }
                          borderRadius="12px"
                          w="50px"
                          h="50px"
                          _active={{
                            bg: "primaryLight",
                            color: "white",
                          }}
                          isActive={size === "XL" ? true : false}
                          onClick={() => setSize("XL")}
                        />
                      </Flex>
                        </Flex>*/}
                    <Flex gap="8px" alignItems="center">
                      <Text
                        fontSize="12px"
                        fontWeight="medium"
                        lineHeight="21px"
                        color="naturalDarkest"
                      >
                        כמות
                      </Text>
                      <QuantityInput
                        value={amountToBuy}
                        onChange={(e) => setAmountToBuy(e)}
                        limit={product.quantity}
                      />
                      <Text
                        fontSize="12px"
                        fontWeight="medium"
                        lineHeight="21px"
                        color="naturalDarkest"
                      >
                        {product.quantity} במלאי
                      </Text>
                    </Flex>
                    <Flex pt="10px" gap="11px">
                      <Button
                        bg="primaryLight"
                        h="60px"
                        w="178px"
                        onClick={() => {
                          addProductToCart();
                          window.location.href = routes.ShoppingCart.path;
                        }}
                      >
                        קנו עכשיו
                      </Button>
                      <IconButton
                        w="60px"
                        h="60px"
                        bg="primaryLightest"
                        borderRadius="14px"
                        //color={!inWishList ? "naturalDark" : "primary"}
                        //fontSize="30px"
                        icon={<CartBigIcon2 />}
                        onClick={() => addProductToCart(product, amountToBuy)}
                      />
                      <IconButton
                        w="60px"
                        h="60px"
                        bg="linear"
                        borderRadius="14px"
                        //color={!inWishList ? "naturalDark" : "primary"}
                        //fontSize="30px"
                        icon={
                          inWishList ? (
                            <HeartFullMobileIcon />
                          ) : (
                            <HeartMobileIcon />
                          )
                        }
                        onClick={() => (!inWishList ? addWish() : removeWish())}
                      />
                    </Flex>
                    <Flex flexDir="column" gap="4">
                      <Flex alignItems="center" gap="2">
                        <Text
                          fontSize="16px"
                          lineHeight="22px"
                          fontWeight="medium"
                          color="naturalBlack"
                        >
                          משלוח תוך {product["delivery-time"]} ימים
                        </Text>
                        <Text color="naturalLight">
                          <AiFillExclamationCircle />
                        </Text>
                      </Flex>
                      <Flex alignItems="center" gap="2" fontSize="14px">
                        <Text color="#1C274C">
                          <GrLocation />
                        </Text>
                        <Text lineHeight="22px" color="naturalBlack">
                          נשלח אל ישראל באמצעות Fast Deliver Shipping
                        </Text>
                      </Flex>
                      <Flex flexDir="column" pb="20px" gap="6px">
                        <Flex
                          alignItems="center"
                          gap="2"
                          py="2"
                          px="3"
                          justifyContent="center"
                          borderRadius="8px"
                          bg="borderBg"
                        >
                          <Image
                            w="24px"
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/Shield Check.png"
                            }
                          />
                          <Text
                            fontSize="12px"
                            lineHeight="14.5px"
                            color="naturalDarkest"
                          >
                            <Text fontWeight="medium" as="span">
                              הגנת הקונה למשך 45 ימים
                            </Text>{" "}
                            החזר כספי באחריות
                          </Text>
                        </Flex>
                        <Flex
                          alignItems="center"
                          gap="11px"
                          py="2"
                          px="3"
                          justifyContent="center"
                          borderRadius="8px"
                          bg="borderBg"
                        >
                          <Text
                            color="naturalDarkest"
                            fontSize="12px"
                            lineHeight="17.7px"
                          >
                            תשלום מאובטח ומוגן
                          </Text>
                          <Image
                            h="24px"
                            src={
                              process.env.PUBLIC_URL + "/assets/Norton Icon.png"
                            }
                          />
                          <Image
                            h="17.19px"
                            src={process.env.PUBLIC_URL + "/assets/logo1.png"}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                    <ProductAccordings tabs={tabs} />
                    <Products
                      title="מוצרים דומים"
                      category={product.Category && product.category.title}
                    />
                    <TopProducts />
                  </Flex>
                </Container>
              </Box>
            </>
          )}
        </>
      )}
    </Layout>
  );
}
