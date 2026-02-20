import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Misión y Visión", href: "#mision-vision" },
  { label: "Servicios", href: "#servicios" },
  { label: "Contacto", href: "#contacto" },
  { label: "Cotización", href: "#cotizacion" },
];
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "gradient-navy shadow-lg py-2" : "bg-transparent py-4"
    }`}
  >
    <div className="container mx-auto flex items-center justify-between px-6">
    <a href="#inicio" className="text-2xl font-bold text-white font-heading">IRP</a>
    
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium text-sm transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden gradient-navy border-t border-primary/30 pb-4">
          <ul className="flex flex-col items-center gap-4 pt-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground font-medium text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
