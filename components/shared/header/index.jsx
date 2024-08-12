import React from "react";
import Menu from "./Menu";
import Logo from "./Logo";
import Sign from "./Sign";

export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-7xl mx-auto pt-4 px-4 sm:px-6 md:px-8">
      <Logo color="#0A0A0A" />
      <Menu />
      <Sign />
    </header>
  );
}
