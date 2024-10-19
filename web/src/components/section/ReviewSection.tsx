import { IHeroSection, IReviewSection, IServiceSection } from "@/types/asset";
import Button from "../ui/Button";
import Image from "next/image";

interface ReviewSection {
  reviewSection: IReviewSection;
}

const ReviewSection: React.FC<ReviewSection> = ({ reviewSection }) => {
  const logoOne =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    reviewSection.logoOne.data.attributes.formats.small.url;

  const logoTwo =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    reviewSection.logoTwo.data.attributes.formats.small.url;

  const logoThree =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    reviewSection.logoThree.data.attributes.formats.small.url;

  const logoFour =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    reviewSection.logoFour.data.attributes.formats.small.url;

  const mapImage =
    process.env.NEXT_PUBLIC_CMS_IMAGE_URL +
    reviewSection.mapImage.data.attributes.url;

  return (
    <section className="bg-white">
      <section className="pt-[120px] pb-20 text-black  flex flex-col max-w-[1112px] mx-auto gap-[70px]">
        <div className="text-center flex flex-col gap-[33px] items-center ">
          <h1 className="font-bold text-[36px]">{reviewSection.mapTitle}</h1>
          <h2 className="text-[18px] w-[732px]">
            {reviewSection.mapDescription}
          </h2>
        </div>

        <div>
          <div className="relative w-[1113px] h-[500px]">
            <Image src={mapImage} fill alt="heroimage" priority />
          </div>
        </div>
        {/* trusted by & logo */}
        <div className="flex gap-10">
          <h1 className="text-[28px]">{reviewSection.trustTitle}</h1>
          <div className="relative w-[164px] h-[100px]">
            <Image src={logoOne} fill alt="heroimage" priority />
          </div>

          <div className="relative w-[164px] h-[100px]">
            <Image src={logoTwo} fill alt="heroimage" priority />
          </div>

          <div className="relative w-[164px] h-[100px]">
            <Image src={logoThree} fill alt="heroimage" priority />
          </div>

          <div className="relative w-[164px] h-[100px]">
            <Image src={logoFour} fill alt="heroimage" priority />
          </div>
        </div>

        {/* review */}
        <div className="flex">
          <h1 className="w-1/2 text-[36px] font-bold leading-tight">
            {reviewSection.title}
          </h1>
          <div className="w-1/2 flex flex-col gap-[47px]">
            <h2 className="text-[24px] italic font-semibold">
              {reviewSection.review}
            </h2>
            <div>
              <h3 className="text-[24px] font-semibold">
                {reviewSection.writerName}
              </h3>
              <h3 className="text-[16px]">{reviewSection.writerCompany}</h3>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ReviewSection;
