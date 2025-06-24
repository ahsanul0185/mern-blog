import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const DashPosts = () => {
  return (
    <div>

      <div className="flex gap-2 justify-between">
        <h1 className="font-bold text-3xl">Blog posts</h1>
        <Link
          to="/dashboard/create-post"
          className="button-primary flex items-center justify-center gap-1"
        >
          <FiPlus className="text-[18px]" />
          Create Post
        </Link>
      </div>

    <div>
        {/* list of posts or something else */}
    </div>

    </div>
  );
};

export default DashPosts;
