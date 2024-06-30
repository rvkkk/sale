import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, lazy, Suspense } from "react";

export default function ProductAccordings({ tabs = [] }) {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [tabsData, setTabsData] = useState({});

  const handleAccordionChange = (expandedIndex) => {
    setExpandedIndexes(expandedIndex);
    expandedIndex.forEach(index => {
      if (tabs[index].loadData && !tabsData[index]) {
        tabs[index].loadData().then(data => {
          setTabsData(prev => ({ ...prev, [index]: data }));
        });
      }
    });
  };

  return (
    <Accordion 
      allowMultiple 
      borderTop="1px solid #D3D4D8" 
      borderBottom="1px solid #D3D4D8"
      onChange={handleAccordionChange}
      index={expandedIndexes}
    >
      {tabs.map((tab, index) => {
        const Component = tab.lazyComponent 
          ? lazy(tab.lazyComponent) 
          : tab.component;
        return (
          <AccordionComponent key={index} title={tab.name}>
            <Suspense fallback={<Spinner />}>
              <Component data={tabsData[index]} {...tab.props}/>
            </Suspense>
          </AccordionComponent>
        );
      })}
    </Accordion>
  );
}

const AccordionButtonComponent = ({ title }) => {
  return (
    <Flex justifyContent="space-between" w="full" alignItems="center">
      <Text
        fontWeight="medium"
        fontSize="18px"
        lineHeight="20px"
      >
        {title}
      </Text>
      <AccordionIcon color="naturalDark" fontSize="26px" />
    </Flex>
  );
};

const AccordionComponent = ({ title, children }) => {
  return (
    <AccordionItem borderBottom="1px solid #D3D4D8">
      <AccordionButton 
        py="20px" 
        px="0" 
        _hover={{bg: "white"}} 
        color="naturalDarkest" 
        _expanded={{ bg: 'white', color: 'primaryLight' }}
      >
        <AccordionButtonComponent title={title} />
      </AccordionButton>
      <AccordionPanel p="0">{children}</AccordionPanel>
    </AccordionItem>
  );
};
