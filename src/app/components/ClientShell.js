'use client';

import Preloader from './Preloader';

import SmoothScroll from './SmoothScroll';
import Navbar from './Navbar';
import CartSheet from './CartSheet';
import MenuOverlay from './MenuOverlay';

export default function ClientShell({ children }) {
  return (
    <>
      <Preloader />

      <SmoothScroll>
        <div className="grain">
          <Navbar />
          <MenuOverlay />
          <CartSheet />
          <main>{children}</main>
        </div>
      </SmoothScroll>
    </>
  );
}
