const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
      <p className="text-primary text-xl font-semibold">Loading...</p>
    </div>
  );
};

export default Loading;
