
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEnquiryStore } from "@/hooks/use-enquiry-store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const leftNavLinks = navLinks.slice(0, 2);
const rightNavLinks = navLinks.slice(2);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const pathname = usePathname();
  const { open: openEnquiryPopup } = useEnquiryStore();

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100;
    let currentSectionId = "";

    for (let i = navLinks.length - 1; i >= 0; i--) {
      const link = navLinks[i];
      if (!link.href.startsWith("/#")) continue;
      
      const sectionId = link.href.substring(link.href.indexOf('#') + 1);
      const section = document.getElementById(sectionId);

      if (section && section.offsetTop <= scrollPosition) {
        currentSectionId = link.href;
        break;
      }
    }

    if (currentSectionId) {
      setActiveLink(currentSectionId);
    } else if (window.scrollY < 200) {
      setActiveLink('/');
    }
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      setActiveLink('/');
    } else {
      setActiveLink(pathname);
    }
    
    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname, handleScroll]);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative flex items-center justify-between h-20">
            <nav className="hidden md:flex items-center gap-2">
              {leftNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activeLink === link.href || (link.href.startsWith('/#') && activeLink.includes(link.href))
                      ? "text-white font-bold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 font-bold text-xl">
              <Image src="/logo.png" alt="Navkar Logo" width={100} height={100} />
            </a>

            <div className="flex items-center gap-2">
                <nav className="hidden md:flex items-center gap-2">
                  {rightNavLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeLink === link.href || (link.href.startsWith('/#') && activeLink.includes(link.href))
                          ? "text-white font-bold"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                <button
                  className="md:hidden p-2 rounded-lg border -mr-2 text-white"
                  onClick={() => setMenuOpen((s) => !s)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black bg-opacity-80">
            <div className="mx-auto max-w-7xl px-4 py-4 grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-2 text-lg text-gray-300 hover:text-white"
                  onClick={() => handleNavClick(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
