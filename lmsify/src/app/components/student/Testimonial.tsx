import { dummyTestimonial } from "@/app/assets/assets";
import { assets } from "@/app/assets/assets";
import Image from "next/image";

const Testimonial = () => {
  return (
    <div className="pb-14 px-8 md:px-0 ">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Testimonials
      </h2>
      <p className="md:text-base text-gray-600 mt-3 text-center max-w-2xl mx-auto">
        Hear from our learners as they share their journeys of transformation,
        success, and how our <br /> platform has made a difference in their
        lives.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-[840px] mt-16 justify-center ">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm max-w-[280px] text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            <div className="flex items-center gap-4 py-4 bg-gray-500/10">
              <Image
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Image
                    className="h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
            </div>
            <a href="#" className="px-5 underline text-blue-500">
              Read morere
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;

{
  /* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center   gap-8  */
}
