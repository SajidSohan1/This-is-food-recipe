import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

import { Toaster } from "react-hot-toast";

export const Layout = (porps) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {porps.children}
      </main>
      <Footer />
    </div>
  );
};
