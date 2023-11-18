import { aboutImage } from "../../assets";

function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 px-6 max-w-[1120px] mx-auto flex max-md:flex-col justify-between gap-8 md:gap-4"
    >
      <div className="md:w-8/12 space-y-3">
        <h2 className="text-3xl font-semibold relative w-fit">
          About Us
          <span className="absolute -z-0 right-1/4 bg-[#32338536] w-10 h-10 rounded-full" />
        </h2>
        <p className="md:max-w-lg">
          Welcome to Moheen Collections, where timeless elegance meets
          contemporary style. At Moheen Collections, we take pride in curating a
          diverse range of exquisite products that embody the essence of
          sophistication and individuality. Our carefully selected collections
          showcase a harmonious blend of tradition and modernity, ensuring that
          each piece tells a story of artistry and refinement.
          <br />
          <br />
          At the heart of Moheen Collections is our commitment to quality. We
          source the finest materials and collaborate with skilled artisans to
          create products that stand the test of time. Whether it&apos;s our
          intricately designed jewelry, finely crafted accessories, or
          thoughtfully curated home decor, every item reflects our unwavering
          dedication to excellence.
          <br />
          <br />
          Join us on a journey of timeless elegance and modern luxury. Explore
          the world of Moheen Collections, where each piece is a testament to
          the artistry of life.
        </p>
      </div>
      <div className="md:w-4/12">
        <img className="w-full" src={aboutImage} alt="About Moheen" />
      </div>
    </section>
  );
}

export default AboutSection;
