import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  Spacer,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FaListUl } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import React, { useState, useEffect, useMemo } from "react";
import CategorySidebar from "../components/CategorySidebar";
import Layout from "../components/Layout";
import CartListItem from "../components/CartListItem";
import Pagination from "../components/Pagination";
import CartGalleryItem from "../components/CartGalleryItem";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "../utils/api/products";
import {
  sortNewest,
  sortPopularAuction,
  sortPriceDown,
  sortPriceUp,
  sortMostBuyProducts,
} from "../utils/sort";
import Loader from "../components/Loader";
import { routes } from "../routes";
import { CategoryIcon, Filter2Icon, SortIcon } from "../components/Icons";
import { getSubcategory } from "../utils/api/subcategories";
import { extendTheme, createBreakpoints } from "@chakra-ui/react";
import CountryCodeSelector from "../components/PhoneNumber";
import { getAProductsByCategory } from "../utils/api/auctionProducts";
import { getAllProductsByCategory } from "../utils/api/allProducts";

export default function Category() {
  const [loading, setLoading] = useState(true);
  const [isList, setIsList] = useState(true);
  const [products, setProducts] = useState([{}]);
  const [pages, setPages] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState({});
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(2000);
 // const sortedPriceUp = useMemo(() => sortPriceUp(products), [products]);


  const breadcrumb = category.name && [
    { name: "דף הבית", href: routes.HOME.path },
    {
      name: category.mainCategory.name,
      href: routes.Categories.path.replace(
        ":category",
        category.mainCategory.title
      ),
    },
    { name: category.name, href: "#" },
  ];

  const theme = extendTheme({
    breakpoints: {
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      '2xl': '96em',
      custom: '62.5em', // 1000px / 16 = 62.5em
    },
  });

  const onBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onForwardPage = () => {
    if (currentPage < pages) setCurrentPage(currentPage + 1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const {
    isOpen: isSortOpen,
    onOpen: onSortOpen,
    onClose: onSortClose,
  } = useDisclosure();
  const {
    isOpen: isListOpen,
    onOpen: onListOpen,
    onClose: onListClose,
  } = useDisclosure();

  const setQueryParametersToState = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    setQuery(query);
    if (
      query !== "" &&
      query !== null &&
      query !== undefined &&
      query !== "undefined"
    ) {
      //searchQuery(query);
    } else {
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
    let category = window.location.href.split("/").pop().split("/")[0];
    getSubcategory(category).then((res) => {
      console.log(res);
      setCategory(res.subcategory);
      setLoading(false);
      //getProducts(res.subcategory.name);
    });
  }, []);

  const getProducts = () => {
    getAllProductsByCategory(window.location.href.split("/").pop().split("/")[0], 1, 100).then((res) => {
      console.log(res);
      const products = res.products.products;
  setProducts(products);
  /*const sortedProducts = sortPriceUp(products);
        console.log(sortedProducts)
  setMinPrice(sortedProducts[0]?.price || 0);
  setMaxPrice(sortedProducts[sortedProducts.length - 1]?.price || 0);*/
  setMinPrice(products[0]?.price || 0);
  setMaxPrice(products[products.length - 1]?.price || 0);
      setPages(res.products.amount);
    })
      //setLoading(false);
    // setLoading(true);
   /* getAProductsByCategory(window.location.href.split("/").pop().split("/")[0], 1, 50).then((res) => {
      console.log(res);
      const products = res.products.products;
  setProducts(products);})
    searchProducts(categoryName, tags, 1, 21, minPrice, maxPrice, sortBy)
      .then((res) => {
        console.log(res);
        const products = res.products.products;
    setProducts(products);
        const sortedProducts = sortPriceUp(products);
        console.log(sortedProducts)
        setMinPrice(sortedProducts[0]?.price || 0);
    setMaxPrice(sortedProducts[sortedProducts.length - 1]?.price || 0);
        setPages(Math.ceil(res.products.amount)/21);
        //setLoading(false);
      })*/
      .catch((err) => console.log(err));
  };

  /*useEffect(() => {
    const category = window.location.href.split("/").pop().split("/")[0]; //צריך להיות באנגלית
    setCategory(category);
    setLoading(true);
    searchProducts(category, tags, currentPage, 9, minPrice, maxPrice, sortBy)
      .then((res) => {
        console.log(res);
        setProducts(res.products.products);
        setPages(res.products.pages);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);*/

  return (
    <Layout
      add={true}
      breadcrumb={breadcrumb}
      query={query}
      onChangeQuery={(e) => setQuery(e.target.value)}
    >
      {loading ? (
        <Loader />
      ) : (
        <Flex
          mx={{ md: "50px", lg: "100px", "2xl": "200px" }}
          justifyContent="center"
        >
          <Flex
            display={{ base: "none", md: "flex" }}
            pb="20"
            //mt="30px"
            gap="10"
            dir="rtl"
            w="100%"
            // mx={["16px", "32px", "50px", "100px", "200px"]}
          >
            <Box>
              <CategorySidebar
                onChangePriceSlider={(val) => {
                  const min = val[0];
                  const max = val[1];
                  setMinPrice(min);
                  setMaxPrice(max);
                  //filterByPrice(min, max);
                }}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onChangeTags={(tags) => setTags(tags)}
                categoryName={category.name}
              />
            </Box>

            <Box flex="1" style={{ maxWidth: 1154 }}>
              <Flex justifyContent="space-between">
                <Flex alignItems="center" gap="14px">
                  <Text
                    fontSize="14px"
                    lineHeight="16px"
                    color="naturalDarkest"
                  >
                    מיין לפי
                  </Text>
                  <Menu>
                    <MenuButton
                      as={Button}
                      bg="white"
                      _active={{ bg: "white" }}
                      _focus={{ bg: "white" }}
                      _hover={{ bg: "white" }}
                      border="1px solid transparent"
                      borderRadius="8px"
                      borderColor="bright"
                    >
                      <Flex
                        gap="4"
                        py="2"
                        fontSize="14px"
                        fontWeight="medium"
                        color="naturalDarkest"
                      >
                        <Image
                          w="18px"
                          alt="filter icon"
                          src={process.env.PUBLIC_URL + "/assets/filter.svg"}
                        />
                        {sortBy === "priceUp"
                          ? "מחיר: מהנמוך לגבוה"
                          : sortBy === "priceDown"
                          ? "מחיר: מהגבוה לנמוך"
                          : sortBy === "newest"
                          ? "מחדש לישן"
                          : sortBy === "mostBuy"
                          ? "הנמכרים ביותר"
                          : "פופולריות"}
                      </Flex>
                    </MenuButton>
                    <MenuList
                      dir="rtl"
                      fontSize="14px"
                      color="naturalDarkest"
                      border="none"
                      shadow="lg"
                      p="2"
                      py="4"
                      postion="relative"
                      zIndex={4}
                    >
                      <MenuItem
                        onClick={() => {
                          setProducts(sortPriceUp(products));
                          setSortBy("priceUp");
                        }}
                        borderRadius="8px"
                        bg={sortBy === "priceUp" && "othersLight"}
                        color={sortBy === "priceUp" && "primary"}
                        _hover={{ bg: "othersLight", color: "primary" }}
                      >
                        מחיר: מהנמוך לגבוה
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setProducts(sortPriceDown(products));
                          setSortBy("priceDown");
                        }}
                        borderRadius="8px"
                        bg={sortBy === "priceDown" && "othersLight"}
                        color={sortBy === "priceDown" && "primary"}
                        _hover={{ bg: "othersLight", color: "primary" }}
                      >
                        מחיר: מהגבוה לנמוך
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setProducts(sortMostBuyProducts(products));
                          setSortBy("mostBuy");
                        }}
                        borderRadius="8px"
                        bg={sortBy === "mostBuy" && "othersLight"}
                        color={sortBy === "mostBuy" && "primary"}
                        _hover={{ bg: "othersLight", color: "primary" }}
                      >
                        הנמכרים ביותר
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setProducts(sortPopularAuction(products));
                          setSortBy("popular");
                        }}
                        borderRadius="8px"
                        bg={sortBy === "popular" && "othersLight"}
                        color={sortBy === "popular" && "primary"}
                        _hover={{ bg: "othersLight", color: "primary" }}
                      >
                        פופולריות
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setProducts(sortNewest(products));
                          setSortBy("newest");
                        }}
                        borderRadius="8px"
                        bg={sortBy === "newest" && "othersLight"}
                        color={sortBy === "newest" && "primary"}
                        _hover={{ bg: "othersLight", color: "primary" }}
                      >
                        מחדש לישן
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex gap="2">
                  <Popover placement="top" trigger="hover">
                    <PopoverTrigger>
                      <IconButton
                        border="1.5px solid transparent"
                        bg="othersLight"
                        borderColor={isList ? "primary" : "transparent"}
                        borderRadius="8px"
                        color="primary"
                        onClick={() => {
                          setIsList(true);
                        }}
                        icon={<FaListUl />}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      bg="primary"
                      borderRadius="6px"
                      p="2"
                      border="none"
                      w="max"
                    >
                      <PopoverArrow bg="primary" />
                      <PopoverBody fontSize="12px" textColor="white" w="max">
                        הצג בתצוגת רשימה
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Popover placement="top" trigger="hover">
                    <PopoverTrigger>
                      <IconButton
                        border="1.5px solid transparent"
                        bg="othersLight"
                        borderColor={!isList ? "primary" : "transparent"}
                        borderRadius="8px"
                        color="primary"
                        onClick={() => {
                          setIsList(false);
                        }}
                        icon={<RxDashboard />}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      bg="primary"
                      borderRadius="6px"
                      p="2"
                      border="none"
                      w="max"
                    >
                      <PopoverArrow bg="primary" />
                      <PopoverBody fontSize="12px" textColor="white" w="max">
                        הצג בתצוגת גלריה
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </Flex>
              {products.length === 0 && (
                <Flex justifyContent="center" alignItems="center" h="300px">
                  <Text fontSize="20px" color="naturalDark">
                    לא נמצאו מוצרים
                  </Text>
                </Flex>
              )}

              {isList ? (
                <Flex
                  w={{ md: "100%" }}
                  //minW="500px"
                  maxW="1154px"
                  flexDirection="column"
                  gap="6"
                  mt="8"
                >
                  {(products[0] && products[0].title) &&
                    products.map((item) => {
                      return <CartListItem data={item} />;
                    })}
                </Flex>
              ) : (
                <Grid
                  w={{ md: "100%" }}
                  //minW="500px"
                  maxW="1154px"
                  gridTemplateColumns={{
                    md: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                  }}
                  gap="6"
                  mt="8"
                >
                  {(products[0] && products[0].title) &&
                    products.map((item) => {
                      return <CartGalleryItem data={item} />;
                    })}
                </Grid>
              )}

              <Spacer h="20" />
              {(products[0] && products[0].title)  && (
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
          </Flex>
          <Flex flexDir="column" display={{ base: "flex", md: "none" }}>
            <Flex
              w="336px"
              dir="rtl"
              mx="auto"
              justifyContent="space-between"
            >
                  <Flex
                  bg="white"
                  border="1px solid transparent"
                  borderRadius="10px"
                  px="15px"
                  borderColor="naturalDarkest"
                    gap="10px"
                    py="2"
                    fontSize="16px"
                    color="naturalDarkest"
                    fontWeight="normal"
                    onClick={onListOpen}
                  >
                    <CategoryIcon />
                    <Text pt="2px">קטגוריות</Text>
                  </Flex>
              <Modal isOpen={isListOpen} onClose={onListClose} motionPreset="slideInRight"
              blockScrollOnMount={false}
              >
              <ModalOverlay/>
              <ModalContent
                h="100%"
  maxH="100vh"
                margin="0"
                minW="270px"
                w={{ base: "270px", sm: "33%" }}
                border="none"
                bg="white"
                dir="rtl"
                shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
                position="fixed"
                top="0"
                right="0"
                bottom="0"
                borderRadius="0"
>
                <ModalCloseButton
                size="md"
                color="primary"
                right="2"
                //left="100"
                top="2"
                //position="absolute"
                //top="68.7px"
                //transform="translateX(-50%)"
                bg="white"
              />
                </ModalContent>
              </Modal>
              <Menu>
                <MenuButton
                  as={Button}
                  bg="white"
                  _active={{ bg: "white" }}
                  _focus={{ bg: "white" }}
                  _hover={{ bg: "white" }}
                  border="1px solid transparent"
                  borderRadius="10px"
                  borderColor="naturalDarkest"
                  px="15px"
                >
                  <Flex
                    gap="10px"
                    py="2"
                    fontSize="16px"
                    color="naturalDarkest"
                    fontWeight="normal"
                  >
                    <SortIcon />
                    <Text pt="2px">מיין</Text>
                  </Flex>
                </MenuButton>
                <MenuList
                  dir="rtl"
                  fontSize="16px"
                  color="naturalDarkest"
                  border="none"
                  shadow="lg"
                  p="2"
                  py="4"
                  postion="relative"
                  zIndex={4}
                >
                  <MenuItem
                    onClick={() => {
                      setProducts(sortPriceUp(products));
                      setSortBy("priceUp");
                    }}
                    borderRadius="8px"
                    bg={sortBy === "priceUp" && "othersLight"}
                    color={sortBy === "priceUp" && "primary"}
                    _hover={{ bg: "othersLight", color: "primary" }}
                    p="4"
                  >
                    מחיר: מהנמוך לגבוה
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setProducts(sortPriceDown(products));
                      setSortBy("priceDown");
                    }}
                    borderRadius="8px"
                    bg={sortBy === "priceDown" && "othersLight"}
                    color={sortBy === "priceDown" && "primary"}
                    _hover={{ bg: "othersLight", color: "primary" }}
                    p="4"
                  >
                    מחיר: מהגבוה לנמוך
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setProducts(sortMostBuyProducts(products));
                      setSortBy("mostBuy");
                    }}
                    borderRadius="8px"
                    bg={sortBy === "mostBuy" && "othersLight"}
                    color={sortBy === "mostBuy" && "primary"}
                    _hover={{ bg: "othersLight", color: "primary" }}
                    p="4"
                  >
                    הנמכרים ביותר
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setProducts(sortPopularAuction(products));
                      setSortBy("popular");
                    }}
                    borderRadius="8px"
                    bg={sortBy === "popular" && "othersLight"}
                    color={sortBy === "popular" && "primary"}
                    _hover={{ bg: "othersLight", color: "primary" }}
                    p="4"
                  >
                    פופולריות
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setProducts(sortNewest(products));
                      setSortBy("newest");
                    }}
                    borderRadius="8px"
                    bg={sortBy === "newest" && "othersLight"}
                    color={sortBy === "newest" && "primary"}
                    _hover={{ bg: "othersLight", color: "primary" }}
                    p="4"
                  >
                    מחדש לישן
                  </MenuItem>
                </MenuList>
              </Menu>
              <Flex
                  bg="white"
                  border="1px solid transparent"
                  borderRadius="10px"
                  px="15px"
                  borderColor="naturalDarkest"
                    gap="10px"
                    py="2"
                    fontSize="16px"
                    color="naturalDarkest"  
                    fontWeight="normal"
                    onClick={onSortOpen}
                  >
                    <Filter2Icon />
                    <Text pt="2px">סינון</Text>
                  </Flex>
                  <Modal isOpen={isSortOpen} onClose={onSortClose}
            motionPreset="slideInRight"
              blockScrollOnMount={false}
              scrollBehavior="inside"
            >
              <ModalOverlay />
              <ModalContent
                h="100%"
  maxH="100vh"
                margin="0"
                minW="270px"
                w={{ base: "270px", sm: "33%" }}
                border="none"
                bg="white"
                dir="rtl"
                shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
                position="fixed"
                top="0"
                right="0"
                bottom="0"
                borderRadius="0"
