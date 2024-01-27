const Sports = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="lg:col-span-3 md:col-span-6 col-span-12 bg-[#263044] flex items-center justify-center h-56 text-[#ced0d4] hover:text-gray-100 cursor-pointer"
        >
          <p className="font-semibold">Example sports card {index + 2}</p>
        </div>
      ))}
    </div>
  );
};

export default Sports;
