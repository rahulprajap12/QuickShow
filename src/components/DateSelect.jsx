const DateSelect = ({ dateTime }) => {
  return (
    <div className="mt-20 rounded-2xl border border-primary/20 bg-gradient-to-r from-[#2c0911] to-[#16070a] p-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="w-full">
          <h2 className="text-white text-2xl font-semibold mb-8">
            Choose Date
          </h2>

          <div className="flex flex-wrap gap-4">
            {dateTime?.slice(0, 7).map((item, index) => (
              <button
                key={index}
                className="border border-primary text-white rounded-lg px-5 py-3 hover:bg-primary transition"
              >
                <div className="font-semibold">{item.date}</div>
                <div className="text-sm opacity-80">{item.day}</div>
              </button>
            ))}
          </div>
        </div>

        <button className="bg-primary text-white px-8 py-3 rounded-lg whitespace-nowrap hover:opacity-90">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
