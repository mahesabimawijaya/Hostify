import { IWhyUsCard } from "@/types/asset";
import Image from "next/image";

interface WhyUsCardProp {
  card: IWhyUsCard;
}

const WhyUsCard: React.FC<WhyUsCardProp> = ({ card }) => {
  const imageUrl =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    card.image.data.attributes.formats.small.url;
  return (
    <div className="flex flex-col justify-between w-[320px] h-[250px] m-6">
      <div className="relative w-[96px] h-[96px]">
        <Image src={imageUrl} fill alt="why us image" />
      </div>
      <h5 className="text-[24px] text-primary">{card.title}</h5>
      <p>{card.description}</p>
    </div>
  );
};

export default WhyUsCard;
