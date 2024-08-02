import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  //Tooltip,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CheckBoxGroup from "../CheckBoxGroup";
import Tag, { Tags } from "../Tag";
import Button from "../Button";
import { RightIcon2 } from "../Icons";

export default function CategorySidebar(props) {
  const [tags, setTags] = useState([
    { title: "sortBy", list: [] },
    { title: "status", list: [] },
    { title: "brand", list: [] },
    { title: "model", list: [] },
    { title: "discount", list: [] },
    { title: "color", list: [] },
  ]);
  const [unChecked, setUnChecked] = useState({});
  const [sliderValue, setSliderValue] = useState([
    props.minPrice,
    props.maxPrice,
  ]);
  //const [showTooltip1, setShowTooltip1] = useState(false);
  //const [showTooltip2, setShowTooltip2] = useState(false);

  const addTags = (tag) => {
    const tagExists = tags.some(
      (t) => t.title === tag.title && t.list.some((text) => text === tag.text)
    );
    if (tagExists) {
      setTags((prevTags) =>
        prevTags.map((t) => ({
          ...t,
          list: t.list.filter((text) => text !== tag.text),
        }))
      );
    } else {
      setTags((prevTags) =>
        prevTags.map((t) =>
          t.title === tag.title
            ? { ...t, list: [...t.list, tag.text] }
            : { ...t }
        )
      );
    }
  };

  const clearAllTags = () => {
    setTags((prevTags) =>
      prevTags.map((tag) => ({
        ...tag,
        list: [],
      }))
    );
  };

  const closeTag = (title, text) => {
    setUnChecked({ title, text });
    setTags((prevTags) =>
      prevTags.map((t) => ({
        ...t,
        list: t.list.filter((tag) => tag !== text),
      }))
    );
  };

  useEffect(() => {
    props.onChangeTags(tags);
    console.log(tags);
  }, [tags]);

  return (
    <Box w={{base: "270px", sm: "270px", md: "200px", xl: "292px"}} dir="rtl">
      <Text fontSize={{md: "26px", lg: "28px", xl: "32px"}} color="primary" display={{base: "none", md: "block"}}>
        {props.categoryName}
      </Text>
      {/*<Flex
      display={{base: "flex", md: "none"}}
                    alignItems="center"
                    justifyContent="center"
                    px="10%"
                    borderBottom="1px solid"
                    borderColor="naturalLight"
                    h="75px"
                    mb="30px"
                  >
                    <Flex position="absolute" right="10%">
                      <RightIcon2
                        onClick={() => {
                          window.close();
                        }}
                      />
                    </Flex>
                    <Flex justifyContent="center">
                      <Text
                        fontSize={{ base: "20px", sm: "24px" }}
                        fontWeight="medium"
                        color="naturalDarkest"
                      >
                        התחבר
                      </Text>
                    </Flex>
                  </Flex>*/}
      <Spacer h={{base: "10", md: "6"}} />
      <Box>
        <Accordion allowMultiple defaultIndex={[0, 1, 2, 5, 6]}>
          <AccordionComponent title="סינון לפי מחיר">
            <Flex w="full">
              <Flex flexDir="column" gap="6" w="full">
                <Flex justifyContent="space-between">
                  <Badge
                    p="2"
                    //px={{base: "6", md: "4", lg:"6"}}
                    w={{base: "92px", md: "75px", lg:"92px"}}
                    borderRadius="45px"
                    bg="naturalLightest"
                      textAlign="center"
                  >
                    {sliderValue[0]} ₪
                  </Badge>
                  <Badge
                    p="2"
                    //px={{base: "6", md: "4", xl:"6"}}
                    w={{base: "92px", md: "75px", lg:"92px"}}
                    borderRadius="45px"
                    bg="naturalLightest"
                    textAlign="center"
                  >
                    {sliderValue[1]} ₪
                  </Badge>
                </Flex>
                <Box w={{base: "228px", md: "158px", xl: "250px"}} h="24px" mx="auto">
                  <RangeSlider
                    ariaLabel={["min", "max"]}
                    size="lg"
                    display="block !important"
                    //onChangeEnd={(val) => props.onChangePriceSlider(val)}
                    defaultValue={[props.minPrice, props.maxPrice]}
                    min={props.minPrice}
                    max={props.maxPrice}
                    step={5}
                    //focusThumbOnChange={true}
                    onChange={(val) => setSliderValue(val)}
                  >
                    <RangeSliderTrack h="5px" bg="naturalLight">
                      <RangeSliderFilledTrack bg="primary" />
                    </RangeSliderTrack>
                    {/*<Tooltip
                      hasArrow
                      bg="primary"
                      color="white"
                      placement="top"
                      isOpen={showTooltip1}
                      label={sliderValue[0]}
  >*/}
                      <RangeSliderThumb
                        w="18px"
                        h="18px"
                        bg="primary"
                        borderRadius="23px"
                        boxShadow="none !important"
                        _active={{
                          bg: "white",
                          w: "22px",
                          h: "22px",
                          border: "3px solid transparent",
                          borderColor: "primary",
                        }}
                        index={0}
                        //onMouseEnter={() => setShowTooltip1(true)}
                        //onMouseLeave={() => setShowTooltip1(false)}
                      ></RangeSliderThumb>
                      <RangeSliderThumb
                        w="18px"
                        h="18px"
                        bg="primary"
                        borderRadius="23px"
                        boxShadow="none !important"
                        _active={{
                          bg: "white",
                          w: "22px",
                          h: "22px",
                          border: "3px solid transparent",
                          borderColor: "primary",
                        }}
                        index={1}
                        //onMouseEnter={() => setShowTooltip2(true)}
                        //onMouseLeave={() => setShowTooltip2(false)}
                      ></RangeSliderThumb>
                  </RangeSlider>
                </Box>
              </Flex>
            </Flex>
          </AccordionComponent>

          <Flex w="full" flexDir="column" gap="4" mb="4" mt="30px">
            <Flex w="full" px={{base: "20px", md: "0"}} py="10px" justifyContent="space-between">
              <Text fontSize="16px">מסנן</Text>
              <Button.TextButton
                color="primary"
                fontSize="14px"
                fontWeight="medium"
                onClick={() => clearAllTags()}
              >
                נקה הכל
              </Button.TextButton>
            </Flex>
            <Tags>
              {tags.map((tag) =>
                tag.list.map((text) => (
                  <Tag
                    title={text}
                    closeTag={() => closeTag(tag.title, text)}
                  ></Tag>
                ))
              )}
            </Tags>
          </Flex>

          <AccordionComponent title="מיין לפי">
            <CheckBoxGroup
              deleteTag={unChecked.title === "sortBy" && unChecked.text}
              addTag={(tag) => addTags(tag)}
              title="sortBy"
              list={[
                "מוצרים מובילים בקטגוריה",
                "מומלץ",
                "חדש באתר",
                "הכי נמכר",
              ]}
            />
          </AccordionComponent>
         <AccordionComponent title="מצב מוצר">
            <CheckBoxGroup
              deleteTag={unChecked.title === "status" && unChecked.text}
              addTag={(tag) => addTags(tag)}
              title="status"
              list={["חדש", "כחדש לא היה בשימוש", "משומש", "ישן", "לא עובד"]}
            />
          </AccordionComponent>
          <AccordionComponent title="מותג">
            <CheckBoxGroup
              deleteTag={unChecked.title === "brand" && unChecked.text}
              addTag={(tag) => addTags(tag)}
              title="brand"
              list={["tommy hilfiger", "michle kors", "guess"]}
            />
          </AccordionComponent>
          <AccordionComponent title="דגם">
            <CheckBoxGroup
              deleteTag={unChecked.title === "model" && unChecked.text}
              addTag={(tag) => addTags(tag)}
              title="model"
              //list={["tommy hilfiger", "michle kors", "guess"]}
            />
          </AccordionComponent>
          <AccordionComponent title="מוצרים בהנחה">
            <CheckBoxGroup
              deleteTag={unChecked.title === "discount" && unChecked.text}
              addTag={(tag) => addTags(tag)}
              title="discount"
              list={["משלוח חינם", "10% הנחה", "20% הנחה", "1+1 חינם"]}
            />
          </AccordionComponent>
          <AccordionComponent title="צבע">
            <CheckBoxGroup
              deleteTag={unChecked.title === "color" && unChecked.text}
              addTag={(tag) => addTags(tag)}
              title="color"
              list={["שחור", "לבן", "כחול", "ירוק", "אדום"]}
            />
            </AccordionComponent>
            </Accordion>
      </Box>
    </Box>
  );
}

const AccordionButtonComponent = ({ title }) => {
  return (
    <Flex justifyContent="space-between" w="full" alignItems="center">
      <Text fontWeight="medium" fontSize="18px">
        {title}
      </Text>
      <AccordionIcon color="naturalDark" fontSize="26px" />
    </Flex>
  );
};

const AccordionComponent = ({ title, children }) => {
  return (
    <AccordionItem border="none">
      <AccordionButton>
        <AccordionButtonComponent title={title} />
      </AccordionButton>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};
