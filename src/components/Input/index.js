import React, { useState } from "react";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  Tooltip,
  Flex,
  Text,
  Box,
  InputLeftElement,
  Select,
  Icon,
} from "@chakra-ui/react";
import ReactFlagsSelect from "react-flags-select";
import PropTypes from "prop-types";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import Button from "../Button";

export default function Input(props) {
  const RightElement = () => props.rightElement;
  const RightElementk = () => props.rightElementk;
  const LeftElement = () => props.leftElement;
  const Question = () => props.question;
  return (
    <FormControl
      isInvalid={props.isInvalid}
      isRequired={props.required}
      isDisabled={props.disabled}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <FormLabel
          fontSize={props.labelFontSize || "14px"}
          fontWeight={{ base: "normal", md: "medium" }}
          color={{
            base: "naturalDarkest",
            md: !props.disabled ? "black" : "naturalDarkest",
          }}
          letterSpacing="0.005em"
          lineHeight="18px"
        >
          {props.tip && (
            <Tooltip
              placement="top"
              p="2"
              border="1px solid transparent"
              borderColor="naturalDark"
              borderRadius="10px"
              bg="white"
              dir="rtl"
              color="naturalDarkest"
              label={props.tip}
            >
              <Icon as={InfoOutlineIcon} boxSize={4} ml={2} />
            </Tooltip>
          )}
          {props.label}
        </FormLabel>

        {props.withCounter && (
          <Text color="naturalDark" fontSize="14px">
            0/40
          </Text>
        )}
        {props.desc && (
          <Text
            textColor="primary"
            fontSize={props.labelFontSize}
            fontWeight={props.labelFontWeight}
            letterSpacing="0.005em"
          >
            {props.desc}
          </Text>
        )}
      </Flex>

      <InputGroup>
        {props.leftElement && (
          <InputLeftElement
            h="50px"
            w="max"
            px="2"
            children={
              <Box bg="white" pl="2">
                <LeftElement />
              </Box>
            }
          />
        )}

        <ChakraInput
          pl={props.type === "tel" && props.rightElement ? "60px" : "0"}
          size="lg"
          h={{ base: "55px", md: "50px" }}
          bg={{ base: "white", md: props.light ? "inputBg" : "white" }} //inputbg
          textColor={props.isInvalid ? "otherError" : "black"}
          _placeholder={{ color: "naturalDark" }}
          borderColor={{
            base: props.light ? "naturalLight" : "bright",
            md: props.light ? "transparent" : "bright",
          }}
          borderRadius={{ base: "12px", md: "8px" }}
          _active={{ textColor: "naturalDark" }}
          _focus={
            !props.isInvalid
              ? {
                  _placeholder: { color: "black" },
                  border: "1px solid primary inset !important",
                  boxShadow: "0 0 0 3px #E8F0FF !important",
                }
              : {
                  border: "1px solid otherError inset", // מסגרת חיצונית
                  boxShadow: "0 0 0 3px threeLight", // מסגרת פנימית (shadow)
                  // _hover: {border: "1px solid primary inset"}
                }
          }
          _hover={
            !props.isInvalid
              ? { border: "2px solid #E8F0FF" }
              : { border: "2px solid otherError" }
          }
          // !props.question && !hover
          fontSize={16}
          letterSpacing="0.005em"
          lineHeight="16.5px"
          {...props}
        />
        {props.valid && (
          <InputRightElement
            h="full"
            children={<CheckCircleIcon color="secendaryBase" />}
          />
        )}
        {props.question && (
          <InputRightElement h="full" w="full" children={<Question />} />
        )}

        {props.rightElement && (
          <InputRightElement
            h="60px"
            w="60px"
            px="2"
            pb="2"
            children={
              <Box bg="white" pr="2">
                <RightElement />
              </Box>
            }
          />
        )}
        {props.rightElementk && (
          <InputRightElement
            h="50px"
            w="max"
            px="2"
            children={
              <Box bg="white" pr="2">
                <RightElementk />
              </Box>
            }
          />
        )}
      </InputGroup>
      <FormErrorMessage
        display="flex"
        alignItems="center"
        gap="1"
        letterSpacing="0.005em"
      >
        {!props.rightElement && <WarningIcon />} {props.isInvalidMessage}
      </FormErrorMessage>
      {props.hint && (
        <Text
          mt="2px"
          letterSpacing="0.005em"
          fontSize="14px"
          color="naturalDark"
        >
          {props.hint}
        </Text>
      )}
    </FormControl>
  );
}

