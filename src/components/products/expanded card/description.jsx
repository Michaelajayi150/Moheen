/* eslint-disable react/prop-types */
function ProductDescription({
  type,
  image,
  name,
  price,
  discount,
  description,
  tags,
  clip,
}) {
  return (
    <div
      className={`${
        !clip ? "visible relative" : "invisible absolute"
      } sm:relative sm:opacity-100 sm:visible sm:w-[250px] bg-white flex flex-col`}
    >
      <picture className="bg-shades-200 sm:w-[250px] sm:h-[250px] flex flex-col bg-opacity-40">
        <source srcSet={image} media="(min-width: 768px)" />
        <img className="w-full h-full flex-1" src={image} alt={name} />
      </picture>

      <div className="flex flex-col justify-between p-4 h-full">
        <small className="uppercase mb-1">{type}</small>
        <div className="space-y-1">
          <h1 className="card-title text-[1.2rem] truncate">{name}</h1>
          <p className="product-description text-xs">{description}</p>
          <div className="flex gap-2 items-center text-sm">
            Tags:
            <ul className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 mt-auto">
          <h1 className="md:text-[.9rem]">Unit Price: </h1>
          <h1 className="price text-[1.2rem]">
            ${discount ? discount : price}
          </h1>
          {discount && <del className="text-xs">${price}</del>}
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
