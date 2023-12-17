import Link from "next/link";
const ProductItem2 = ({title}) => {
  return (
        <div class="h-64 rounded-lg bg-gray-200 productitem">
          <Link href="/"> </Link>
          <h4>{title}</h4>
        </div>
  )
};

export default ProductItem2;
