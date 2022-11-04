import { useRef } from "react";

export default function FileUpload(props) {
  // Ref for URL img upload input box
  const urlUploadRef = useRef();

  return (
    <div className='flex flex-col items-center w-full'>
      {/* Upload from device */}
      <button
        type='button'
        className='rounded-md text-center text-white font-bold p-4 w-full shadow-md bg-gradient-to-br from-purple-500 to-purple-600 mx-auto block mb-2'
        // Click event opens up the behavior of the hidden input below (file upload)
        onClick={() => {
          props.imgUploadRef.current.click();
        }}
      >
        Upload Image
      </button>
      {/* Hidden input, the button above executes this behavior.  Accepts images, the onChange event */}
      <input
        type='file'
        className='hidden'
        ref={props.imgUploadRef}
        accept='image/*'
        onChange={(event) => {
          // The rawImgUpload is the event (upload) target, so it's the file itself.
          // imgObjectUrl turns the rawImgUpload into an objectURL, which can be used as the Src for the image component.
          // If a file is uploaded, or if the file is 'truthy', then it's added to state.
          const rawImgUpload = event.target.files[0];
          const imgObjectUrl = URL.createObjectURL(rawImgUpload);
          if (imgObjectUrl) {
            props.setImgSrc(imgObjectUrl);
          } else {
            props.setImgSrc(null);
          }

          /* TODO: get width of target file, set that to a maxWidth state, pass to MemeOutput as maxWidth*/
        }}
      />
      <p>Alternatively, enter the image's URL below.</p>

      {/* Upload via URL */}
      <div className='flex flex-row  justify-center h-[56px] w-full shadow-md mt-2'>
        <input
          type='text'
          className='flex-auto rounded-l-md'
          placeholder='https://'
          ref={urlUploadRef}
        />
        {/* Click button to update image state */}
        <button
          type='button'
          className='text-white px-4 font-bold bg-gradient-to-br from-purple-500 to-purple-600 rounded-r-md'
          onClick={() => {
            props.setImgSrc(urlUploadRef.current.value);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
