import { IHeroSection, IServiceSection } from "@/types/asset";
import Button from "../ui/Button";
import Image from "next/image";

interface ServiceSection {
  serviceSection: IServiceSection;
}

const ServiceSection: React.FC<ServiceSection> = ({ serviceSection }) => {
  const imageUrl =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    serviceSection.image.data.attributes.formats.small.url;
  return (
    <section className="bg-[#1A0F42]">
      <section className=" pt-[500px] pb-20 text-white  flex items-center max-w-[1112px] mx-auto gap-[70px]">
        <div className="relative w-[600px] h-[428px]">
          <Image src={imageUrl} fill alt="heroimage" priority />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[36px] font-bold w-[595px] leading-[43px]">
            {serviceSection.title}
          </h1>
          <p className="w-[492px] my-5 ">{serviceSection.description}</p>
          <div className="flex items-center space-x-4">
            <Button text={serviceSection.learnBtn} stroke={false} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ServiceSection;
