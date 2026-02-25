export const calcularPresupuesto = (tipo: string, detalles: any): number => {
    let total = 0;
    
    // Definición de constantes de costo base
    const PRECIOS = {
      BASE_KG: 3500, //valor base por kilogramo para todos los tipos de trabajo 
      REVESTIMIENTO: 500, // Costo extra por pulgada/metro en cañerías valor ejemplo
      BRONCE_EXTRA: 1200, // Recargo por materiales especiales
      COMPLEJIDAD_MECANIZADO: 1.2, // Factor multiplicador para procesos de precisión
    };
  
    // 1. Cálculo base por peso (aplica a todos los tipos)
    const peso = Number(detalles.pesoTotal) || 0;
    total = peso * PRECIOS.BASE_KG;
  
    // 2. Lógica específica por tipo de trabajo para mayor precisión
    switch (tipo) {
      case 'caneria':
        // Si tiene revestimiento interior o exterior, sumamos un adicional
        if (detalles.revestimientoInterior || detalles.revestimientoExterior) {
          total += (peso * 0.1); // Ejemplo: 10% adicional por tratamiento superficial
        }
        break;
  
      case 'acero':
        // Recargo si incluye piezas de bronce u otros materiales
        if (detalles.incluyeOtrosMateriales === 'bronce') {
          total += PRECIOS.BRONCE_EXTRA;
        }
        break;
  
      case 'mecanizado':
        // El mecanizado suele ser más caro por hora máquina
        if (detalles.tipoMecanizado === 'centro') {
          total *= PRECIOS.COMPLEJIDAD_MECANIZADO;
        }
        break;
    }
  
    return Math.round(total); // Retornamos el valor final para mostrar de inmediato
  };