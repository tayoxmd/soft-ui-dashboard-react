// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import { useAuth } from "../../../auth-context/auth.context";

export default function AuthSettings() {
  const { user } = useAuth();
  const textColor = useColorModeValue("gray.700", "white");
  const bgCard = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // State for authentication methods
  const [authMethods, setAuthMethods] = useState({
    email: true,
    phone: false,
    whatsapp: false,
    apple: false,
    twitter: false,
  });

  // State for account linking
  const [accountLinking, setAccountLinking] = useState({
    whatsappToPhone: false,
    whatsappToEmail: false,
    phoneToEmail: false,
    appleToPhone: false,
    appleToEmail: false,
    twitterToPhone: false,
    twitterToEmail: false,
  });

  const handleAuthMethodChange = (method) => {
    setAuthMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const handleAccountLinkingChange = (link) => {
    setAccountLinking((prev) => ({
      ...prev,
      [link]: !prev[link],
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving auth settings:", { authMethods, accountLinking });
    // You can add API call here to save settings
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card mb="24px">
        <CardHeader>
          <Heading fontSize="lg" color={textColor} fontWeight="bold">
            Authentication Settings
          </Heading>
          <Text fontSize="sm" color="gray.400" mt="8px">
            Manage login and logout options and account linking preferences
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing="24px" align="stretch">
            <Alert status="info" borderRadius="15px">
              <AlertIcon />
              <AlertDescription>
                You are currently logged in as: {user?.email || "Guest"}
              </AlertDescription>
            </Alert>

            <Box>
              <Heading fontSize="md" color={textColor} mb="16px">
                Authentication Methods
              </Heading>
              <Text fontSize="sm" color="gray.400" mb="20px">
                Enable or disable different authentication methods
              </Text>
              <VStack spacing="16px" align="stretch">
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="email-auth" mb="0" fontWeight="normal">
                      Email Authentication
                    </FormLabel>
                    <Text fontSize="xs" color="gray.400">
                      Login using email and password
                    </Text>
                  </Box>
                  <Switch
                    id="email-auth"
                    colorScheme="teal"
                    isChecked={authMethods.email}
                    onChange={() => handleAuthMethodChange("email")}
                  />
                </FormControl>

                <Divider />

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="phone-auth" mb="0" fontWeight="normal">
                      Phone Number Authentication
                    </FormLabel>
                    <Text fontSize="xs" color="gray.400">
                      Login using phone number and OTP
                    </Text>
                  </Box>
                  <Switch
                    id="phone-auth"
                    colorScheme="teal"
                    isChecked={authMethods.phone}
                    onChange={() => handleAuthMethodChange("phone")}
                  />
                </FormControl>

                <Divider />

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="whatsapp-auth" mb="0" fontWeight="normal">
                      WhatsApp Authentication
                    </FormLabel>
                    <Text fontSize="xs" color="gray.400">
                      Login using WhatsApp number
                    </Text>
                  </Box>
                  <Switch
                    id="whatsapp-auth"
                    colorScheme="teal"
                    isChecked={authMethods.whatsapp}
                    onChange={() => handleAuthMethodChange("whatsapp")}
                  />
                </FormControl>

                <Divider />

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="apple-auth" mb="0" fontWeight="normal">
                      Apple Sign In
                    </FormLabel>
                    <Text fontSize="xs" color="gray.400">
                      Login using Apple ID
                    </Text>
                  </Box>
                  <Switch
                    id="apple-auth"
                    colorScheme="teal"
                    isChecked={authMethods.apple}
                    onChange={() => handleAuthMethodChange("apple")}
                  />
                </FormControl>

                <Divider />

                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel htmlFor="twitter-auth" mb="0" fontWeight="normal">
                      Twitter Authentication
                    </FormLabel>
                    <Text fontSize="xs" color="gray.400">
                      Login using Twitter account
                    </Text>
                  </Box>
                  <Switch
                    id="twitter-auth"
                    colorScheme="teal"
                    isChecked={authMethods.twitter}
                    onChange={() => handleAuthMethodChange("twitter")}
                  />
                </FormControl>
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Heading fontSize="md" color={textColor} mb="16px">
                Account Linking Options
              </Heading>
              <Text fontSize="sm" color="gray.400" mb="20px">
                Configure how different authentication methods can be linked together
              </Text>
              <VStack spacing="16px" align="stretch">
                {authMethods.whatsapp && (
                  <>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="whatsapp-phone-link" mb="0" fontWeight="normal">
                          Link WhatsApp to Phone Number
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via WhatsApp can also login with phone number
                        </Text>
                      </Box>
                      <Switch
                        id="whatsapp-phone-link"
                        colorScheme="teal"
                        isChecked={accountLinking.whatsappToPhone}
                        onChange={() => handleAccountLinkingChange("whatsappToPhone")}
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="whatsapp-email-link" mb="0" fontWeight="normal">
                          Link WhatsApp to Email
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via WhatsApp can also login with email
                        </Text>
                      </Box>
                      <Switch
                        id="whatsapp-email-link"
                        colorScheme="teal"
                        isChecked={accountLinking.whatsappToEmail}
                        onChange={() => handleAccountLinkingChange("whatsappToEmail")}
                      />
                    </FormControl>
                    <Divider />
                  </>
                )}

                {authMethods.phone && (
                  <>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="phone-email-link" mb="0" fontWeight="normal">
                          Link Phone Number to Email
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via phone can also login with email
                        </Text>
                      </Box>
                      <Switch
                        id="phone-email-link"
                        colorScheme="teal"
                        isChecked={accountLinking.phoneToEmail}
                        onChange={() => handleAccountLinkingChange("phoneToEmail")}
                      />
                    </FormControl>
                    <Divider />
                  </>
                )}

                {authMethods.apple && (
                  <>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="apple-phone-link" mb="0" fontWeight="normal">
                          Link Apple ID to Phone Number
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via Apple can also login with phone number
                        </Text>
                      </Box>
                      <Switch
                        id="apple-phone-link"
                        colorScheme="teal"
                        isChecked={accountLinking.appleToPhone}
                        onChange={() => handleAccountLinkingChange("appleToPhone")}
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="apple-email-link" mb="0" fontWeight="normal">
                          Link Apple ID to Email
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via Apple can also login with email
                        </Text>
                      </Box>
                      <Switch
                        id="apple-email-link"
                        colorScheme="teal"
                        isChecked={accountLinking.appleToEmail}
                        onChange={() => handleAccountLinkingChange("appleToEmail")}
                      />
                    </FormControl>
                    <Divider />
                  </>
                )}

                {authMethods.twitter && (
                  <>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="twitter-phone-link" mb="0" fontWeight="normal">
                          Link Twitter to Phone Number
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via Twitter can also login with phone number
                        </Text>
                      </Box>
                      <Switch
                        id="twitter-phone-link"
                        colorScheme="teal"
                        isChecked={accountLinking.twitterToPhone}
                        onChange={() => handleAccountLinkingChange("twitterToPhone")}
                      />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <FormLabel htmlFor="twitter-email-link" mb="0" fontWeight="normal">
                          Link Twitter to Email
                        </FormLabel>
                        <Text fontSize="xs" color="gray.400">
                          Users logged in via Twitter can also login with email
                        </Text>
                      </Box>
                      <Switch
                        id="twitter-email-link"
                        colorScheme="teal"
                        isChecked={accountLinking.twitterToEmail}
                        onChange={() => handleAccountLinkingChange("twitterToEmail")}
                      />
                    </FormControl>
                  </>
                )}
              </VStack>
            </Box>

            <HStack spacing="12px" justify="flex-end" mt="24px">
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => {
                  setAuthMethods({
                    email: true,
                    phone: false,
                    whatsapp: false,
                    apple: false,
                    twitter: false,
                  });
                  setAccountLinking({
                    whatsappToPhone: false,
                    whatsappToEmail: false,
                    phoneToEmail: false,
                    appleToPhone: false,
                    appleToEmail: false,
                    twitterToPhone: false,
                    twitterToEmail: false,
                  });
                }}
              >
                Reset
              </Button>
              <Button colorScheme="teal" onClick={handleSave}>
                Save Settings
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
}


