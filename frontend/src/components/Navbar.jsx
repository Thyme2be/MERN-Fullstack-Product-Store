import { Container, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { FaRegSquarePlus } from "react-icons/fa6";
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";

const Navbar = () => {
  const navButtonProps = {
    variant: "surface",
    size: "xl",
    bg: useColorModeValue("white", "gray.800"),
    color: useColorModeValue("gray.800", "white"),
    _hover: {
      bg: useColorModeValue("gray.200", "gray.700"),
    },
  };

  return (
    <Container maxWidth={"1140px"} paddingX={4}>
      <Flex
        height={"16"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{
          base: "row",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          backgroundClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack gap={2} alignItems={"center"}>
          <Link to={"/create"}>
            <IconButton {...navButtonProps}>
              <FaRegSquarePlus />
            </IconButton>
          </Link>
          <ColorModeButton {...navButtonProps} />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
