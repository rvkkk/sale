import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Card,
  Flex,
  Image,
  Spacer,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ReactImageMagnify } from "react-image-magnify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import { routes } from "../../routes";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Badge from "../Badge";
import Button from "../Button";

export default function Products({
  numberOfSlides = 4,
  title = "מוצרים חדשים",
  products = [],
  h = "413px",
  w = "364.25px",
  p = "317px",
}) {
  SwiperCore.use([Navigation]);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [numberToShow, setNumberToShow] = useState(numberOfSlides);

  useEffect(() => {
    const handleResize = () => {
      const newNumberOfSlides =
        window.innerWidth < 480
          ? 2
          : window.innerWidth < 768 || (window.innerWidth < 1280 && h === "413px")
          ? 3
          : window.innerWidth < 1280
          ? 4
          : numberOfSlides;
      setNumberToShow(newNumberOfSlides);
      swiperRef.current.swiper.update(); // עדכון של Swiper כדי שיקבל את השינויים
    };

    handleResize(); // קריאה ראשונית כדי להגדיר את הערך הראשוני

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [numberOfSlides, swiperRef]);

  return (
    <Box w={{base: "330px", sm: "460px", md: "740px", lg: "970px", xl: "1200px", "2xl": "1514px"}} mx="auto" py="24px">
      <Flex
        dir="rtl"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="semibold" fontSize={{ base: "18px", md: "24px" }}>
          {title}
        </Text>
          <Flex gap="2" dir="ltr" display={{base: "none", md:"flex"}}>
            <IconButton
              size="sm"
              borderRadius="full"
              bg={
                activeIndex === products.length - numberOfSlides
                  ? "transparent"
                  : "primary"
              }
              border={
                activeIndex === products.length - numberOfSlides
                  ? "1px solid transparent"
                  : "none"
              }
              borderColor={
                activeIndex === products.length - numberOfSlides
                  ? "naturalLight"
                  : "none"
              }
              textColor={
                activeIndex === products.length - numberOfSlides
                  ? "naturalLight"
                  : "white"
              }
              _hover={
                activeIndex !== products.length - numberOfSlides && {
                  bg: "primaryHover",
                }
              }
              fontSize="24px"
              width="40px"
              height="40px"
              icon={<ChevronLeftIcon />}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.navigation.nextEl.click();
                  activeIndex < products.length - numberOfSlides &&
                    setActiveIndex(activeIndex + 1);
                }
              }}
            />
            <IconButton
              size="sm"
              borderRadius="full"
              bg={activeIndex === 0 ? "transparent" : "primary"}
              border={activeIndex === 0 ? "1px solid transparent" : "none"}
              borderColor={activeIndex === 0 ? "naturalLight" : "none"}
              textColor={activeIndex === 0 ? "naturalLight" : "white"}
              _hover={activeIndex !== 0 && { bg: "primaryHover" }}
              fontSize="24px"
              width="40px"
              height="40px"
              icon={<ChevronRightIcon />}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.navigation.prevEl.click();
                  activeIndex >= 1 && setActiveIndex(activeIndex - 1);
                }
              }}
            />
          </Flex>
          <Button
            w="72px"
            h="36px"
            color="primaryLight"
            bg="primaryLightest"
            fontSize="12px"
            fontWeight="semibold"
            display={{base: "flex", md:"none"}}
          >
            הצג הכל
          </Button>
      </Flex>
      <Spacer h={{base: "18px", md: "24px"}} />
      <Flex mx="auto" justifyContent="center" alignItems="center">
      <Swiper
        dir="rtl"
        slidesPerView={numberToShow}
        ref={swiperRef}
        navigation
        className="hide-navigation-buttons"
        spaceBetween={14}
      >
        {products &&
          products.map((product) => {
            return (
              <SwiperSlide key={product._id}>
                <ProductItem
                  _id={product._id}
                  name={product.title}
                  imgUrl={product.images[0]}
                  price={(product.price * (100 - product.discount)) / 100}
                  beforePrice={product.discount !== 0 && product.price}
                  discount={product.discount}
                  offers={product.offers}
                  h={h}
                  w={w}
                  p={p}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      </Flex>
    </Box>
  );
}

const ProductItem = ({
  name = "",
  imgUrl = "",
  price = "",
  beforePrice = null,
  discount = null,
  offers = null,
  h,
  w,
  p,
  ...props
}) => {
  return (
    <Card
      dir="rtl"
      borderRadius="28px"
      overflow="hidden"
      shadow="none"
      border="2px solid"
      borderColor="naturalLightest"
      position="relative"
      h={{
        base: h === "413px" ? "230px" : "220px",
        sm: h === "413px" ? "230px" : "210px",
        md: h === "413px" ? "300px" : "240px",
        lg: h === "413px" ? "380px" : "300px",
        xl: h === "413px" ? "360px" : "300px",
        "2xl": h,
      }}
      w={{
        base: w === "364.25px" ? "160px" : "158px",
        sm: w === "364.25px" ? "160px" : "144px",
        md: w === "364.25px" ? "235px" : "170px",
        lg: w === "364.25px" ? "300px" : "230px",
        xl: w === "364.25px" ? "285px" : "230px",
        "2xl": w,
      }}
      cursor={"pointer"}
      _hover={{ shadow: "xl" }}
      onClick={() =>
        (window.location.href = props.openingPrice
          ? routes.ProductPageAuction.path.replace(":id", "") + props.data._id
          : routes.ProductPage.path.replace(":id", "") + props._id)
      }
    >
      <Box>
        <Image
          w="full"
          h={{
            base: p === "317px" ? "160px" : "155px",
            sm: p === "317px" ? "160px" : "140px",
            md: p === "317px" ? "220px" : "170px",
            lg: p === "317px" ? "300px" : "230px",
            xl: p === "317px" ? "285px" : "230px",
            "2xl": p,
          }}
          src={imgUrl}
        />
      </Box>
      <Flex flexDir="column" gap="2" p="3">
        <Text
          fontSize={{ base: "12px", md: "14px" }}
          lineHeight={{ base: "12px", md: "18px" }}
          w="80%"
          color={{base: "naturalDarkest", md: "black"}} 
        >
          {name}
        </Text>
        <Flex color={{base: "naturalDarkest", md: "black"}} justifyContent="space-between" alignItems="center">
          <Flex alignItems={{md:"center", lg: "end"}} gap="4">
            <Text
              fontWeight="medium"
              fontSize={{ base: "14px", md: "18px", lg: "22px" }}
              lineHeight="18px"
            >
              ₪{price}
            </Text>
            {beforePrice && (
              <Text
                display={{ base: "none", md: offers ? "none" : "block" }}
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                lineHeight="12px"
                fontWeight="light"
                textDecoration="line-through"
                color="priceMuted"
                pt={{md: "2px", lg: "0"}}
                pb={{md:"0", lg: "1px"}}
              >
                ₪{beforePrice}
              </Text>
            )}
          </Flex>

          {offers && <Badge>{offers} הצעות</Badge>}
        </Flex>
      </Flex>

      {discount && (
        <Box
          bg={{ base: "othersLinear", md: "threeDark" }}
          w={{ base: "40px", md: "52px" }}
          position="absolute"
          fontSize={{ base: "10px", md: "14px" }}
          lineHeight="17.4px"
          top="4"
          left="4"
          justifyContent="center"
          textAlign="center"
          textColor="white"
          borderRadius="16px"
          py={{base: "0", md: "1.5"}}
        >
          <Text>{discount}%</Text>
        </Box>
      )}
    </Card>
  );
};
