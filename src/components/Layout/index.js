import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Container from "../Container";
import Sidebar from "../Sidebar";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Banner from "../Banner";

export default function Layout({
  add = false,
  children,
  withSidebar,
  breadcrumb = [],
  hideBreadcrumb,
  logo = false,
  noFooter = false,
  change = "",
}) {
  const [marginTop, setMarginTop] = useState("0");
  useEffect(() => {
    let prevScrollY = window.pageYOffset;
    const threshold = 50;

    const handleScroll = () => {
      const currScrollY = window.pageYOffset;
      if (currScrollY < threshold) {
        setMarginTop("0");
      } else {
        setMarginTop("128.8px");
      }
      prevScrollY = currScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex flexDir="column" minH="100vh" bg={withSidebar ? "cartBack" : "white"}>
      <NavBar withSidebar={withSidebar} logo={logo} change={change} />
      <Box
        flex="1"
        id="all"
        mt={{ base: logo ? "65px" : "131px", lg: marginTop }}
      >
        {withSidebar ? (
          <Flex dir="rtl">
            <Sidebar />
            <Box flex="1">
              {breadcrumb.length > 0 && (
                <BreadcrumbComponent breadcrumb={breadcrumb} />
              )}

              {children}
            </Box>
          </Flex>
        ) : (
          <Box>
            {add && (
              <Flex
                display={{ base: "none", md: "flex" }}
                bg="naturalLight"
                w="full"
                h="280px"
                dir="rtl"
                justifyContent="center"
                alignItems="center"
                fontSize="38px"
                fontWeight="medium"
              >
                <Text>שטח לתמונה הכי יפה מהקטגוריה הרלוונטית</Text>
              </Flex>
            )}
            <Box>
              <Flex px={{base: "0px", sm: "32px", md: "50px", lg: "100px", "2xl": "200px"}}>
                {breadcrumb.length > 0 && (
                  <BreadcrumbComponent breadcrumb={breadcrumb} />
                )}
              </Flex>
              {children}
            </Box>
          </Box>
        )}
      </Box>
      {!logo && !noFooter && <Footer />}
    </Flex>
  );
}

const BreadcrumbComponent = ({ breadcrumb = [] }) => {
  return (
    <Container>
      <Box py={{ base: "14px", md: "6" }} px={{ base: "30px", md: "0" }}>
        <Breadcrumb
          textDecoration="none"
          spacing={{ base: "2px", md: "8px" }}
          fontSize="16px"
          dir="rtl"
          separator={
            <ChevronLeftIcon
              fontSize={{ base: "16px", md: "28px" }}
              color="naturalDark"
            />
          }
        >
          {breadcrumb.map((b, index) => {
            let isCurrentPage = index === breadcrumb.length - 1;
            return (
              <BreadcrumbItem
                key={index}
                _hover={{ color: "primary", textDecoration: "none" }}
                textDecoration="none !important"
                color={isCurrentPage ? "primary" : "naturalDarkest"}
                fontSize={{ base: "12px", md: "16px" }}
                lineHeight={{ base: "16.3px", md: "18px" }}
                fontWeight="medium"
                isCurrentPage={isCurrentPage}
              >
                <BreadcrumbLink href={b.href}>{b.name}</BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </Box>
    </Container>
  );
};
