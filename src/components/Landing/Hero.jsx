export default function Hero() {
  return (
    <div className="relative overflow-hidden text-white h-[540px] pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5 text-lg leading-relaxed">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn bg-white text-blue-600 font-semibold hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
