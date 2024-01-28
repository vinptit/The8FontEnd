import Link from "next/link";
const ProductItem2 = ({title, image}) => {
  return (
        <div class="h-64 rounded-lg bg-gray-200 productitem" style={{backgroundImage:image}}>
          <Link href="/"> </Link>
          <h4>{title}</h4>
        </div>
  )
};

export default ProductItem2;
