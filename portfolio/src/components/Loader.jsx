import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4 animate-bounce">
        <div className="w-16 h-16 rounded-full border-4 border-t-purple-500 border-gray-600 animate-spin"></div>
        <p className="text-white text-lg font-medium">
          {progress.toFixed(0)}% Loaded
        </p>
      </div>
    </Html>
  );
};

export default Loader;
