import { Box, Flex, Image, Text, Input as ChakraInput } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import CommentPagination from "../CommentPagination";
import ProductComment from "../ProductComment";
import { getProductReviews, addReview } from "../../utils/api/reviews";
import { getUserProfile } from "../../utils/api/users";
import Button from "../Button";
import Input from "../Input";
import TextArea from "../TextArea";
import { PaperClipIcon, SendIcon, StarEmptyIcon, StarFullIcon, StarHalfIcon } from "../Icons";

export default function Tab2Component({productId}) {
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [showAddR, setShowAddR] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(-1);
  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const token = window.localStorage.getItem("token");
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setReviews(
        allReviews.slice((currentPage - 2) * 10, (currentPage - 1) * 10)
      );
    }
  };

  const onForwardPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
      setReviews(allReviews.slice(currentPage * 10, (currentPage + 1) * 10));
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setReviews(allReviews.slice((page - 1) * 10, page * 10));
  };

  useEffect(() => {
    getProductReviews(productId)
      .then((res) => {
        setAllReviews(res.reviews);
        setReviews(res.reviews.slice(0, 10));
        setPages(Math.ceil(res.reviews / 10));
        console.log(res);
      })
      .catch((err) => console.log(err));
    if (token !== null)
      getUserProfile()
        .then((res) => setProfileImage(res.profileImage))
        .catch((err) => console.log(err));
  }, []);

  const addPReview = () => {
    if (title !== "" && score !== -1)
      addReview(
        window.location.href.split("/").pop().split("?")[0],
        title,
        description,
        score,
        images
      ).then((res) => setShowAddR(false));
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  return (
    <Flex>
      <Box w="full" maxW="800px" mx="auto">
        {token && (
          <>
            <Flex
              cursor="pointer"
              w="full"
              h={{base: "54px", md: "72px"}}
              p="12px"
              border="1px solid transparent"
              borderColor="naturalLight"
              alignItems="center"
              borderRadius="16px"
              gap="8px"
              onClick={() => {
                setShowAddR(!showAddR);
                setTitle("");
                setDescription("");
                setScore(-1);
                setImages([]);
              }}
            >
              <Image w={{base: "30px", md: "48px"}} borderRadius="8px" src={profileImage} />
              <Text color="naturalBlack" fontWeight="medium">
                הוסף את תגובתך
              </Text>
            </Flex>
            {showAddR && (
              <Box
                mt="20px"
                maxW="800px"
                px={{base: "30px", md: "45px"}}
                py="40px"
                alignItems="center"
                justifyContent="center"
                border="1px solid transparent"
                borderColor="naturalLight"
                borderRadius="16px"
              >
                <Flex flexDir="column" gap="19px">
                  <Flex  justifyContent="start">
                    <Text fontSize="16px" fontWeight="medium">
                      דירוג:
                    </Text>
                    <Flex w="full" alignItems="center" justifyContent="center">
                      <ReactStars
                        count={5}
                        value={0}
                        size={33}
                        emptyIcon={<StarEmptyIcon />}
                        halfIcon={<StarHalfIcon />}
                        filledIcon={<StarFullIcon />}
                        activeColor="#69D6CF"
                        onChange={(event) => setScore(Number(event))}
                      />
                    </Flex>
                  </Flex>
                  <Input
                    required
                    label="כותרת"
                    labelFontSize="14px"
                    labelFontWeight="medium"
                    placeholder="כותרת"
                    borderRadius="8px"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                  <TextArea
                    required
                    label="הוסף בכמה מילים את תחושתך"
                    labelFontSize="14px"
                    labelFontWeight="medium"
                    placeholder="תיאור המוצר"
                    borderRadius="8px"
                    h={{base: "100px", md: "132px"}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextArea>

                  <ChakraInput
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    disabled={false}
                    style={{ display: "none" }}
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        let p = [];
                        for (const file of files)
                          p.push(URL.createObjectURL(file));
                        setImages(p);
                      }
                    }}
                  ></ChakraInput>
                  <Flex gap={{base: "15px", md: "30px"}} justifyContent="space-between" mt="10px">
                    <Button.Secondary
                      onClick={handleButtonClick}
                      h={{base: "55px", md: "64px"}}
                      w={{base: "150px", sm: "270px", md: "440px", lg: "500px"}}
                      fontSize="14px"
                      fontWeight="semibold"
                      color="naturalDarkest"
                      border="1px dotted"
                      borderColor="naturalDark"
                      borderRadius="10px"
                      gap={{base: "6px", sm: "12px"}}
                      py="20px"
                      px={{base: "20px", sm: "40px"}}
                    >
                      הוסף תמונה <PaperClipIcon />
                    </Button.Secondary>
                    <Button
                      fontSize="20px"
                      w={{base: "100px", sm: "120px", md: "160px", lg: "170px"}}
                      h={{base: "55px", md: "64px"}}
                      gap={{base: "6px", sm: "12px"}}
                      py="20px"
                      px={{base: "15px", sm: "20px", md: "20px"}}
                      borderRadius="15px"
                      onClick={() => addPReview()}
                    >
                      שלח <SendIcon />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            )}
          </>
        )}
        <Box>
          {reviews[0] &&
            reviews.map((review, key) => (
              <ProductComment
                rating={review.score}
                name={review.user.userName}
                commentDetails={review.createdAt}
                comment={review.title}
                commentText={review.description}
                images={review.images}
              />
            ))}
          <ProductComment
            rating="5"
            name="אליעזר"
            commentDetails="Comment in Israel 14m ago"
            comment="מוצר מדהים!"
            commentText="נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם."
          />
          <ProductComment
            rating="4.5"
            name="Dan Likraz23"
            commentDetails="Comment in USA 6d ago"
            comment="Great Item!"
            commentText="Thank you"
            images={[
              "/assets/Image.png",
              "/assets/Image.png",
              "/assets/Image.png",
            ]}
          />
          <ProductComment
            rating="3"
            name="JasonPaz"
            commentDetails="לפני 5 שעות"
            comment="אתר אמין ואדיב"
            commentText="רכשתי מוצר במכירה פומבית והמוצר הגיע מהר."
          />
        </Box>

        <Flex mt="6" mb="4" justifyContent={{base: "center", md: "space-between"}}>
          <CommentPagination
            currentPage={currentPage}
            pages={pages}
            onBack={() => onBackPage()}
            onForward={() => onForwardPage()}
            onPageChange={(page) => onPageChange(page)}
          />
          <Button.TextButton
          display={{base: "none", md: "block"}}
            color="primary"
            fontWeight="semibold"
            onClick={() =>
              setReviews(
                allReviews.slice((currentPage - 1) * 10, currentPage * 20)
              )
            }
          >
            ראה עוד תגובות
          </Button.TextButton>
          {/*האם לעשות את BUTTON או רק טקסט בנאלי*/}
        </Flex>
      </Box>
    </Flex>
  );
}
