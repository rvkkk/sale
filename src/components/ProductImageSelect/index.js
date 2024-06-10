import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { RadioButtonChecked2Icon } from "../Icons";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProductImageSelect(props) {
  const [selected, setSelected] = useState(1);
  return (
    <Swiper
      className="mySwiper"
      slidesPerView="auto"
      spaceBetween={11}
      breakpoints={{
        768: {
          spaceBetween: 40,
        },
      }}
    >
      <SwiperSlide>
        <ImageSelect
          margin="7px"
          checked={props.images[0] && selected === 1}
          choose={(img) => {
            props.select(img);
            setSelected(1);
          }}
          image={props.images[0]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ImageSelect
          checked={selected === 2}
          choose={(img) => {
            props.select(img);
            setSelected(2);
          }}
          image={props.images[1]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ImageSelect
          checked={selected === 3}
          choose={(img) => {
            props.select(img);
            setSelected(3);
          }}
          image={props.images[2]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ImageSelect
          checked={selected === 4}
          choose={(img) => {
            props.select(img);
            setSelected(4);
          }}
          image={props.images[3]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <ImageSelect
          checked={selected === 5}
          choose={(img) => {
            props.select(img);
            setSelected(5);
          }}
          image={props.images[4]}
        />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <ImageSelect
          checked={selected === 6}
          choose={(img) => {
            props.select(img);
            setSelected(6);
          }}
          image={props.images[5]}
        />
      </SwiperSlide>
    </Swiper>
  );
}

const ImageSelect = ({ checked = false, image, choose, margin }) => {
  return (
    <Box
      w={{ base: "80px", sm: "100px", md: "150px" }}
      h={{ base: "80px", sm: "109px", md: "184px" }}
      position="relative"
      paddingTop={{ base: "9px", md: "14px" }}
      marginRight={{ base: checked ? margin : 0, md: "0px" }}
      onClick={() => image && choose(image)}
    >
      <Flex
        display={{ base: "none", md: "flex" }}
        position="absolute"
        left="50%"
        top="14px"
        transform="translate(-50%, -50%)"
      >
        {checked && image ? (
          <RadioButtonChecked2Icon />
        ) : (
          <Flex
            bg="naturalLightest"
            borderRadius="full"
            border="2px"
            h="26.48px"
            w="26.48px"
            borderColor="#D3D4D8"
            opacity="90%"
          />
        )}
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        position="absolute"
        transform="translate(20%, -30%)"
      >
        {checked && image && <RadioButtonChecked2Icon />}
      </Flex>
      <Image
        w="full"
        h="full"
        objectFit="cover"
        borderRadius="12px"
        border="1px solid transparent"
        borderColor={{
          base: checked && image && "primaryLight",
          md: "transparent",
        }}
        src={image ? (image.url || image.image || image) : process.env.PUBLIC_URL + "/assets/Image.png"}
      />
    </Box>
  );
};

//<Radio isChecked={isChecked} position="absolute" size="lg" bg="naturalLight" left="50%" top="0" transform="translate(-50%, -50%)" />
