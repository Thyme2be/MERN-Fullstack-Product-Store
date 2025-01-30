import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "./ui/toaster";

const Product = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 4000,
        action: {
          label: "X",
        },
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 4000,
        action: {
          label: "X",
        },
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      _hover={{ transform: "translateY(-10px)", shadow: "2xl" }}
      transition="all 0.3s"
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        height={48}
        width={"full"}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>
          <Toaster />

          {/* Update Icon */}

          <IconButton colorPalette={"blue"}>
            <FaEdit />
          </IconButton>

          {/* Delete Icon */}
          <IconButton
            colorPalette={"red"}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteForever />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default Product;
