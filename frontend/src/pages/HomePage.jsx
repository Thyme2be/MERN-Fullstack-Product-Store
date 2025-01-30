import Product from "@/components/Product";
import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router";

const HomePage = () => {
  const { fetchProduct, products } = useProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  console.log("products", products);

  return (
    <Container maxWidth={"6xl"} paddingY={12}>
      <VStack gap={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          backgroundGradient={"to-r"}
          gradientFrom={"cyan.400"}
          gradientTo={"blue.500"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={10}
          w={"full"}
        >
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
