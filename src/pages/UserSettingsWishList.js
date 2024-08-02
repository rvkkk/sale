import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { TrashIcon } from "../components/Icons";
import Layout from "../components/Layout";
import Order from "../components/Order";
import Loader from "../components/Loader";
import { useWishList } from "../components/Contexts/WishListContext"
import Button from "../components/Button";
//import { useAuth } from "../components/Contexts/AuthContext";
import { useCart } from "../components/Contexts/CartContext";

export default function UserSettingsWishList() {
  const [loading, setLoading] = useState(false);
  //const [wishList, setWishList] = useState([]);
  const {wishList, fetchWishList, deleteMyWishList, removeProductFromWishList} = useWishList();
  const {addProductToCart} = useCart();

  // useEffect(()  => {
    // setLoading(true);
    // fetchWishList();
    // setLoading(false);
    // }, [fetchWishList]);

  // const deleteAll = () => {
  //   setLoading(true);
  //   if (id !== 0) {
  //     deleteWishList(id)
  //       .then((res) => {
  //         console.log(res);
  //         setWishList([]);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  //   } else
  //     clearWishList()
  //       .then((res) => {
  //         setWishList([]);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false);
  //       });
  // };

  // const removeProductFromWishList = (productId) => {
  //   if (token === null)
  //     removeFromWishList({ productId })
  //       .then((res) => {
  //         setWishList((prevWishList) => {
  //           const updatedProducts = prevWishList.filter(
  //             (w) => !(w.product.id === productId)
  //           );
  //           return updatedProducts;
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   else
  //     deleteFromWishList(productId)
  //       .then((res) => {
  //         setWishList((prevWishList) => {
  //           const updatedProducts = prevWishList.filter(
  //             (w) => !(w.product.id === productId)
  //           );
  //           return updatedProducts;
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // };

  // const addProductToCart = (product, amount) => {
  //   if (token === null)
  //     addToCart({
  //       product: {
  //         id: product.id,
  //         title: product.title,
  //         "english-title": product["english-title"],
  //         description: product.description,
  //         "english-description": product["english-description"],
  //         price: product.price,
  //         "price-before-discount": product["price-before-discount"],
  //         cateegory: product.category,
  //         quantity: product.quantity,
  //         images: product.images,
  //         "shipping-cost": product["shipping-cost"],
  //         pin: product.pin,
  //       },
  //       amount,
  //     })
  //       .then((res) => {
  //         console.log("added:", res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   else
  //     addCart({ productId: product.id, amount })
  //       .then((res) => {
  //         console.log(res); //האם למחוק מרשימת המשאלות כאשר בסל?
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // };

  return (
    <Layout withSidebar>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box py="20" mx="15%">
            <Flex alignItems="center" justifyContent="space-between">
              <Text
                fontSize="32px"
                lineHeight="20px"
                fontWeight="medium"
                color="naturalBlack"
              >
                רשימת המשאלות שלי
              </Text>
            </Flex>
            <Spacer h="5" />
            {wishList.products.length > 0 ? (
              <>
                <Flex flexDir="column" gap="4" mt="8">
                  {wishList.products.map((wish, key) => {
                    return (
                      <Order
                        key={key}
                        hideInfo
                        data={wish}
                        badge={
                          wish.product.quantity > 0 ? "במלאי" : "המוצר לא במלאי"
                        }
                        notificationBtn={wish.product.quantity === 0}
                        badgeColor={
                          wish.product.quantity > 0
                            ? "secendaryDarkest"
                            : "threeDark"
                        }
                        badgeBg={
                          wish.product.quantity > 0
                            ? "secendaryLightest"
                            : "threeLight"
                        }
                        onDelete={() => {
                          //popap
                          const a = window.confirm(
                            "האם אתה בטוח שברצונך למחוק פריט זה מהרשימה?"
                          );
                          if (a) {
                            removeProductFromWishList(wish.product.id);
                          }
                        }}
                        addToCart={() => {
                          addProductToCart(wish.product, wish.amount);
                        }}
                      />
                    );
                  })}
                </Flex>
                <Spacer h="20" />
                <Flex justifyContent="end">
                  <Button.TextButton
                    color="naturalBlack"
                    onClick={() => deleteMyWishList()}
                    fontSize="16px"
                    lineHeight="18px"
                  >
                    <TrashIcon fill="#23263B" />
                    מחק הכל
                  </Button.TextButton>
                </Flex>
              </>
            ) : (
              <Flex alignItems="center" justifyContent="start">
                <Text fontSize="24px" fontWeight="light" color="naturalDarkest">
                  אין עדיין מוצרים ברשימת המשאלות שלך
                </Text>
              </Flex>
            )}
          </Box>
        </>
      )}
    </Layout>
  );
}
