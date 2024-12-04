export interface FamilyDTO {
    id: number;
    direction: string;
    reasibAdmission: string;
    status: string;
    basicService: {
      serviceId: number;
      waterService: string;
      servDrain: string;
      servLight: string;
      servCable: string;
      servGas: string;
    };
    communityEnvironment: {
      id: number;
      area: string;
      referenceLocation: string;
      residue: string;
      publicLighting: string;
      security: string;
    };
    familyComposition: {
      id: number;
      numberMembers: number;
      numberChildren: number;
      familyType: string;
      socialProblems: string;
    };
    familyFeeding: {
      id: number;
      frecuenciaSemanal: string;
      tipoAlimentacion: string;
    };
    familyHealth: {
      id: number;
      safeType: string;
      familyDisease: string;
      treatment: string;
      antecedentesEnfermedad: string;
      examenMedico: string;
    };
    housingDistribution: {
      id: number;
      ambienteHogar: number;
      numeroDormitorio: number;
      habitabilidad: string;
    };
    housingEnvironment: {
      id: number;
      tenure: string;
      typeOfHousing: string;
      housingMaterial: string;
      housingSecurity: string;
    };
    laborAutonomy: {
      id: number;
      numberRooms: number;
      numberOfBedrooms: number;
      habitabilityBuilding: string;
    };
    socialLife: {
      id: number;
      material: string;
      feeding: string;
      economic: string;
      spiritual: string;
      socialCompany: string;
      guideTip: string;
    };
  }