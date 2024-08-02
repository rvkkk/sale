import {
  Badge,
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { hebDate } from "../../utils/date";
import { turnLettersToNumbers } from "../../utils/serial";
import Button from "../Button";
import { BellIcon, TrashIcon } from "../Icons";

export default function Order({
  badge,
  badgeBg,
  badgeColor,
  hideInfo,
  notificationBtn,
  data,
  onDelete,
  addToCart
}) {
  const removeDecimal = (num) => {
    try {
      return num.toString().split(".")[0];
    } catch (err) {
      return num;
    }
  };

  return (
    <Card
      dir="rtl"
      w="full"
      p="8"
      borderRadius="3xl"
      bg="white"
      position="relative"
      border="2px solid"
      borderColor="naturalLightest"
      shadow="none"
    >
      <Flex flexDir="column" gap="4">
        <Flex alignItems="center" justifyContent="space-between">
          <Badge
            bg={badgeBg}
            color={badgeColor}
            h="30px"
            px="4" //px="16px"
            borderRadius="6px"
            display="flex"
            alignItems="center"
          >
            {badge}
          </Badge>

          {!hideInfo && (
            <Flex fontSize="18px" lineHeight="24px" color="naturalBlack" gap="20">
              <Box>
                <Text>ההזמנה בוצעה בתאריך:</Text>
                <Text>{hebDate(data.order.createdAt)}</Text>
              </Box>
              <Box>
                <Text>מספר הזמנה:</Text>
                <Text>{turnLettersToNumbers(data.order.id.toString())}</Text>
              </Box>
            </Flex>
          )}
        </Flex>
        <Divider h="1px" bg="bright" w="full" maxW="1096" />
        <Flex gap="8" alignItems="center" justifyContent="space-between">
          <Flex gap="8">
            <Image
              border="1px solid"
              borderColor="naturalLight"
              borderRadius="12px"
              w="150px"
              h="150px"
              src={data.product.images && data.product.images[0]}
            />

            <Flex flexDir="column" lineHeight="17.4px" justifyContent="space-between">
              <Box>
                <Text fontSize="18px" color="naturalBlack">
                  {data.product.title}
                </Text>
                <Text fontSize="18px" color="naturalDark">
                  {data.product.description}
                </Text>
              </Box>
              <Flex gap="2">
                <Text fontSize="16px" color="naturalDark">
                {data.amount}x
                </Text>
                <Text fontSize="16px">₪{data.product.price}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex alignItems="center" gap="10">
            <Box>
              <Text fontSize="18px" lineHeight="17.4px" color="naturalDark">
                סך הכול
              </Text>
              <Text fontSize="22px" fontWeight="semiBold">
                ₪{data.product.price * data.amount}
              </Text>
            </Box>

            <Flex alignItems="center" gap="4">
                  {notificationBtn ? (
                    <Button
                      bg="white"
                      color="primary"
                      border="1.16253px solid"
                      w="250.06px"
                      fontSize="18px"
                      lineHeight="20px"
                      borderColor="primary"
                      px="3"
                      _hover={{
                        bg: "primaryLightest",
                      }}
                    >
                      <Flex gap="2" alignItems="center">
                        <BellIcon h="24px" w="24px" />
                        עדכנו אותי שהמוצר חוזר
                      </Flex>
                    </Button>//האם לעדכן ברשימת הודעות לכל לקוח או במייל?
                  ) : (
                    <Button fontSize="18px" lineHeight="20px" h="52px" w="156px" onClick={() => addToCart()}>
                      הוספה לעגלה
                    </Button>
                  )}             
              <IconButton
                w="52px"
                h="52px"
                bg="primaryLightest"
                color="primary"
                icon={<TrashIcon w="32px" h="32px" fill="#0738D2" />}
                onClick={() => onDelete()}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
