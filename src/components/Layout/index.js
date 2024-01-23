import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import React from "react";
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
  home = false,
  logo = false,
  noFooter = false,
}) {
  return (
    <Flex flexDir="column" minH="100vh" bg={withSidebar ? "cartBack" : "white"}>
      <NavBar withSidebar={withSidebar} logo={logo} />
      <Box flex="1" id="all" mt={{ base: logo ? "65px" : "131px", lg: "0" }}>
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
            {home && <Banner />}
            <Box>
              <Flex px={["0px", "32px", "50px", "100px", "200px"]}>
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
