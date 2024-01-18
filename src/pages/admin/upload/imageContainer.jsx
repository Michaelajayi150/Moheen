/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";

function ImageContainer({ image, deleteImage }) {
  return (
    <div key={image.id} className="max-w-[200px] relative group">
      <div className="hidden absolute w-full h-full bg-neutral bg-opacity-60 group-hover:flex items-center justify-center cursor-pointer duration-500">
        <MdDelete onClick={deleteImage} color="red" size="2rem" />
      </div>
      <img src={image.url} alt={image.id} />
    </div>
  );
}

export default ImageContainer;
