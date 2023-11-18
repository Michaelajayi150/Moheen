import { dummyReviews } from "../../../assets/data";
import ReviewCard from "./reviewCard";

function ReviewSection() {
  return (
    <section className="bg-shades-100">
      <div className="py-16 px-6 max-w-[1120px] mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <p className="text-lg text-shades-200">Hear what people say</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 mt-10">
          {dummyReviews.map((review, id) => (
            <ReviewCard key={review.name + id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
