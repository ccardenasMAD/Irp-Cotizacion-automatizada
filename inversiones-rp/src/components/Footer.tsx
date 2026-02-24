const Footer = () => {
  return (
    <footer className="bg-[#051937] py-12 text-white mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/20 pb-8 mb-8 text-center md:text-left">
          
        
          <div>
            <h3 className="font-heading text-xl font-bold mb-3">Inversiones RP</h3>
            <p className="text-gray-400 text-sm">
              Soluciones empresariales desde 2014 en el valle del Choapa.
            </p>
          </div>

        
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-blue-400">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: contacto@inversionesrp.cl</li>
              <li>Teléfono: +56 9 1234 5678</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-blue-400">Ubicación</h4>
            <p className="text-sm text-gray-300">
              Sector Chillepín, Salamanca.<br />
              Región de Coquimbo, Chile.
            </p>
          </div>
        </div>

    
        <div className="text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Inversiones RP — Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;