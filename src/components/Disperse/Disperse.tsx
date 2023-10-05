import React, { ChangeEvent, useState } from "react";
import { GradientButton, InputArea, ShowExampleModal } from "../UI";

const Disperse = () => {
  const [showModal, setShowModal] = useState(false);
  const [areaInput, setAreaInput] = useState({ text: "", line: 1 });
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target instanceof HTMLInputElement) {
      const file = event.target.files && event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const fileContents: string | ArrayBuffer | null =
            e.target?.result || null;

          if (typeof fileContents === "string") {
            const lines: string[] = fileContents.split("\n");
            setAreaInput({
              line: lines.length,
              text: fileContents,
            });
          }
        };
        reader.readAsText(file);
      }
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newText = event.target.value;
    const lineNum = newText.split("\n").length;
    setAreaInput({
      text: event.target.value,
      line: lineNum,
    });
    setErrors([]);
  };

  const validateAmount = (amount: string) => {
    // Using a regular expression to check for a valid number of decimals.
    return /^\d+(\.\d+)?$/.test(amount);
  };

  const onSubmit = () => {
    const { line, text } = areaInput;
    const lines = text.split("\n");
    const addressMap = new Map();
    const newErrors = [];

    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i].trim();
      if (lineText === "") continue;

      // For all valid address and amount separators
      const [address, amount] = lineText.split(/[=, ]+/);
      const correctAmount = validateAmount(amount);
      // If address and amount are invalid
      if (address.length !== 42 && !correctAmount) {
        newErrors.push(
          `Line ${i + 1} Invalid Ethereum address and wrong amount`
        );
      }
      // If address is invalid
      else if (address.length !== 42) {
        newErrors.push(`Line ${i + 1} Invalid Ethereum address`);
      }
      // If amount is invalid
      else if (!correctAmount) {
        newErrors.push(`Line ${i + 1} wrong amount`);
      }

      // If we have duplicate address
      if (addressMap.has(address)) {
        // if multiple addresses are duplicate so storing their line num
        addressMap.get(address).push(i + 1);
      } else {
        addressMap.set(address, [i + 1]);
      }
    }

    for (const [address, lineNumbers] of addressMap) {
      if (lineNumbers.length > 1) {
        newErrors.push(
          `${address} duplicate in Line: ${lineNumbers.join(", ")}`
        );
      }
    }

    setErrors(newErrors);
  };

  const removeRepetitiveAddresses = () => {
    const lines = areaInput.text.split("\n");
    const uniqueAddresses = new Set();
    const newTextLines = [];

    for (const line of lines) {
      const [address, amount] = line.split(/[=, ]+/);

      if (!uniqueAddresses.has(address)) {
        uniqueAddresses.add(address);
        newTextLines.push(`${address}=${amount}`);
      }
    }

    const uniqueText = newTextLines.join("\n");

    setAreaInput({
      text: uniqueText,
      line: newTextLines.length,
    });
    setErrors([]);
  };

  const mergeRepeatedAddresses = () => {
    const lines = areaInput.text.split("\n");
    const addressAmountMap = new Map();

    for (const line of lines) {
      const [address, amountStr] = line.split(/[=, ]+/);
      const amount = parseFloat(amountStr);

      if (!isNaN(amount)) {
        if (addressAmountMap.has(address)) {
          // Add the amount to the existing address entry
          addressAmountMap.set(address, addressAmountMap.get(address) + amount);
        } else {
          // Create a new entry for the address
          addressAmountMap.set(address, amount);
        }
      }
    }

    // Convert the map back to text format
    const mergedText = Array.from(addressAmountMap, ([address, amount]) => {
      return `${address}=${amount}`;
    }).join("\n");

    setAreaInput({
      text: mergedText,
      line: mergedText.split("\n").length,
    });
    setErrors([]);
  };

  const hasDuplicateAddressError = errors.some((error) =>
    error.includes("duplicate in Line")
  );

  return (
    <div className="flex min-h-full flex-col bg-cardBg justify-center px-6 py-32 lg:px-8 md:py-56">
      <div className="sm:mx-auto sm:w-full sm:max-w-screen-mf">
        <div className="flex flex-col justify-center align-middle p-2">
          <div className="flex justify-between py-3 flex-col-reverse gap-1 md:flex-row">
            <p>Addresses with Amounts</p>
            <label htmlFor="fileInput" className="text-gray-400 cursor-pointer">
              Upload File
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".txt"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Input Element */}
          <div className="flex bg-inputBg rounded-lg w-full justify-start align-middle py-5 px-3 overflow-x-auto">
            <InputArea
              areaInput={areaInput}
              onInputChange={handleInputChange}
            />
          </div>

          {/* Instruction Div */}
          <div className="mt-2 mb-4 flex justify-between flex-col gap-1 align-middle md:flex-row">
            <p>Separated by ',' or '' or '='</p>
            <button
              className="text-gray-400"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Show Example
            </button>
          </div>

          {showModal && (
            <ShowExampleModal
              closeExampleModal={() => setShowModal(!showModal)}
            />
          )}

          {/* Duplicate Error Tips */}
          {hasDuplicateAddressError && (
            <>
              <div className="py-0 flex flex-col gap-1 justify-between align-middle md:py-2 md:flex-row">
                <p>Duplicated</p>
                <p className="text-red-600">
                  <button onClick={removeRepetitiveAddresses}>
                    Keep the first one
                  </button>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <button onClick={mergeRepeatedAddresses}>
                    Combine Balance
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Error Info Div */}
          {errors?.length > 0 && (
            <>
              <div className="my-2 rounded-md border-[1px] p-1 border-red-600 flex justify-start align-top gap-2 md:p-3">
                <div className="">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 14a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1zm-1.5 2.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  {errors.map((error, index) => (
                    <React.Fragment key={index}>
                      <span className="text-red-600 break-all text-sm md:text-base">
                        {error}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Button */}
          <GradientButton
            onClick={onSubmit}
            disabled={errors.length > 0}
            hidden={false}
          >
            Next
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default Disperse;
