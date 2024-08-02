import { CloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import {
  BillingIcon,
  FaveIcon,
  HomeIcon,
  LogoutIcon,
  MessengerIcon,
  OrderIcon,
  SettingIcon,
  WalletIcon,
} from "../Icons";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../utils/api/users";
import { useAuth } from "../Contexts/AuthContext";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const { isAuthenticated, logout} = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      getUserProfile().then((res) => {
        setUser(res.user);
        setShow(true);
      });
    }
  }, [isAuthenticated]);

  return (
    <Box
      w="300px"
      bg={!show ? "cartBack" : "white"}
      py="20"
      position="relative"
      display={{base: "none", lg: "block"}}
    >
      {show ? (
        <>
          <Flex flexDir="column">
            <MenuItem
              path={routes.UserSettingsDetails.path}
              icon={HomeIcon}
              name="ראשי"
            />
            <MenuItem
              path={routes.UserSettingsMySales.path}
              icon={MessengerIcon}
              name="מכירות"
            />
            <MenuItem
              path={routes.UserSettingsMyOrders.path}
              icon={OrderIcon}
              name="הזמנות"
            />
            <MenuItem
              path={routes.UserSettingsShippingAddress.path}
              icon={BillingIcon}
              name="כתובת למשלוח"
            />
            <MenuItem
              path={routes.UserSettingsWhiteList.path}
              icon={FaveIcon}
              name="רשימת משאלות"
            />
            <MenuItem
              path={routes.UserSettingsWallet.path}
              icon={WalletIcon}
              name="ארנק"
            />
            <MenuItem
              path={routes.UserSettingsDeliveryTraker.path}
              icon={SettingIcon}
              name="מעקב משלוחים"
            />
          </Flex>
          <Spacer h="20" />
          <Flex
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            gap="16"
          >
            <Flex flexDir="column" gap="2" alignItems="center">
              <Box
                borderRadius="18px"
                p="2"
                border="1px solid transparent"
                borderColor="naturalLight"
              >
                {/* <Image
              w="118px"
              h="118px"
              objectFit="cover"
              borderRadius="8px"
              src="/assets/Image.png"
            /> */}
                <Avatar
                  w="80px"
                  h="80px"
                  objectFit="cover"
                  borderRadius="12px"
                  //name={user ? user.userName : "Sale Bid"}
                  src={user && user.profileImage}
                />
              </Box>
              <Text fontSize="18px"  fontWeight="medium" color="naturalBlack">
                {user ? user.userName : "טוען.."}
              </Text>
            </Flex>

            <Flex alignItems="center" gap="2" onClick={() => logout()}>
              <LogoutIcon />
              <Text fontWeight="medium" color="naturalDark">
                התנתק
              </Text>
            </Flex>
          </Flex>

          <IconButton
            border="1.25px solid transparent"
            size="sm"
            transform={"translateX(-50%)"}
            borderColor="naturalDark"
            borderRadius="full"
            bg="white"
            color="naturalDarkest"
            position="absolute"
            top="8"
            left="0"
            icon={<CloseIcon />}
            onClick={() => setShow(false)}
          />
        </>
      ) : (
        ""
      )}
    </Box>
  );
}

const MenuItem = ({ name, icon, path = "#" }) => {
  const location = useLocation();
  let Icon = icon;
  let active = location.pathname.includes(path) && path !== "#";
  const [hover, setHover] = useState(false);
  return (
    <Link to={path}>
      <Flex pr="6" pl={active ? "0" : "6"}>
        <Flex
          alignItems="center"
          gap="6"
          bg="transparent"
          _hover={{ bg: "primaryLightest", color: "primary" }}
          borderRadius="12px"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          w="full"
          py="3"
          h="60px"
          px="6"
        >
          {icon && <Icon fill={active || hover ? "#0738D2" : "#4F5162"} />}
          <Text
            fontSize="18px"
            fontWeight="medium"
            color={active || hover ? "primary" : "naturalDarkest"}
          >
            {name}
          </Text>
        </Flex>

        {active && (
          <Box
            w="8px"
            borderRadius="0 6px 6px 0"
            h="60px"
            bg="primary"
            mr="4"
          />
        )}
      </Flex>
    </Link>
  );
};
