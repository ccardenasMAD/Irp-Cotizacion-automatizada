export const calcularPresupuesto = (tipo: string, detalles: any): number => {
  let total = 0;
  
  // Pricing constants for estimation logic
  const PRECIOS = {
    BASE_KG: 3500,
    RECARGO_REVESTIMIENTO: 1.15, 
    RECARGO_VICTAULIC: 12000,    
    RECARGO_BRONCE: 1.25,        
    FACTOR_CENTRO_MECANIZADO: 1.35, 
  };

  // Base calculation derived from total weight
  const peso = Number(detalles.pesoTotal) || 0;
  total = peso * PRECIOS.BASE_KG;

  switch (tipo.toLowerCase()) {
    case 'cañería':
    
      // Add fixed cost for specialized coupling types
      if (detalles.revestimientoInterior || detalles.revestimientoExterior) {
        total *= PRECIOS.RECARGO_REVESTIMIENTO;
      }
     
      if (detalles.tipoAcoplamiento === 'Victaulic' || detalles.tipoAcoplamiento === 'Flange') {
        total += PRECIOS.RECARGO_VICTAULIC;
      }
      break;

    case 'acero estructural':
      
      if (detalles.incluyeOtrosMateriales) {
        total *= PRECIOS.RECARGO_BRONCE;
      }
      break;

    case 'mecanizado':
     
      if (detalles.material === 'Inoxidable' || detalles.material === 'Bronce') {
        total *= 1.5; 
      }
     
      if (detalles.tipoMecanizado === 'Centro de mecanizado') {
        total *= PRECIOS.FACTOR_CENTRO_MECANIZADO;
      }
      break;
  }

  return Math.round(total);
};