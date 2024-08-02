import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Flex,
  Image,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

// נשתמש בספריית country-flag-icons להצגת דגלים
import { getCountryCodeList } from 'country-flag-icons';
import Flags from 'country-flag-icons/react/3x2';

// נשתמש בספריית libphonenumber-js לקבלת רשימת קידומות
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

const countries = getCountries().map(country => ({
  code: country,
  name: new Intl.DisplayNames(['en'], { type: 'region' }).of(country),
  dialCode: `+${getCountryCallingCode(country)}`,
  flag: country
}));

function CountryCodeSelector() {
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'IL'));

  return (
    <Flex>
      <Menu dir="ltr">
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="200px">
          {selectedCountry && (
            <Flex align="center">
              <Box as={Flags[selectedCountry.code]} width="24px" marginRight="8px" />
              {selectedCountry.dialCode}
            </Flex>
          )}
        </MenuButton>
        <MenuList maxHeight="200px" overflowY="auto">
          {countries.map((country) => (
            <MenuItem key={country.code} onClick={() => setSelectedCountry(country)}>
              <Flex align="center">
                <Box as={Flags[country.code]} width="24px" marginRight="8px" />
                <Box>{country.name} ({country.dialCode})</Box>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input placeholder="Phone number" ml={2} />
    </Flex>
  );
}

export default CountryCodeSelector;