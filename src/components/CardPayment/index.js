import { Flex, Image } from "@chakra-ui/react";
import React, { memo } from "react";
import Input from "../Input";
import { ExeptionInput } from "../Input";

export default memo(function CardPayment(props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear + index);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <Flex alignContent="center" gap="6">
      <Flex alignItems="end" gap="2" flex="1">
        <ExeptionInput
          labelFontSize="16px"
          labelFontWeight="medium"
          borderRadius="8px"
          label="תוקף"
          required
          value={props.ccYear}
          years={years}
          onChange={(e) => props.setCCYear(Number(e.target.value))}
        />
        <Flex alignItems="center" h="64px" pt="15px">
          /
        </Flex>
        <ExeptionInput
          borderRadius="8px"
          value={props.ccMonth}
          months={months}
          onChange={(e) => props.setCCMonth(Number(e.target.value))}
        />
      </Flex>
      <Flex alignItems="end" gap="5" flex="1">
        <Input
          label="cvv"
          isInvalid={props.invalidCvv}
          isInvalidMessage="שדה חובה"
          labelFontSize="16px"
          labelFontWeight="medium"
          borderRadius="8px"
          borderColor="bright"
          required
          type="tel"
          dir="rtl"
          placeHolder="111"
          maxLength="4"
          value={props.ccCVV}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) props.setCCCVV(inputValue);
          }}
        />
        <Flex h="45px" w="38px" justifyContent="center" alignItems="center">
          <Image src={process.env.PUBLIC_URL + "/assets/6.png"} />
        </Flex>
      </Flex>
    </Flex>
  );
})
