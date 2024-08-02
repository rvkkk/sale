import { Flex, Image, Text} from "@chakra-ui/react";
import React, { memo } from "react";

export default memo(function ArticleCard({ imageUrl, text, onClick }) {
  return (
    <Flex
      w={{base: "320px", sm: "410px", md: "360px", lg: "410px", xl: "380px", "2xl": "410px"}}
      borderRadius="16px"
      dir="rtl"
      h={{base: "240px",lg: "260px"}}
      pt={{lg: "15px"}}
      _hover={{ boxShadow: "4px 8px 40px 0 rgba(13, 47, 153, 0.15)" }}
      bg="white"
      flexDirection="column"
      alignItems="center"
      onClick={onClick}
      cursor="pointer"
    >
      <Image src={imageUrl} />
      <Text
        color="primary"
        fontSize="18px"
        lineHeight="22.6px"
        letterSpacing="0.02em"
        fontWeight="medium"
        style={{ direction: "rtl" }}
      >
        {text}
      </Text>
    </Flex>
  );
})
