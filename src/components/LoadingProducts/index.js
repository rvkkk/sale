import React, { useRef, useState, useEffect } from "react";
import { Box, Card, Flex, Image, Spacer, Text, Grid } from "@chakra-ui/react";
import { routes } from "../../routes";
import { getProducts } from "../../utils/api/products";
import Badge from "../Badge";
import Button from "../Button";

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(1);
  const componentRef = useRef(null);
  const [allowLoadMore, setAllowLoadMore] = useState(true);
  const itemsPerRow =
    window.innerWidth < 480
      ? 2
      : window.innerWidth < 768
      ? 3
      : window.innerWidth < 1280
      ? 4
      : 5;
  const itemsPerPage = itemsPerRow * 2;

  useEffect(() => {
    getProducts(1, itemsPerPage)
      .then((res) => {
        console.log(res, 1);
        setProducts(res.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const loadMoreProducts = () => {
    setLoading(true);
    getProducts(page, itemsPerPage)
      .then((res) => {
        console.log(res, page);
        setPage(page + 1);
        setProducts((prevProducts) => [
          ...prevProducts,
          ...res.products,
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!allowLoadMore || loading) return;

    const handleScroll = () => {
      const { bottom } = componentRef.current.getBoundingClientRect();
      const isAtEndOfComponent = bottom <= window.innerHeight + 20;
      if (totalPages < 3 && isAtEndOfComponent) {
        loadMoreProducts();
        setAllowLoadMore(false);
        setTotalPages(totalPages + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allowLoadMore, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const { bottom } = componentRef.current.getBoundingClientRect();
      const isComponentVisible = bottom >= 0 && bottom <= window.innerHeight;

      if (isComponentVisible) {
        setAllowLoadMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      ref={componentRef}
    >
      <Flex dir="rtl" justifyContent="start" alignItems="center">
        <Text fontWeight="semibold" fontSize={{ base: "18px", md: "24px" }}>
          מוצרים מובילים
        </Text>
      </Flex>
      <Spacer h={{ base: "18px", md: "24px" }} />
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={{base: "19px", xl: "20px", "2xl": "30px"}}
        mx="auto"
      >
        {products[0] &&
          products.map((product, key) => {
            return (
              <ProductItem
                key={key}
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
              />
            );
          })}
      </Grid>
      {loading && (
        <Flex mt="40px" dir="rtl" justifyContent="center" alignItems="center">
          <Text
            color="primaryDark"
            fontWeight="light"
            fontSize={{ base: "18px", md: "22px" }}
          >
            טוען נתונים נוספים...
          </Text>
        </Flex>
      )}
      {!loading && totalPages >= 3 && (
        <Button
          w={{ base: "160px", md: "200px" }}
          fontSize={{ base: "18px", md: "20px" }}
          mt="40px"
          onClick={loadMoreProducts}
          mx="auto"
        >
          טען עוד מוצרים
        </Button>
      )}
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
      //mt="20px"
      dir="rtl"
      borderRadius="28px"
      overflow="hidden"
      border="2px solid"
      borderColor="naturalLightest"
      position="relative"
      h={{
        base: "214px",
        sm: "200px",
        md: "240px",
        lg: "295px",
        xl: "300px",
        "2xl": "310px",
      }}
      w={{
        base: "154px",
        sm: "140.66px",
        md: "170.5px",
        lg: "223.25px",
        xl: "224px",
        "2xl": "236px",
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
            base: "154px",
            sm: "140.66px",
            md: "170.5px",
            lg: "219.25px",
            xl: "224px",
            "2xl": "236px",
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
          <Text>{discount}%</Text>
        </Box>
      )}
    </Card>
  );
};
