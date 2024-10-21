import { IWhyUsSection } from "@/types/asset";
import WhyUsCard from "../cards/WhyUsCard";

interface WhyUsSectionProps {
  whyUsSection: IWhyUsSection;
}

const WhyUsSection: React.FC<WhyUsSectionProps> = ({ whyUsSection }) => {
  return (
    <section className="w-full flex flex-col max-w-[1112px] mx-auto space-y-20 mb-14">
      <div className="flex items-center justify-between">
        <h2 className="w-[438px] h-[96px] text-4xl font-bold">
          {whyUsSection.title}
        </h2>
        <p className="w-[492px] h-[52px] text-[18px]">
          {whyUsSection.description}
        </p>
      </div>
      <div className="flex flex-wrap w-full">
        {whyUsSection.whyUsCard.map((card, i) => (
          <WhyUsCard card={card} key={i} />
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
