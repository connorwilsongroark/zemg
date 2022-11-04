import { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import MemeDisplay from "./MemeDisplay";

export default function FileUpload() {
  // State, Ref, useEffect hooks for image upload
  const [userImage, setUserImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const fileInputRef = useRef();
  const [imageDimensions, setImageDimensions] = useState({
    imageWidth: 0,
    imageHeight: 0,
  });
  // State for url src for image
  // State for text
  const [userText, setUserText] = useState("");

  const memeRef = useRef();

  // handlers
  const handleDownload = async () => {
    const dataUrl = await htmlToImage.toJpeg(memeRef.current, {
      quality: 0.95,
    });
    const link = document.createElement("a");
    link.download = "zemg.jpeg";
    link.href = dataUrl;
    link.click();
  };

  // handlechange for text
  const handleChange = (event) => {
    const { value } = event.target;
    setUserText(value);
  };
  // getting dimensions of uploaded image for setting image container width
  const getDimensionsOnLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    setImageDimensions({
      imageWidth: offsetWidth,
      imageHeight: offsetHeight,
    });
  };
  // setting the image on the screen every time the userImage changes (the user picks an image)
  useEffect(() => {
    if (userImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(userImage);
    } else {
      setImagePreview(null);
    }
  }, [userImage]);

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <form className='w-full flex flex-col justify-center items-center'>
        {/* Button to get user's image */}
        <button
          className='text-white text-xl rounded-sm font-bold p-4 w-[500px] max-w-[90%] shadow-md bg-gradient-to-br from-purple-500 to-purple-600 box-border my-3'
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click();
          }}
        >
          Upload Image
        </button>
        <input
          type='file'
          className='hidden'
          ref={fileInputRef}
          accept='image/*'
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setUserImage(file);
            } else {
              setUserImage(null);
            }
          }}
        />

        {userImage && (
          <div className='text-xl text-center w-[500px] max-w-[90%] my-3'>
            <h3 className='mb-3'>Enter Text Below:</h3>
            <input
              type='text'
              name='userText'
              value={userText}
              onChange={handleChange}
              className='w-full'
              id='memeText'
            />
          </div>
        )}
      </form>
      {/* Displaying user Image + text */}
      {imagePreview && (
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-xl mb-3 text-center'>Results:</h3>
          <div
            ref={memeRef}
            className='flex flex-col justify-center items-center w-full'
          >
            <MemeDisplay
              imageDimensions={imageDimensions}
              userText={userText}
              imagePreview={imagePreview}
              getDimensionsOnLoad={getDimensionsOnLoad}
            />
          </div>
        </div>
      )}
      {imagePreview && (
        <div className='flex justify-center flex-col items-center w-full'>
          <button
            type='button'
            onClick={handleDownload}
            className='text-xl text-white rounded-sm font-bold p-4 bg-gradient-to-br from-purple-500 to-purple-600 box-border mt-5 mb-3 max-w-[90%] w-[500px]'
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
