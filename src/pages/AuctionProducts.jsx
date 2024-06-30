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
  } from "@chakra-ui/react";
  import { FaListUl } from "react-icons/fa";
  import { RxDashboard } from "react-icons/rx";
  import React, { useState, useEffect } from "react";
  import CategorySidebar from "../components/CategorySidebar";
  import Layout from "../components/Layout";
  import CartListItem from "../components/CartListItem";
  import Pagination from "../components/Pagination";
  import CartGalleryItem from "../components/CartGalleryItem";
  import {
    getAuctionProducts,
    getAProductsByCategory,
  } from "../utils/api/auctionProducts";
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
  
  export default function AuctionProducts() {
    const [loading, setLoading] = useState(false);
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
  
    const breadcrumb =  [
      { name: "דף הבית", href: routes.HOME.path },
      {
        name: "מכירות פומביות",
        href: "#"
      },
    ];
  
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
  
    useEffect(() => {
        getAuctionProducts(1, 50)
        .then((res) => {
            console.log(res);
            setProducts(res.products);
            setPages(res.products.pages);
            //setLoading(false);
          })
          .catch((err) => console.log(err));
    }, []);
  
    /*const getProducts = (categoryName) => {
      // setLoading(true);
      searchProducts(categoryName, tags, 1, 21, minPrice, maxPrice, sortBy)
        .then((res) => {
          console.log(res);
          setProducts(res.products.products);
          setPages(res.products.pages);
          //setLoading(false);
        })
        .catch((err) => console.log(err));
    };*/
  
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
                  categoryName="מכירות פומביות"
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
                <Menu>
                  <MenuButton
                    as={Button}
                    bg="white"
                    _active={{ bg: "white" }}
                    _focus={{ bg: "white" }}
                    _hover={{ bg: "white" }}
                    border="1px solid transparent"
                    borderRadius="10px"
                    px="15px"
                    borderColor="naturalDarkest"
                  >
                    <Flex
                      gap="10px"
                      py="2"
                      fontSize="16px"
                      color="naturalDarkest"
                      fontWeight="normal"
                    >
                      <CategoryIcon />
                      <Text pt="2px">קטגוריות</Text>
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
                    w="360px"
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
                      <Filter2Icon />
                      <Text pt="2px">סינון</Text>
                    </Flex>
                  </MenuButton>
                  <MenuList
                    dir="rtl"
                    fontSize="16px"
                    color="naturalDarkest"
                    border="none"
                    shadow="lg"
                    postion="relative"
                    zIndex={4}
                    w="360px"
                    p="0"
                  >
                    <MenuItem>
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
                    </MenuItem>
                  </MenuList>
                </Menu>
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
  