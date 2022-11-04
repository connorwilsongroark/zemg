export default function TextInput(props) {
  return (
    <div className='flex flex-col items-center w-full my-2'>
      <p>Enter your meme's text below:</p>
      <textarea
        type='text'
        placeholder='Meme text here'
        className='justify-center min-h-[56px] w-full shadow-md rounded-md mt-2'
        value={props.memeText}
        onChange={(event) => {
          props.setMemeText(event.target.value);
        }}
      />
    </div>
  );
}
