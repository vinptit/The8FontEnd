import Center from "@/components/Center";
import ProductItem2 from "@/components/ProductItem2";
const GridProduct = () => {
  return (
    <Center>
      <div>
        <p class="font-play text-4xl mt-12">Feature Product</p>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-8">
        <ProductItem2 title={"TOPIC 1"}/>
        <ProductItem2 title={"TOPIC 2"}/>
        <ProductItem2 title={"TOPIC 3"}/>
        <ProductItem2 title={"TOPIC 4"}/>
        
      </div>
    </Center>    
  )
};

export default GridProduct;
