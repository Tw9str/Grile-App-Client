import Link from "next/link";
import { usePathname } from "next/navigation";
import { EvaArrowRightFill, TablerHome } from "../dashboard/Icons";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <nav className="hidden md:block my-4" aria-label="breadcrumb">
      <ol className="flex space-x-1 items-center font-bold text-sm">
        <li className="breadcrumb-item flex items-center">
          <Link className="ml-1 text-gray-700 hover:text-gray-900" href="/">
            <TablerHome className="text-gray-700 h-5 w-5" />
          </Link>
        </li>
        {pathArray.map((path, index) => {
          const parts = path.split("-");
          if (parts[0].length === 24 && /^[a-f0-9]{24}$/.test(parts[0])) {
            parts.shift();
          }
          const cleanedPath = parts.join("-");
          const href = "/" + pathArray.slice(0, index + 1).join("/");

          const isCurrentPath = index === pathArray.length - 1;

          return (
            <li key={href} className="flex items-center space-x-1">
              <EvaArrowRightFill className="text-green-500" />
              {isCurrentPath ? (
                <span className="text-gray-500">
                  {cleanedPath.replace(/-/g, " ").toUpperCase()}
                </span>
              ) : (
                <Link className="text-gray-700 hover:text-gray-900" href={href}>
                  {cleanedPath.replace(/-/g, " ").toUpperCase()}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
