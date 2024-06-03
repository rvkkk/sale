import {
  ChakraProvider,
  Flex,
  Box,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
  useOutsideClick,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon5, SearchIcon } from "../Icons";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getProductsByLetters } from "../../utils/api/products";
import { SearchRounded } from "@mui/icons-material";
import Button from "../Button";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (query.length >= 2) searchProducts(query);
    else {
      setProducts([]);
      setShow(false);
    }
  }, [query]);

  const searchProducts = (letters) => {
    getProductsByLetters(letters).then((products) => {
      setProducts(products.products);
      setShow(products.products.length > 0);
      console.log(products);
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    rtl: true,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const boxRef = useRef();
  const inputRef = useRef();

  useOutsideClick({
    ref: boxRef,
    handler: () => setShow(false),
  });

  return (
    <>
      <Flex dir="rtl" display={{ base: "none", lg: "flex" }}>
        <Menu>
          <MenuButton>
            <Flex
              role="menu"
              aria-label="see links to products"
              borderRadius="0px"
              borderRightRadius="12px"
              w="50px"
              h="50px"
              bg="primaryDark"
              color="white"
              fontSize="30px"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "primaryDark" }}
              _active={{ bg: "primaryDark" }}
              _focus={{ bg: "primaryDark" }}
              gap="1"
            >
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList
            dir="rtl"
            p="20px 10px"
            bg="white"
            fontWeight="bold"
            borderRadius="12px"
            shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
          >
            <MenuItemComponent
              path={routes.LOGIN.path} //דף מכירות פומביות
              name="מוצרי מכירה פומבית"
            />
            <MenuItemComponent path={routes.LOGIN.path} name="מוצרים רגילים" />
            <MenuItemComponent
              path={routes.LOGIN.path}
              name="לכל סוגי המוצרים"
            />
          </MenuList>
        </Menu>

        <Input
          placeholder="אני מחפש..."
          border="none"
          h="50px"
          borderRadius="0"
          bg="white"
          _focus={{ outline: "none", border: "none" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          aria-label="search"
          role="button"
          h="50px"
          minW="50px"
          borderRadius="12px"
          bgGradient="linear(to-r, #FF66A9, #F53689)"
          _hover={{ bgGradient: "linear(to-r, #F53689, #F53689)" }}
          borderRightRadius="0"
          icon={<SearchIcon />}
          onClick={() =>
            (window.location.href = routes.SearchResults.path.replace(
              ":query",
              query
            ))
          }
        />
      </Flex>

      {/* <Menu isOpen={products.length > 0}>
        <MenuItem>
        <Flex flexDir="column"
    bg='white'
    borderRadius="12px"
          display={products.length > 0 ? "flex" : "none"}
          overflow="auto"
          className="slider-container"
          h="600px"
         
        >
          <Slider {...settings}>
            {products.length > 0 && (
              <>
                {products.map((p, key) => (
                  <React.Fragment key={key}>
                    <Flex h="50px">
                      <Text>{p.title}</Text>
                    </Flex>
                    
                  </React.Fragment>
                ))}
              </>
            )}
          </Slider>
          <Button.TextButton>לכל התוצאות</Button.TextButton>
      </Flex>
                </MenuItem></Menu>*/}

      <Flex
        gap="8px"
        px={{ sm: "70px" }}
        display={{ base: "flex", lg: "none" }}
        ref={inputRef}
      >
        <IconButton
          aria-label="search"
          role="button"
          minW="50px"
          h="50px"
          bgGradient="linear(to-r, #FF66A9, #F53689)"
          _hover={{ bgGradient: "linear(to-r, #F53689, #F53689)" }}
          borderRadius="14px"
          icon={<SearchIcon />}
          onClick={() =>
            (window.location.href = routes.SearchResults.path.replace(
              ":query",
              query
            ))
          }
        />
        <Input
          dir="rtl"
          h="50px"
          placeholder="אני מחפש..."
          border="none"
          borderRadius="14px"
          bg="white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Flex>
      {show && (
        <Box
          dir="rtl"
          position="absolute"
          top={{ base: "100%", lg: "auto" }}
          mt="5px"
          w={{ base: "100%", lg: "530px", xl: "700px", "2xl": "800px" }}
          bg="white"
          boxShadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
          borderRadius="12px"
          maxH="300px"
          overflowY="auto"
          ref={boxRef}
        >
          {products.map((product, key) => (
            <ProductComponent key={key} p={product}></ProductComponent>
          ))}
          <Link
            to={routes.SearchResults.path.replace(":query", query)}
            aria-label="link to search results"
            role="link"
            style={{ textDecoration: "none" }}
          >
            <Flex
              p="10px"
              borderRadius="8px"
              dir="ltr"
              m="2"
              bg={active ? "othersLight" : "white"}
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
              color="naturalDark"
              alignItems="center"
            >
              <Text textColor="primary">לכל התוצאות</Text>
            </Flex>
          </Link>
        </Box>
      )}
    </>
  );
}

const MenuItemComponent = ({ path, name }) => {
  const [active, setActive] = useState(false);

  return (
    <Link
      to={path}
      aria-label="link to products"
      role="link"
      style={{ textDecoration: "none" }}
    >
      <MenuItem
        borderRadius="8px"
        bg={active ? "othersLight" : "white"}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        color="naturalDark"
        h="44px"
      >
        <Text
          textColor={active ? "primary" : "naturalDark"}
          fontSize="14px"
          fontWeight="500"
        >
          {name}
        </Text>
      </MenuItem>
    </Link>
  );
};

const ProductComponent = ({ p }) => {
  const [active, setActive] = useState(false);
  return (
    <Link
      to={routes.ProductPage.path.replace(":id", p._id)}
      aria-label="link to product"
      role="link"
      style={{ textDecoration: "none" }}
    >
      <Flex
        key={p.id}
        p="10px"
        borderRadius="8px"
        m="2"
        bg={active ? "othersLight" : "white"}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        color="naturalDark"
        alignItems="center"
      >
        <Image boxSize="50px" src={p.images[0]} alt={p.title} ml={4} />{" "}
        <Flex flexDir="column" gap="2">
          <Text
            textColor={active ? "primary" : "black"}
            fontWeight="bold"
            fontSize="18px"
          >
            {p.title}
          </Text>
          <Text textColor={active ? "primary" : "black"}>{p.category}</Text>
        </Flex>
      </Flex>
    </Link>
  );
};
/*<Popover isOpen={products.length > 0}>
        <PopoverContent   w="357px"
                        borderRadius="16px"
                        border="none"
                        bg="red"
                        shadow="0px 5px 40px 0px rgba(0, 0, 0, 0.1)">
          <Flex flexDir="column"
    bg='red'
    borderRadius="12px"
          display={products.length > 0 ? "flex" : "none"}
          overflow="auto"
          className="slider-container"
          h="600px">
<Slider {...settings}>
            {products.length > 0 && (
              <>
                {products.map((p, key) => (
                  <React.Fragment key={key}>
                    <Text>{p.title}</Text>
                  </React.Fragment>
                ))}
              </>
            )}
          </Slider>
          <Button.TextButton>לכל התוצאות</Button.TextButton>
          </Flex>
        </PopoverContent>
        </Popover> 
      
    </Flex>
  );*/
