import React from "react";

interface CloseModal {
  closeExampleModal: () => void;
}

const ShowExampleModal: React.FC<CloseModal> = ({ closeExampleModal }) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-richBlack text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-richBlack px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 19"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-100"
                      id="modal-title"
                    >
                      Disperse Amount Example
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Here are some examples to disperse amounts easily to
                        intended recipients.
                      </p>
                      <ul className="list-disc mt-3">
                        <li className="text-sm text-gray-500 break-all">
                          Check if address is correct{" "}
                          <span className="text-gray-400">
                            eg: 0x2CB99F193549681e06C6770dDD55434FaFE8
                          </span>{" "}
                          is wrong address since its missing a few numbers.
                        </li>
                        <li className="text-sm text-gray-500 break-all">
                          If amount is correct{" "}
                          <span className="text-gray-400">eg: 1.5s</span> is
                          wrong amount since it's containing a letter.
                        </li>{" "}
                        <li className="text-sm text-gray-500 break-all">
                          Check if address and amount are separated by{" "}
                          <span className="text-gray-400">
                            ',' or ' ' or '='
                          </span>{" "}
                          .
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={closeExampleModal}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default ShowExampleModal;
