import { Card, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { getTimeLeft } from "../../utils/date";
import { useState, useEffect } from "react";
import { ClockBigIcon, ClockIcon, ClockSmallIcon } from "../Icons";

export default function ProductTimeClock(props) {
  const [timeLeft, setTimeLeft] = useState(
    getTimeLeft(props.date, props.frame)
  );

  useEffect(() => {
    console.log(timeLeft);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(props.date, props.frame));
    }, 1000); // Run every 1 second

    return () => clearInterval(interval);
  }, []);

  return props.showProduct ? (
    <>
      <Flex
        alignItems="center"
        gap="10px"
        display={{ base: "none", md: "flex" }}
      >
        <ClockBigIcon />
        <Text fontSize="24px" lineHeight="42px" color="primary">
          {`${timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days}d : ${
            timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours
          }h : ${
            timeLeft.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes
          }m : ${
            timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds
          }s`}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        gap="10px"
        display={{ base: "flex", md: "none" }}
        //w="144px"
        h="35px"
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="30px"
      >
        <ClockSmallIcon fill="#FFFFFF" />
        <Text
          fontSize="16px"
          lineHeight="14px"
          fontWeight="light"
          letterSpacing="0.02em"
          color="naturalWhite"
        >
          {`${timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days}d :${
            timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours
          }h : ${
            timeLeft.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes
          }m : ${
            timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds
          }s`}
        </Text>
      </Flex>
    </>
  ) : (
    <>
      <Card
        display={{ base: "none", md: "block" }}
        w="max"
        borderRadius="12px"
        bg="white"
        p="1.5"
        px="3"
      >
        {timeLeft.hours === -1 ? (
          <Flex justifyContent="center" alignItems="center" w="max">
            <Text
              color="secendaryDark"
              fontWeight="light"
              fontSize="18px"
              letterSpacing="0.02em"
            >
              COMING SOON
            </Text>
          </Flex>
        ) : timeLeft.days === 0 &&
          timeLeft.hours === 0 &&
          timeLeft.minutes === 0 &&
          timeLeft.seconds === 0 ? (
          <Flex justifyContent="center" alignItems="center" w="max">
            <Text
              color="naturalDark"
              fontWeight="light"
              fontSize="18px"
              letterSpacing="0.02em"
            >
              CLOSED
            </Text>
          </Flex>
        ) : (
          <Flex justifyContent="end" alignItems="center" gap="2" w="max">
            {/*<BiAlarm color="naturalDarkest" fontSize="18px" />*/}
            <ClockIcon />
            {timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 ? (
              <Text
                color="otherError"
                fontWeight="light"
                fontSize="18px"
                letterSpacing="0.02em"
              >
                {`00d : 00h : 00m : ${
                  timeLeft.seconds < 10
                    ? "0" + timeLeft.seconds
                    : timeLeft.seconds
                }s`}
              </Text>
            ) : (
              <Text
                color="primary"
                fontWeight="light"
                fontSize="18px"
                letterSpacing="0.02em"
              >
                {`${
                  timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days
                }d :${
                  timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours
                }h : ${
                  timeLeft.minutes < 10
                    ? "0" + timeLeft.minutes
                    : timeLeft.minutes
                }m : ${
                  timeLeft.seconds < 10
                    ? "0" + timeLeft.seconds
                    : timeLeft.seconds
                }s`}
              </Text>
            )}
          </Flex>
        )}
      </Card>
      <Card
        display={{ base: "flex", md: "none" }}
        dir="rtl"
        w="129px"
        h="30px"
        borderRadius="6px"
        border="0.5px solid"
        borderColor="naturalLight"
        bg="white"
        justifyContent="center"
        alignItems="center"
      >
        {timeLeft.hours === -1 ? (
          <Flex>
            <Text
              color="secendaryDark"
              fontWeight="light"
              fontSize="14px"
              letterSpacing="0.02em"
            >
              COMING SOON
            </Text>
          </Flex>
        ) : timeLeft.days === 0 &&
          timeLeft.hours === 0 &&
          timeLeft.minutes === 0 &&
          timeLeft.seconds === 0 ? (
          <Flex justifyContent="center" alignItems="center" w="max">
            <Text
              color="naturalDark"
              fontWeight="light"
              fontSize="14px"
              letterSpacing="0.02em"
            >
              CLOSED
            </Text>
          </Flex>
        ) : (
          <Flex justifyContent="center" alignItems="center" gap="2" w="max">
            <ClockSmallIcon />
            {timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 ? (
              <Text
                color="otherError"
                fontWeight="light"
                fontSize="14px"
                letterSpacing="0.02em"
              >
                {`00d : 00h : 00m : ${
                  timeLeft.seconds < 10
                    ? "0" + timeLeft.seconds
                    : timeLeft.seconds
                }s`}
              </Text>
            ) : (
              <Text
                color="primary"
                fontWeight="light"
                fontSize="13.5px"
                lineHeight="14px"
                letterSpacing="0.02em"
              >
                {`${
                  timeLeft.days < 10 ? "0" + timeLeft.days : timeLeft.days
                }d : ${
                  timeLeft.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours
                }h : ${
                  timeLeft.minutes < 10
                    ? "0" + timeLeft.minutes
                    : timeLeft.minutes
                }m : ${
                  timeLeft.seconds < 10
                    ? "0" + timeLeft.seconds
                    : timeLeft.seconds
                }s`}
              </Text>
            )}
          </Flex>
        )}
      </Card>
    </>
  );
}
