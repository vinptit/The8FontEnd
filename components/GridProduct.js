import Center from "@/components/Center";
import ProductItem2 from "@/components/ProductItem2";
const GridProduct = () => {
  return (
    <Center>
      <div>
        <p class="font-play text-4xl mt-12">Feature Product</p>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 my-8">
        <ProductItem2 title={"DẦU NHỚT"} image={"url('./images/topic/daunhot.jpg')"}/>
        <ProductItem2 title={"PHỤ TÙNG"} image={"url('./images/topic/topic3.jpg')"}/>
        <ProductItem2 title={"BẢO DƯỠNG"} image={"url('./images/topic/topic2.jpg')"}/>
        <ProductItem2 title={"SỬA CHỮA"} image={"url('./images/topic/topic4.jpg')"}/>      
      </div>
    </Center>    
  )
};

export default GridProduct;
