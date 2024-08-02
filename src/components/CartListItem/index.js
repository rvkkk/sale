import {
  Box,
  Card,
  Image,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { HeartFullIcon, HeartIcon } from "../Icons";
import { routes } from "../../routes";
import Badge from "../Badge";
import Button from "../Button";
import ProductBuyCard from "../ProductBuyCard";
import ProductTimeClock from "../ProductTimeClock";
import { addOffer } from "../../utils/api/offers";
import { useDisclosure } from "@chakra-ui/react";
import { useWishList } from "../Contexts/WishListContext";

export default memo(function CartListItem(props) {
  const [inWishList, setInWishList] = useState(false);
  const { addProductToWishList,
    removeProductFromWishList } = useWishList()
  const product = props.data;
  const { onOpen, onClose, isOpen } = useDisclosure();

  const addNewOffer = (price) => {
    addOffer(product._id, price)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  /*const addWish = () => {
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
  };*/

  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  return (
    <>
      <Card
        p="20px"
        borderRadius="30px"
        shadow="none"
        border="2px solid"
        borderColor="naturalLightest"
        _hover={{ shadow: "xl", border: "none" }}
        dir="rtl"
        cursor={"pointer"}
      >
        <Box>
          <Flex gap="4">      
              <Image
              borderRadius="26px"
              w={{ base: "100px", md: "120px", lg: "180px", xl: "200px", "2xl": "220px" }}
                aspectRatio="1/1"
                objectFit="cover"
                src={product.images && product.images[0]}
              />
            <Flex w="100%" flex="1" flexDir="row" gap="7" justifyContent="space-between">
              <Flex flex="1" flexDir="column" justifyContent="space-between">
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex flexDir="column" gap="1">
                    <Text
                      fontSize={{md: "16px", xl: "18px", "2xl": "20px"}}
                      letterSpacing="-0.01em"
                      lineHeight="23px"
                      fontWeight="light"
                      display="-webkit-box"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      id="desc"
                    >
                      {product.title}
                    </Text>
                    <Text
                      fontSize={{md: "14px", xl: "17px", "2xl": "18px"}}
                      letterSpacing="-0.01em"
                      lineHeight="23px"
                      color="naturalDarkest"
                      display="-webkit-box"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      id="desc"
                    >
                      {product.description}
                    </Text>
                  </Flex>
                  {/*product.openingPrice && (
                    <Box pt="50px" display="fixed" transform="translateX(80px)">
                      <Box>
                        <ProductTimeClock
                          date={product.startTime}
                          frame={product.timeFrame}
                        />
                      </Box>
                    </Box>
                  )*/}
                </Flex>
              </Flex>

              <Flex flex="1" flexDir="column" justifyContent="space-between" alignItems="end">
                <Flex justifyContent="end" gap="4" alignItems="center">
                  {product.openingPrice && (
                    <Badge>
                      {product.offers ? product.offers.length : 0} הצעות
                    </Badge>
                  )}
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
                      bg="white"
                      _hover={{ bg: "white" }}
                      w="30px"
                      h="30px"
                      borderRadius="full"
                      fontSize="25"
                    >
                       {!inWishList ? (
                      <HeartIcon onClick={() => { addProductToWishList(product, 1); setInWishList(true)}} />
                    ) : (
                      <HeartFullIcon onClick={() => { removeProductFromWishList(product._id); setInWishList(false)}} />
                    )}
                      {/*!inWishList ? (
                        <HeartIcon onClick={addWish} />
                      ) : (
                        <HeartIcon fill="#0738D2" onClick={removeWish} />
                      )*/}
                    </IconButton>
                  </Tooltip>
                </Flex>

                {product.currentPrice ? (
                                    <Flex w={{md: "200px", lg: "230px", xl: "280px", "2xl": "300px"}} gap={{md: "3", xl: "6"}} alignItems="end" justifyContent="end">
                    {product.winningPrice === 0 ? (
                      <>
                        <Box flex="1">
                          <Text fontSize={{base: "16px", lg: "18px"}} color="naturalDark">
                            הצעה מובילה
                          </Text>
                          <Text
                            dir="rtl"
                            fontWeight="medium"
                            fontSize={{base: "18px", lg: "20px", xl: "24px"}}
                            lineHeight={{base: "24px", lg: "26px", xl: "30px"}}
                          >
                             {product.currentPrice || product.openingPrice} ₪
                          </Text>
                        </Box>

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
                               w={{base: "100px", lg: "120px", xl: "126px"}}
                               h={{base: "50px", xl: "60px"}}
                              fontSize="18px"
                              lineHeight="20px"
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
                      </>
                    ) : (
                      <>
                        <Box flex="1">
                          <Text fontSize={{base: "16px", lg: "18px"}} color="naturalDark">
                            נמכר
                          </Text>
                          <Text
                            dir="rtl"
                            fontWeight="medium"
                            fontSize={{base: "18px", lg: "20px", xl: "24px"}}
                            lineHeight={{base: "24px", lg: "26px", xl: "30px"}}
                          >
                             {product.winningPrice} ₪
                          </Text>
                        </Box>
                        <Button
                           w={{base: "100px", lg: "120px", xl: "126px"}}
                           h={{base: "50px", xl: "60px"}}
                          fontSize="18px"
                          lineHeight="20px"
                          isDisabled
                        >
                          הצע מחיר
                        </Button>
                      </>
                    )}
                  </Flex>
                ) : (
                  <Flex w={{md: "200px", lg: "230px", xl: "280px", "2xl": "300px"}} gap={{md: "3", xl: "6"}} alignItems="end" justifyContent="end">
                    <Box alignItems="end">
                      <Text fontSize={{base: "16px", xl: "18px"}} color="naturalDark">
                        מחיר
                      </Text>
                      <Text
                        dir="rtl"
                        fontWeight="medium"
                        fontSize={{base: "18px", lg: "20px", xl: "24px"}}
                        lineHeight={{base: "24px", lg: "26px", xl: "30px"}}
                      >
                          {product.price} ₪
                      </Text>
                    </Box>
                    <Button
                      w={{base: "100px", lg: "120px", xl: "126px"}}
                      h={{base: "50px", xl: "60px"}}
                      fontSize="18px"
                      lineHeight="20px"
                      onClick={() =>
                        (window.location.href = product.openingPrice
                          ? routes.ProductPageAuction.path.replace(":id", "") +
                            product._id
                          : routes.ProductPage.path.replace(":id", "") +
                            product._id)
                      }
                    >
                      קנו עכשיו
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Card>
    </>
  );
})
