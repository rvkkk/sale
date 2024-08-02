import {
  Flex,
  Box,
  Text,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { routes } from "../routes";
//import { ListItem, UnorderedList } from "@chakra-ui/react/dist";

export default function CreatePArticle() {
  const [auction, setAuction] = useState(true);

  useEffect(() => {
    const num = window.location.href.split("/").pop().split("/")[0];
    console.log(num);
    num === "1" && setAuction(false);
  }, []);

  return (
    <Layout>
      <Box
        dir="rtl"
        py={{ base: "5", md: "10" }}
        px={{ base: "5", sm: "10", md: "100px", lg: "20%" }}
      >
        <Flex justifyContent="center" mb="8">
          <Heading fontSize="24px" color="primary">
            העלאת מוצר למכירה{!auction ? " רגילה" : " פומבית"} באתר Sale Bid
          </Heading>
        </Flex>

        <Flex flexDir="column" gap="6">
          <Flex flexDir="column" gap="2" display={!auction ? "flex" : "none"}>
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              יצירת מכירה חדשה
            </Text>
            <Text color="naturalDarkest" fontSize="16px">
              עם הכניסה לאתר, לחצו על הכפתור <strong>מכירה חדשה.</strong>
            </Text>
          </Flex>
          <Flex flexDir="column" gap="2" display={auction ? "flex" : "none"}>
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              יצירת מכירה פומבית
            </Text>
            <Text color="naturalDarkest" fontSize="16px">
              עם הכניסה לאתר, לחצו על הכפתור <strong>מכירה חדשה</strong> ובחרו
              באפשרות <strong>מכירה פומבית.</strong>
            </Text>
          </Flex>
          <Text
            color="naturalDarkest"
            fontSize="16px"
            display={auction ? "flex" : "none"}
          >
            במכירה פומבית המחיר עולה בהתאם להצעות של הקונים הפוטנציאליים. בסוף
            משך הזמן שנקבע למכירה, המציע בעל ההצעה הגבוהה ביותר זוכה.
          </Text>
          <Flex flexDir="column" gap="2">
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              בחירת קטגוריה
            </Text>
            <Text color="naturalDarkest" fontSize="16px">
              ראשית בחרו את הקטגוריה המתאימה למוצר ברשימה המופיעה. לדוגמה, אם
              מדובר בסמארטפון - בחרו בקטגוריה <strong>מוצרי חשמל</strong> ולאחר
              מכן בקטגוריית המשנה <strong>טלפונים סלולריים.</strong>
            </Text>
          </Flex>
          <Flex flexDir="column" gap="2">
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              פרטי המוצר
            </Text>
            <Text color="naturalDarkest" fontSize="16px">
              בשלב הבא מלאו את פרטי המוצר:
            </Text>
            <UnorderedList color="naturalDarkest" mr="50px">
              <ListItem>שם מוצר – שם ברור המאפיין במדוייק את המוצר</ListItem>
              <ListItem>תיאור - תיאור מפורט על המוצר ומאפייניו</ListItem>
              <ListItem>מידות ומשקל - (אופציונלי)</ListItem>
              <ListItem>מצב מוצר - חדש, כחדש, משומש וכו'</ListItem>
              <ListItem>מחיר המוצר</ListItem>
              <ListItem>כמות במלאי - (אופציונלי)</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column" gap="2">
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              תמונות ופרסום
            </Text>
            <UnorderedList color="naturalDarkest" mr="50px">
              <ListItem>
                הוסיפו מספר תמונות איכותיות של המוצר מזוויות שונות
              </ListItem>
              <ListItem>בחרו תמונה אחת שתשמש כתמונה הראשית בפרסום</ListItem>
            </UnorderedList>
          </Flex>
          <Flex flexDir="column" gap="2" display={auction ? "flex" : "none"}>
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              קביעת מועד המכירה
            </Text>
            <Text color="naturalDarkest" fontSize="16px">
              קבעו מתי להתחיל את המכירה וכמה זמן תימשך - בחרו במספר הימים הרצוי
              או הגדירו בעצמכם.
            </Text>
          </Flex>
          <Text color="naturalDarkest" fontSize="16px">
            בסיום לחצו על <strong style={{ color: "primary" }}>שמור</strong> כדי
            לפרסם את המכירה או{" "}
            <strong style={{ textColor: "primary" }}>שמור למועד מאוחר</strong>{" "}
            יותר כדי לשמור את הפרטים ולהשלים מאוחר יותר.
          </Text>
          <Flex
            flexDir={{ base: "column", sm: "row" }}
            gap="8"
            justifyContent={{ base: "center", sm: "space-between" }}
            alignItems="center"
          >
            <Text color="primaryDark" fontSize="18px" fontWeight="semibold">
              בהצלחה במכירה!
            </Text>
            <Button w="200px" href={routes.CreateProduct.path}>
              להוספת מכירה חדשה
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}
