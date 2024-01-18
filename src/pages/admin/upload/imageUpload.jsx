/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { pngIcon } from "../../../assets";
import { RiDeleteBinLine } from "react-icons/ri";

function ImageUpload({ setProduct, product }) {
  const wrapperRef = useRef(null);
  const [file, setFile] = useState(null);

  const url = "https://api.cloudinary.com/v1_1/drrcyvvvq/image/upload";

  const onFileDrop = async (e) => {
    const image = e.target.files[0];
    setFile({
      image: image,
      started: true,
      percent: 0,
      message: "Uploading...",
    });

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "knc86bdn");

    try {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: formData,
        },
        {
          onUploadProgress: (event) => {
            setFile((prev) => ({ ...prev, percent: event.progress * 100 }));
          },
        }
      );

      const result = await response.json();

      setFile({
        image: image,
        started: false,
      });
      setProduct((prev) => ({ ...prev, image: result.secure_url }));
    } catch (error) {
      console.error("Error:", error);
    }
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
        {product.image !== "" ? (
          <div className="max-w-[200px]">
            <img src={product.image} alt={product.name} />
          </div>
        ) : file === null ? (
          <div
            onClick={() => wrapperRef.current.click()}
            className="border-2 border-dashed min-h-[300px] cursor-pointer flex flex-col items-center justify-center gap-3 px-4 text-center w-full"
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
        ) : (
          <div className="space-y-3 c min-w-[200px]">
            <p className="font-semibold">Preview</p>
            {file.started ? (
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
                  onClick={() => setFile(null)}
                  size="1rem"
                  className="text-error-500 cursor-pointer"
                />
              </div>
            ) : (
              <div className="max-w-[200px]">
                <img src={product.image} alt={product.name} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
