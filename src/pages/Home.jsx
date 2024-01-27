import ImageSlider from "../components/ImageSlider";
import mbappe from "../assets/mbappe.png";
import bet1 from "../assets/bet1.jpg";
import bet2 from "../assets/bet2.png";
import nba from "../assets/nba.jpg";
import slot from "../assets/slot.jpg";

const Home = () => {
  const images = [mbappe, bet1, bet2, nba, slot];
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="lg:col-span-8 col-span-12">
        <ImageSlider images={images} />
      </div>
      <div className="lg:col-span-4 col-span-12">
        <div className="bg-[#1b4d98] flex items-center justify-center h-96 text-[#ced0d4] hover:text-gray-100 cursor-pointer">
          <p className="font-semibold">Example card</p>
        </div>
      </div>
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="lg:col-span-3 md:col-span-6 col-span-12 bg-[#263044] flex items-center justify-center h-56 text-[#ced0d4] hover:text-gray-100 cursor-pointer"
        >
          <p className="font-semibold">Example card {index + 2}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
