export default function MemeDisplay(props) {
  const maxWidth = props.imageDimensions.imageWidth;

  return (
    <div
      className={`flex flex-col justify-center items-center w-[${maxWidth}]  md:max-w-[700px]  text-center  bg-white`}
    >
      {props.userText && (
        <p className={`p-3 text-xl font-roboto max-w-[${maxWidth}]`}>
          {props.userText}
        </p>
      )}
      <img src={props.imagePreview} alt='' onLoad={props.getDimensionsOnLoad} />
    </div>
  );
}
