import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import SubscribeForm from "../components/SubscribeForm";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div
        className="
          container mx-auto px-6 py-16 
          grid gap-12 
          md:grid-cols-2 lg:grid-cols-4 
          items-start
        "
      >
        {/* Brand + Intro */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/images/taos-logo.png"
              alt="TAOS Logo"
              width={80}
              height={80}
              className="mb-2 hover:opacity-80 transition"
            />
          </Link>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            TAOS is The Art of Sensuality — guiding you back to connection,
            intimacy, and authentic pleasure.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>
              <Link href="/offerings" className="hover:text-gold">
                Offerings Hub
              </Link>
            </li>
            <li>
              <Link href="/stories" className="hover:text-gold">
                Client Stories
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold">
                About TAOS
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-gold">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
            <li className="pt-3 border-t border-white/10 mt-3">
              <Link href="/privacy" className="hover:text-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Stay Connected</h4>
          <SubscribeForm />
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-gold font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-col space-y-3 text-sm">
            <Link
              href="https://instagram.com/tao_sense"
              target="_blank"
              className="flex items-center space-x-2 hover:text-gold"
            >
              <FaInstagram /> <span>Instagram</span>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              className="flex items-center space-x-2 hover:text-gold"
            >
              <FaFacebook /> <span>Facebook</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-10 py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} TAOS. All rights reserved.
      </div>
    </footer>
  );
}