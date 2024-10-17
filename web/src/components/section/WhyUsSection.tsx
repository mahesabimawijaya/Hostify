import { IWhyUsSection } from "@/types/asset";

interface WhyUsSectionProps {
  whyUsSection: IWhyUsSection;
}

const WhyUsSection: React.FC<WhyUsSectionProps> = ({ whyUsSection }) => {
  const imageUrl = "http://localhost:1337" + whyUsSection?.whyUsCard?.[0]?.image?.data?.attributes?.formats?.large?.url;

  console.log(imageUrl);

  return (
    <section className="w-full h-screen flex flex-col max-w-[1112px] mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="w-[438px] h-[96px] text-4xl font-bold">{whyUsSection.title}</h2>
        <p className="w-[492px] h-[52px]">{whyUsSection.description}</p>
      </div>
    </section>
  );
};

export default WhyUsSection;
