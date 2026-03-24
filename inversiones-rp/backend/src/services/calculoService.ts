export const calcularPresupuesto = (tipo: string, detalles: any): number => {
  let total = 0;
  
  const PRECIOS = {
    BASE_KG: 3500,
    RECARGO_REVESTIMIENTO: 1.15, 
    RECARGO_VICTAULIC: 12000,    
    RECARGO_BRONCE: 1.25,        
    FACTOR_CENTRO_MECANIZADO: 1.35, 
  };

  const peso = Number(detalles.pesoTotal) || 0;
  total = peso * PRECIOS.BASE_KG;

  switch (tipo.toLowerCase()) {
    case 'cañería':
      // Punto 3.4: Si tiene revestimientos, aplicamos factor
      if (detalles.revestimientoInterior || detalles.revestimientoExterior) {
        total *= PRECIOS.RECARGO_REVESTIMIENTO;
      }
      // Si el acoplamiento es Victaulic o Flange, sumamos costo de piezas
      if (detalles.tipoAcoplamiento === 'Victaulic' || detalles.tipoAcoplamiento === 'Flange') {
        total += PRECIOS.RECARGO_VICTAULIC;
      }
      break;

    case 'acero estructural':
      //  Recargo por materiales como Bronce
      if (detalles.incluyeOtrosMateriales) {
        total *= PRECIOS.RECARGO_BRONCE;
      }
      break;

    case 'mecanizado':
      //  Materiales caros como Inoxidable o Bronce
      if (detalles.material === 'Inoxidable' || detalles.material === 'Bronce') {
        total *= 1.5; // 50% extra por dificultad de material
      }
      // Recargo por tipo de máquina
      if (detalles.tipoMecanizado === 'Centro de mecanizado') {
        total *= PRECIOS.FACTOR_CENTRO_MECANIZADO;
      }
      break;
  }

  return Math.round(total);
};