import { IHeroSection } from "@/types/asset";
import Button from "../ui/Button";
import Image from "next/image";

interface HeroSectionProps {
  heroSection: IHeroSection;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroSection }) => {
  const imageUrl = process.env.NEXT_PUBLIC_CMS_IMAGE_URL + heroSection.image.data.attributes.formats.large.url;
  return (
    <section className="w-full h-screen flex items-center max-w-[1112px] mx-auto pt-[60px] mb-10">
      <div className="flex flex-col">
        <h1 className="text-5xl font-semibold w-[505px] leading-[55px]">{heroSection.title}</h1>
        <p className="text-lg w-[414px] my-5 ">{heroSection.description}</p>
        <div className="flex items-center space-x-4">
          <Button text={heroSection.button1} stroke={false} />
          <Button text={heroSection.button2} stroke={true} />
        </div>
      </div>
      <div className="relative w-[600px] h-[428px]">
        <Image src={imageUrl} fill alt="heroimage" priority />
      </div>
    </section>
  );
};

export default HeroSection;
