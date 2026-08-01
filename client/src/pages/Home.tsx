import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto text-center py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        Find your <span className="gradient-text">perfect career</span> with AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
      >
        Take a smart assessment, get a personalized roadmap, build a standout resume,
        and connect with mentors — all in one platform.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center gap-4"
      >
        <Link to="/career-assessment">
          <Button>Take Career Assessment</Button>
        </Link>
        <Link to="/careers">
          <Button variant="outline">Explore Careers</Button>
        </Link>
      </motion.div>
    </div>
  );
}
