
const SkeltonLoader = () => {
  const delays = Array.from({ length: 20 }, (_, i) => `${i * 0.1}s`);

  return (
    <div className="mt-5 space-y-4">
      {/* Title */}
      <div
        className="bg-gray-300 dark:bg-primary/40 h-10 w-[90%] rounded animate-shimmer"
        style={{ animationDelay: delays[0], animationFillMode: 'both' }}
      ></div>

      {/* Subtitles with different widths */}
      {[
        'w-[85%]',
        'w-[92%]',
        'w-[78%]',
        'w-[88%]',
        'w-[60%]',
        'w-[73%]',
      ].map((width, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-primary/40 h-6 rounded ${width} mx-2 animate-shimmer`}
          style={{ animationDelay: delays[i + 1], animationFillMode: 'both' }}
        ></div>
      ))}

      {/* Author / Date Line */}
      <div
        className="bg-gray-300 dark:bg-primary/40 h-5 w-[25%] mt-6 rounded animate-shimmer"
        style={{ animationDelay: delays[7], animationFillMode: 'both' }}
      ></div>

      {/* Paragraph preview lines with varied widths */}
      {['w-[88%]', 'w-[84%]', 'w-[79%]', 'w-[91%]'].map((width, i) => (
        <div
          key={i}
          className={`bg-gray-300 dark:bg-primary/40 h-4 ml-5 rounded ${width} animate-shimmer`}
          style={{ animationDelay: delays[i + 8], animationFillMode: 'both' }}
        ></div>
      ))}

      {/* List style preview lines with different widths */}
      <ul className="mt-6 space-y-3 ml-6">
        {['w-[65%]', 'w-[72%]', 'w-[58%]'].map((width, i) => (
          <li
            key={i}
            className={`bg-gray-300 dark:bg-primary/40 h-4 rounded ${width} animate-shimmer`}
            style={{ animationDelay: delays[i + 12], animationFillMode: 'both' }}
          ></li>
        ))}
      </ul>
    </div>
  );
};


export default SkeltonLoader