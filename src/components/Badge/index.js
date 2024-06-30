import { Flex } from "@chakra-ui/react";
import React from "react";

export default function Badge({ children, ...rest }) {
  return (
    <Flex
      bg={{base: "primaryLightest", md:"secondaryLight"}}
      textColor="primary"
      py="2"
      fontSize={{base: "10px", md: "14px"}}
      lineHeight="17.4px"
      justifyContent="center"
      alignItems="center"
      px={{base: "3", lg: "5"}}
      borderRadius="full"
      {...rest}
    >
      {children}
    </Flex>
  );
}
