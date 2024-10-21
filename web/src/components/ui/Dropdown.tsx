import Image from "next/image";
import { useState } from "react";

interface DropdownProps {
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

const dropdown = [1, 12, 24, 48];

const Dropdown: React.FC<DropdownProps> = ({ setDuration }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onClick={() => {
        setIsActive(!isActive);
      }}
      className={`${isActive ? "border-primary" : "border-gray-300"} relative flex items-center w-[150px] py-2 border rounded justify-center cursor-pointer`}
    >
      <p className="text-[18px] mr-4">Duration</p>
      <div className="relative w-[20px] h-[20px]">
        <Image src={"/unfold.png"} fill alt="unfold" />
      </div>
      {isActive && (
        <div className="absolute w-[150px] bg-white rounded shadow-md top-14 border">
          {dropdown.map((item, i) => {
            return (
              <div
                onClick={() => {
                  setDuration(item);
                  setIsActive(false);
                }}
                key={i}
                className="px-4 py-3 hover:bg-gray-200"
              >
                {item} {item > 1 ? "months" : "month"}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
