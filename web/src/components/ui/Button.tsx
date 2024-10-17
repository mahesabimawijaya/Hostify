interface ButtonProps {
  text: string;
  stroke: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, stroke }) => {
  return (
    <button
      className={`${
        stroke ? "bg-transparent text-primary hover:bg-primary border hover:text-white border-primary" : "bg-primary text-white hover:bg-transparent hover:text-primary border border-primary"
      } text-bold uppercase duration-150 w-[154px] h-[52px] rounded`}
    >
      {text}
    </button>
  );
};

export default Button;
