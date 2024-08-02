import {
  Box,
  Card,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState, memo, useMemo, useEffect } from "react";
import { HeartIcon, HeartFullIcon } from "../Icons";
import { routes } from "../../routes";
import Badge from "../Badge";
import Button from "../Button";
import ProductBuyCard from "../ProductBuyCard";
import ProductTimeClock from "../ProductTimeClock";
import { addOffer } from "../../utils/api/offers";
import { useDisclosure } from "@chakra-ui/react";
import { useWishList } from "../Contexts/WishListContext";

export default memo(function CartItemGallery(props) {
  const [inWishList, setInWishList] = useState(false);
  const { addProductToWishList,
    removeProductFromWishList } = useWishList()
  const product = props.data;
  const [hover, setHover] = useState(false);
  const { onOpen, onClose, isOpen } = useDisclosure();

  const addNewOffer = useMemo((price) => {
    addOffer(product._id, price)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [product._id]);

 /* const addWish = () => {
    if (token === null)
      addToWishList({
        product: {
          id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          discount: product.discount,
          images: product.images,
          quantityLeft: product.quantityLeft,
          pin: product.pin,
        },
        amount: 1,
        size: "S",
        model: "1",
      })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      addNewWish({ productId: product._id, amount: 1, size: "S", model: "1" })
        .then((res) => {
          setInWishList(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const removeWish = () => {
    if (token === null)
      removeFromWishList({
        productId: product._id,
        size: "S",
        model: "1",
      })
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else
      deleteFromWishList(product._id, "S", "1")
        .then((res) => {
          setInWishList(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  /*const deleteP = () => {
    deleteProduct(product._id).then().catch();
  };*/

  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  if (product !== undefined) {
    let images = product.images || [];
    if (images.length === 0) {
      images = [];
    }
    return (
      <>
        <Card
          className="galleryCard"
          cursor="pointer"
          w="100%"
          borderRadius="32px"
          dir="rtl"
          p="10px"
          bg="white"
          position="relative"
          border="2px solid"
          borderColor="naturalLightest"
          shadow="none"
          _hover={{ shadow: "xl", border: "none" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          display={{ base: "none", md: "block" }}
          onClick={() =>
            (window.location.href = product.openingPrice
              ? routes.ProductPageAuction.path.replace(":id", "") + product._id
              : routes.ProductPage.path.replace(":id", "") + product._id)
          }
        >
          <Image
            w="auto"
            aspectRatio="1/1"
            borderRadius="26px"
            objectFit="cover"
            src={images && images[0]}
          />
          <Box px="2">
            {product.openingPrice && (
              <Box>
                <Flex justifyContent="center" transform="translateY(-50%)">
                  <ProductTimeClock
                    date={product.startTime}
                    frame={product.timeFrame}
                  />
                </Flex>
                <Spacer h="1px" />
              </Box>
            )}
            {!product.openingPrice && <Spacer h={{ md: "5", xl: "10" }} />}
            <Flex flexDir="column" justifyContent="space-between" h="118px">
              <Flex flexDir="column" gap="2">
                <Text
                  fontSize={{ md: "18px", xl: "20px", "2xl": "24px" }}
                  letterSpacing="-0.01em"
                  lineHeight="24px"
                  //height="48px"
                  display="-webkit-box"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  id="desc"
                >
                  {product.title}
                </Text>
                {props.myItem &&
                  (product.openingPrice ? (
                    <Text
                      fontSize="18px"
                      letterSpacing="-0.01em"
                      lineHeight="24px"
                    >
                      {product.offers.length} הצעות
                    </Text>
                  ) : (
                    <Text
                      fontSize="18px"
                      letterSpacing="-0.01em"
                      lineHeight="24px"
                    >
                      {product.numOfBuy} הזמנות
                    </Text>
                  ))}
              </Flex>
              <Spacer h={{ md: "5", xl: "10" }} />
              <Flex justifyContent="space-between" alignItems="center">
                {product.openingPrice ? (
                  <>
                    {product.winningPrice === 0 ? (
                      <Box flex="1">
                        <Text fontSize={{md: "14px", lg: "18px"}} color="naturalDark">
                          הצעה מובילה
                        </Text>
                        <Text
                          fontWeight="medium"
                          fontSize={{md: product.openingPrice >= 100000 ? "16px" : "18px", lg: "24px"}}
                          lineHeight={{md: "24px", lg: "26px", xl: "30px"}}
                        >
                          {removeDecimal(product.currentPrice || product.openingPrice)} ₪
                        </Text>
                      </Box>
                    ) : (
                      <Box flex="1">
                        <Text fontSize={{md: "14px", lg: "18px"}} color="naturalDark">
                          נמכר
                        </Text>
                        <Text
                          fontWeight="medium"
                          fontSize={{md: product.openingPrice >= 100000 ? "16px" : "18px", lg: "24px"}}
                          lineHeight={{md: "24px", lg: "26px", xl: "30px"}}
                        >
                          {product.winningPrice} ₪
                        </Text>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box flex="1">
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color="naturalDark"
                    >
                      מחיר
                    </Text>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: product.price >= 10000 ? "16px" : "18px", lg: "20px", xl: "24px" }}
                      lineHeight={{ base: "24px", lg: "26px", xl: "30px" }}
                    >
                      {removeDecimal(product.price)} ₪
                    </Text>
                  </Box>
                )}
                {!props.myItem && (
                  <>
                    {product.openingPrice ? (
                      <>
                        {product.winningPrice === 0 && new Date(product.endTime) > new Date() ? (
                          <Box>
                            <Popover
                              postion="relative"
                              zIndex={4}
                              id="offer"
                              className="addOffer"
                              placement="top"
                              isOpen={isOpen}
                              onOpen={onOpen}
                              onClose={(e) => {e.stopPropagation(); onClose()}}
                              closeOnBlur={false}
                            >
                              <PopoverTrigger>
                                <Button
                                  w={{
                                    base: "100px",
                                    md: "80px",
                                    lg: "120px",
                                    xl: "126px",
                                  }}
                                  h={{ base: "50px", xl: "60px" }}
                                  fontSize={{base: "18px", md: "16px", lg:  "18px"}}
                                  lineHeight="20px"
                                  onClick={(e) => {//להעביר לסל קניות?
                                    e.stopPropagation();}}
                                >
                                  הצע מחיר
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                w="370px"
                                border="none"
                                px="4"
                                py="6"
                                pt="12"
                                boxShadow="md"
                                borderRadius="16px"
                              >
                                <PopoverBody border="none">
                                  <ProductBuyCard
                                    title="אשר את הצעתך"
                                    value={product.price}
                                    onClose={onClose}
                                    addNewOffer={(price) => addNewOffer(price)}
                                  />
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Box>
                        ) : (
                          <Box position="relative">
                            <Button
                              w={{ base: "100px", lg: "120px", xl: "126px" }}
                              h={{ base: "50px", xl: "60px" }}
                              fontSize="18px"
                              lineHeight="20px"
                              isDisabled
                            >
                              הצע מחיר
                            </Button>
                          </Box>
                        )}
                      </>
                    ) : (
                      <Box position="relative">
                        <Button
                          w={{ base: "100px", lg: "120px", xl: "126px" }}
                          h={{ base: "50px", xl: "60px" }}
                          fontSize="18px"
                          lineHeight="20px"
                          onClick={(e) => {//להעביר לסל קניות?
                            e.stopPropagation();
                            window.location.href = product.openingPrice
                              ? routes.ProductPageAuction.path.replace(
                                  ":id",
                                  ""
                                ) + product._id
                              : routes.ProductPage.path.replace(":id", "") +
                                product._id;
                          }}
                        >
                          קנו עכשיו
                        </Button>
                      </Box>
                    )}
                  </>
                )}
                {props.myItem && (
                  <Box position="relative">
                    <Button
                      w="126px"
                      h="60px"
                      fontSize="18px"
                      lineHeight="20px"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href =
                          routes.UpdateProduct.path.replace(":id", product._id);
                      }}
                    >
                      עדכן מוצר
                    </Button>
                  </Box>
                )}
              </Flex>
            </Flex>
          </Box>
          {hover && (
            <Flex
              gap="4"
              pos="absolute"
              top={{base: "5", lg: "7"}}
              left="-3"
              w="full"
              alignItems="center"
              justifyContent="space-between"
              px={{base: "2", lg: "4"}}
            >
              {product.offers && !props.myItem ? (
                <Badge>
                  {product.offers ? product.offers.length : 0} הצעות
                </Badge>
              ) : (
                <Box></Box>
              )}
              {!props.myItem && (
                <Tooltip
                  placement="top"
                  p="2"
                  border="1px solid transparent"
                  borderColor="naturalDark"
                  borderRadius="10px"
                  bg="white"
                  dir="rtl"
                  color="naturalDarkest"
                  label={!inWishList ? "הוסף למועדפים" : "הסר מהמועדפים"}
                >
                  <IconButton
                    right="-6"
                    w="40px"
                    h="40px"
                    bg="white"
                    borderRadius="full"
                    //color="naturalDark"
                    fontSize="25"
                  >
                    {!inWishList ? (
                      <HeartIcon onClick={() => { addProductToWishList(product, 1); setInWishList(true)}} />
                    ) : (
                      <HeartFullIcon onClick={() => { removeProductFromWishList(product._id); setInWishList(false)}} />
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </Flex>
          )}
        </Card>
        <Box display={{ base: "block", md: "none" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() =>
            (window.location.href = product.openingPrice
              ? routes.ProductPageAuction.path.replace(":id", "") + product._id
              : routes.ProductPage.path.replace(":id", "") + product._id)
          }>
          <Image
            w="100%"
            aspectRatio="1/1"
            borderRadius="8px"
            objectFit="cover"
            src={images && images[0]}
          />

          {product.openingPrice && (
            <Box>
              <Flex justifyContent="center" transform="translateY(-50%)">
                <ProductTimeClock
                  date={product.startTime}
                  frame={product.timeFrame}
                />
              </Flex>
            </Box>
          )}
          <Flex
            mt={!product.openingPrice && "30px"}
            gap="10px"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text
            height="36px"
              className="name-text"
              fontSize="14px"
              letterSpacing="-0.01em"
              lineHeight="18px"
              display="-webkit-box"
              overflow="hidden"
              textOverflow="ellipsis"
              id="desc"
            >
              {product.title}
            </Text>
            {product.openingPrice ? (
              <>
                {product.winningPrice === 0 ? (
                  <Box>
                    <Text
                      textAlign="center"
                      fontSize="14px"
                      lineHeight="18px"
                      color="naturalDark"
                    >
                      הצעה מובילה
                    </Text>
                    <Text fontSize="20px" lineHeight="30px">
                     ₪  {removeDecimal(product.currentPrice || product.openingPrice)}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Text
                      textAlign="center"
                      fontSize="14px"
                      lineHeight="18px"
                      color="naturalDark"
                    >
                      נמכר
                    </Text>
                    <Text dir="rtl" fontSize="20px" lineHeight="30px">
                      ₪ {product.winningPrice}
                    </Text>
                  </Box>
                )}
              </>
            ) : (
              <Box>
                <Text
                  textAlign="center"
                  fontSize="14px"
                  lineHeight="18px"
                  color="naturalDark"
                >
                  מחיר
                </Text>
                <Text fontSize="20px" lineHeight="30px">
                  ₪{product.price}
                </Text>
              </Box>
            )}
            {!props.myItem && (
              <>
                {product.openingPrice ? (
                  <>
                    {product.winningPrice === 0 && new Date(product.endTime) > new Date() ? (
                      <Box>
                        <Popover
                          postion="relative"
                          zIndex={4}
                          id="offer"
                          className="addOffer"
                          placement="top"
                          isOpen={isOpen}
                          onOpen={onOpen}
                          onClose={onClose}
                          closeOnBlur={false}
                        >
                          <PopoverTrigger>
                            <Button
                              maxW="162px"
                              w="100%"
                              h="46px"
                              borderRadius="8px"
                              fontSize="16px"
                              lineHeight="26px"
                            >
                              הצע מחיר
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            w="360px"
                            border="none"
                            boxShadow="md"
                            borderRadius="16px"
                          >
                            <PopoverBody border="none">
                              <ProductBuyCard
                                title="אשר את הצעתך"
                                value={product.currentPrice || product.openingPrice}
                                onClose={onClose}
                                addNewOffer={(price) => addNewOffer(price)}
                              />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Box>
                    ) : (
                      <Box position="relative">
                        <Button
                          maxW="162px"
                          w="100%"
                          h="46px"
                          borderRadius="8px"
                          fontSize="16px"
                          lineHeight="26px"
                          isDisabled
                        >
                          הצע מחיר
                        </Button>
                      </Box>
                    )}
                  </>
                ) : (
                  <Box position="relative">
                    <Button
                      maxW="162px"
                      w="100%"
                      h="46px"
                      borderRadius="8px"
                      fontSize="16px"
                      lineHeight="26px"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = product.openingPrice
                          ? routes.ProductPageAuction.path.replace(":id", "") +
                            product._id
                          : routes.ProductPage.path.replace(":id", "") +
                            product._id;
                      }}
                    >
                      קנו עכשיו
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Flex>
          {hover && (
            <Flex
              gap="4"
              pos="absolute"
              top={{base: "5", lg: "7"}}
              left="-3"
              w="full"
              alignItems="center"
              justifyContent="space-between"
              px={{base: "2", lg: "4"}}
            >
              {product.offers && !props.myItem ? (
                <Badge>
                  {product.offers ? product.offers.length : 0} הצעות
                </Badge>
              ) : (
                <Box></Box>
              )}
              {!props.myItem && (
                <Tooltip
                  placement="top"
                  p="2"
                  border="1px solid transparent"
                  borderColor="naturalDark"
                  borderRadius="10px"
                  bg="white"
                  dir="rtl"
                  color="naturalDarkest"
                  label={!inWishList ? "הוסף למועדפים" : "הסר מהמועדפים"}
                >
                  <IconButton
                    right="-6"
                    w="40px"
                    h="40px"
                    bg="white"
                    borderRadius="full"
                    //color="naturalDark"
                    fontSize="25"
                  >
                    {!inWishList ? (
                      <HeartIcon onClick={() => { addProductToWishList(product, 1); setInWishList(true)}} />
                    ) : (
                      <HeartFullIcon onClick={() => { removeProductFromWishList(product._id); setInWishList(false)}} />
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </Flex>
          )}
        </Box>
      </>
    );
  }
})
