import { Flex, Spacer, Text } from "@chakra-ui/react";
import React, {memo} from "react";
import Button from "../Button";

export default memo(function AddressCard(props) {
  return (
    <Flex
      w="327px"
      h="190px"
      borderRadius="12px"
      p="4"
      bg="othersLight"
      flexDir="column"
      justifyContent="space-between"
      py="4"
      pt="8"
      px="6"
    >
      <Text fontWeight="500" color="primary" fontSize="16px" lineHeight="20px">
        {props.name}
        {",   "}
        {props.phoneNumber}
      </Text>
      <Spacer h="4" />
      <Text color="primary" fontSize="16px" lineHeight="20px">
        {props.street} {props.buildingNumber}
      </Text>
      <Spacer h="4" />
      <Text color="primary" fontSize="16px" lineHeight="20px">
        {props.city}
        {", "}
        {props.country}
        {" מיקוד "}
        {props.zipCode}
      </Text>
      <Spacer h="4" />
      <Flex gap="2" alignItems="center">
        <Button.TextButton fontSize="16px" lineHeight="20px" onClick={() => props.editCard()}>
          ערוך
        </Button.TextButton>
        <Button.TextButton fontSize="16px" lineHeight="20px" onClick={() => props.deleteCard()}>
          מחק
        </Button.TextButton>
      </Flex>
    </Flex>
  );
})
