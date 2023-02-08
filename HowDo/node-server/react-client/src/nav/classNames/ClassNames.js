import classNames from "classnames";

export const button = classNames(
  "rounded-full p-2 m-1.5 bg-inherit text-white cursor-pointer ring-1 ring-white hover:bg-white hover:text-black hover:ring"
);

export const wrapperDiv = classNames(
  "min-h-64",
  "w-full",
  "grid",
  "grid-cols-4"
);
export const nameSpan = classNames(
  "place-self-center",
  "border-b-2",
  "border-black"
);
export const itemwrap = classNames("flex flex-col m-12 ml-6 w-10/12 shadow-lg");

export const searchItemwrap = classNames(
  "flex flex-col m-12 ml-6 w-10/12 shadow-lg cursor-pointer"
);

export const navDyna = classNames(
  "m-auto cursor-pointer w-20 h-20 border p-4 border-white"
);

export const navRow = classNames(
  "rounded-full p-2 m-1.5 bg-inherit text-white font-semibold cursor-pointer ring-1 ring-white hover:bg-white hover:text-black hover:ring"
);

export const navRowMlAuto = classNames(
  "ml-auto rounded-full p-2 m-1.5 bg-inherit text-white font-semibold cursor-pointer ring-1 ring-white hover:bg-white hover:text-black hover:ring"
);

export const navCol = classNames(
  "mt-12 w-full bg-inherit text-white hover:bg-white hover:text-black font-bold py-2 px-2 rounded text-center ring-1 ring-white whitespace-pre-line"
);

export const myPageContentMain = classNames(
  "relative overflow-hidden flex flex-col ml-5 w-11/12 h-fit min-h-80 text-center"
);
export const nameLabel = classNames(
  "m-b-2 w-fit border-b-2 border-black self-center"
);
export const videoContenView = classNames(
  "absolute flex left-2 h-max w-full transition-all duration-700"
);

export const videoBeforeButton = classNames(
  "absolute rounded rounded-full shadow-lg hover:bg-black hover:opacity-90 hover:text-white top-1/2 z-50 right-0 cursor-pointer transition-all duration-500"
);
export const videoNextButton = classNames(
  "absolute rounded rounded-full shadow-lg hover:bg-black hover:opacity-90 hover:text-white top-1/2 z-50 left-0 cursor-pointer transition-all duration-500"
);

export const moreButton = classNames(
  "ml-12 mt-5 self-center w-24 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white cursor-pointer"
);
export const videoNohover = classNames(
  "m-9 mt-10 p-7 flex w-80 h-64 flex-col justify-center items-center shadow-lg border-2 border-black "
);

export const Modifier = classNames(
  "absolute flex left-0 top-0 right-0 bottom-0 bg-black/10 z-50"
);
