import { IPricingSection } from "@/types/asset";
import PricingCard from "../cards/PricingCard";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/axios";
import Loading from "../ui/Loading";

interface PricingSectionProps {
  pricingSection: IPricingSection;
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricingSection }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetchData("api", "products");
        setProducts(res.data);
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="w-full h-[700px] relative flex flex-col pt-20 bg-[#F7F3FF]">
        <h2 className="text-[36px] font-bold text-center mb-10">{pricingSection.title}</h2>
        <p className="mx-auto text-center text-[18px] w-[732px]">{pricingSection.description}</p>
        <div className="absolute top-[320px] lg:px-[130px] flex justify-center gap-[35px] w-full h-[777px]">
          {products.map((product, i) => (
            <PricingCard product={product} purchaseBtn={pricingSection.purchaseBtn} key={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PricingSection;
