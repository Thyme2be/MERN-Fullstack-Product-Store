import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "./ui/toaster";
import { useState } from "react";

const Product = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const [updatedProduct, setUpdateProduct] = useState(product);
  const { updateProduct, deleteProduct } = useProductStore();

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);

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
        description: "Product updated successfully",
        type: "success",
        duration: 4000,
        action: {
          label: "X",
        },
      });
    }
  };

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
          ${(product.price).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>

        <HStack gap={2}>
          <Toaster />

          <DialogRoot
            placement={"center"}
            motionPreset={"slide-in-bottom"}
            closeOnInteractOutside={false}
          >
            <DialogTrigger asChild>
              {/* Update Icon */}
              <IconButton colorPalette={"blue"}>
                <FaEdit />
              </IconButton>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(event) =>
                      setUpdateProduct({
                        ...updatedProduct,
                        name: event.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Price"
                    name="name"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(event) =>
                      setUpdateProduct({
                        ...updatedProduct,
                        price: event.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    name="name"
                    value={updatedProduct.image}
                    onChange={(event) =>
                      setUpdateProduct({
                        ...updatedProduct,
                        image: event.target.value,
                      })
                    }
                  />
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  {/* Update Button */}
                  <Button
                    colorPalette={"blue"}
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Update
                  </Button>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Button>Cancel</Button>
                </DialogActionTrigger>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>

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
