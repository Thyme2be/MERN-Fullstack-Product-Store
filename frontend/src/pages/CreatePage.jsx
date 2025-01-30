import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

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
    setNewProduct({ name: "", price: "", image: "" });
  };

  const styleInputForm = {
    borderColor: "gray.500",
  };

  return (
    <Container maxWidth={"md"}>
      <VStack gap={8}>
        <Heading as={"h1"} size={"4xl"} textAlign={"center"} marginBottom={8}>
          Create New Product
        </Heading>

        <Box
          width={"full"}
          bg={useColorModeValue("white", "gray.800")}
          padding={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              {...styleInputForm}
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              variant={"outline"}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
            />
            <Input
              {...styleInputForm}
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              variant={"outline"}
              onChange={(event) =>
                setNewProduct({ ...newProduct, price: event.target.value })
              }
            />
            <Input
              {...styleInputForm}
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              variant={"outline"}
              onChange={(event) =>
                setNewProduct({ ...newProduct, image: event.target.value })
              }
            />
            <Toaster />
            <Button
              colorPalette={"blue"}
              onClick={handleAddProduct}
              paddingX={8}
              width={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
