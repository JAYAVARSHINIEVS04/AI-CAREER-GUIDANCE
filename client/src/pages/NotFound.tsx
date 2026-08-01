import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
      <p className="text-gray-500 mb-8">This page doesn't exist.</p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
