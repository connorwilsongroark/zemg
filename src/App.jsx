import { useState, useRef } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Instructions from "./components/Instructions";
import UserInputs from "./components/UserInputs";
import MemeOutput from "./components/MemeOutput";

// TO-DO
// move crunchy toggle, dark mode toggle

function App() {
  // State - Get Image Source - State
  const [imgSrc, setImgSrc] = useState("");
  // State - Meme text
  const [memeText, setMemeText] = useState("");
  // State - Dark Mode Toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  // State - Crunchy Toggle
  const [useCrunchy, setUseCrunchy] = useState(false);
  // Ref - useRef for upload button & input
  const imgUploadRef = useRef();

  return (
    <div className='min-h-screen flex flex-col justify-between bg-purple-50'>
      {/* All page content except footer in the following div */}
      <div>
        <Header />
        <main className='flex flex-col items-center max-w-[95%] mx-auto md:max-w-[700px]'>
          {/* Page content start */}
          <Instructions />
          {/* User inputs (Image & Text), contains FileUpload & TextInput */}
          <UserInputs
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            memeText={memeText}
            setMemeText={setMemeText}
            imgUploadRef={imgUploadRef}
          />
          {/* Meme Image Output */}
          {/* Heading */}

          {(memeText || imgSrc) && (
            <>
              <p>Output:</p>
              <MemeOutput
                imgSrc={imgSrc}
                memeText={memeText}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                useCrunchy={useCrunchy}
                setUseCrunchy={setUseCrunchy}
              />
            </>
          )}
          {/* Page content end */}
        </main>
      </div>
      <Footer setUseCrunchy={setUseCrunchy} useCrunchy={useCrunchy} />
    </div>
  );
}

export default App;
