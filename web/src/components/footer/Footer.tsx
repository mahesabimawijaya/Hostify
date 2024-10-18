import { fetchData } from "@/lib/axios";
import { FooterData, List } from "@/types/asset";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetchData(
          "cms",
          "footer?populate[logo][fields]=url&populate[socialOne][fields]=url&populate[socialTwo][fields]=url&populate[iconPhone][fields]=url&populate[iconEmail][fields]=url&populate[aboutUsList][fields]=list&populate[serviceList][fields]=list"
        );

        if (res?.data?.attributes) {
          setFooterData({
            logo: res.data.attributes.logo,
            logoText: res.data.attributes.logoText,
            description: res.data.attributes.description,
            iconEmail: res.data.attributes.iconEmail,
            email: res.data.attributes.email,
            iconPhone: res.data.attributes.iconPhone,
            phone: res.data.attributes.phone,
            titleService: res.data.attributes.titleService,
            aboutUsTitle: res.data.attributes.aboutUsTitle,
            addressTitle: res.data.attributes.addressTitle,
            street: res.data.attributes.street,
            area: res.data.attributes.area,
            socialOne: res.data.attributes.socialOne,
            socialTwo: res.data.attributes.socialTwo,
            aboutUsList: res.data.attributes.aboutUsList as List[],
            serviceList: res.data.attributes.serviceList as List[],
          });
        } else {
          console.error("Data is missing");
        }
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (!footerData) {
    return <div>No data available</div>;
  }

  const logoUrl = footerData?.logo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_CMS_IMAGE_URL}${footerData.logo.data.attributes.url}`
    : "/hostify.png";

  const socialOneUrl = footerData?.socialOne?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_CMS_IMAGE_URL}${footerData.socialOne.data.attributes.url}`
    : "/google.png";

  const socialTwoUrl = footerData?.socialTwo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_CMS_IMAGE_URL}${footerData.socialTwo.data.attributes.url}`
    : "/twt.png";

  const iconPhoneUrl = footerData?.iconPhone?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_CMS_IMAGE_URL}${footerData.iconPhone.data.attributes.url}`
    : "/phone.png";

  const iconEmailUrl = footerData?.iconEmail?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_CMS_IMAGE_URL}${footerData.iconEmail.data.attributes.url}`
    : "/mail.png";

  return (
    <footer className="bg-[#140A32] text-white">
      <section className="w-full h-full py-20 flex max-w-[1112px] m-auto gap-4 ">
        {/* Info */}
        <div className="w-2/4 flex flex-col gap-2 text-[15px]">
          <div className="flex items-center">
            <div className="relative w-[48px] h-[48px] mr-[10px]">
              <Image src={logoUrl} fill alt="Logo" />
            </div>
            <h1 className="font-bold text-xl">{footerData.logoText}</h1>
          </div>

          <h3>{footerData.description}</h3>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-3 relative mr-[10px]">
              <Image src={iconEmailUrl} fill alt="Email Icon" />
            </div>
            <div>{footerData.email}</div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 relative mr-[10px]">
              <Image src={iconPhoneUrl} fill alt="Phone Icon" />
            </div>
            <div>{footerData.phone}</div>
          </div>
        </div>

        {/* services */}
        <div className="w-1/4 flex flex-col gap-2">
          <h2 className="font-bold">{footerData.titleService}</h2>
          {footerData.serviceList?.map((item) => (
            <h3 key={item.id}>{item.list}</h3>
          ))}
        </div>

        {/* about us */}
        <div className="w-1/4 flex flex-col gap-2">
          <h2 className="font-bold">{footerData.aboutUsTitle}</h2>
          {footerData.aboutUsList?.map((item) => (
            <h3 key={item.id}>{item.list}</h3>
          ))}
        </div>

        {/* address */}
        <div className="w-1/4 flex flex-col gap-2">
          <h2 className="font-bold">{footerData.addressTitle}</h2>
          <h3>{footerData.street}</h3>
          <h3>{footerData.area}</h3>

          {/* socmed */}
          <div className="flex gap-2 items-center">
            <div className="relative w-6 h-6">
              <Image src={socialOneUrl} fill alt="Social One" />
            </div>
            <div className="relative w-6 h-6">
              <Image src={socialTwoUrl} fill alt="Social Two" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
