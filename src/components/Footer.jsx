export default function Footer(props) {
  return (
    <div className='flex justify-center items-center py-2 bg-gradient-to-br from-purple-500 to-purple-600'>
      <h3 className='text-white '>
        ZeMG{" "}
        <span
          onClick={() => {
            props.setUseCrunchy((prevState) => !prevState);
            props.useCrunchy
              ? alert(`You've disabled crunchy mode.  Good choice.`)
              : alert(
                  `You've found the hidden crunchy mode. Your meme quality will be worse than ever before.  Cool!`
                );
          }}
        >
          &copy;
        </span>{" "}
        2022
      </h3>
    </div>
  );
}
