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
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { routes } from "../../routes";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Badge from "../Badge";
import Button from "../Button";
import { getProducts, getProductsByCategory } from "../../utils/api/products";

export default function Products({
  numberOfSlides = 4,
  title = "מוצרים חדשים",
  category = "",
  h = "360px",
  w = "300px",
  p = "280px",
}) {
  SwiperCore.use([Navigation]);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [numberToShow, setNumberToShow] = useState(numberOfSlides);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category === "")
      getProducts(1, 25)
        .then((res) => {
          setProducts(res.products);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      getProductsByCategory(category, 1, 25)
        .then((res) => {
          setProducts(res.products);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newNumberOfSlides =
        window.innerWidth < 480
          ? 2
          : window.innerWidth < 768 ||
            (window.innerWidth < 1280 && h === "360px")
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
    <Box
      w={{
        base: "330px",
        sm: "460px",
        md: "740px",
        lg: "950px",
        xl: "1200px",
        "2xl": "1300px",
      }}
      mx="auto"
      py="24px"
    >
      <Flex dir="rtl" justifyContent="space-between" alignItems="center">
        <Text fontWeight="semibold" fontSize={{ base: "18px", md: "24px" }}>
          {title}
        </Text>
        <Flex gap="2" dir="ltr" display={{ base: "none", md: "flex" }}>
          <IconButton
            role="button"
            aria-label="slide next"
            size="sm"
            borderRadius="full"
            bg="transparent"
            border="1px solid transparent"
            borderColor="naturalLight"
            textColor="naturalLight"
            _hover={{ bg: "naturalLightest" }}
            _active={{ border: "none", bg: "primary", textColor: "white" }}
            fontSize="24px"
            width="40px"
            height="40px"
            icon={<ChevronLeftIcon />}
            onClick={() => {
              if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideNext();
                activeIndex < products.length - numberOfSlides &&
                  setActiveIndex(activeIndex + 1);
              }
            }}
          />
          <IconButton
            role="button"
            aria-label="slide prev"
            size="sm"
            borderRadius="full"
            bg="transparent"
            border="1px solid transparent"
            borderColor="naturalLight"
            textColor="naturalLight"
            _hover={{ bg: "naturalLightest" }}
            _active={{ border: "none", bg: "primary", textColor: "white" }}
            fontSize="24px"
            width="40px"
            height="40px"
            icon={<ChevronRightIcon />}
            onClick={() => {
              if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slidePrev();
                activeIndex >= 1 && setActiveIndex(activeIndex - 1);
              }
            }}
          />
        </Flex>
        {/*} <Button
          w="72px"
          h="36px"
          color="primaryLight"
          bg="primaryLightest"
          fontSize="12px"
          fontWeight="semibold"
          display={{ base: "flex", md: "none" }}
        >
          הצג הכל
          </Button>*/}
      </Flex>
      <Spacer h={{ base: "18px", md: "24px" }} />
      <Swiper
        dir="rtl"
        slidesPerView={"auto"}
        className="mySwiper"
        ref={swiperRef}
        //navigation
        //className="hide-navigation-buttons"
        spaceBetween={14}
        breakpoints={{
          768: {
            spaceBetween: 25,
          },
          1536: {spaceBetween: 30,}
        }}
      >
        {products &&
          products.map((product) => {
            return (
              <SwiperSlide key={product._id}>
                <ProductItem
                  _id={product._id}
                  name={product.title}
                  imgUrl={product.images[0]}
                  price={product.price}
                  beforePrice={
                    product["price-before-discount"] !== 0
                      ? product["price-before-discount"]
                      : null
                  }
                  discount={
                    product["price-before-discount"] !== 0
                      ? ((product["price-before-discount"] - product.price) /
                          product["price-before-discount"]) *
                        100
                      : null
                  }
                  offers={product.offers}
                  h={h}
                  w={w}
                  p={p}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
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
      //my="20px"
      dir="rtl"
      borderRadius="28px"
      overflow="hidden"
      border="2px solid"
      borderColor="naturalLightest"
      position="relative"
      h={{
        base: h === "360px" ? "200px" : "220px",
        sm: h === "360px" ? "220px" : "210px",
        md: h === "360px" ? "300px" : "240px",
        lg: h === "360px" ? "360px" : "300px",
        xl: h === "360px" ? "335px" : "300px",
        "2xl": h,
      }}
      w={{
        base: w === "300px" ? "140px" : "158px",
        sm: w === "300px" ? "160px" : "144px",
        md: w === "300px" ? "230px" : "170px",
        lg: w === "300px" ? "300px" : "230px",
        xl: w === "300px" ? "281px" : "230px",
        "2xl": "302.5px",
      }}
      cursor={"pointer"}
      boxShadow="none"
      _hover={{ boxShadow: "2px 6px 25px 0 rgba(40, 53, 106, 0.2)" }}
      onClick={() =>
        (window.location.href = props.openingPrice
          ? routes.ProductPageAuction.path.replace(":id", "") + props.data._id
          : routes.ProductPage.path.replace(":id", "") + props._id)
      }
    >
      <Box>
        <Image
          alt={name}
          w="full"
          h={{
            base: p === "280px" ? "140px" : "155px",
            sm: p === "280px" ? "160px" : "140px",
            md: p === "280px" ? "230px" : "170px",
            lg: p === "280px" ? "280px" : "230px",
            xl: p === "280px" ? "260px" : "230px",
            "2xl": "280px",
          }}
          src={imgUrl}
        />
      </Box>
      <Flex flexDir="column" gap={{base: "1", md: "2"}} p="3">
        <Text
          fontSize={{ base: "12px", md: "14px" }}
          lineHeight={{ base: "12px", md: "18px" }}
          w="80%"
          color={{ base: "naturalDarkest", md: "black" }}
        >
          {name}
        </Text>
        <Flex
          color={{ base: "naturalDarkest", md: "black" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems={{ md: "center", lg: "end" }} gap="4">
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
                pt={{ md: "2px", lg: "0" }}
                pb={{ md: "0", lg: "1px" }}
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
          py={{ base: "0", md: "1.5" }}
        >
          <Text>%{discount}</Text>
        </Box>
      )}
    </Card>
  );
};
