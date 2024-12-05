import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FamilyService } from '../../services/family.service';
import { FamilyDTO } from '../familiaDto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-familia-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './familia-formulario.component.html',
  styleUrls: ['./familia-formulario.component.css']
})
export class FamiliaFormularioComponent {

  @Output() familyCreated = new EventEmitter<FamilyDTO>();
  @Output() formClosed = new EventEmitter<void>();

  family: FamilyDTO = {
    id: 0, // Este campo puede ser auto-generado por el backend
    direction: '',
    reasibAdmission: '',
    status: 'A', // Estado por defecto
    basicService: {
      waterService: '',
      servDrain: '',
      servLight: '',
      servCable: '',
      servGas: ''
    },
    communityEnvironment: {
      area: '',
      referenceLocation: '',
      residue: '',
      publicLighting: '',
      security: ''
    },
    familyComposition: {
      numberMembers: 0,
      numberChildren: 0,
      familyType: '',
      socialProblems: ''
    },
    familyFeeding: {
      frecuenciaSemanal: '',
      tipoAlimentacion: ''
    },
    familyHealth: {
      safeType: '',
      familyDisease: '',
      treatment: '',
      antecedentesEnfermedad: '',
      examenMedico: ''
    },
    housingDistribution: {
      ambienteHogar: 0,
      numeroDormitorio: 0,
      habitabilidad: ''
    },
    housingEnvironment: {
      tenure: '',
      typeOfHousing: '',
      housingMaterial: '',
      housingSecurity: ''
    },
    laborAutonomy: {
      numberRooms: 0,
      numberOfBedrooms: 0,
      habitabilityBuilding: ''
    },
    socialLife: {
      material: '',
      feeding: '',
      economic: '',
      spiritual: '',
      socialCompany: '',
      guideTip: ''
    }
  };

  constructor(private familyService: FamilyService) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.familyService.createFamily(this.family).subscribe(
        response => {
          console.log('Familia creada:', response);
          this.familyCreated.emit(response);
          Swal.fire({
            title: 'Éxito!',
            text: 'Registro creado exitosamente!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.resetForm();
            this.closeForm();
          });
        },
        error => {
          console.error('Error al crear la familia:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrió un error al crear el registro.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  resetForm() {
    this.family = {
      id: 0,
      direction: '',
      reasibAdmission: '',
      status: 'A',
      basicService: {
        waterService: '',
        servDrain: '',
        servLight: '',
        servCable: '',
        servGas: ''
      },
      communityEnvironment: {
        area: '',
        referenceLocation: '',
        residue: '',
        publicLighting: '',
        security: ''
      },
      familyComposition: {
        numberMembers: 0,
        numberChildren: 0,
        familyType: '',
        socialProblems: ''
      },
      familyFeeding: {
        frecuenciaSemanal: '',
        tipoAlimentacion: ''
      },
      familyHealth: {
        safeType: '',
        familyDisease: '',
        treatment: '',
        antecedentesEnfermedad: '',
        examenMedico: ''
      },
      housingDistribution: {
        ambienteHogar: 0,
        numeroDormitorio: 0,
        habitabilidad: ''
      },
      housingEnvironment: {
        tenure: '',
        typeOfHousing: '',
        housingMaterial: '',
        housingSecurity: ''
      },
      laborAutonomy: {
        numberRooms: 0,
        numberOfBedrooms: 0,
        habitabilityBuilding: ''
      },
      socialLife: {
        material: '',
        feeding: '',
        economic: '',
        spiritual: '',
        socialCompany: '',
        guideTip: ''
      }
    };
  }

  closeForm() {
    this.formClosed.emit();
  }
  
}