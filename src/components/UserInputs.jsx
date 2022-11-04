import FileUpload from "./FileUpload";
import TextInput from "./TextInput";

export default function UserInputs(props) {
  return (
    <div className='flex flex-col items-center w-full'>
      <FileUpload
        imgUploadRef={props.imgUploadRef}
        imgSrc={props.imgSrc}
        setImgSrc={props.setImgSrc}
      />
      {props.imgSrc && (
        <TextInput memeText={props.memeText} setMemeText={props.setMemeText} />
      )}
    </div>
  );
}
