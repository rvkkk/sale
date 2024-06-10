import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CartItemGallery from "../components/CartGalleryItem";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import { getUserProducts } from "../utils/api/products";
import { getUserAProducts } from "../utils/api/auctionProducts";
import {
  sortNoOffersAp,
  sortOpenAuctions,
  sortCloseAuctions,
  sortFutureAuctions,
  sortNewest,
} from "../utils/sort";
import Loader from "../components/Loader";

export default function UserSettingsMySales() {
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [galleryPage, setGalleryPage] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [myAProducts, setMyAProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (!dataFetched) {
      setLoading(true);
      getUserProducts()
        .then((res) => {
          console.log(res);
          setMyProducts(res.products);
          getUserAProducts().then((resp) => {
            console.log(resp);
            setMyAProducts(resp.products);
            setGallery(sortNewest([...res.products, ...resp.products]));
            setPages(Math.ceil(gallery / 12));
            setLoading(false);
          });
        })
        .catch((err) => console.log(err));
      setDataFetched(true);
    }
  }, [dataFetched]);

  const onBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onForwardPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setPages(Math.ceil(gallery.length / 12));
    setGalleryPage(gallery.slice((currentPage - 1) * 12, currentPage * 12));
  }, [currentPage, gallery]);

  return (
    <Layout withSidebar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box py="20" ml="15%">
            <Flex alignItems="center" justifyContent="space-between">
              <Flex gap={4}>
              <Text fontSize="32px" lineHeight="20px" fontWeight="medium" color="naturalBlack">
                כל המכירות שלי
              </Text>
              <Text fontSize="20px" lineHeight="20px" color="naturalBlack">
                ({myProducts.length + myAProducts.length} מכירות)
              </Text>
              </Flex>

              {galleryPage && <Menu>
                <MenuButton
                  as={Button}
                  bg="transparent"
                  h="56px"
                  w="110px"
                  _active={{ bg: "white" }}
                  _focus={{ bg: "white" }}
                  _hover={{ bg: "white" }}
                  border="1px solid transparent"
                  borderColor="bright"
                >
                  <Flex
                    gap="4"
                    py="2"
                    alignItems="center"
                    h="full"
                    justifyContent="center"
                  >
                    <Image w="24px" src={process.env.PUBLIC_URL + "/assets/filter.svg"} /> סינון
                  </Flex>
                </MenuButton>
                <MenuList
                  dir="rtl"
                  fontSize="14px"
                  border="none"
                  shadow="lg"
                  p="2"
                  py="4"
                  className="menu"
                >
                  <MenuItem
                    onClick={() => {
                      setGallery(myProducts);
                      setCurrentPage(1);
                      setSortBy("products");
                    }}
                    borderRadius={sortBy === "products" && "lg"}
                    bg={sortBy === "products" && "othersLight"}
                    color={sortBy === "products" && "primary"}
                  >
                    מכירות רגילות
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(sortOpenAuctions(myProducts));
                      setCurrentPage(1);
                      setSortBy("openAuctions");
                    }}
                    borderRadius={sortBy === "openAuctions" && "lg"}
                    bg={sortBy === "openAuctions" && "othersLight"}
                    color={sortBy === "openAuctions" && "primary"}
                  >
                    מכירות פעילות
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(sortCloseAuctions(myProducts));
                      setCurrentPage(1);
                      setSortBy("closeAuctions");
                    }}
                    borderRadius={sortBy === "closeAuctions" && "lg"}
                    bg={sortBy === "closeAuctions" && "othersLight"}
                    color={sortBy === "closeAuctions" && "primary"}
                  >
                    מכירות סגורות
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(sortFutureAuctions(myProducts));
                      setCurrentPage(1);
                      setSortBy("futureAuctions");
                    }}
                    borderRadius={sortBy === "futureAuctions" && "popular"}
                    bg={sortBy === "futureAuctions" && "popular"}
                    color={sortBy === "futureAuctions" && "popular"}
                  >
                    מכירות עתידיות
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setGallery(sortNoOffersAp(myProducts));
                      setCurrentPage(1);
                      setSortBy("noOffersAp");
                    }}
                    borderRadius={sortBy === "noOffersAp" && "lg"}
                    bg={sortBy === "noOffersAp" && "othersLight"}
                    color={sortBy === "noOffersAp" && "primary"}
                  >
                    מכירות ללא הצעות
                  </MenuItem>
                </MenuList>
              </Menu>}
            </Flex>

            <Grid gridTemplateColumns="repeat(3, 1fr)" gap="4" mt="8">
              {galleryPage[0] &&
                galleryPage.map((item) => {
                  return <CartItemGallery data={item} myItem={true} />;
                })}
            </Grid>

            <Spacer h="20" />
            {gallery.length > 0 && (
              <Flex justifyContent="center">
                <Pagination
                  currentPage={currentPage}
                  pages={pages}
                  onBack={() => onBackPage()}
                  onForward={() => onForwardPage()}
                  onPageChange={(page) => onPageChange(page)}
                />
              </Flex>
            )}
          </Box>
        </>
      )}
    </Layout>
  );
}
