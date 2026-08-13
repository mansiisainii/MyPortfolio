import { motion } from "framer-motion";
const Card = ({ style, text, image, containerRef, href }) => {
  return image && !text ? (
    <motion.img
      className="absolute w-15 cursor-grab"
      src={image}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={containerRef}
      dragElastic={1}
    />
  ) : (
    <motion.div
      className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-gray w-[8rem] ${href ? 'cursor-pointer' : 'cursor-grab'}`}
      style={style}
      whileHover={{ scale: 1.05 }}
      drag={!href}
      dragConstraints={containerRef}
      dragElastic={1}
      onClick={() => href && window.open(href, '_blank')}
    >
      {text}
    </motion.div>
  );
};

export default Card;