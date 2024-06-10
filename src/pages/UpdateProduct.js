import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  IconButton,
  Image,
  Spacer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  Input as ChakraInput,
  GridItem,
  Select,
} from "@chakra-ui/react";
import React from "react";
import Bbutton from "../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { DatePicker, TimePicker } from "react-rainbow-components";
import { format } from "date-fns";
import { AiFillExclamationCircle, AiOutlinePicture } from "react-icons/ai";
import { HiArrowDown } from "react-icons/hi";
import Container from "../components/Container";
import FileUploader from "../components/FileUploader";
import { RightIcon2, ShareIcon, TrashIcon } from "../components/Icons";
import Input, { CategoryInput, ExeptionInput } from "../components/Input";
import Layout from "../components/Layout";
import ProductImageSelect from "../components/ProductImageSelect";
import TextArea from "../components/TextArea";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { addProduct, getProduct, updateProduct } from "../utils/api/products";
import {
  addAuctionProduct,
  getAuctionProduct,
  updateAuctionProduct,
} from "../utils/api/auctionProducts";
import { routes } from "../routes";
import { CloseIcon } from "@chakra-ui/icons";
import { getCategories } from "../utils/api/categories";
import { getSubcategoriesOfCategory } from "../utils/api/subcategories";
import { sortAlphabetCategories } from "../utils/sort";
import Checkbox from "../components/CheckBox";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [auction, setAuction] = useState(true);
  const [shadow, setShadow] = useState(1);
  const id = window.location.href.split("/").pop().split("/")[0];
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [warranty, setWarranty] = useState("");
  const [numbers, setNumbers] = useState(
    Array.from(Array(61).keys(), (n) => n)
  );
  const [barcode, setBarcode] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [properties, setProperties] = useState("");
  const [notes, setNotes] = useState("");
  const [kitInclude, setKitInclude] = useState("");
  const [modelName, setModelName] = useState("");
  const [specification, setSpecification] = useState("");
  const [additionalFields, setAdditionalFields] = useState([
    { title: "", desc: "" },
  ]);
  const [fragile, setFragile] = useState(false);
  const [status, setStatus] = useState("לא רלוונטי");
  /*const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [thickness, setThickness] = useState("");
    const [weight, setWeight] = useState("");*/
  const [openingPrice, setOpeningPrice] = useState("");
  /* const [closingPrice, setClosingPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");*/
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(1);
  const [timeFrame, setTimeFrame] = useState(2);
  const [price, setPrice] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pictures, setPictures] = useState([]);
  const [mainPicture, setMainPicture] = useState(null);
  //const [video, setVideo] = useState("");
  const [disable, setDisable] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showAdditional, setShowAdditional] = useState(false);
  const [invalidMainCategory, setInvalidMainCategory] = useState("");
  const [invalidCategory, setInvalidCategory] = useState("");
  const [invalidName, setInvalidName] = useState("");
  const [invalidDescription, setInvalidDescription] = useState("");
  const [invalidDeliveryTime, setInvalidDeliveryTime] = useState("");
  const [invalidPrice, setInvalidPrice] = useState("");
  const [invalidQuantity, setInvalidQuantity] = useState("");
  const [invalidPicture, setInvalidPicture] = useState("");
  const [invalidOpeningPrice, setInvalidOpeningPrice] = useState("");
  // const [invalidPicture, setInvalidPicture] = useState("");
  const token = window.localStorage.getItem("token");

  const handleDateTimeSubmit = () => {
    if (selectedDate) {
      let fullDateTime;
      if (selectedTime)
        fullDateTime = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        );
      else
        fullDateTime = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );
      setStartTime(fullDateTime.toISOString());
      console.log("Selected Date & Time:", fullDateTime);
    }
  };

  const update = () => {
    if (category === "") setInvalidMainCategory("שדה חובה");
    if (subcategory === "") setInvalidCategory("שדה חובה");
    if (name === "") setInvalidName("שדה חובה");
    if (description === "") setInvalidDescription("שדה חובה");
    if (deliveryTime === "") setInvalidDeliveryTime("שדה חובה");
    if (pictures.length === 0) setInvalidPicture("שדה חובה");

    if (auction) {
      if (openingPrice === "") setInvalidOpeningPrice("שדה חובה");
      if (
        category !== "" &&
        subcategory !== "" &&
        name !== "" &&
        description !== "" &&
        deliveryTime !== "" &&
        openingPrice !== "" &&
        pictures[0]
      ) {
        if (token === null) return openLogin();
        setLoading(true);
        const images = mainPicture
          ? [mainPicture, ...pictures.filter((p) => p !== mainPicture)]
          : pictures;
        const filesOnly = images.map((imageObj) => imageObj.image ||imageObj);
        console.log(filesOnly)
        let start = startTime;
        if (start === null) {
          const now = new Date();
          start = now.toISOString();
        }
        const date = new Date(start);
        date.setDate(date.getDate() + timeFrame);
        const end = date.toISOString();
        updateAuctionProduct(
          id,
          name,
          barcode,
          openingPrice,
          start,
          end,
          timeFrame,
          warranty,
          subcategory,
          description,
          additionalInfo,
          properties,
          notes,
          kitInclude,
          deliveryTime,
          modelName,
          specification,
          additionalFields,
          filesOnly,
          status,
          fragile
        ).then((res) => {
          console.log(res);
          if (res.status === "ok") {
            window.location.href = routes.UserSettingsMySales.path;
          } else {
            setLoading(false);
            alert("שגיאה ביצירת מכירה חדשה");
          }
        });
      } else return openFillAll();
    } else {
      if (price === "") setInvalidPrice("שדה חובה");
      if (quantity === "") setInvalidQuantity("שדה חובה");
      if (
        category !== "" &&
        subcategory !== "" &&
        name !== "" &&
        description !== "" &&
        deliveryTime !== "" &&
        price !== "" &&
        quantity !== "" &&
        quantity >= 1 &&
        pictures[0]
      ) {
        if (token === null) return openLogin();
        setLoading(true);
        const images = mainPicture
          ? [mainPicture, ...pictures.filter((p) => p !== mainPicture)]
          : pictures;
        const filesOnly = images.map((imageObj) => imageObj.image ||imageObj);
        console.log(filesOnly)
        updateProduct(
          id,
          name,
          barcode,
          price,
          priceBefore,
          warranty,
          subcategory,
          description,
          additionalInfo,
          properties,
          notes,
          kitInclude,
          quantity,
          deliveryTime,
          modelName,
          specification,
          additionalFields,
          filesOnly,
          status,
          fragile
        )
          .then((res) => {
            console.log(res);
            if (res.status === "ok") {
              window.location.href = routes.UserSettingsMySales.path;
            } else {
              setLoading(false);
              alert("שגיאה ביצירת מכירה חדשה");
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            alert("שגיאה ביצירת מכירה חדשה");
          });
      } else return openFillAll();
    }
  };

  const deleteAll = () => {
    setAuction(true);
    setCategory("");
    setSubcategory("");
    setName("");
    setDescription("");
    setDeliveryTime(1);
    setWarranty(1);
    setAdditionalFields({});
    setAdditionalInfo("");
    setBarcode("");
    setKitInclude("");
    setNotes("");
    setModelName("");
    setSpecification("");
    setProperties("");
    setFragile(false);
    setStatus("לא רלוונטי");
    /*setWidth("");
      setHeight("");
      setThickness("");
      setWeight("");*/
    setPrice("");
    setPriceBefore("");
    setQuantity("");
    setOpeningPrice("");
    setStartTime(new Date());
    setTime(1);
    setTimeFrame(2);
    setPictures([]);
  };

  const {
    isOpen: isOpenDelete,
    onOpen: openDelete,
    onClose: closeDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenFillAll,
    onOpen: openFillAll,
    onClose: closeFillAll,
  } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: openLogin,
    onClose: closeLogin,
  } = useDisclosure();

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const updateField = (index, key, value) => {
    setAdditionalFields((prev) => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  useEffect(() => {
    getCategories()
      .then((res) => {
        console.log(res.categories);
        setCategories(sortAlphabetCategories(res.categories));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (category !== "") {
      getSubcategoriesOfCategory(category)
        .then((res) => {
          console.log(res);
          setSubcategories(sortAlphabetCategories(res.subcategories));
        })
        .catch((err) => console.log(err));
    }
  }, [category]);

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        const p = res.product;
        console.log(p);
        if (p) {
          setAuction(false);
          setName(p.title);
          setBarcode(p.barcode);
          setWarranty(p.warranty);
          setCategory(p.mainCategory.title);
          setSubcategory(p.category.name);
          setDescription(p.description);
          setAdditionalInfo(p["additional-information"]);
          setProperties(p.properties);
          setNotes(p.notes);
          setKitInclude(p["kit-include"]);
          setDeliveryTime(p["delivery-time"]);
          setModelName(p["model-name"]);
          setSpecification(p.specification);
          setAdditionalFields(p["additional-fields"]);
          setPictures(p.images);
          setStatus(p.status);
          setFragile(p.fragile);
          setPrice(p.price);
          setPriceBefore(p["price-before-discount"]);
          setQuantity(p.quantity);
          setShadow(2);
        } else
          getAuctionProduct(id).then((res) => {
            const p = res.product;
            setName(p.title);
            setBarcode(p.barcode);
            setWarranty(p.warranty);
            setCategory(p.mainCategory.title);
            setSubcategory(p.category.name);
            setDescription(p.description);
            setAdditionalInfo(p["additional-information"]);
            setProperties(p.properties);
            setNotes(p.notes);
            setKitInclude(p["kit-include"]);
            setDeliveryTime(p["delivery-time"]);
            setModelName(p["model-name"]);
            setSpecification(p.specification);
            setAdditionalFields(p["additional-fields"]);
            setPictures(p.images);
            setStatus(p.status);
            setFragile(p.fragile);
            setOpeningPrice(p.openingPrice);
            setStartTime(new Date(p.startTime));
            setTime(2);
            setSelectedDate(new Date(p.startTime))
            setSelectedTime(new Date(p.startTime))
            setTimeFrame(p.timeFrame);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout logo>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box
              pb={{ base: "20px", md: "120px" }}
              pt={{ md: "100px", lg: "10" }}
              dir="rtl"
              w="full"
              maxW="780px"
              mx="auto"
            >
              <Flex
                cursor="pointer"
                alignItems="center"
                display={{ base: "none", md: "flex" }}
                gap="2"
                onClick={() => {
                  window.location.href = routes.UserSettingsMySales.path;
                }}
              >
                <ShareIcon />
                <Text>בחזרה למכירות שלי</Text>
              </Flex>
              <Flex
                display={{ base: "flex", md: "none" }}
                alignItems="center"
                justifyContent="center"
                px="10%"
                borderBottom="1px solid"
                borderColor="naturalLight"
                h="75px"
              >
                <Flex position="absolute" cursor="pointer" right="10%">
                  <RightIcon2
                    onClick={() => {
                      window.location.href = routes.HOME.path;
                    }}
                  />
                </Flex>
                <Flex justifyContent="center">
                  <Text
                    fontSize={{ base: "20px", sm: "24px" }}
                    fontWeight="medium"
                    color="naturalDarkest"
                  >
                    פתיחת מכירה חדשה
                  </Text>
                </Flex>
              </Flex>
              <Box w={{ base: "320px", sm: "460px", md: "full" }} mx="auto">
                <Title name="בחר את סוג המכירה" />
                <Flex
                  p={{ base: "0", md: "30px" }}
                  alignItems="center"
                  gap={{ base: "12px", sm: "20px", md: "40px" }}
                  justifyContent="center"
                >
                  <Flex flexDir="column" gap="2" alighItems="center">
                    <Button
                      w={{ base: "154px", sm: "220px", md: "290px" }}
                      h={{ base: "110px", sm: "160px", md: "210px" }}
                      bg="white"
                      _hover={{ bg: "white" }}
                      boxShadow={
                        shadow === 1
                          ? "4px 8px 40px 0 rgba(13, 47, 153, 0.15)"
                          : "none"
                      }
                      alignItems="center"
                      border="2px solid transparent"
                      borderColor={shadow === 1 ? "transparent" : "borderBg"}
                      justifyContent="center"
                      gap={{ base: "7px", sm: "8px" }}
                      borderRadius="20px"
                      flexDir="column"
                      px={{ base: "30px", md: "60px" }}
                      py={{ base: "20px", md: "30px" }}
                      onClick={() => {
                        setAuction(true);
                        setShadow(1);
                      }}
                    >
                      <Image
                        w={{ base: "80px", sm: "110px", md: "140px" }}
                        h={{ base: "60px", sm: "95px", md: "115px" }}
                        src={process.env.PUBLIC_URL + "/assets/25.svg"}
                      />
                      <Text
                        fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                        fontWeight="semibold"
                        color="primary"
                      >
                        מכירה פומבית
                      </Text>
                    </Button>
                    <Text
                      textAlign="center"
                      fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                      color="primaryDark"
                      cursor="pointer"
                      onClick={() =>
                        (window.location.href =
                          routes.CreatePArticle.path.replace(":id", "") + 0)
                      }
                    >
                      *מדריך בנושא מכירה פומבית
                    </Text>
                  </Flex>
                  <Flex flexDir="column" gap="2">
                    <Button
                      border="2px solid transparent"
                      borderColor={shadow === 2 ? "transparent" : "borderBg"}
                      bg="white"
                      _hover={{ bg: "white" }}
                      w={{ base: "154px", sm: "220px", md: "290px" }}
                      h={{ base: "110px", sm: "160px", md: "210px" }}
                      boxShadow={
                        shadow === 2
                          ? "4px 8px 40px 0 rgba(13, 47, 153, 0.15)"
                          : "none"
                      }
                      alignItems="center"
                      justifyContent="center"
                      gap={{ base: "10px", md: "18px" }}
                      borderRadius="20px"
                      flexDir="column"
                      px={{ base: "30px", md: "60px" }}
                      py={{ base: "20px", md: "30px" }}
                      onClick={() => {
                        setAuction(false);
                        setShadow(2);
                      }}
                    >
                      <Image
                        w={{ base: "70px", sm: "100px", md: "120px" }}
                        h={{ base: "55px", sm: "85px", md: "105px" }}
                        src={process.env.PUBLIC_URL + "/assets/5.svg"}
                      />
                      <Text
                        fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                        fontWeight="semibold"
                        color="primary"
                      >
                        מכירה רגילה
                      </Text>
                    </Button>
                    <Text
                      textAlign="center"
                      fontSize={{ base: "12px", sm: "14px", md: "16px" }}
                      color="primaryDark"
                      cursor="pointer"
                      onClick={() =>
                        (window.location.href =
                          routes.CreatePArticle.path.replace(":id", "") + 1)
                      }
                    >
                      *מדריך בנושא מכירה רגילה
                    </Text>
                  </Flex>
                </Flex>
                <Title name="פרטי המוצר" />
                <Flex flexDir="column" gap="4">
                  <CategoryInput
                    value={category}
                    light
                    required
                    isInvalid={invalidMainCategory !== ""}
                    isInvalidMessage={invalidMainCategory}
                    label="קטגוריה ראשית"
                    labelFontSize="14px"
                    categories={["בחר", ...categories]}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setInvalidMainCategory("");
                    }}
                  />
                  <CategoryInput
                    value={subcategory}
                    light
                    required
                    isInvalid={invalidCategory !== ""}
                    isInvalidMessage={invalidCategory}
                    label="קטגוריה משנית"
                    labelFontSize="14px"
                    subcategories={["בחר", ...subcategories]}
                    onChange={(e) => {
                      setSubcategory(e.target.value);
                      setInvalidCategory("");
                    }}
                  />
                  <Input
                    light
                    label="שם המוצר"
                    labelFontSize="14px"
                    isInvalid={invalidName !== ""}
                    isInvalidMessage={invalidName}
                    required
                    value={name}
                    withCounter
                    maxLength="40"
                    onChange={(e) => {
                      setName(e.target.value);
                      setInvalidName("");
                    }}
                    hint={
                      invalidName === "" && (
                        <Flex alignItems="center" gap="2">
                          <Text color="primary">
                            <AiFillExclamationCircle />
                          </Text>
                          <Text fontSize="14px" color="naturalDarkest">
                            יופיע ככותרת של המוצר
                          </Text>
                        </Flex>
                      )
                    }
                  />
                  <TextArea
                    value={description}
                    light
                    isInvalid={invalidDescription !== ""}
                    isInvalidMessage={invalidDescription}
                    required
                    label="תיאור המוצר"
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setInvalidDescription("");
                    }}
                  />
                  <Flex
                    justifyContent="space-between"
                    gap={{ base: "3", md: "5" }}
                  >
                    <ExeptionInput
                      value={deliveryTime}
                      light
                      required
                      isInvalid={invalidDeliveryTime !== ""}
                      isInvalidMessage={invalidDeliveryTime}
                      label="זמן אספקה"
                      placeholder=" "
                      labelFontSize="14px"
                      numbers={numbers.slice(1, 16)}
                      onChange={(e) => {
                        setDeliveryTime(e.target.value);
                        setInvalidDeliveryTime("");
                      }}
                    />
                    <ExeptionInput
                      value={warranty}
                      light
                      label="מספר חודשי אחריות"
                      labelFontSize="14px"
                      placeholder=" "
                      numbers={numbers.slice(0, 37)}
                      onChange={(e) => setWarranty(e.target.value)}
                    />
                  </Flex>
                </Flex>
                <Title
                  name="מידע נוסף על המוצר"
                  onClick={() => setShowAdditional(!showAdditional)}
                />
                <Flex
                  flexDir="column"
                  display={showAdditional ? "flex" : "none"}
                >
                  <Flex flexDir="column" gap="4">
                    <Input
                      light
                      label="מידע נוסף"
                      labelFontSize="14px"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                    <Input
                      light
                      label="מאפיינים"
                      labelFontSize="14px"
                      value={properties}
                      onChange={(e) => setProperties(e.target.value)}
                    />
                    <Input
                      light
                      label="הערות"
                      labelFontSize="14px"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <Input
                      light
                      label="הערכה כוללת"
                      labelFontSize="14px"
                      value={kitInclude}
                      onChange={(e) => setKitInclude(e.target.value)}
                    />
                  </Flex>
                  <Title name="פרטי הדגם" />
                  <Flex flexDir="column" gap="4">
                    <Input
                      light
                      label='מק"ט המוצר (ברקוד)'
                      labelFontSize="14px"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                    />
                    <Input
                      light
                      label="שם הדגם"
                      labelFontSize="14px"
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                    <Input
                      light
                      label="מפרט"
                      labelFontSize="14px"
                      value={specification}
                      onChange={(e) => setSpecification(e.target.value)}
                    />
                  </Flex>
                  <Title name="עריכת שדות נוספים" />
                  <Flex flexDir="column" gap="6">
                    {additionalFields.map((field, index) => (
                      <Flex flexDir="column" gap="4" key={index}>
                        <Text fontWeight="medium">{index + 1}.</Text>
                        <Input
                          light
                          label="כותרת (הכותרת שתופיע בלשונית)"
                          labelFontSize="14px"
                          value={field.title}
                          onChange={(e) =>
                            updateField(index, "title", e.target.value)
                          }
                        />
                        <Input
                          light
                          label="תוכן (התוכן שיופיע תחת הכותרת)"
                          labelFontSize="14px"
                          value={field.desc}
                          onChange={(e) =>
                            updateField(index, "desc", e.target.value)
                          }
                        />
                      </Flex>
                    ))}
                    <Button
                      h="50px"
                      w="200px"
                      mx="auto"
                      //fontSize="20px"
                      borderRadius={{ base: "14px", md: "12px" }}
                      fontWeight="medium"
                      _hover={{ bg: "primaryHover" }}
                      color="white"
                      bg="primary"
                      onClick={() =>
                        setAdditionalFields((prev) => [
                          ...prev,
                          { title: "", desc: "" },
                        ])
                      }
                    >
                      הוסף עוד
                    </Button>
                    <Flex justifyContent="end">
                      <Button
                        variant="link"
                        textDecoration="none"
                        w="80px"
                        //fontSize="20px"
                        fontWeight="medium"
                        color="naturalBlack"
                        onClick={() => setShowAdditional(!showAdditional)}
                      >
                        הצג פחות
                      </Button>
                    </Flex>
                  </Flex>
                  {/*<Title name="מידות המוצר" />
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                      }}
                      gap={{ base: "10px", md: "4" }}
                    >
                      <Input
                        value={width}
                        label="רוחב"
                        labelFontSize="14px"
                        type="number"
                        light
                        onChange={(e) => setWidth(e.target.value)}
                      />
                      <Input
                        value={height}
                        label="גובה"
                        labelFontSize="14px"
                        type="number"
                        light
                        onChange={(e) => setHeight(e.target.value)}
                      />
                      <Input
                        value={thickness}
                        label="עובי"
                        labelFontSize="14px"
                        type="number"
                        light
                        onChange={(e) => setThickness(e.target.value)}
                      />
                      <Input
                        value={weight}
                        label="משקל"
                        labelFontSize="14px"
                        type="number"
                        light
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </Grid>*/}
                </Flex>
                <Title name="מצב המוצר" />
                <Swiper
                  className="mySwiper"
                  slidesPerView="auto"
                  spaceBetween={12}
                  breakpoints={{
                    768: {
                      spaceBetween: 20,
                    },
                  }}
                >
                  <SwiperSlide>
                    <Button
                      variant="outline"
                      w={{ base: "139px", md: "175px" }}
                      h={{ base: "50px", md: "40px" }}
                      borderRadius={{ base: "12px", md: "10px" }}
                      borderColor={{
                        base:
                          status === "חדש, באריזה מקורית"
                            ? "primaryLight"
                            : "transparent",
                        md:
                          status === "חדש, באריזה מקורית"
                            ? "primary"
                            : "bright",
                      }}
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="normal"
                      px={{ base: "10px", md: "16px" }}
                      _hover={
                        status !== "חדש, באריזה מקורית" && { bg: "bright" }
                      }
                      color={{
                        base:
                          status === "חדש, באריזה מקורית"
                            ? "primary"
                            : "naturalDarkest",
                        md:
                          status === "חדש, באריזה מקורית"
                            ? "white"
                            : "naturalDarkest",
                      }}
                      bg={{
                        base:
                          status === "חדש, באריזה מקורית"
                            ? "primaryLightest"
                            : "inputBg",
                        md:
                          status === "חדש, באריזה מקורית" ? "primary" : "white",
                      }}
                      onClick={() => setStatus("חדש, באריזה מקורית")}
                    >
                      חדש, באריזה מקורית
                    </Button>
                  </SwiperSlide>
                  <SwiperSlide w="20%">
                    <Button
                      variant="outline"
                      w={{ base: "132px", md: "168px" }}
                      h={{ base: "50px", md: "40px" }}
                      borderRadius={{ base: "12px", md: "10px" }}
                      borderColor={{
                        base:
                          status === "כחדש, בשימוש קצר"
                            ? "primaryLight"
                            : "transparent",
                        md:
                          status === "כחדש, בשימוש קצר" ? "primary" : "bright",
                      }}
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="normal"
                      px={{ base: "10px", md: "16px" }}
                      _hover={status !== "כחדש, בשימוש קצר" && { bg: "bright" }}
                      color={{
                        base:
                          status === "כחדש, בשימוש קצר"
                            ? "primary"
                            : "naturalDarkest",
                        md:
                          status === "כחדש, בשימוש קצר"
                            ? "white"
                            : "naturalDarkest",
                      }}
                      bgColor={{
                        base:
                          status === "כחדש, בשימוש קצר"
                            ? "primaryLightest"
                            : "inputBg",
                        md: status === "כחדש, בשימוש קצר" ? "primary" : "white",
                      }}
                      onClick={() => setStatus("כחדש, בשימוש קצר")}
                    >
                      כחדש, בשימוש קצר
                    </Button>
                  </SwiperSlide>
                  <SwiperSlide w="20%">
                    <Button
                      variant="outline"
                      w={{ base: "123px", md: "157px" }}
                      h={{ base: "50px", md: "40px" }}
                      borderRadius={{ base: "12px", md: "10px" }}
                      borderColor={{
                        base:
                          status === "משומש, במצב טוב"
                            ? "primaryLight"
                            : "transparent",
                        md: status === "משומש, במצב טוב" ? "primary" : "bright",
                      }}
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="normal"
                      px={{ base: "10px", md: "16px" }}
                      _hover={status !== "משומש, במצב טוב" && { bg: "bright" }}
                      color={{
                        base:
                          status === "משומש, במצב טוב"
                            ? "primary"
                            : "naturalDarkest",
                        md:
                          status === "משומש, במצב טוב"
                            ? "white"
                            : "naturalDarkest",
                      }}
                      bg={{
                        base:
                          status === "משומש, במצב טוב"
                            ? "primaryLightest"
                            : "inputBg",
                        md: status === "משומש, במצב טוב" ? "primary" : "white",
                      }}
                      onClick={() => setStatus("משומש, במצב טוב")}
                    >
                      משומש, במצב טוב
                    </Button>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Button
                      variant="outline"
                      w={{ base: "66px", md: "93px" }}
                      h={{ base: "50px", md: "40px" }}
                      borderRadius={{ base: "12px", md: "10px" }}
                      borderColor={{
                        base:
                          status === "לא עובד" ? "primaryLight" : "transparent",
                        md: status === "לא עובד" ? "primary" : "bright",
                      }}
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="normal"
                      px={{ base: "10px", md: "16px" }}
                      _hover={status !== "לא עובד" && { bg: "bright" }}
                      color={{
                        base:
                          status === "לא עובד" ? "primary" : "naturalDarkest",
                        md: status === "לא עובד" ? "white" : "naturalDarkest",
                      }}
                      bgColor={{
                        base:
                          status === "לא עובד" ? "primaryLightest" : "inputBg",
                        md: status === "לא עובד" ? "primary" : "white",
                      }}
                      onClick={() => setStatus("לא עובד")}
                    >
                      לא עובד
                    </Button>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Button
                      variant="outline"
                      w={{ base: "79px", md: "107px" }}
                      h={{ base: "50px", md: "40px" }}
                      borderRadius={{ base: "12px", md: "10px" }}
                      borderColor={{
                        base:
                          status === "לא רלוונטי"
                            ? "primaryLight"
                            : "transparent",
                        md: status === "לא רלוונטי" ? "primary" : "bright",
                      }}
                      fontSize={{ base: "14px", md: "16px" }}
                      fontWeight="normal"
                      px={{ base: "10px", md: "16px" }}
                      _hover={status !== "לא רלוונטי" && { bg: "bright" }}
                      color={{
                        base:
                          status === "לא רלוונטי"
                            ? "primary"
                            : "naturalDarkest",
                        md:
                          status === "לא רלוונטי" ? "white" : "naturalDarkest",
                      }}
                      bgColor={{
                        base:
                          status === "לא רלוונטי"
                            ? "primaryLightest"
                            : "inputBg",
                        md: status === "לא רלוונטי" ? "primary" : "white",
                      }}
                      onClick={() => setStatus("לא רלוונטי")}
                    >
                      לא רלוונטי
                    </Button>
                  </SwiperSlide>
                </Swiper>
                <Spacer h="6" />
                <Checkbox
                  size="big"
                  checked={fragile}
                  default
                  fontSize="16px"
                  lineHeight="16px"
                  color="naturlDarkest"
                  onChange={() => setFragile(!fragile)}
                  text={"מוצר שביר"}
                ></Checkbox>
                <>
                  {auction ? (
                    <>
                      <Title name="תמחור" />
                      {/*<Grid
                          gridTemplateColumns="1fr 1fr"
                          gap="4"
                          pb={{ base: "20px", md: "35px" }}
                          //alignItems="end"
                    >*/}
                      <Input
                        light
                        required
                        type="number"
                        isInvalid={invalidOpeningPrice !== ""}
                        isInvalidMessage={invalidOpeningPrice}
                        label="הצעת מחיר פתיחה"
                        value={openingPrice}
                        onChange={(e) => {
                          setOpeningPrice(e.target.value);
                          setInvalidOpeningPrice("");
                        }}
                      />
                      {/* </Grid>*/}

                      {/* <Box pb="3">
                          <FormControl display="flex" gap="3" alignItems="center">
                            <Switch
                              id=""
                              size="lg"
                              onChange={() => setDisable(!disable)}
                            />
                            <FormLabel
                              mb="0"
                              letterSpacing="0.005em"
                              lineHeight="18px"
                              fontSize={{ base: "14px", md: "16px" }}
                              fontWeight={{ base: "normal", md: "medium" }}
                            >
                              אפשר הצעות
                            </FormLabel>
                          </FormControl>
                  </Box>
  
                        <Grid
                          gridTemplateColumns="1fr 1fr"
                          gap="4"
                          alignItems="end"
                        >
                          <Input
                            light
                            label="מחיר מינימלי"
                            disabled={disable}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                          <Input
                            light
                            label="מחיר מקסימלי"
                            disabled={disable}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                  </Grid>*/}

                      <Title name="זמן פתיחה" />
                      <Flex
                        flexWrap="wrap"
                        gap={{ base: "10px", md: "5" }}
                        justifyContent={{ base: "space-between", md: "start" }}
                        fontSize="16px"
                      >
                        <Button
                          h={{ base: "50px", md: "40px" }}
                          w={{
                            base: "154px",
                            sm: "220px",
                            md: "-webkit-fit-content",
                          }}
                          variant="outline"
                          borderColor={{
                            base: time === 1 ? "primaryLight" : "transparent",
                            md: time === 1 ? "primary" : "bright",
                          }}
                          fontWeight="normal"
                          _hover={time !== 1 && { bg: "bright" }}
                          color={{
                            base: time === 1 ? "primary" : "naturalDarkest",
                            md: time === 1 ? "white" : "naturalDarkest",
                          }}
                          bgColor={{
                            base: time === 1 ? "primaryLightest" : "inputBg",
                            md: time === 1 ? "primary" : "white",
                          }}
                          borderRadius={{ base: "12px", md: "10px" }}
                          onClick={() => {
                            setStartTime(new Date());
                            setTime(1);
                          }}
                        >
                          התחל מיידית
                        </Button>
                        <Popover closeOnBlur={false}>
                          {({ onClose }) => (
                            <>
                              <PopoverTrigger>
                                <Button
                                  h={{ base: "50px", md: "40px" }}
                                  w={{
                                    base: "154px",
                                    sm: "220px",
                                    md: "-webkit-fit-content",
                                  }}
                                  variant="outline"
                                  borderColor={{
                                    base:
                                      time === 2
                                        ? "primaryLight"
                                        : "transparent",
                                    md: time === 2 ? "primary" : "bright",
                                  }}
                                  fontWeight="normal"
                                  _hover={time !== 2 && { bg: "bright" }}
                                  color={{
                                    base:
                                      time === 2 ? "primary" : "naturalDarkest",
                                    md: time === 2 ? "white" : "naturalDarkest",
                                  }}
                                  bgColor={{
                                    base:
                                      time === 2
                                        ? "primaryLightest"
                                        : "inputBg",
                                    md: time === 2 ? "primary" : "white",
                                  }}
                                  borderRadius={{ base: "12px", md: "10px" }}
                                  onClick={() => {
                                    setTime(2);
                                  }}
                                >
                                  קבע תאריך ושעה
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>קבע תאריך ושעה</PopoverHeader>
                                <PopoverBody>
                                  <Flex
                                    flexDir="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="3"
                                  >
                                    <DatePicker
                                      selected={selectedDate}
                                      onChange={setSelectedDate}
                                      dateFormat="dd/MM/yyyy"
                                      placeholderText="בחר תאריך"
                                      className="date-picker"
                                      minDate={new Date()}
                                    />
                                    <DatePicker
                                      selected={selectedTime}
                                      onChange={setSelectedTime}
                                      showTimeSelect
                                      showTimeSelectOnly
                                      timeIntervals={15}
                                      timeCaption="זמן"
                                      dateFormat="HH:mm"
                                      placeholderText="בחר שעה"
                                      className="time-picker"
                                    />
                                    <Button
                                      alignItems="center"
                                      justifyContent="center"
                                      h="35px"
                                      w={{ base: "70px", md: "80px" }}
                                      fontSize={{ base: "14px", md: "16px" }}
                                      fontWeight="normal"
                                      _hover={{ bg: "primaryHover" }}
                                      color="white"
                                      bgColor="primary"
                                      borderRadius={{
                                        base: "12px",
                                        md: "10px",
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDateTimeSubmit();
                                        onClose();
                                      }}
                                    >
                                      אישור
                                    </Button>
                                  </Flex>
                                </PopoverBody>
                              </PopoverContent>
                            </>
                          )}
                        </Popover>
                      </Flex>

                      <Title name="משך המכרז" />
                      <Swiper
                        className="mySwiper"
                        slidesPerView="auto"
                        spaceBetween={11}
                        breakpoints={{
                          768: {
                            spaceBetween: 20,
                          },
                        }}
                      >
                        <SwiperSlide>
                          <Button
                            h={{ base: "50px", md: "40px" }}
                            w={{ base: "65px", md: "113.33px" }}
                            fontSize={{ base: "14px", md: "16px" }}
                            variant="outline"
                            borderColor={{
                              base:
                                timeFrame === 2
                                  ? "primaryLight"
                                  : "transparent",
                              md: timeFrame === 2 ? "primary" : "bright",
                            }}
                            fontWeight="normal"
                            _hover={timeFrame !== 2 && { bg: "bright" }}
                            color={{
                              base:
                                timeFrame === 2 ? "primary" : "naturalDarkest",
                              md: timeFrame === 2 ? "white" : "naturalDarkest",
                            }}
                            bgColor={{
                              base:
                                timeFrame === 2 ? "primaryLightest" : "inputBg",
                              md: timeFrame === 2 ? "primary" : "white",
                            }}
                            borderRadius={{ base: "12px", md: "10px" }}
                            onClick={() => setTimeFrame(2)}
                          >
                            2 ימים
                          </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Button
                            h={{ base: "50px", md: "40px" }}
                            w={{ base: "65px", md: "113.33px" }}
                            fontSize={{ base: "14px", md: "16px" }}
                            variant="outline"
                            borderColor={{
                              base:
                                timeFrame === 4
                                  ? "primaryLight"
                                  : "transparent",
                              md: timeFrame === 4 ? "primary" : "bright",
                            }}
                            fontWeight="normal"
                            _hover={timeFrame !== 4 && { bg: "bright" }}
                            /* _hover={
                                timeFrame === 4
                                  ? { color: "primaryLight" }
                                  : { bg: "bright" }
                              }*/
                            color={{
                              base:
                                timeFrame === 4 ? "primary" : "naturalDarkest",
                              md: timeFrame === 4 ? "white" : "naturalDarkest",
                            }}
                            bgColor={{
                              base:
                                timeFrame === 4 ? "primaryLightest" : "inputBg",
                              md: timeFrame === 4 ? "primary" : "white",
                            }}
                            borderRadius={{ base: "12px", md: "10px" }}
                            onClick={() => setTimeFrame(4)}
                          >
                            4 ימים
                          </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Button
                            h={{ base: "50px", md: "40px" }}
                            w={{ base: "65px", md: "113.33px" }}
                            fontSize={{ base: "14px", md: "16px" }}
                            variant="outline"
                            borderColor={{
                              base:
                                timeFrame === 7
                                  ? "primaryLight"
                                  : "transparent",
                              md: timeFrame === 7 ? "primary" : "bright",
                            }}
                            fontWeight="normal"
                            _hover={timeFrame !== 7 && { bg: "bright" }}
                            color={{
                              base:
                                timeFrame === 7 ? "primary" : "naturalDarkest",
                              md: timeFrame === 7 ? "white" : "naturalDarkest",
                            }}
                            bgColor={{
                              base:
                                timeFrame === 7 ? "primaryLightest" : "inputBg",
                              md: timeFrame === 7 ? "primary" : "white",
                            }}
                            borderRadius={{ base: "12px", md: "10px" }}
                            onClick={() => setTimeFrame(7)}
                          >
                            7 ימים
                          </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Button
                            h={{ base: "50px", md: "40px" }}
                            w={{ base: "66px", md: "113.33px" }}
                            fontSize={{ base: "14px", md: "16px" }}
                            variant="outline"
                            borderColor={{
                              base:
                                timeFrame === 14
                                  ? "primaryLight"
                                  : "transparent",
                              md: timeFrame === 14 ? "primary" : "bright",
                            }}
                            fontWeight="normal"
                            _hover={timeFrame !== 14 && { bg: "bright" }}
                            color={{
                              base:
                                timeFrame === 14 ? "primary" : "naturalDarkest",
                              md: timeFrame === 14 ? "white" : "naturalDarkest",
                            }}
                            bgColor={{
                              base:
                                timeFrame === 14
                                  ? "primaryLightest"
                                  : "inputBg",
                              md: timeFrame === 14 ? "primary" : "white",
                            }}
                            borderRadius={{ base: "12px", md: "10px" }}
                            onClick={() => setTimeFrame(14)}
                          >
                            14 ימים
                          </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Button
                            h={{ base: "50px", md: "40px" }}
                            w={{ base: "66px", md: "113.33px" }}
                            fontSize={{ base: "14px", md: "16px" }}
                            variant="outline"
                            borderColor={{
                              base:
                                timeFrame === 30
                                  ? "primaryLight"
                                  : "transparent",
                              md: timeFrame === 30 ? "primary" : "bright",
                            }}
                            fontWeight="normal"
                            /*  _hover={
                                timeFrame === 30
                                  ? {
                                      base: { color: "primaryLight" },
                                      md: { color: "white", bg: "primaryDark" },
                                    }
                                  : { bg: "bright" }
                              }*/
                            _hover={timeFrame !== 30 && { bg: "bright" }}
                            color={{
                              base:
                                timeFrame === 30 ? "primary" : "naturalDarkest",
                              md: timeFrame === 30 ? "white" : "naturalDarkest",
                            }}
                            bgColor={{
                              base:
                                timeFrame === 30
                                  ? "primaryLightest"
                                  : "inputBg",
                              md: timeFrame === 30 ? "primary" : "white",
                            }}
                            borderRadius={{ base: "12px", md: "10px" }}
                            onClick={() => setTimeFrame(30)}
                          >
                            30 יום
                          </Button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Select
                            size="lg"
                            h={{ base: "50px", md: "40px" }}
                            w={{ base: "76px", md: "113.33px" }}
                            bg="naturalLightest"
                            fontSize={{ base: "14px", md: "16px" }}
                            border="1px solid"
                            borderColor="naturalLight"
                            placeholder="אחר"
                            textColor="naturalDarkest"
                            type="number"
                            //bg={{ base: "white", md: "inputBg" }}
                            borderRadius={{ base: "12px", md: "10px" }}
                            _focus={{
                              borderColor: "primary",
                              boxShadow: "0 0 0",
                              textColor: "black",
                            }}
                            _hover={{
                              borderColor: "#E8F0FF",
                            }}
                            letterSpacing="0.005em"
                            lineHeight="16.5px"
                            onChange={(e) => setTimeFrame(e.target.value)}
                          >
                            {numbers.slice(1, 61).map((number) => (
                              <option key={number} value={number}>
                                {number}
                              </option>
                            ))}
                          </Select>
                        </SwiperSlide>
                      </Swiper>
                    </>
                  ) : (
                    <>
                      <Title name="מחיר ומלאי" />
                      <Grid
                        gridTemplateColumns={{
                          base: "repeat(2, 1fr)",
                          md: "repeat(3, 1fr)",
                        }}
                        gap={{ base: "10px", md: "4" }}
                      >
                        <Input
                          value={price}
                          type="number"
                          label="מחיר"
                          labelFontSize="14px"
                          required
                          isInvalid={invalidPrice !== ""}
                          isInvalidMessage={invalidPrice}
                          light
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setInvalidPrice("");
                          }}
                        />
                        <Input
                          value={priceBefore}
                          type="number"
                          label="מחיר לפני הנחה"
                          labelFontSize="14px"
                          light
                          onChange={(e) => setPriceBefore(e.target.value)}
                        />
                        <GridItem colSpan={{ base: 2, md: 1 }}>
                          <Input
                            value={quantity}
                            type="number"
                            label="כמות במלאי"
                            labelFontSize="14px"
                            required
                            isInvalid={invalidQuantity !== ""}
                            isInvalidMessage={invalidQuantity}
                            light
                            onChange={(e) => {
                              setQuantity(e.target.value);
                              if (e.target.value >= 1) setInvalidQuantity("");
                              else setInvalidQuantity("כמות במלאי אינה תקינה");
                            }}
                          />
                        </GridItem>
                      </Grid>
                    </>
                  )}
                </>
                <Title name="הוסף תמונות" />
                <Box>
                  <FileUploader
                    number={pictures.length}
                    onClick={handleButtonClick}
                    isInvalid={invalidPicture !== ""}
                    isInvalidMessage={invalidPicture}
                    onDrop={async (files) => {
                      if (files) {
                        let p = [];
                        for (const file of files) {
                          if (pictures.length === 6) {
                            break; // יוצא מהלולאה אם הגענו ל-6 תמונות
                          }
                          p.push({
                            image: file,
                            url: URL.createObjectURL(file),
                            name: file.name,
                            size: file.size,
                          });
                        }
                        setInvalidPicture("");
                        setPictures((prev) => {
                          if (prev.length + p.length > 6) {
                            // חותך את התמונות העודפות אם יש יותר מ-6
                            return [...prev, ...p.slice(0, 6 - prev.length)];
                          } else {
                            return [...prev, ...p];
                          }
                        });
                      }
                    }}
                  />
                  <ChakraInput
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    display="none"
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (files) {
                        let p = [];
                        for (const file of files) {
                          if (pictures.length === 6) {
                            break;
                          }
                          p.push({
                            image: file,
                            url: URL.createObjectURL(file),
                            name: file.name,
                            size: file.size,
                          });
                        }
                        setInvalidPicture("");
                        setPictures((prev) => {
                          if (prev.length + p.length > 6) {
                            return [...prev, ...p.slice(0, 6 - prev.length)];
                          } else {
                            return [...prev, ...p];
                          }
                        });
                      }
                    }}
                  ></ChakraInput>
                  {pictures[0] ? (
                    <>
                      {pictures.map((image, index) => (
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          px="14px"
                          py="11px"
                          mt="4"
                          borderRadius="10px"
                          w={{ base: "320px", sm: "460px", md: "780px" }}
                          h="54px"
                          bg={{ base: "inputBg", md: "naturalLightest" }}
                          key={index}
                        >
                          <IconButton
                            size="xs"
                            bg="naturalLightest"
                            borderRadius="full"
                            border="1px solid transparent"
                            borderColor="naturalDarkest"
                            color="naturalDarkest"
                            _hover={{ bg: "white" }}
                            icon={<CloseIcon />}
                            onClick={() =>
                              setPictures(
                                pictures.filter((p) => p !== image)
                              )
                            }
                          />
                          <Flex
                            gap="3"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Flex dir="ltr" flexDir="column">
                              <Text fontSize="16px">{image.name || index + 1}</Text>
                              {image.size && <Text
                                fontWeight="light"
                                fontSize="12px"
                                lineHeight="16px"
                              >
                                {Math.ceil(image.size / 1000)}Kb
                              </Text>}
                            </Flex>
                            {image.name && image.name.split(".")[1] === "png" ? (
                              <Image
                                h="28px"
                                alt="an icon of png file"
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/FILE PNG.svg"
                                }
                              />
                            ) : (
                              <Image
                                h="28px"
                                alt="an icon of jpg file"
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/FILE JPG.svg"
                                }
                              />
                            )}
                          </Flex>
                        </Flex>
                      ))}
                      <Flex
                        justifyContent={{ base: "start", md: "end" }}
                        mt="4"
                      >
                        <Button
                          variant="unstyled"
                          fontWeight="normal"
                          onClick={() => setPictures([])}
                        >
                          <Flex gap="2">
                            <TrashIcon />
                            <Text fontSize="16px">מחק את כל התמונות</Text>
                          </Flex>
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    ""
                  )}
                </Box>

                <Title name="איזו תמונה תרצה שתופיע כתמונה ראשית" />
                <Box
                  pt={{ base: "10px", md: "20px" }}
                  pb={{ base: "40px", md: "50px" }}
                >
                  <ProductImageSelect
                    images={pictures}
                    select={(picture) => setMainPicture(picture)}
                  />
                </Box>
                <Flex alignItems="center" gap="4">
                  <Bbutton
                    w={{ base: "232px", sm: "360px", md: "184px" }}
                    h={{ base: "60px", md: "64px" }}
                    bg={{ base: "primaryLight", md: "primary" }}
                    borderRadius={{ base: "14px", md: "12px" }}
                    onClick={() => update()}
                  >
                    עדכן מוצר
                  </Bbutton>

      {/*<IconButton
                    w={{ base: "60px", md: "64px" }}
                    h={{ base: "60px", md: "64px" }}
                    bg={{ base: "primaryLightest", md: "naturalLightest" }}
                    size="lg"
                    borderRadius="14px"
                    icon={<TrashIcon fill="#0738D2" />}
                    onClick={openDelete}
                />*/}
                </Flex>
              </Box>
            </Box>
          </Container>

          <Modal
            blockScrollOnMount={false}
            isOpen={isOpenFillAll}
            onClose={closeFillAll}
          >
            <ModalOverlay />
            <ModalContent
              dir="rtl"
              borderRadius="21px"
              shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
              w="600px"
              h="300px"
            >
              <ModalCloseButton
                bg="naturalLightest"
                color="naturalDarkest"
                w="34.94px"
                h="34.94px"
                borderRadius="full"
                right="10px"
                top="10px"
              />

              <ModalBody>
                <Flex
                  mt="2"
                  flexDirection="column"
                  alignItems="center"
                  h="full"
                  gap="4"
                  justifyContent="center"
                >
                  <Text
                    fontSize="22px"
                    fontWeight="semibold"
                    color="naturalBlack"
                  >
                    חלק משדות החובה אינם מלאים
                  </Text>
                  <Text fontSize="18px" fontWeight="light" color="naturalBlack">
                    אנא מלא אותם כראוי והמשך בהפעלת המכירה
                  </Text>
                  <Bbutton w="100px" h="52px" onClick={closeFillAll}>
                    אישור
                  </Bbutton>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/*<Modal isOpen={isOpenLogin} onClose={closeLogin}>
            <ModalOverlay />
            <ModalContent
              dir="rtl"
              borderRadius="21px"
              shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
              w="600px"
              h="378px"
            >
              <ModalCloseButton
                bg="naturalLightest"
                color="naturalDarkest"
                w="34.94px"
                h="34.94px"
                borderRadius="full"
                right="10px"
                top="10px"
              />

              <ModalBody>
                <Flex
                  mt="2"
                  flexDirection="column"
                  alignItems="center"
                  h="full"
                  gap="4"
                  justifyContent="center"
                >
                  <Flex
                    w="252px"
                    gap="8"
                    flexDirection="column"
                    textAlign="center"
                  >
                    <Text
                      fontSize="26px"
                      fontWeight="semibold"
                      color="naturalBlack"
                    >
                      אינך מחובר לאתר
                    </Text>
                    <Text
                      fontSize="18px"
                      fontWeight="semibold"
                      color="naturalBlack"
                    >
                      כדי להעלות מכירה חדשה עליך להיות מחובר לאתר
                    </Text>
                  </Flex>

                  <Flex
                    justifyContent="center"
                    alighItems="center"
                    w="full"
                    gap="4"
                  >
                    <Bbutton
                      w="100px"
                      h="52px"
                      onClick={() => handleSaveToLS()}
                    >
                      התחבר
                    </Bbutton>
                    <Bbutton.Secondary w="100px" h="52px" onClick={closeLogin}>
                      אישור
                    </Bbutton.Secondary>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
                </Modal>*/}

          <Modal isOpen={isOpenDelete} onClose={closeDelete}>
            <ModalOverlay />
            <ModalContent
              dir="rtl"
              borderRadius="21px"
              shadow="0px 5px 40px rgba(0, 0, 0, 0.1)"
              w="600px"
              h="378px"
            >
              <ModalCloseButton
                bg="naturalLightest"
                color="naturalDarkest"
                w="34.94px"
                h="34.94px"
                borderRadius="full"
                right="10px"
                top="10px"
              />

              <ModalBody>
                <Flex
                  mt="2"
                  flexDirection="column"
                  alignItems="center"
                  h="full"
                  gap="4"
                  justifyContent="center"
                >
                  <Box w="252px" textAlign="center">
                    <Text
                      fontSize="28px"
                      fontWeight="semibold"
                      color="naturalBlack"
                    >
                      למחוק את הפרטים?
                    </Text>
                  </Box>
                  <Flex
                    justifyContent="center"
                    alighItems="center"
                    w="full"
                    gap="4"
                  >
                    <Bbutton
                      w="100px"
                      h="52px"
                      onClick={() => {
                        deleteAll();
                        return closeDelete();
                      }}
                    >
                      אישור
                    </Bbutton>
                    <Bbutton.Secondary w="100px" h="52px" onClick={closeDelete}>
                      ביטול
                    </Bbutton.Secondary>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </Layout>
  );
}

const Title = ({ name, onClick }) => {
  return (
    <>
      <Flex
        cursor={onClick && "pointer"}
        onClick={onClick}
        display={{ base: "none", md: "flex" }}
        gap="2"
        alignItems="center"
        mt="50px"
        mb="16px"
      >
        <Flex alignItems="center" gap="1">
          <Text fontWeight="semibold" letterSpacing="0.005em">
            {name}
          </Text>
          {onClick && <HiArrowDown />}
        </Flex>
        <Divider bg="naturalLight" h="2px" flex="1" />
      </Flex>
      <Flex
        cursor={onClick && "pointer"}
        onClick={onClick}
        display={{ base: "flex", md: "none" }}
        bg="inputBg"
        p="10px"
        borderRadius="8px"
        alignItems="center"
        mt="40px"
        mb="10px"
        gap="1"
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: "14px", sm: "16px" }}
          letterSpacing="0.005em"
          color="naturlDarkest"
        >
          {name}
        </Text>
        {onClick && <HiArrowDown />}
      </Flex>
    </>
  );
};
