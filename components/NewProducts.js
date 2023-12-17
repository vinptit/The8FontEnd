import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import '@fontsource/play'; // Font "Play"
import '@fontsource/chakra-petch';

const Title = styled.h2`
  font-size: 2.25rem;
  margin:30px 0 20px;
  font-weight: normal;
  font-family: Play, sans-serif;
`;

export default function NewProducts({products,wishedProducts}) {
  return (
    <Center>
      <Title>All Products</Title>
      <ProductsGrid products={products} wishedProducts={wishedProducts} />
    </Center>
  );
}