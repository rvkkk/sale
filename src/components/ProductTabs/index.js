import React, { useState, lazy, Suspense } from "react";
import {
  Tab as ChakraTab,
  Tabs as ChakraTabs,
  TabPanel as ChakraTabPanel,
  TabPanels as ChakraTabPanels,
  TabList as ChakraTabList,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Container from "../Container";

export default function ProductTabs({ tabs = [], defaultIndex = 0 }) {
  const [tabIndex, setTabIndex] = useState(defaultIndex);
  const [tabsData, setTabsData] = useState({});

  const handleTabChange = (index) => {
    setTabIndex(index);
    if (tabs[index].loadData && !tabsData[index]) {
      tabs[index].loadData().then((data) => {
        setTabsData((prev) => ({ ...prev, [index]: data }));
      });
    }
  };

  return (
    <ChakraTabs index={tabIndex} onChange={handleTabChange} colorScheme="green">
      <Container>
        <Box py="10" maxW="1420px" mx={{ base: "10%", "2xl": "auto" }}>
          <ChakraTabList>
            {tabs.map((tab, index) => (
              <TabComponent
                key={index}
                active={tabIndex === index}
                name={tab.name}
              />
            ))}
          </ChakraTabList>
          <ChakraTabPanels>
            {tabs.map((tab, index) => {
              const Component = tab.lazyComponent
                ? lazy(tab.lazyComponent)
                : tab.component;
              return (
                <ChakraTabPanel key={index}>
                  <Suspense fallback={<Spinner />}>
                    <Component data={tabsData[index]} {...tab.props}/>
                  </Suspense>
                </ChakraTabPanel>
              );
            })}
          </ChakraTabPanels>
        </Box>
      </Container>
    </ChakraTabs>
  );
}

const TabComponent = ({ name, active }) => {
  return (
    <ChakraTab _selected={{ borderColor: "primary" }}>
      <Text color={active ? "primary" : "naturalDarkest"}> {name} </Text>
    </ChakraTab>
  );
};
