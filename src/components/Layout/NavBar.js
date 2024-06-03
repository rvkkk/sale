import {
  Avatar,
  Box,
  Button as ChakraButton,
  ButtonGroup,
  Divider,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  Spacer,
  Text,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../../utils/cart";
import { getUserProfile } from "../../utils/api/users";
import {
  getUserCart,
  deleteFromCart,
  updateCart,
  deleteCart,
} from "../../utils/api/carts";
import React from "react";
//import { useWebSocket } from "../WebSocketProvider";
import SaleBID, { SmallLOGOIcon } from "../SaleBID";
import { SettingsIcon } from "@chakra-ui/icons";
import SearchComponent from "../SearchComponent";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import {
  Icon5,
  ArrowBackIcon,
  ArrowIcon,
  BillingIcon,
  HomeIcon,
  LogoutIcon,
  MessengerIcon,
  OrderIcon,
  SettingIcon,
  MobileList,
  CartIcon2,
  CartIcon3,
  HeartIcon2,
  SearchIcon,
  UserIcon,
  UserMobileIcon,
  TrashIcon,
} from "../Icons";
import NavCartListItem from "../NavCartListItem";
import Button from "../Button";
import { useState, useEffect } from "react";
import CountrySelect from "../CountrySelect";
import { getTopCategories } from "../../utils/api/categories";

export default function NavBar({ withSidebar, logo, change }) {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [fetchedUser, setFetchedUser] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const token = window.localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [fixedLinks, setFixedLinks] = useState(false);

  const [user, setUser] = useState({
    userName: "Sale Bid",
    profileImage: "",
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    rtl: true,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getUser = () => {
    if (!fetchedUser) {
      return getUserProfile()
        .then((res) => {
          //setUser(res.user);
          setFetchedUser(true);
          setUserLogged(true);
        })
        .catch((err) => {
          setUserLogged(false);
          setFetchedUser(true);
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserLogged(false);
    window.location.href = "/";
  };
  useEffect(() => {
    console.log(change);
    getMyCart();
  }, [change]);

  /* const socket = new WebSocket("ws://localhost:3001");
  socket.onmessage = (event) => {
    console.log(`Received message: ${event.data}`);
    if (event.data === "הוסף לסל" || event.data === "הסר מהסל") {
      getUserCart()
        .then((res) => {
          setCart(res.cart);
          setProducts(res.cart.products);
          console.log(res.cart);
        })
        .catch((err) => console.log(err));
    }
  };*/
  /*const socket = useWebSocket();

  socket.addEventListener("message", (event) => {
    console.log(`Received message: ${event.data}`);
    if (event.data === "הוסף לסל" || event.data === "הסר מהסל") {
      getUserCart()
        .then((res) => {
          setCart(res.cart);
          setProducts(res.cart.products);
          console.log(res.cart);
        })
        .catch((err) => console.log(err));
    }
  });

  socket.addEventListener("error", (event) => {
    console.error("WebSocket Error:", event);
    // כאן תוכל להשתמש ב-metrics או לעשות דברים נוספים לטיפול בשגיאות
  });

  socket.addEventListener("close", (event) => {
    console.log("WebSocket Closed:", event);
    // כאן תוכל לטפל בסגירת החיבור
  });*/

  const updateAmount = (product, newAmount, amount) => {
    if (token === null)
      addToCart({ product: product, amount: newAmount - amount })
        .then((res) => {
          console.log(res);
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.map((p) => {
              if (p.product.id === product.id) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      updateCart({
        productId: product.id,
        amount: newAmount - amount,
      })
        .then((res) => {
          console.log(res);
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.map((p) => {
              if (p.product.id === product.id) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeProductFromCart = (productId) => {
    if (token === null)
      removeFromCart({ productId })
        .then((res) => {
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(
              (p) => !(p.product.id === productId)
            );
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromCart(productId)
        .then((res) => {
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(
              (p) => !(p.product.id === productId)
            );
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    setQuery(query);
    getMyCart();
    if (token !== null) getUser();
  }, [query, token]);

  useEffect(() => {
    let prevScrollY = window.pageYOffset;
    const threshold = 50;

    const handleScroll = () => {
      const currScrollY = window.pageYOffset;
      if (currScrollY < threshold) {
        setHideOnScroll(false);
        setFixedLinks(false);
      } else if (prevScrollY > currScrollY) {
        setHideOnScroll(false);
        setFixedLinks(true);
      } else {
        setHideOnScroll(true);
        setFixedLinks(false);
      }
      prevScrollY = currScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getMyCart = () => {
    if (token !== null) {
      getUserCart()
        .then((res) => {
          console.log(res);
          setProducts(res.cart.products);
          setCart(res.cart);
        })
        .catch((err) => console.log(err));
    } else {
      getCart().then((cart) => {
        setCart(cart);
        setProducts(cart.products);
      });
    }
  };

  const deleteMyCart = () => {
    if (token !== null) {
      deleteCart(cart.id)
        .then((res) => {
          console.log(res);
          setCart({});
          setProducts([]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      clearCart()
        .then((res) => {
          setCart({});
          setProducts([]);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <>
      <Box w="100%" display={{ base: "none", lg: "grid" }}>
        <Box bg="primary" id="navbar" h="80px" w="100%">
          <Flex
            h="full"
            justifyContent="space-between"
            alignItems="center"
            display="-webkit-flex"
          >
            <Flex
              // w={{ lg: "140px", xl: "200px", "2xl": "300px" }}
              w="20%"
              justifyContent="flex-end"
            >
              <Link aria-label="link to website" role="link" to="/">
                <SaleBID />
              </Link>
            </Flex>
            <Box w={{ lg: "530px", xl: "700px", "2xl": "800px" }}>
              <SearchComponent
                value={query}
                onChange={(e) => setQuery(e)}
                onClick={() =>
                  (window.location.href = "/category?query=" + query)
                }
              />
            </Box>
            <Flex w="20%" gap={{ lg: "10px", xl: "30px", "2xl": "50px" }}>
              <Flex gap="2">
                <Link role="link" to={routes.UserSettingsWhiteList.path}>
                  <IconButton
                    role="button"
                    aria-label="link to my wish list"
                    bgColor="#1D5FE8"
                    _hover={{ bg: "rgba(255,255,255,0.3)" }}
                    icon={<HeartIcon2 />}
                  />
                </Link>

                <Popover closeOnBlur={false}>
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <Flex position="relative" role="button">
                          <IconButton
                            role="button"
                            aria-label="show my cart"
                            bgColor="#1D5FE8" //rgba(255,255,255,0.2)
                            _hover={{ bg: "rgba(255,255,255,0.3)" }}
                            icon={<CartIcon3 />}
                          />
                          {cart.products && cart.products.length > 0 && (
                            <Flex
                              position="absolute"
                              top="1"
                              right="1"
                              alignItems="center"
                              justifyContent="center"
                              w="14px"
                              pt="1px"
                              h="14px"
                              borderRadius="100px"
                              bg="otherError"
                              border="1px solid transparent"
                              borderColor="iconButtonColor"
                            >
                              <Text fontSize="8px" textColor="white">
                                {cart.products && cart.products.length}
                              </Text>
                            </Flex>
                          )}
                        </Flex>
                      </PopoverTrigger>
                      <PopoverContent
                        // h="637px"
                        w="357px"
                        borderRadius="16px"
                        border="none"
                        bg="white"
                        shadow="0px 5px 40px 0px rgba(0, 0, 0, 0.1)"
                      >
                        <PopoverArrow />
                        <PopoverCloseButton
                          size="sm"
                          position="absolute"
                          left="0"
                          top="68.7px"
                          transform="translateX(-50%)"
                          bg="white"
                          border="1.24779px solid"
                          borderColor="naturalDark"
                          borderRadius="full"
                        />
                        <PopoverBody py="6" px="6" dir="rtl">
                          <Flex
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Flex gap="2" fontSize="16px" lineHeight="16.5px">
                              <Text
                                color="naturalDarkest"
                                fontWeight="semibold"
                              >
                                העגלה שלי
                              </Text>
                              <Text color="naturalDarkest">
                                ({cart.products ? cart.products.length : 0})
                              </Text>
                            </Flex>

                            <ChakraButton
                              variant="link"
                              onClick={() => deleteMyCart()}
                              style={{ textDecoration: "none" }}
                              color="primaryLight"
                              fontSize="13px"
                              aria-label="clear your cart"
                              role="button"
                            >
                              רוקן עגלה
                              <TrashIcon fill="#003DFF" />
                            </ChakraButton>
                          </Flex>
                          <Spacer h="10px" />
                          <Box overflow="auto" className="slider-container">
                            <Slider {...settings}>
                              {products && (
                                <>
                                  {products.map((p, key) => (
                                    <React.Fragment key={key}>
                                      <NavCartListItem
                                        title={p.product.title}
                                        price={p.product.price}
                                        images={p.product.images}
                                        amount={p.amount}
                                        quantity={p.product.quantity}
                                        onChangeAmount={(amount) =>
                                          updateAmount(
                                            p.product,
                                            amount,
                                            p.amount
                                          )
                                        }
                                        onDelete={() => {
                                          const a = window.confirm(
                                            "האם אתה בטוח שברצונך למחוק את המוצר מהעגלה?"
                                          );
                                          if (a) {
                                            removeProductFromCart(p.product.id);
                                          }
                                        }}
                                      />
                                    </React.Fragment>
                                  ))}
                                </>
                              )}
                            </Slider>
                          </Box>

                          <Spacer h="38px" />
                          <Flex justifyContent="space-between">
                            <Box>
                              <Text
                                fontWeight="500"
                                fontSize="22px"
                                color="naturalBlack"
                                lineHeight="30px"
                              >
                                סך הכל
                              </Text>
                              <Text
                                color="naturalDark"
                                fontSize="14px"
                                lineHeight="22px"
                              >
                                משלוח, עמלות ומיסים יחושבו בשעת ההזמנה
                              </Text>
                            </Box>

                            <Text
                              fontWeight="500"
                              fontSize="22px"
                              lineHeight="30px"
                              color="naturalBlack"
                            >
                              ₪
                              {(cart.products &&
                                cart.products.length >= 1 &&
                                Math.round(
                                  cart.products.reduce(
                                    (a, b) =>
                                      parseFloat(a) +
                                      parseFloat(b.product.price * b.amount),
                                    0
                                  ) * 100
                                ) / 100) ||
                                "0"}
                            </Text>
                          </Flex>
                          <Box mt="38px">
                            <Button.Secondary
                              aria-label="link to keep shoping"
                              borderColor="primary"
                              color="primary"
                              fontSize="20px"
                              role="button"
                              onClick={onClose}
                            >
                              להמשיך בקניות
                            </Button.Secondary>
                            <Spacer h="4" />
                            <Button>
                              <Flex
                                aria-label="link to pay my cart"
                                role="button"
                                alignItems="center"
                                gap="4"
                                onClick={() =>
                                  (window.location.href =
                                    routes.ShoppingCart.path)
                                }
                              >
                                לתשלום <ArrowBackIcon />
                              </Flex>
                            </Button>
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </>
                  )}
                </Popover>
                <Menu placement="bottom">
                  <MenuButton>
                    <IconButton
                      aria-label="open user links"
                      role="button"
                      icon={<UserIcon />}
                      bgColor="#1D5FE8" //rgba(255,255,255,0.2)
                      _hover={{ bg: "rgba(255,255,255,0.3)" }}
                    />

                    {/*  <Avatar
                      w="40px"
                      h="40px"
                      //name={user.userName}
                    
                      src={user.profileImage}
                      borderRadius="8px"
                          />*/}
                  </MenuButton>
                  {token !== null ? (
                    <MenuList
                      dir="rtl"
                      w="223px"
                      p="20px 10px"
                      bg="white"
                      borderRadius="12px"
                      shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
                    >
                      <MenuItemComponent
                        path={routes.HOME.path}
                        icon={HomeIcon}
                        name="ראשי"
                      />
                      <MenuItemComponent
                        path={
                          userLogged
                            ? routes.UserSettingsMySales.path
                            : routes.LOGIN.path
                        }
                        icon={MessengerIcon}
                        name="מכירות"
                      />
                      <MenuItemComponent
                        path={
                          userLogged
                            ? routes.UserSettingsMyOrders.path
                            : routes.LOGIN.path
                        }
                        icon={OrderIcon}
                        name="הזמנות"
                      />
                      <MenuItemComponent
                        path={
                          userLogged
                            ? routes.UserSettingsShippingAddress.path
                            : routes.LOGIN.path
                        }
                        icon={BillingIcon}
                        name="כתובת למשלוח"
                      />
                   {/*} <MenuItemComponent
                        path={
                          userLogged
                            ? routes.UserSettingsDeliveryTraker.path
                            : routes.LOGIN.path
                        }
                        icon={SettingsIcon}
                        name="מעקב משלוחים"
                      />*/}
                      <Divider h="1px" bg="#D9D9D9" my="19px" />

                      <MenuItemComponent
                        path={
                          userLogged
                            ? routes.UserSettingsDetails.path
                            : routes.LOGIN.path
                        }
                        icon={SettingIcon}
                        name="עדכון פרטים"
                      />
                      {userLogged ? (
                        <MenuItemComponent
                          onClick={() => {
                            logout();
                            window.location.href = routes.HOME.path;
                          }}
                          icon={LogoutIcon}
                          name="התנתק"
                        />
                      ) : (
                        <MenuItemComponent
                          path={routes.LOGIN.path}
                          icon={LogoutIcon}
                          name="התחבר"
                        />
                      )}
                    </MenuList>
                  ) : (
                    <MenuList
                      dir="rtl"
                      border="none"
                      p="10px"
                      bg="white"
                      //w="150px"
                      borderRadius="12px"
                      shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
                    >
                      <MenuItem bg="white" _hover={{ bg: "white" }} p="0">
                        <Flex w="full" justifyContent="space-between">
                          <Button
                            w="95px"
                            h="40px"
                            fontSize="18px"
                            href={routes.LOGIN.path}
                          >
                            התחבר
                          </Button>
                          <Button.Secondary
                            w="95px"
                            h="39px"
                            fontSize="18px"
                            borderColor="primary"
                            href={routes.SIGNUP.path}
                          >
                            הירשם
                          </Button.Secondary>
                        </Flex>
                      </MenuItem>
                    </MenuList>
                  )}
                </Menu>
              </Flex>

             {/*} <Menu direction="rtl">
                <MenuButton
                  role="button"
                  aria-label="show website details"
                  as={ChakraButton}
                  bg="transparent"
                  _hover={{ bg: "transparent", color: "secondaryLight" }}
                  _active={{ bg: "transparent" }}
                  _focus={{ bg: "transparent" }}
                  textColor="white"
                  dir="rtl"
                >
                  <Flex gap="2" alignItems="center">
                    <Image
                      alt="israel flag"
                      src={process.env.PUBLIC_URL + "/assets/israel.svg"}
                    />
                    <Flex
                      display={{ lg: "none", xl: "flex" }}
                      gap="1"
                      alignItems="center"
                    >
                      <Text>עברית</Text>
                      <Icon5 />
                    </Flex>
                  </Flex>
                </MenuButton>
                <MenuList
                  dir="rtl"
                  p="10px"
                  w="244px"
                  h="210px"
                  border="none"
                  borderRadius="12px"
                >
                  <CountrySelect
                    website={window.localStorage.getItem("website") || {}}
                  />
                </MenuList>
                  </Menu>*/}
            </Flex>
          </Flex>
        </Box>

        <Box
          w="100%"
          className={hideOnScroll ? "hide" : ""}
          bg={withSidebar ? "white" : "othersLight"}
          p="2"
          id={!fixedLinks ? "category" : "category-stick"}
          borderBottom="1px solid transparent"
          borderColor={withSidebar ? "naturalLight" : "othersLight"}
          mt="80px"
        >
          <Flex justifyContent="center" gap="10">
            <ButtonGroup size="sm">
              <ChakraButton
                mx="4"
                px="20px"
                bgGradient="linear(to-r, #FF66A9, #F53689)"
                borderRadius="8px"
                _hover={{ opacity: "0.9" }}
                textColor="white"
                onClick={() =>
                  (window.location.href = routes.CreateProduct.path)
                }
                aria-label="link to create new sale"
                role="button"
              >
                מכירה חדשה
              </ChakraButton>
              <ChakraButton
                variant="link"
                px="4"
                textColor="primary"
                fontSize="16px"
                fontWeight="normal"
                _hover={{ textColor: "secondaryColor" }}
                bg="transparent"
                onClick={() => (window.location.href = routes.ContactUs.path)}
                aria-label="link to contact us"
                role="button"
              >
                יצירת קשר
              </ChakraButton>
              <ChakraButton
                px="4"
                variant="link"
                textColor="primary"
                fontSize="16px"
                fontWeight="normal"
                _hover={{ textColor: "secondaryColor" }}
                bg="transparent"
                onClick={() => (window.location.href = routes.FAQ.path)}
                aria-label="link to learn how to sale"
                role="button"
              >
                איך מוכרים
              </ChakraButton>
              <ChakraButton
                variant="link"
                px="4"
                textColor="primary"
                fontSize="16px"
                fontWeight="normal"
                _hover={{ textColor: "secondaryColor" }}
                bg="transparent"
                onClick={() => (window.location.href = routes.AddCategory.path)}
                aria-label="link to sales"
                role="button"
              >
                מכירות רגילות
              </ChakraButton>
             {/*} <ChakraButton
                variant="link"
                px="4"
                textColor="primary"
                fontSize="16px"
                fontWeight="normal"
                _hover={{ textColor: "secondaryColor" }}
                bg="transparent"
                onClick={() =>
                  (window.location.href = routes.Categories.path.replace(
                    ":category",
                    "main-categories"
                  ))
                }
                aria-label="link to start bying"
                role="button"
              >
                קנייה
              </ChakraButton>*/}
              <ChakraButton
                variant="link"
                px="4"
                textColor="primary"
                fontSize="16px"
                fontWeight="normal"
                _hover={{ textColor: "secondaryColor" }}
                bg="transparent"
                aria-label="link to sale bid"
                onClick={() =>
                  (window.location.href =
                    routes.Category.path.replace(":category", "") + "food")
                }
                role="button"
              >
                מכירות פומביות
              </ChakraButton>
              <Menu placement="auto">
                <MenuButton
                  _hover={{ color: "secondaryColor" }}
                  px="4"
                  variant="link"
                  color="primary"
                  fontSize="16px"
                  fontWeight="normal"
                  bg="transparent"
                  aria-label="show top categories"
                  role="button"
                >
                  כל הקטגוריות
                </MenuButton>
                <MenuList
                  dir="rtl"
                  p="50px 30px"
                  bg="white"
                  borderRadius="12px"
                  shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
                >
                  <MenuItemCategory />
                </MenuList>
              </Menu>
            </ButtonGroup>
          </Flex>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            dir="rtl"
            borderRadius="21px"
            shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
            w="600px"
            h="378px"
          >
            <ModalCloseButton
              bg="naturalLightest"
              color="naturalDarkest"
              w="34.94px"
              h="34.94px"
              borderRadius="full"
              right="10px"
              top="10px"
            />

            <ModalBody>
              <Flex
                mt="2"
                flexDirection="column"
                alignItems="center"
                h="full"
                gap="4"
                justifyContent="center"
              >
                <Box w="252px" textAlign="center">
                  <Text
                    fontSize="28px"
                    fontWeight="semibold"
                    color="naturalBlack"
                  >
                    האם אתה בטוח רוצה למחוק את הפריט מהסל
                  </Text>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex
                justifyContent="center"
                alighItems="center"
                w="full"
                gap="4"
              >
                <Button
                  w="96px"
                  h="52px"
                  fontSize="18px"
                  lineHeight="20px"
                  role="button"
                  onClick={() => {
                    return onClose();
                  }}
                >
                  אישור
                </Button>
                <Button.Secondary
                  w="96px"
                  h="52px"
                  fontSize="18px"
                  lineHeight="20px"
                  borderColor="primary"
                  border="2px solid"
                  role="button"
                  onClick={onClose}
                >
                  ביטול
                </Button.Secondary>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Flex
        display={{ base: logo && "flex", md: "none" }}
        justifyContent="center"
        alignItems="center"
        id="navbar"
        w="100%"
        bg="primary"
        h="65px"
      >
        <Link to="/" role="link" aria-label="link to website">
          <SmallLOGOIcon />
        </Link>
      </Flex>

      <Flex
        display={{ base: logo ? "none" : "flex", md: "flex", lg: "none" }}
        justifyContent="space-between"
        flexDir="column"
        id="navbar"
        w="100%"
        p="18px"
        bg="primary"
        h="131px"
      >
        <Flex justifyContent="space-between">
          <Link to="/" role="link" aria-label="link to website">
            <SmallLOGOIcon />
          </Link>
          <Flex gap="15px">
            <Menu placement="bottom" role="menu">
              <MenuButton aria-label="open user links">
                {user.profileImage !== "" ? (
                  <Avatar
                    w="22px"
                    h="22px"
                    //name={user.userName}
                    src={user.profileImage}
                    borderRadius="8px"
                  />
                ) : (
                  <UserMobileIcon />
                )}
              </MenuButton>
              {token !== null ? (
                <MenuList
                  dir="rtl"
                  w="223px"
                  p="20px 10px"
                  bg="white"
                  borderRadius="12px"
                  shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
                >
                  <MenuItemComponent
                    path={routes.HOME.path}
                    icon={HomeIcon}
                    name="ראשי"
                  />
                  <MenuItemComponent
                    path={
                      userLogged
                        ? routes.UserSettingsMySales.path
                        : routes.LOGIN.path
                    }
                    icon={MessengerIcon}
                    name="מכירות"
                  />
                  <MenuItemComponent
                    path={
                      userLogged
                        ? routes.UserSettingsMyOrders.path
                        : routes.LOGIN.path
                    }
                    icon={OrderIcon}
                    name="הזמנות"
                  />
                  <MenuItemComponent
                    path={
                      userLogged
                        ? routes.UserSettingsShippingAddress.path
                        : routes.LOGIN.path
                    }
                    icon={BillingIcon}
                    name="כתובת למשלוח"
                  />
               {/*} <MenuItemComponent
                    path={
                      userLogged
                        ? routes.UserSettingsDeliveryTraker.path
                        : routes.LOGIN.path
                    }
                    icon={SettingsIcon}
                    name="מעקב משלוחים"
                  />*/}
                  <Divider h="1px" bg="#D9D9D9" my="19px" />

                  <MenuItemComponent
                    path={
                      userLogged
                        ? routes.UserSettingsDetails.path
                        : routes.LOGIN.path
                    }
                    icon={SettingIcon}
                    name="עדכון פרטים"
                  />
                  {userLogged ? (
                    <MenuItemComponent
                      onClick={() => {
                        logout();
                        window.location.href = routes.HOME.path;
                      }}
                      icon={LogoutIcon}
                      name="התנתק"
                    />
                  ) : (
                    <MenuItemComponent
                      path={routes.LOGIN.path}
                      icon={LogoutIcon}
                      name="התחבר"
                    />
                  )}
                </MenuList>
              ) : (
                <MenuList
                  dir="rtl"
                  border="none"
                  p="10px"
                  bg="white"
                  //w="150px"
                  borderRadius="12px"
                  shadow="0px 1px 54px rgba(35, 38, 59, 0.2)"
                >
                  <MenuItem bg="white" _hover={{ bg: "white" }} p="0">
                    <Flex w="full" justifyContent="space-between">
                      <Button
                        w="95px"
                        h="40px"
                        fontSize="18px"
                        href={routes.LOGIN.path}
                        role="button"
                      >
                        התחבר
                      </Button>
                      <Button.Secondary
                        w="95px"
                        h="39px"
                        fontSize="18px"
                        borderColor="primary"
                        href={routes.SIGNUP.path}
                        role="button"
                      >
                        הירשם
                      </Button.Secondary>
                    </Flex>
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
            <Popover closeOnBlur={false}>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      role="list"
                    >
                      <CartIcon2 />
                      {cart.products && cart.products.length > 0 && (
                        <Flex
                          position="absolute"
                          //top="1"
                          //right="1"
                          mb="10px"
                          ml="15px"
                          alignItems="center"
                          justifyContent="center"
                          w="14px"
                          h="14px"
                          //pt="1px"
                          borderRadius="full"
                          bg="otherError"
                          border="2px solid transparent"
                          borderColor="primary"
                        >
                          <Text
                            fontSize="8px"
                            mt="1px"
                            lineHeight="8px"
                            textColor="white"
                          >
                            {cart.products.length}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </PopoverTrigger>
                  <PopoverContent
                    // h="637px"
                    w="357px"
                    borderRadius="16px"
                    border="none"
                    bg="white"
                    shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
                  >
                    <PopoverArrow />
                    <PopoverCloseButton
                      size="sm"
                      position="absolute"
                      left="0"
                      top="68.7px"
                      transform="translateX(-50%)"
                      bg="white"
                      border="1.24779px solid"
                      borderColor="naturalDark"
                      borderRadius="full"
                    />
                    <PopoverBody py="6" px="6" dir="rtl">
                      <Flex alignItems="center" justifyContent="space-between">
                        <Flex gap="2" fontSize="16px" lineHeight="16.5px">
                          <Text color="naturalDarkest" fontWeight="semibold">
                            העגלה שלי
                          </Text>
                          <Text color="naturalDarkest">
                            ({products.length})
                          </Text>
                        </Flex>

                        <ChakraButton
                          variant="link"
                          onClick={() => deleteMyCart()}
                          style={{ textDecoration: "none" }}
                          color="primaryLight"
                          fontSize="13px"
                          aria-label="clear your cart"
                          role="button"
                        >
                          רוקן עגלה
                          <TrashIcon fill="#003DFF" />
                        </ChakraButton>
                      </Flex>
                      <Spacer h="10px" />
                      <Box overflow="auto" className="slider-container">
                        <Slider {...settings}>
                          {products && (
                            <>
                              {products.map((p, key) => (
                                <React.Fragment key={key}>
                                  <NavCartListItem
                                    title={p.product.title}
                                    price={p.product.price}
                                    images={p.product.images}
                                    amount={p.amount}
                                    quantity={p.product.quantity}
                                    onChangeAmount={(amount) =>
                                      updateAmount(p.product, amount, p.amount)
                                    }
                                    onDelete={() => {
                                      const a = window.confirm(
                                        "האם אתה בטוח שברצונך למחוק את המוצר מהעגלה?"
                                      );
                                      if (a) {
                                        removeProductFromCart(p.product.id);
                                      }
                                    }}
                                  />
                                </React.Fragment>
                              ))}
                            </>
                          )}
                        </Slider>
                      </Box>

                      <Spacer h="38px" />
                      <Flex justifyContent="space-between">
                        <Box>
                          <Text
                            fontWeight="500"
                            fontSize="22px"
                            color="naturalBlack"
                            lineHeight="30px"
                          >
                            סך הכל
                          </Text>
                          <Text
                            color="naturalDark"
                            fontSize="14px"
                            lineHeight="22px"
                          >
                            משלוח, עמלות ומיסים יחושבו בשעת ההזמנה
                          </Text>
                        </Box>

                        <Text
                          fontWeight="500"
                          fontSize="22px"
                          lineHeight="30px"
                          color="naturalBlack"
                        >
                          ₪
                          {(cart.products &&
                            cart.products.length >= 1 &&
                            Math.round(
                              cart.products.reduce(
                                (a, b) =>
                                  parseFloat(a) +
                                  parseFloat(b.product.price * b.amount),
                                0
                              ) * 100
                            ) / 100) ||
                            "0"}
                        </Text>
                      </Flex>
                      <Box mt="38px">
                        <Button.Secondary
                          aria-label="link to keep shoping"
                          borderColor="primary"
                          color="primary"
                          fontSize="20px"
                          role="button"
                          onClick={onClose}
                        >
                          להמשיך בקניות
                        </Button.Secondary>
                        <Spacer h="4" />
                        <Button>
                          <Flex
                            alignItems="center"
                            gap="4"
                            aria-label="link to pay my cart"
                            role="button"
                            onClick={() =>
                              (window.location.href = routes.ShoppingCart.path)
                            }
                          >
                            לתשלום <ArrowBackIcon />
                          </Flex>
                        </Button>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>

            <Popover>
              <PopoverTrigger>
                <Flex justifyContent="center" alignItems="center" role="list">
                  <MobileList />
                </Flex>
              </PopoverTrigger>
              <PopoverContent
                w="270px"
                border="none"
                bg="white"
                dir="rtl"
                shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
              >
                <PopoverArrow />
                <PopoverCloseButton
                  size="lg"
                  color="primary"
                  right="2"
                  //left="100"
                  top="2"
                  //position="absolute"
                  //top="68.7px"
                  //transform="translateX(-50%)"
                  bg="white"
                />
                <PopoverBody py="80px" px="6" dir="rtl">
                  <Flex
                    flexDir="column"
                    justifyContent="center"
                    gap="30px"
                    dir="rtl"
                  >
                    <ChakraButton
                      h="40px"
                      fontSize="14px"
                      fontWeight="normal"
                      bgGradient="linear(to-r, #FF66A9, #F53689)"
                      borderRadius="8px"
                      _hover={{ opacity: "0.9" }}
                      textColor="white"
                      shadow="inherit"
                      aria-label="link to create new sale"
                      role="button"
                      onClick={() =>
                        (window.location.href = routes.CreateProduct.path)
                      }
                    >
                      מכירה חדשה
                    </ChakraButton>
                    <Flex flexDir="column" justifyContent="center" gap="8px">
                      <ChakraButton
                        h="50px"
                        fontSize="18px"
                        fontWeight="normal"
                        textColor="naturalDarkest"
                        borderRadius="8px"
                        _hover={{ bg: "primaryLight", textColor: "white" }}
                        bg="naturalLightest"
                        role="button"
                        onClick={() =>
                          (window.location.href =
                            routes.Categories.path.replace(
                              ":category",
                              "main-categories"
                            ))
                        }
                      >
                        כל הקטגוריות
                      </ChakraButton>
                      <ChakraButton
                        h="50px"
                        fontSize="18px"
                        fontWeight="normal"
                        textColor="naturalDarkest"
                        borderRadius="8px"
                        _hover={{ bg: "primaryLight", textColor: "white" }}
                        bg="naturalLightest"
                        aria-label="link to sale bids"
                        role="button"
                        onClick={
                          () =>
                            (window.location.href =
                              routes.Category.path.replace(":category", "") +
                              "food") //?type=auctions"
                        }
                      >
                        מכירות פומביות
                      </ChakraButton>
                      <ChakraButton
                        h="50px"
                        fontSize="18px"
                        fontWeight="normal"
                        textColor="naturalDarkest"
                        borderRadius="8px"
                        _hover={{ bg: "primaryLight", textColor: "white" }}
                        bg="naturalLightest"
                        aria-label="link to start buying"
                        role="button"
                        onClick={() =>
                          (window.location.href = routes.HOME.path)
                        }
                      >
                        קנייה מיידית
                      </ChakraButton>
                      {/*<ChakraButton
                        h="50px"
                        fontSize="18px"
                        fontWeight="normal"
                        textColor="naturalDarkest"
                        borderRadius="8px"
                        _hover={{ bg: "primaryLight", textColor: "white" }}
                        bg="naturalLightest"
                        aria-label="link to sales"
                        role="button"
                        onClick={() =>
                          (window.location.href = routes.HOME.path)
                        }
                      >
                        מבצעים
                      </ChakraButton>*/}
                      <ChakraButton
                        h="50px"
                        fontSize="18px"
                        fontWeight="normal"
                        textColor="naturalDarkest"
                        borderRadius="8px"
                        _hover={{ bg: "primaryLight", textColor: "white" }}
                        bg="naturalLightest"
                        aria-label="link to learn how to sale"
                        role="button"
                        onClick={() => (window.location.href = routes.FAQ.path)}
                      >
                        איך מוכרים?
                      </ChakraButton>
                      <ChakraButton
                        h="50px"
                        fontSize="18px"
                        fontWeight="normal"
                        textColor="naturalDarkest"
                        borderRadius="8px"
                        _hover={{ bg: "primaryLight", textColor: "white" }}
                        bg="naturalLightest"
                        aria-label="link to contact us"
                        role="button"
                        onClick={() =>
                          (window.location.href = routes.ContactUs.path)
                        }
                      >
                        יצירת קשר
                      </ChakraButton>
                    </Flex>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
        <SearchComponent
                value={query}
                onChange={(e) => setQuery(e)}
                onClick={() =>
                  (window.location.href = "/category?query=" + query)
                }
              />
      </Flex>
    </>
  );
}

const MenuItemComponent = ({ path, name, icon, ...rest }) => {
  const Icon = icon;
  const location = useLocation();
  const [active, setActive] = useState(
    location.pathname.includes(path) && path !== "/"
  );

  return (
    <Link to={path}>
      <MenuItem
        {...rest}
        borderRadius="8px"
        bg={active ? "othersLight" : "white"}
        _hover={{ bg: "othersLight", color: "primary" }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        color="naturalDark"
        h="44px"
        role="button"
      >
        <Flex alignItems="center" gap="16px">
          <Icon fill={active ? "#0738D2" : "#91929D"} />
          <Text
            textColor={active ? "primary" : "naturalDark"}
            fontSize="14px"
            fontWeight="500"
          >
            {name}
          </Text>
        </Flex>
      </MenuItem>
    </Link>
  );
};

const MenuItemCategory = () => {
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    getTopCategories()
      .then((res) => {
        setTopCategories(res.categories);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MenuItem
      id="category"
      bg="white"
      _hover={{ bg: "white" }}
      color="naturalBlack"
      h="344px"
      w="max"
      role="button"
    >
      <Box pt="8px">
        <Flex alignItems="center" gap="16px">
          {topCategories[0] &&
            topCategories.slice(0, 5).map((category, index) => (
              <Flex flexDir="column" gap="10px" w="110px" key={index}>
                <Flex dir="rtl" gap="3px" alignItems="center" onClick={() => {
                    window.location.href = `${routes.Categories.path.replace(
                      ":category",
                      ""
                    )}${category.title}`;
                  }}>
                  <Text fontSize="14px" fontWeight="semibold">
                    {category.name}
                  </Text>
                  <ArrowIcon />
                </Flex>
                {category.subcategories.length > 0
                  ? category.subcategories.map((subcategory, index) => (
                      <Text
                        key={index}
                        _hover={{ color: "primary" }}
                        cursor="pointer"
                        onClick={() =>
                          (window.location.href = routes.Category.path
                            .replace(":main-category", category.title)
                            .replace(":category", subcategory.title))
                        }
                        fontSize="13px"
                      >
                        {subcategory.name}
                      </Text>
                    ))
                  : ["אספנות", "אספנות", "אספנות", "אספנות"].map(
                      (subcategory, index) => (
                        <Text
                          key={index}
                          _hover={{ color: "primary" }}
                          cursor="pointer"
                          onClick={() =>
                            (window.location.href = routes.Category.path
                              .replace(":main-category", category.title)
                              .replace(":category", subcategory.title))
                          }
                          fontSize="13px"
                        >
                          {subcategory}
                        </Text>
                      )
                    )}
              </Flex>
            ))}
        </Flex>
        <Box my="20px" w="full" h="1px" bg="#D9D9D9"></Box>
        <Flex alignItems="center" gap="16px">
          {topCategories[0] &&
            topCategories.slice(5, 10).map((category, index) => (
              <Flex flexDir="column" gap="10px" w="110px" key={index}>
                <Flex dir="rtl" gap="3px" alignItems="center" onClick={() => {
                    window.location.href = `${routes.Categories.path.replace(
                      ":category",
                      ""
                    )}${category.title}`;
                  }}>
                  <Text fontSize="14px" fontWeight="semibold">
                    {category.name}
                  </Text>
                  <ArrowIcon />
                </Flex>
                {category.subcategories.length > 0
                  ? category.subcategories.map((subcategory, index) => (
                      <Text
                        key={index}
                        _hover={{ color: "primary" }}
                        cursor="pointer"
                        onClick={() =>
                          (window.location.href = routes.Category.path
                            .replace(":main-category", category.title)
                            .replace(":category", subcategory.title))
                        }
                        fontSize="13px"
                      >
                        {subcategory.name}
                      </Text>
                    ))
                  : ["אספנות", "אספנות", "אספנות", "אספנות"].map(
                      (subcategory, index) => (
                        <Text
                          key={index}
                          _hover={{ color: "primary" }}
                          cursor="pointer"
                          onClick={() =>
                            (window.location.href = routes.Category.path
                              .replace(":main-category", category.title)
                              .replace(":category", subcategory.title))
                          }
                          fontSize="13px"
                        >
                          {subcategory}
                        </Text>
                      )
                    )}
              </Flex>
            ))}
          {/*} <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
            <Text
              _hover={{ color: "primary" }}
              cursor="pointer"
              onClick={() =>
                (window.location.href = routes.Category.path.replace(
                  ":category",
                  ""
                ))
              }
              fontSize="13px"
            >
              אספנות
            </Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
          </Flex>
        </Flex>
        <Box my="20px" w="full" h="1px" bg="#D9D9D9"></Box>
        <Flex alignItems="center" gap="16px">
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
          </Flex>
          <Flex flexDir="column" gap="10px" w="110px">
            <Flex dir="rtl" gap="3px" alignItems="center">
              <Text fontSize="14px" fontWeight="semibold">
                אספנות
              </Text>
              <ArrowIcon />
            </Flex>

            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            <Text fontSize="13px">אספנות</Text>
            </Flex>*/}
        </Flex>
        <Box my="20px" w="full" h="1px" bg="#D9D9D9"></Box>
        <Flex dir="rtl" gap="3px" alignItems="center">
          <Button.TextButton
            fontSize="14px"
            color="naturalDarkest"
            _hover={{ color: "primary" }}
            href={routes.Categories.path.replace(
              ":category",
              "main-categories"
            )}
          >
            לכל הקטגוריות
          </Button.TextButton>
          <ArrowIcon />
        </Flex>
      </Box>
    </MenuItem>
  );
};

/* const updateAmount = (product, size, model, newAmount, amount) => {
    if (token === null)
      addToCart({ product: product, amount: newAmount - amount, size, model })
        .then((res) => {
          console.log(res);
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.map((p) => {
              if (
                p.product.id === product.id &&
                p.size === size &&
                p.model === model
              ) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      updateCart({
        productId: product.id,
        size,
        model,
        amount: newAmount - amount,
      })
        .then((res) => {
          console.log(res);
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.map((p) => {
              if (
                p.product.id === product.id &&
                p.size === size &&
                p.model === model
              ) {
                return { ...p, amount: p.amount + newAmount - amount };
              }
              return p;
            });
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeProductFromCart = (productId, size, model) => {
    if (token === null)
      removeFromCart({ productId, size, model })
        .then((res) => {
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(
              (p) =>
                !(
                  p.product.id === productId &&
                  p.size === size &&
                  p.model === model
                )
            );
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromCart(productId, size, model)
        .then((res) => {
          setCart((prevCart) => {
            const updatedProducts = prevCart.products.filter(
              (p) =>
                !(
                  p.product.id === productId &&
                  p.size === size &&
                  p.model === model
                )
            );
            setProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };*/
