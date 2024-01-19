/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { pngIcon } from "../../../assets";
import { RiDeleteBinLine } from "react-icons/ri";

function ImageUpload({ setProduct }) {
  const wrapperRef = useRef(null);
  const [files, setFiles] = useState([]);

  const url = import.meta.env.VITE_CLIENT_CLOUDINARY_UPLOAD_URL;

  const onFileDrop = (e) => {
    const images = e.target.files;
    let imagesArray = Array.from(images);

    imagesArray.forEach(async (image, id) => {
      const formData = new FormData();
      formData.append("file", images[id]);
      formData.append("upload_preset", "knc86bdn");

      setFiles((prev) => [
        ...prev,
        {
          image: image,
          started: true,
          percent: 0,
          message: "Uploading...",
        },
      ]);

      try {
        const res = await fetch(
          url,
          {
            method: "POST",
            body: formData,
          },
          {
            onUploadProgress: (event) => {
              setFiles((prev) =>
                prev.map((item, i) => {
                  if (i === id) {
                    return { ...item, percent: event.progress * 100 };
                  } else {
                    return item;
                  }
                })
              );
            },
          }
        );
        let data = await res.json();

        setProduct((products) => ({
          ...products,
          images: [
            ...products.images,
            { url: data.secure_url, id: data.public_id },
          ],
        }));

        setFiles((prev) => prev.filter((_, i) => i !== id));
      } catch (err) {
        console.log(err);

        setFiles((prev) =>
          prev.map((item, i) => {
            if (i === id) {
              return {
                ...item,
                message: `Upload failed...`,
              };
            } else {
              return item;
            }
          })
        );
      }
    });
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div className="space-y-3">
      <p className="cursor-pointer" onClick={() => wrapperRef.current.click()}>
        Cover Image <span className="text-red-500">*</span>
      </p>
      <div
        id="upload"
        className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between gap-4"
      >
        <div
          onClick={() => wrapperRef.current.click()}
          className="border-2 border-dashed min-h-[150px] cursor-pointer flex flex-col items-center justify-center gap-3 px-4 text-center w-full"
        >
          <h3 className="text-xl font-semibold">Upload Image</h3>
          <div className="relative">
            File can exist as a PNG or JPEG.{" "}
            <span className="text-secondary">Upload here</span>
            <input
              type="file"
              value=""
              ref={wrapperRef}
              accept="image/*"
              className="invisible absolute -left-full top-0 outline-0 border-0"
              onChange={onFileDrop}
            />
            <p className="text-primary-200 text-xs mt-2 opacity-60">
              (Maximum file size is 2MB)
            </p>
          </div>
        </div>

        {files.length >= 1 &&
          files.map((file, id) => (
            <div key={file.image} className="space-y-3 c min-w-[200px]">
              {file.started && (
                <div className="relative flex gap-2 w-full">
                  <img
                    className="h-[35px] object-contain"
                    src={pngIcon}
                    alt={file.image.name}
                  />
                  <div className="space-y-2 w-full text-xs">
                    {/* displaying file name, progress bar and file size in Bytes */}
                    <p className="truncate max-w-[170px] sm:max-w-[15ch] md:max-w-full lg:max-w-[15ch]">
                      {file.image.name}
                    </p>
                    {file.started && (
                      <progress
                        className="h-1 w-full"
                        max={100}
                        value={file.percent}
                      ></progress>
                    )}
                    {file.message && file.message}
                  </div>

                  <RiDeleteBinLine
                    onClick={() => removeFile(id)}
                    size="1rem"
                    className="text-error-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageUpload;