export const PasswordField = (props) => {
  const [hidden, setHidden] = useState(true);
  const togglePassowrd = () => setHidden(!hidden);

  return (
    <FormControl
      isInvalid={props.isInvalid}
      isRequired={props.required}
      isDisabled={props.disabled}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <FormLabel
          fontSize={props.labelFontSize}
          fontWeight={{ base: "normal", md: props.labelFontWeight }}
          color={{
            base: "naturalDarkest",
            md: !props.disabled ? "black" : "naturalDarkest",
          }}
          letterSpacing="0.005em"
          lineHeight="18px"
        >
          {props.tip && (
            <Tooltip
              placement="top"
              p="2"
              border="1px solid transparent"
              borderColor="naturalDark"
              borderRadius="10px"
              bg="white"
              dir="rtl"
              color="naturalDarkest"
              label={props.tip}
            >
              <Icon as={InfoOutlineIcon} boxSize={4} ml={2} />
            </Tooltip>
          )}
          {props.label}
        </FormLabel>

        {props.desc && (
          <Button.TextButton
            fontSize={props.labelFontSize}
            fontWeight={props.labelFontWeight}
            textColor="primary"
            onClick={props.onClickDesc}
            mb="1"
          >
            {props.desc}
          </Button.TextButton>
        )}
      </Flex>

      <InputGroup>
        <ChakraInput
          size="lg"
          h={{ base: "55px", md: "50px" }}
          bg={{ base: "white", md: props.light ? "inputBg" : "white" }} //inputbg
          borderColor={{
            base: props.light ? "naturalLight" : "bright",
            md: props.light ? "transparent" : "bright",
          }}
          type={hidden ? "password" : "text"}
          borderRadius={{ base: "12px", md: "8px" }}
          textColor={props.isInvalid ? "otherError" : "black"}
          _active={{ textColor: "naturalDark" }}
          _hover={
            !props.isInvalid
              ? { border: "2px solid #E8F0FF" }
              : { border: "2px solid otherError" }
          }
          _focus={
            !props.isInvalid
              ? {
                  _placeholder: { color: "black" },
                  border: "1px solid primary inset", //
                  boxShadow: "0 0 0 3px #E8F0FF ", //
                  _hover: {},
                }
              : {
                  border: "1px solid otherError inset", // מסגרת חיצונית
                  boxShadow: "0 0 0 3px threeLight", // מסגרת פנימית (shadow)
                  _hover: {},
                }
          }
          letterSpacing="0.005em"
          lineHeight="16.5px"
          {...props}
        />
        <InputRightElement
          textColor="naturalDark"
          h="full"
          onClick={togglePassowrd}
        >
          {hidden ? <RiEyeLine /> : <RiEyeOffLine />}
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage
        display="flex"
        alignItems="center"
        gap="1"
        letterSpacing="0.005em"
      >
        <WarningIcon /> {props.isInvalidMessage}{" "}
      </FormErrorMessage>
    </FormControl>
  );
};

