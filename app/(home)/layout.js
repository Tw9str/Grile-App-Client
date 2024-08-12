import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import React from "react";

export default function layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
