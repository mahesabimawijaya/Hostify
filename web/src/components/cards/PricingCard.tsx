import { Product } from "@/types/product";
import { toRupiah } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

interface PricingCardProps {
  product: Product;
  purchaseBtn: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ product, purchaseBtn }) => {
  return (
    <div className="w-[348px] h-[777px] bg-white rounded flex flex-col justify-between px-14 py-16">
      <div className="flex flex-col">
        <h3 className="text-center uppercase text-2xl font-semibold mb-4">{product.name}</h3>
        <h2 className="text-3xl text-center font-bold mb-5">{toRupiah(product.price)}</h2>
        <p className="text-[18px] text-center w-[248px] mx-auto mb-4">{product.description}</p>
        <h3 className="text-2xl font-semibold text-center mb-10">{product.term} months</h3>
        <div className="flex items-center mb-4 text-[18px] space-x-3">
          <div className="relative w-[30px] h-[30px]">
            <Image src={"/checklist.png"} fill alt="checklist" />
          </div>
          <p>{product.storage} GB RAM</p>
        </div>
        <div className="flex items-center mb-4 text-[18px] space-x-3">
          <div className="relative w-[30px] h-[30px]">
            <Image src={"/checklist.png"} fill alt="checklist" />
          </div>
          <p>{product.totalWeb} Total Website</p>
        </div>
        <div className="flex items-center mb-4 text-[18px] space-x-3">
          <div className="relative w-[30px] h-[30px]">
            <Image src={"/checklist.png"} fill alt="checklist" />
          </div>
          <p>{product.totalVisit} Total Visit</p>
        </div>
        <div className="flex items-center mb-10 text-[18px] space-x-3">
          <div className="relative w-[30px] h-[30px]">
            <Image src={"/checklist.png"} fill alt="checklist" />
          </div>
          <p>
            <span className="capitalize">{product.backup}</span> Backup
          </p>
        </div>
      </div>
      <Link
        className="mx-auto flex items-center w-full justify-center bg-primary text-white hover:bg-transparent hover:text-primary border border-primary text-bold uppercase duration-150 h-[52px] rounded font-semibold"
        href={`/${product.id}`}
      >
        {purchaseBtn}
      </Link>
    </div>
  );
};

export default PricingCard;