export const ExeptionInput = (props) => {
  return (
    <FormControl
      isInvalid={props.isInvalid}
      isRequired={props.required}
      isDisabled={props.disabled}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <FormLabel
          fontSize={props.labelFontSize || "14px"}
          fontWeight={{ base: "normal", md: "medium" }}
          color={{
            base: "naturalDarkest",
            md: !props.disabled ? "black" : "naturalDarkest",
          }}
          letterSpacing="0.005em"
          lineHeight="18px"
        >
          {props.label}
        </FormLabel>
      </Flex>

      <InputGroup>
        <Select
          size="lg"
          h={{ base: "55px", md: "50px" }}
          bg={{ base: "white", md: props.light ? "inputBg" : "white" }} //inputbg
          borderRadius={{ base: "12px", md: "8px" }}
          borderColor={{
            base: props.light ? "naturalLight" : "bright",
            md: props.light ? "transparent" : "bright",
          }}
          _active={{ textColor: "naturalDark" }}
          _hover={{ border: "2px solid #E8F0FF" }}
          _focus={
            !props.isInvalid
              ? {
                  _placeholder: { color: "black" },
                  border: "1px solid primary inset", //
                  boxShadow: "0 0 0 3px #E8F0FF ", //
                  _hover: { border: "none" },
                }
              : {
                  border: "1px solid otherError inset", // מסגרת חיצונית
                  boxShadow: "0 0 0 3px threeLight", // מסגרת פנימית (shadow)
                  _hover: { border: "none" },
                }
          }
          letterSpacing="0.005em"
          lineHeight="16.5px"
          {...props}
        >
          {props.years
            ? props.years.map((year, key) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
            : props.months
            ? props.months.map((year, key) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
            : props.numbers.map((number, key) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
        </Select>
      </InputGroup>
      <FormErrorMessage
        display="flex"
        alignItems="center"
        gap="1"
        letterSpacing="0.005em"
      >
        <WarningIcon /> {props.isInvalidMessage}{" "}
      </FormErrorMessage>
    </FormControl>
  );
};

export const CategoryInput = (props) => {
  return (
    <FormControl
      isInvalid={props.isInvalid}
      isRequired={props.required}
      isDisabled={props.disabled}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <FormLabel
          fontSize={props.labelFontSize || "14px"}
          fontWeight={{ base: "normal", md: "medium" }}
          color={{
            base: "naturalDarkest",
            md: !props.disabled ? "black" : "naturalDarkest",
          }}
          letterSpacing="0.005em"
          lineHeight="18px"
        >
          {props.label}
        </FormLabel>
      </Flex>

      <InputGroup>
        <Select
          size="lg"
          h={{ base: "55px", md: "50px" }}
          bg={{ base: "white", md: props.light ? "inputBg" : "white" }} //inputbg
          borderRadius={{ base: "12px", md: "8px" }}
          borderColor={{
            base: props.light ? "naturalLight" : "bright",
            md: props.light ? "transparent" : "bright",
          }}
          _active={{ textColor: "naturalDark" }}
          _hover={{ border: "2px solid #E8F0FF" }}
          _focus={
            !props.isInvalid
              ? {
                  _placeholder: { color: "black" },
                  border: "1px solid primary inset", //
                  boxShadow: "0 0 0 3px #E8F0FF ", //
                  _hover: { border: "none" },
                }
              : {
                  border: "1px solid otherError inset", // מסגרת חיצונית
                  boxShadow: "0 0 0 3px threeLight", // מסגרת פנימית (shadow)
                  _hover: { border: "none" },
                }
          }
          letterSpacing="0.005em"
          lineHeight="16.5px"
          {...props}
        >
          {props.categories && props.categories.length > 0
            ? props.categories.map((category, key) => (
                <option w="200px" key={category.title} value={category.title}>
                  {category.name}
                </option>
              ))
            : props.subcategories && props.subcategories.length > 0
            ? props.subcategories.map((subcategory, key) => (
                <option key={subcategory.title} value={subcategory.name}>
                  {subcategory.name}
                </option>
              ))
            : ""}
        </Select>
      </InputGroup>
      <FormErrorMessage
        display="flex"
        alignItems="center"
        gap="1"
        letterSpacing="0.005em"
      >
        <WarningIcon /> {props.isInvalidMessage}{" "}
      </FormErrorMessage>
    </FormControl>
  );
};

export const CountrySelect = (props) => {
  const [selectedCountry, setSelectedCountry] = useState();
  return (
    <ReactFlagsSelect
      className="contrySelect"
      showSelectedLabel={false}
      showSecondaryOptionLabel={false}
      selected={selectedCountry}
      onSelect={setSelectedCountry}
    />
  );
};

Input.propTypes = {
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  tip: PropTypes.string,
  isInvalidMessage: PropTypes.string,
  label: PropTypes.string,
  desc: PropTypes.string,
  valid: PropTypes.bool,
  light: PropTypes.bool,
  leftElement: PropTypes.node,
  rightElement: PropTypes.node,
  withCounter: PropTypes.bool,
};
