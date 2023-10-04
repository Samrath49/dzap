import React, {
  ChangeEvent,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";

type InputComponentProps = {
  areaInput: {
    text: string;
    line: number;
  };
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputArea: React.FC<InputComponentProps> = ({
  areaInput,
  onInputChange,
}) => {
  const [inputScrollPos, setInputScrollPos] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineNumbersRef = useRef<HTMLDivElement | null>(null);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: areaInput?.line }, (_, i) => i + 1);
  }, [areaInput?.line]);

  const handleTextScroll = () => {
    if (textareaRef.current) {
      setInputScrollPos(textareaRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      textareaRef.current.scrollTop = inputScrollPos;
      lineNumbersRef.current.scrollTop = inputScrollPos;
    }
  }, [inputScrollPos]);

  return (
    <div className="flex max-h-[29rem]">
      <div
        ref={lineNumbersRef}
        className="w-auto h-full overflow-y-auto"
        onScroll={handleTextScroll}
        style={{ overflowY: "hidden", scrollBehavior: "smooth" }}
      >
        {lineNumbers.map((line) => (
          <div
            key={line}
            className="h-5 flex items-center justify-end text-[#8d8d8d] font-semibold text-sm md:h-6 md:text-lg"
          >
            {line}
          </div>
        ))}
      </div>
      <hr className="w-[1px] bg-[#cacacb] h-full mx-1" />
      <div className="flex-grow relative">
        <textarea
          ref={textareaRef}
          className="w-[24rem] h-full min-h-[20rem] bg-inputBg text-gray-100 font-semibold focus:ring-0 text-sm overflow-auto md:w-[38rem] md:text-base"
          required
          value={areaInput?.text}
          onChange={(event) => onInputChange(event)}
          onScroll={handleTextScroll}
        />
      </div>
    </div>
  );
};

export default InputArea;