>
                <ModalCloseButton
                size="md"
                color="primary"
                right="2"
                //left="100"
                top="2"
                //position="absolute"
                //top="68.7px"
                //transform="translateX(-50%)"
                bg="white"
              />
                <ModalBody p="0"  dir="rtl">
                <Box justifyContent="center" h="100%">
<CategorySidebar
                      onChangePriceSlider={(val) => {
                        const min = val[0];
                        const max = val[1];
                        setMinPrice(min);
                        setMaxPrice(max);
                        //filterByPrice(min, max);
                      }}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      onChangeTags={(tags) => setTags(tags)}
                    />
  </Box>
                   
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Flex>

            {products.length === 0 && (
              <Flex justifyContent="center" alignItems="center" h="300px">
                <Text fontSize="16px" color="naturalDark">
                  לא נמצאו מוצרים
                </Text>
              </Flex>
            )}

            <Grid
              gridTemplateColumns={{base: "repeat(2, 1fr)", sm : "repeat(3, 1fr)"}}
              rowGap="30px"
              columnGap="3"
              my="8"
              mx="20px"
              justifyContent="center"
            >
              {(products[0] && products[0].title) &&
                products.map((item) => {
                  return <CartGalleryItem data={item} />;
                })}
            </Grid>

            {/*<Spacer h="20" />
            {products.length > 0 && (
              <Flex justifyContent="center">
                <Pagination
                  currentPage={currentPage}
                  pages={pages}
                  onBack={() => onBackPage()}
                  onForward={() => onForwardPage()}
                  onPageChange={(page) => onPageChange(page)}
                />
              </Flex>
            )}*/}
          </Flex>
        </Flex>
      )}
    </Layout>
  );
}