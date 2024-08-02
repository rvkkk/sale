import {
  Box,
  Divider,
  Flex,
  Image,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Checkbox from "../CheckBox";
import { ArrowLeftIcon, TrashIcon, Coupon } from "../Icons";
import Input from "../Input";
import QuantityInput from "../QuantityInput";
import { TiArrowForwardOutline } from "react-icons/ti";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { routes } from "../../routes";
import { getCoupon } from "../../utils/api/coupons";
import Loader from "../Loader";
import { useCart } from "../Contexts/CartContext";

export default function Tab1(props) {
  const [loading, setLoading] = useState(false);
  //const [products, setProducts] = useState([]);
  //const [id, setId] = useState(0);
  //const [coupon, setCoupon] = useState("");
  //const [validCoupon, setValidCoupon] = useState(false);
  //const [invalidCoupon, setInvalidCoupon] = useState(false);
  //const [discount, setDiscount] = useState(0);
  const [checkedProducts, setCheckedProducts] = useState(props.products);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart,
    updateProductInCart,
    removeProductFromCart,
    deleteMyCart } = useCart();

  /*const updateAmount = (product, newAmount, amount) => {
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
            setCheckedProducts(updatedProducts);
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
            setCheckedProducts(updatedProducts);
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
            setCheckedProducts(updatedProducts);
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
            setCheckedProducts(updatedProducts);
            return { ...prevCart, products: updatedProducts };
          });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const deleteAll = () => {
    //setLoading(true);
    if (id !== 0) {
      deleteCart(id)
        .then((res) => {
          console.log(res);
          setProducts([]);
          setCheckedProducts([]);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          //setLoading(false);
        });
    } else
      clearCart()
        .then((res) => {
          setProducts([]);
          setCheckedProducts([]);
          //setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false);
        });
  };*/

  /*useEffect(() => {
    setLoading(true);
    if (token !== null) {
      getUserCart()
        .then((res) => {
          setCart(res.cart);
          setId(res.cart.id);
          res.cart && setProducts(res.cart.products);
          console.log(res.cart);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      getCart().then((cart) => {
        setCart(cart);
        setProducts(cart.products);
        setLoading(false);
      });
    }
  }, [token]);*/

  useEffect(() => {
    console.log(
      checkedProducts.length === cart.products.length && cart.products.length > 0
    );
    setSelectAllChecked(
      checkedProducts.length === cart.products.length && cart.products.length > 0
    );
  }, [checkedProducts, cart]);

  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  /*const handleCoupon = () => {
    if (coupon !== "") {
      getCoupon(coupon)
        .then((res) => {
          if (res.coupon === null) setInvalidCoupon(true);
          else {
            setDiscount(res.coupon.discount);
            setValidCoupon(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };*/

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <Box mx="10%">
          {cart.products[0] ? (
            <>
              <Flex gap="8" dir="rtl" mt="10">
                <Flex flex="1" flexDir="column" gap="4">
                  <Box
                    borderBottom="1px solid transparent"
                    borderColor="naturalLight"
                    w="full"
                    h="max"
                    pb="2"
                  >
                    <Text
                      fontSize="22px"
                      color="naturalBlack"
                      fontWeight="semibold"
                    >
                      המוצרים שנבחרו
                    </Text>
                  </Box>

                  <TableContainer>
                    <Table variant="unstyled" w="full">
                      <Thead color="naturalBlack">
                        <Tr pb="10">
                          <Th
                            w="max"
                            pl="0"
                            fontWeight="normal"
                            fontSize="16px"
                          >
                            <Checkbox
                              size="medium"
                              default
                              checked={selectAllChecked}
                              onChange={() => {
                                setCheckedProducts(
                                  selectAllChecked ? [] : cart.products // בחירת כל המוצרים או ביטול בחירתם
                                );
                              }}
                              /*checked={
                                checkedProducts.length === products.length
                              }
                              onChange={() =>
                                checkedProducts.length === products.length
                                  ? setCheckedProducts([])
                                  : setCheckedProducts(products)
                              }*/
                              fontSize="16px"
                              lineHeight="17.4px"
                            >
                              הכל
                            </Checkbox>
                          </Th>
                          <Th></Th>
                          <Th fontWeight="normal" fontSize="16px">
                            פריט
                          </Th>
                          <Th fontWeight="normal" fontSize="16px">
                            מחיר
                          </Th>
                          <Th fontWeight="normal" fontSize="16px">
                            כמות
                          </Th>
                          <Th fontWeight="normal" fontSize="16px">
                            סך הכול
                          </Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody w="full">
                        {cart.products &&
                          cart.products.map((product) => {
                            return (
                              <Tr
                                borderRadius="12px"
                                border="1px solid transparent"
                                borderColor="naturalLight"
                                w="full"
                                p="4px"
                                overflow="hidden"
                                my="10"
                                //rounded="3xl"
                              >
                                <Td pl="0">
                                  <Checkbox
                                    size="medium"
                                    checked={checkedProducts.some(
                                      (p) => p.product.id === product.product.id
                                    )}
                                    default
                                    onChange={() => {
                                      const isProductChecked =
                                        checkedProducts.some(
                                          (p) =>
                                            p.product.id === product.product.id
                                        );

                                      if (isProductChecked) {
                                        setCheckedProducts(
                                          (prevCheckedProducts) =>
                                            prevCheckedProducts.filter(
                                              (p) =>
                                                !(
                                                  (
                                                    p.product.id ===
                                                    product.product.id
                                                  ) // && p.size === product.size && p.model === product.model
                                                )
                                            )
                                        );
                                      } else {
                                        setCheckedProducts([
                                          ...checkedProducts,
                                          product,
                                        ]);
                                      }
                                    }}
                                  />
                                  {/* <Checkbox
                                    isChecked={
                                      checkedProducts[0] &&
                                      checkedProducts.findIndex(
                                        (p) =>
                                          p.product.id === product.product.id &&
                                          p.size === product.size &&
                                          p.model === product.model
                                      ) !== -1
                                    }
                                    onChange={() => {
                                      if (checkedProducts[0]) {
                                        const index = checkedProducts.findIndex(
                                          (p) =>
                                            p.product.id === product.product.id &&
                                            p.size === product.size &&
                                            p.model === product.model
                                        );
                                        index !== -1
                                          ? setCheckedProducts(
                                              (prevCheckedProducts) => {
                                                prevCheckedProducts.pop(
                                                  product
                                                );
                                                return prevCheckedProducts;
                                              }
                                            )
                                          : setCheckedProducts([
                                              ...checkedProducts,
                                              product,
                                            ]);
                                      } else setCheckedProducts([product]);
                                    }}
                                  />*/}
                                </Td>
                                <Td>
                                  <Box
                                    h="140px"
                                    w="110px"
                                    border="1px solid transparent"
                                    borderColor="naturalLight"
                                    borderRadius="12px"
                                    overflow="hidden"
                                  >
                                    <Image
                                      w="110px"
                                      h="140px"
                                      objectFit="cover"
                                      src={
                                        product.product.images &&
                                        product.product.images[0]
                                      }
                                    />
                                  </Box>
                                </Td>
                                <Td>
                                  <Box>
                                    <Text
                                      fontWeight="semibold"
                                      fontSize="16px"
                                      color="primary"
                                    >
                                      {" "}
                                      {product.product.title &&
                                        product.product.title}{" "}
                                    </Text>
                                    <Text
                                      fontSize="14px"
                                      color="naturalDarkest"
                                      whiteSpace={"pre-line"}
                                    >
                                      {" "}
                                      {product.product.description &&
                                        product.product.description}{" "}
                                    </Text>
                                  </Box>
                                </Td>
                                <Td fontSize="14px">
                                  ₪{product.product.price}
                                </Td>
                                <Td>
                                  <QuantityInput
                                    value={product.amount}
                                    limit={product.product.quantity}
                                    onChange={(amount) =>
                                      updateProductInCart(
                                        product.product,
                                        amount,
                                        product.amount
                                      )
                                    }
                                  ></QuantityInput>
                                </Td>
                                <Td
                                  color="naturalBlack"
                                  fontWeight="semibold"
                                  fontSize="16px"
                                >
                                  ₪
                                  {removeDecimal(
                                    product.product.price * product.amount
                                  )}
                                </Td>
                                <Td>
                                  <IconButton
                                    borderRadius="full"
                                    bg="Lightest"
                                    icon={<TrashIcon fill="#4F5162" />}
                                    onClick={() =>
                                      removeProductFromCart(product.product.id)
                                    }
                                  />
                                </Td>
                              </Tr>
                            );
                          })}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Flex justifyContent="space-between">
                    <Button.TextButton>
                      <Flex
                        alignItems="center"
                        gap="2"
                        onClick={() =>
                          (window.location.href = routes.HOME.path)
                        }
                      >
                        <Text color="naturalBlack" fontSize="24px">
                          <TiArrowForwardOutline />
                        </Text>
                        <Text color="naturalBlack" fontSize="16px">
                          המשך בקניות
                        </Text>
                      </Flex>
                    </Button.TextButton>
                    <Button.TextButton>
                      <Flex alignItems="center" gap="2" onClick={onOpen}>
                        <TrashIcon fill="#23263B" />
                        <Text color="naturalBlack" fontSize="16px">
                          נקו את העגלה
                        </Text>
                      </Flex>
                    </Button.TextButton>
                  </Flex>
                </Flex>

                <Flex w="425px" gap="4" flexDir="column">
                  <Flex
                    p="4"
                    border="1px solid transparent"
                    gap="6"
                    flexDir="column"
                    borderRadius="16px"
                    borderColor="bright"
                    w="full"
                  >
                    <Text
                      fontSize="22px"
                      color="naturalBlack"
                      fontWeight="semibold"
                    >
                      סיכום הזמנה
                    </Text>
          {/*<Input
                      borderRadius="12px"
                      //border="2px primary"
                      borderColor={
                        !validCoupon && !invalidCoupon
                          ? "primary"
                          : "naturalDark"
                      }
                      placeHolder="הזן קוד"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                        setInvalidCoupon(false);
                      }}
                      leftElement={
                        <Coupon
                          fill={
                            validCoupon || invalidCoupon ? "#91929D" : "#003DFF"
                          }
                        ></Coupon>
                      }
                      isInvalid={invalidCoupon}
                      isInvalidMessage={"קוד שגוי"}
                      rightElement={
                        invalidCoupon ? (
                          <WarningIcon color="otherError" w="24px" />
                        ) : (
                          validCoupon && (
                            <CheckCircleIcon w="24px" color="primary" />
                          )
                        )
                      }
                      rightElementk={
                        !validCoupon &&
                        !invalidCoupon && (
                          <Button.TextButton
                            fontSize="16px"
                            fontWeight="medium"
                            w="max"
                            color="primary"
                            onClick={handleCoupon}
                          >
                            מימוש קופון
                          </Button.TextButton>
                        )
                      }
                      label="יש לכם קוד קופון?"
                      labelFontWeight="normal"
                    />*/}
                    <Flex flexDir="column" gap="2">
                      {/*products &&
                    products.map((product) => {
                      return (
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text>{product && product.product.title}</Text>
                          <Text> ₪{product && product.product.price} </Text>
                        </Flex>
                      );
                    })*/}
                      <Flex fontSize="16px" justifyContent="space-between">
                        <Text> סכום ביניים </Text>
                        <Text>
                          ₪
                          {(checkedProducts.length >= 1 &&
                            Math.round(
                              checkedProducts.reduce(
                                (a, b) =>
                                  parseFloat(a) +
                                  parseFloat(b.product.price * b.amount),
                                0
                              ) * 100
                            ) / 100) ||
                            "0"}
                        </Text>
                      </Flex>
                      <Flex fontSize="16px" justifyContent="space-between">
                        <Text>משלוח</Text>
                        <Text>
                          {props.delivery.priceNum
                            ? "₪" + props.delivery["priceNum"]
                            : "יחושב במעמד התשלום"}
                        </Text>
                      </Flex>
                      {/*<Flex fontSize="16px" justifyContent="space-between">
                        <Text>עמלה</Text>
                        <Text>₪3.25</Text>
                      </Flex>
                     {/* <Flex fontSize="16px" justifyContent="space-between">
                        <Text>הנחה קופון</Text>
                        <Text dir="ltr" color="otherError">
                          ₪{discount}
                        </Text>
                      </Flex>*/}
                      <Spacer h="2" />
                      <Divider h="2px" bg="naturalLight" />
                      <Spacer h="12px" />
                      <Flex justifyContent="space-between" alignItems="center">
                        <Flex flexDir="column">
                          <Text
                            fontWeight="medium"
                            fontSize="16px"
                            color="naturalBlack"
                          >
                            סך הכל
                          </Text>
                          <Text fontSize="14px" color="naturalDark">
                            כולל 3.25₪ עמלה
                          </Text>
                        </Flex>

                        <Text
                          fontWeight="medium"
                          fontSize="24px"
                          color="primary"
                        >
                          ₪
                          {(checkedProducts.length >= 1 &&
                            3.25 +
                              (props.delivery.priceNum
                                ? props.delivery["priceNum"]
                                : 0) +
                              Math.round(
                                checkedProducts.reduce(
                                  (a, b) =>
                                    parseFloat(a) +
                                    parseFloat(b.product.price * b.amount),
                                  0
                                ) * 100
                              ) /
                                100) ||
                            "0"}
                        </Text>
                      </Flex>
                    </Flex>

                    <Button
                      onClick={() =>
                        checkedProducts.length >= 1 &&
                        //props.proceedToCheckout(checkedProducts, discount)
                        props.proceedToCheckout(checkedProducts)
                      }
                    >
                      <Flex alignItems="center" gap="6">
                        לתשלום
                        <ArrowLeftIcon />
                      </Flex>
                    </Button>
                  </Flex>
                  <Flex
                    p="4"
                    border="1px solid transparent"
                    borderRadius="16px"
                    borderColor="bright"
                    w="full"
                    flexDir="column"
                    gap="4"
                  >
                    <Flex gap="4" alignItems="center" justifyContent="center">
                      <Text fontSize="14px" color="naturalDark">
                        האתר מאובטח ומוגן ע״י
                      </Text>
                      <Image
                        w="20"
                        src={process.env.PUBLIC_URL + "/assets/Norton Icon.png"}
                      />
                      <Image
                        w="20"
                        src={process.env.PUBLIC_URL + "/assets/logo1.png"}
                      />
                    </Flex>

                    <Flex gap="4" alignItems="center" justifyContent="center">
                      <Image
                        w="14"
                        src={
                          process.env.PUBLIC_URL + "/assets/International3.png"
                        }
                      />
                      <Image
                        w="8"
                        src={
                          process.env.PUBLIC_URL + "/assets/International.png"
                        }
                      />
                      <Image
                        w="8"
                        src={
                          process.env.PUBLIC_URL + "/assets/International2.png"
                        }
                      />
                      <Image
                        w="10"
                        src={process.env.PUBLIC_URL + "/assets/Mastercard.svg"}
                      />
                      <Image
                        w="10"
                        src={
                          process.env.PUBLIC_URL + "/assets/International4.png"
                        }
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </>
          ) : (
            <EmptyCart />
          )}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              mt="15%"
              dir="rtl"
              borderRadius="21px"
              shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
              w="520px"
              h="300px"
            >
              {/* <ModalCloseButton
                bg="naturalLightest"
                color="naturalDarkest"
                w="34.94px"
                h="34.94px"
                borderRadius="full"
                right="10px"
                top="10px"
      />*/}
              <ModalBody>
                <Flex
                  mt="2"
                  flexDirection="column"
                  alignItems="center"
                  h="full"
                  gap="4"
                  justifyContent="center"
                >
                  <Flex
                    borderRadius="10px"
                    bg="threeLight"
                    w="45px"
                    h="45px"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TrashIcon w="23px" fill="#D94469" />
                  </Flex>
                  <Box textAlign="center">
                    <Text
                      fontSize="22px"
                      fontWeight="semibold"
                      color="naturalBlack"
                    >
                      האם למחוק הכל
                    </Text>
                    <Text fontSize="16px" color="naturalDarkest">
                      כל המוצרים שאספת לעגלה ימחקו
                    </Text>
                  </Box>
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Flex
                  justifyContent="center"
                  alighItems="start"
                  w="full"
                  gap="4"
                >
                  <Button
                    w="96px"
                    h="52px"
                    fontSize="18px"
                    fontWeight="medium"
                    color="white"
                    bg="primary"
                    onClick={() => {
                      deleteMyCart();
                      return onClose();
                    }}
                  >
                    מחק
                  </Button>
                  <Button.Secondary
                    w="96px"
                    h="52px"
                    fontSize="18px"
                    fontWeight="medium"
                    borderColor="primary"
                    color="primary"
                    bg="white"
                    onClick={onClose}
                  >
                    ביטול
                  </Button.Secondary>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
}

const EmptyCart = () => {
  return (
    <Flex pt="20" justifyContent="center">
      <Flex flexDir="column" alignItems="center" gap="10">
        <Image
          w="328px"
          src={process.env.PUBLIC_URL + "/assets/empty cart.png"}
        />
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap="2"
        >
          <Text color="naturalDarkest" fontSize="36px">
            העגלה שלך ריקה
          </Text>
          <Spacer h="2" />
          <Button.TextButton
            color="primary"
            fontSize="22px"
            href={routes.HOME.path}
          >
            בוא נצא לקניות
          </Button.TextButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
