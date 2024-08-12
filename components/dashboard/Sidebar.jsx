"use client";
import { setLogout } from "@/state/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  EosIconsContentNew,
  HealthiconsIExamMultipleChoiceOutline,
  CharmGem,
  MdiUserOutline,
  MaterialSymbolsLogout,
  MingcuteEditLine,
} from "@/components/widgets/Icons";
import PortalButton from "../shared/buttons/PortalButton";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const linkClasses = (path) =>
    `flex items-center gap-2 uppercase font-bold rounded p-2 text-gray-600 hover:bg-green-400 hover:text-gray-900 ${
      pathname.includes(path) ? "bg-green-400 text-gray-900" : ""
    }`;

  return (
    <aside className="min-h-screen bg-white shadow-lg">
      <Link
        href="/dashboard"
        className="hidden md:block p-4 font-bold text-lg border-b"
      >
        Grile Dashboard
      </Link>
      <nav className="p-1 md:p-4">
        <ul className="space-y-1">
          {user?.role !== "student" && (
            <>
              <li>
                <Link
                  className={linkClasses("/dashboard/create-exam")}
                  href="/dashboard/create"
                >
                  <EosIconsContentNew />
                  <span className="hidden md:block">Create</span>
                </Link>
              </li>
              <li>
                <Link
                  className={linkClasses("/dashboard/manage")}
                  href="/dashboard/manage"
                >
                  <MingcuteEditLine />
                  <span className="hidden md:block">Manage</span>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              className={linkClasses("/dashboard/exams")}
              href="/dashboard/exams"
            >
              <HealthiconsIExamMultipleChoiceOutline />
              <span className="hidden md:block">Exams</span>
            </Link>
          </li>
          <li>
            <PortalButton token={token} user={user}>
              <div
                className="flex items-center gap-2 uppercase font-bold rounded p-2
              text-gray-600 hover:bg-green-400 hover:text-gray-900"
              >
                <CharmGem />
                <span className="hidden md:block">
                  {user?.plan === "free" ? "Upgrade" : "Subscription"}
                </span>
              </div>
            </PortalButton>
          </li>
          <li>
            <Link
              className={linkClasses("/dashboard/profile")}
              href="/dashboard/profile"
            >
              <MdiUserOutline />
              <span className="hidden md:block">Profile</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => dispatch(setLogout())}
              type="button"
              className="flex items-center w-full uppercase font-bold rounded p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            >
              <MaterialSymbolsLogout />
              <span className="hidden md:block">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
