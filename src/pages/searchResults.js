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
    Heading,
    Grid,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  import Container from "../components/Container";
  import Layout from "../components/Layout";
  
  import { sortAlphabetCategories, sortPopularCategories } from "../utils/sort";
  import Loader from "../components/Loader";
  import { routes } from "../routes";
  import { getCategories, getCategory } from "../utils/api/categories";
  
  export default function SearchResults() {
    const [loading, setLoading] = useState(true);
    const [mainCategory, setMainCategory] = useState({});
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState("");
  
    useEffect(() => {
      const category = window.location.href.split("/").pop().split("/")[0];
      console.log(category);
      if (category === "main-categories")
        getCategories()
          .then((res) => {
            setCategories(res.categories);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      else
        getCategory(category)
          .then((res) => {
            console.log(res);
            setMainCategory(res.category.category);
            setCategories(res.category.subcategories);
            setLoading(false);
          })
          .catch((err) => console.log(err));
    }, []);
  
    return (
      <Layout>
        {loading ? (
          <Loader />
        ) : (
          <Flex
            dir="rtl"
            flexDir="column"
            justifyContent="center"
            mx="auto"
            w={{
              base: "320px",
              sm: "460px",
              md: "700px",
              lg: "900px",
              xl: "1150px",
              "2xl": "1400px",
            }}
          >
            <Heading
              my="30px"
              fontSize={{ base: "26px", md: "30px", lg: "36px" }}
              textAlign="center"
              color="primaryLight"
            >
              {mainCategory ? mainCategory.name : "הקטגוריות הראשיות"}
            </Heading>
            <Flex justifyContent="start">
              <Flex alignItems="center" gap="14px">
                <Text fontSize="14px" lineHeight="16px" color="naturalDarkest">
                  מיין לפי
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    aria-label="sort the categories"
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
                      {sortBy === "popular"
                        ? "פופולריות"
                        : sortBy === "alphabet"
                        ? "סדר הא' ב'"
                        : ""}
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
                        setCategories(sortPopularCategories(categories));
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
                        setCategories(sortAlphabetCategories(categories));
                        setSortBy("alphabet");
                      }}
                      borderRadius="8px"
                      bg={sortBy === "alphabet" && "othersLight"}
                      color={sortBy === "alphabet" && "primary"}
                      _hover={{ bg: "othersLight", color: "primary" }}
                    >
                      סדר הא' ב'
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
  
            <Container>
              <Grid
                my="20px"
                w={{
                  base: "326px",
                  sm: "392px",
                  md: "648px",
                  lg: "860px",
                  xl: "1180px",
                  "2xl": "1300px",
                }}
                mx="auto"
                gridTemplateColumns={{
                  base: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  xl: "repeat(6, 1fr)",
                }}
                flexWrap="wrap"
                rowGap={{ base: "31px", lg: "44px" }}
                columnGap={{ base: "16px", lg: "20px" }}
                py={{ base: "20px", lg: "40px" }}
              >
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <CategoryItem
                        key={index}
                        onClick={() =>
                          (window.location.href = mainCategory.name
                            ? routes.Category.path.replace(":main-category", mainCategory.title).replace(":category", category.title) 
                            : routes.Categories.path.replace(":category", "") +
                              category.title)
                        }
                        name={category.name}
                        imgUrl={category.image}
                      />
                    );
                  })}
              </Grid>
            </Container>
          </Flex>
        )}
      </Layout>
    );
  }
  
  export const CategoryItem = ({ name = "", imgUrl = {}, onClick }) => {
    return (
      <Flex
        mx="auto"
        w={{
          base: "98px",
          sm: "120px",
          md: "150px",
          lg: "180px",
          "2xl": "200px",
        }}
        h={{
          base: "150px",
          sm: "150px",
          md: "202px",
          lg: "235.5px",
          "2xl": "255.5px",
        }}
        cursor={"pointer"}
        onClick={() => onClick()}
        flexDir="column"
        alignItems="center"
        justifyContent={{md: "center"}}
        pt={{ base: "15px", md: "0" }}
        gap={{ base: "18px", md: "28px" }}
      >
        <Box
          className="category_img"
          w={{
            base: "90px",
            sm: "100px",
            md: "130px",
            lg: "150px",
            "2xl": "170px",
          }}
          h={{
            base: "90px",
            sm: "100px",
            md: "130px",
            lg: "150px",
            "2xl": "170px",
          }}
        >
          <Image className="img" alt={name} src={imgUrl}></Image>
        </Box>
        <Text
          fontSize={{ base: "16px", lg: "18.5px" }}
          lineHeight={{ base: "16px", sm: "19.2px" }}
          textAlign="center"
        >
          {name}
        </Text>
      </Flex>
    );
  };
  