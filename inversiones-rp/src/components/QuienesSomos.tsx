const QuienesSomos = () => {
  return (
    <section id="quienes-somos" className="py-16 container mx-auto text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
        Quiénes Somos
      </h2>

      {/* Líneas decorativas */}
      <div className="w-20 h-1 gradient-blue mx-auto mb-2 rounded-full" />
      <div className="w-16 h-1 gradient-blue mx-auto mb-8 rounded-full" />

      <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        Inversiones RP fue fundada en el año 2014 en el corazón del valle del Choapa,
        específicamente en el sector de Chillepín, Salamanca. Desde sus inicios, la empresa
        se ha enfocado en suministrar soluciones orientadas al sector empresarial,
        destacando por su compromiso con la calidad, la confiabilidad y la satisfacción
        de sus clientes.
      </p>
    </section>
  );
};


export default QuienesSomos;