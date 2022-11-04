import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

//  TODO
// Fix styling
// CORS url fetching error

export default function MemeOutput(props) {
  // memeRef to wrap around the meme div (targets what is downloaded)
  const memeRef = useRef();

  // Holds objects with text position and the icon that FontAwesome should use, depending on the value of the index state
  const textPositions = [
    {
      icon: faAlignLeft,
      position: "text-left",
    },
    { icon: faAlignCenter, position: "text-center" },
    { icon: faAlignRight, position: "text-right" },
  ];
  // State - just holds an index value that changes when the user clicks the text position button.  Each index corresponds to the array of objects above.
  const [textPositionIndex, setTextPositionIndex] = useState(0);

  // State to hold whether or not the position button is animating.
  const [quickPulse, setQuickPulse] = useState(false);

  // handling the download, converting the div into a downloadable image.
  const handleDownload = async () => {
    // Generating random 6 digit value to append to 'zemg' filename
    const randomNum = () => {
      return String(Math.floor(Math.random() * 1000000));
    };
    // Download logic
    const dataUrl = await htmlToImage.toJpeg(memeRef.current, {
      quality: props.useCrunchy ? 0.08 : 0.95,
    });
    const link = document.createElement("a");
    link.download = `zemg${randomNum()}.jpeg`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className={`flex flex-col items-center w-full`}>
      {/* Option buttons */}
      {props.memeText && (
        <div className='flex justify-center w-[500px] max-w-full'>
          {/* Dark Mode */}
          <button
            className={` my-3 duration-200 ${
              props.isDarkMode
                ? `bg-purple-400 rounded-md py-2 px-4 scale-[97%]`
                : `bg-purple-600 rounded-md py-2 px-4`
            }`}
            onClick={() => {
              props.setIsDarkMode((prevState) => !prevState);
            }}
          >
            {/* Moon icon */}
            <FontAwesomeIcon icon={faMoon} className={`text-3xl text-white`} />
          </button>

          {/* Text Position */}
          <div>
            <button
              className={`my-3 duration-200 bg-purple-600 rounded-md py-2 px-4 ml-3 ${
                quickPulse ? `animate-[clickPulse_0.25s_ease-in-out_1] ` : null
              }`}
              onClick={() => {
                setTextPositionIndex((prevState) =>
                  prevState < 2 ? prevState + 1 : 0
                );
                setQuickPulse(true);
                setTimeout(() => setQuickPulse(false), 300);
              }}
            >
              {/* Icon is set to be the icon in the object with the current index */}
              <FontAwesomeIcon
                icon={textPositions[textPositionIndex].icon}
                className={`text-3xl text-white`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Meme output */}
      <div ref={memeRef} className={`w-full`}>
        {/* Text area */}
        {props.memeText && (
          <p
            // Text position becomes whatever the value of the 'position' is in the textPositions object array
            className={`text-xl ${textPositions[textPositionIndex].position} ${
              props.isDarkMode
                ? `text-white bg-[#141d26]`
                : `text-black bg-white`
            } p-4 whitespace-normal duration-200`}
          >
            {props.memeText}
          </p>
        )}
        {/* Picture area */}
        <img src={props.imgSrc} alt='' className={`w-full`} />
      </div>

      {/* Download Button */}
      <button
        type='button'
        className='rounded-md text-center text-white font-bold p-4 w-full shadow-md bg-gradient-to-br from-purple-500 to-purple-600 mx-auto block my-3'
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
}
