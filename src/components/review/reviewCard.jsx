/* eslint-disable react/prop-types */

function ReviewCard({ name, comment }) {
  return (
    <div className="rounded-md border-b-4 border-secondary bg-white p-8 text-center flex flex-col md:max-w-[340px] min-h-[240px]">
      <p>{comment}</p>
      <h4 className="text-lg font-semibold mt-auto">{name}</h4>
    </div>
  );
}

export default ReviewCard;
