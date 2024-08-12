import Link from "next/link";
import {
  IconParkOutlineCheckOne,
  LetsIconsDateRange,
  TablerGridDots,
  UilUser,
} from "../Icons";

export default function Category({ title, examCount, plan, createdAt, user }) {
  const date = new Date(createdAt);

  return (
    <>
      <Link
        className="block text-center text-2xl font-semibold text-gray-800 mb-4 uppercase"
        href={`/dashboard/exams/${title.replace(/ /g, "-").toLowerCase()}`}
      >
        {title.replace(/-/g, " ")}
      </Link>
      <div className="grid grid-cols-2 gap-4 items-center justify-center">
        <div className="rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200">
          <span className="flex items-center gap-2">
            <TablerGridDots className="text-green-600" />
            <span>{examCount}</span>
          </span>
        </div>
        <div className="rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200">
          <span className="flex items-center gap-2 uppercase">
            <IconParkOutlineCheckOne className="text-green-600" />
            <span>{plan}</span>
          </span>
        </div>
        <div className="rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200">
          <span className="flex items-center gap-2">
            <UilUser className="text-green-600" />
            <span>{user?.username}</span>
          </span>
        </div>
        <div className="rounded-full bg-green-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-green-200">
          <span className="flex items-center gap-2">
            <LetsIconsDateRange className="text-green-600" />
            <span>{date.toLocaleDateString()}</span>
          </span>
        </div>
      </div>
    </>
  );
}
