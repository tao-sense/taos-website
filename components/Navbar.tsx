'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import React, { useState, useRef, useEffect } from 'react';
import { flags } from '@/lib/flags';

// --- Utility components ---
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// --- NavLink component ---
const NavLink = ({
  href,
  children,
  isTopLevel = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isTopLevel?: boolean;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(pathname === href);
  }, [pathname, href]);

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        textShadow: active
          ? '0 0 12px rgba(255, 215, 0, 0.75), 0 0 18px rgba(255, 215, 0, 0.45)'
          : '0 0 8px rgba(0,0,0,0.9), 0 0 16px rgba(0,0,0,0.9)',
      }}
      className={`relative block px-3 py-2 rounded-2xl transition ${
        active ? 'text-gold' : 'text-white hover:text-gold'
      }`}
    >
      {children}
      {isTopLevel && (
        <span
          className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-gold transition-all duration-300 ease-out ${
            active
              ? 'w-6 opacity-100'
              : 'w-0 group-hover:w-6 opacity-0 hover:opacity-100'
          }`}
        />
      )}
    </Link>
  );
};

// --- Nav data ---
const navItems = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  {
    title: 'Offerings',
    href: '/offerings',
    children: [
      { title: 'Classic Tantra Massage', href: '/offerings/tantra' },
      { title: 'Tantra Massage Seminars', href: '/offerings/workshops' },
      { title: 'Intimacy Coaching', href: '/offerings/coaching' },
    ],
  },
  { title: 'Client Stories', href: '/client-stories' },
  { title: 'Contact', href: '/contact' },
  { title: 'FAQ', href: '/faq' },
];

// --- Desktop dropdown ---
function DropdownItem({ item }: { item: any }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <NavLink href={item.href} isTopLevel>
        {item.title} ▾
      </NavLink>

      <div
        className={`absolute left-0 mt-1 w-56 bg-black border border-white/10 rounded-lg shadow-lg transform transition-all duration-200 ease-out ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {item.children.map((child: any) => (
          <NavLink key={child.title} href={child.href}>
            {child.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// --- Navbar Component ---
export default function Navbar() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === 'ADMIN';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (section: string) =>
    setOpenDropdown(openDropdown === section ? null : section);

  return (
    <header className="sticky top-0 z-[100] backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <img
            src="/images/taos-logo.png"
            alt="TAOS Logo"
            className="w-10 h-10 object-contain group-hover:opacity-80 transition"
          />
          <span className="text-gold text-lg font-semibold tracking-wide whitespace-nowrap">
            The Art of Sensuality
          </span>
        </Link>

        {/* --- Desktop Nav --- */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <DropdownItem key={item.title} item={item} />
            ) : (
              <NavLink key={item.title} href={item.href} isTopLevel>
                {item.title}
              </NavLink>
            )
          )}
          {flags.subscriptions && (
            <NavLink href="/pricing" isTopLevel>
              Pricing
            </NavLink>
          )}
          {session && flags.subscriptions && (
            <NavLink href="/dashboard" isTopLevel>
              Dashboard
            </NavLink>
          )}
          {isAdmin && (
            <NavLink href="/admin" isTopLevel>
              Admin
            </NavLink>
          )}
        </nav>

        {/* --- Auth + Hamburger --- */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {!session ? (
              flags.subscriptions && (
                <>
                  <Link
                    href="/signin"
                    className="px-3 py-2 rounded-2xl border border-white/20 hover:border-white/40"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-3 py-2 rounded-2xl bg-gold text-black hover:opacity-90"
                  >
                    Create account
                  </Link>
                </>
              )
            ) : (
              <>
                <span className="text-sm opacity-80 hidden sm:inline">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-3 py-2 rounded-2xl border border-white/20 hover:border-white/40"
                >
                  Sign out
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 z-[200] relative"
          >
            {mobileOpen ? (
              <span className="text-2xl text-gold">&times;</span>
            ) : (
              <span className="text-2xl text-white">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu (pushes page content down, solid bg) --- */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col px-8 py-10 space-y-4 bg-black border-t border-white/10 animate-fadeSlideDown">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.title}>
                  <div className="flex justify-between items-center">
                    <NavLink
                      href={item.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.title}
                    </NavLink>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className="p-2 rounded-lg hover:bg-white/5"
                    >
                      <Chevron open={openDropdown === item.title} />
                    </button>
                  </div>

                  {openDropdown === item.title && (
                    <div className="ml-4 flex flex-col space-y-2 mt-2">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.title}
                          href={child.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {child.title}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.title}
                  href={item.href}
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  {item.title}
                </NavLink>
              )
            )}
          </nav>

          {/* Auth Buttons (mobile) */}
          <div className="pt-8 border-t border-white/10 mt-6 flex flex-col gap-2">
            {!session ? (
              flags.subscriptions && (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-2xl border border-white/20 hover:border-white/40 text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-2xl bg-gold text-black hover:opacity-90 text-center"
                  >
                    Create account
                  </Link>
                </>
              )
            ) : (
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setMobileOpen(false);
                }}
                className="px-3 py-2 rounded-2xl border border-white/20 hover:border-white/40 w-full"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}