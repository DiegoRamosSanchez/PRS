import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-familia-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './familia-formulario.component.html',
  styleUrls: ['./familia-formulario.component.css']
})
export class FamiliaFormularioComponent {
  @Output() formClosed = new EventEmitter<void>();
  @Output() familyCreated = new EventEmitter<any>();

  currentStep = 1;
  familyForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.familyForm = this.fb.group({
      // Información Básica de la Familia
      basicInfo: this.fb.group({
        direction: ['', [Validators.required]],
        familyType: ['', [Validators.required]],
        socialProblems: ['']
      }),

      // Composición Familiar
      familyComposition: this.fb.group({
        numberMembers: [0, [Validators.required, Validators.min(1)]],
        numberChildren: [0, [Validators.required, Validators.min(0)]],
        familyMembers: this.fb.array([])
      }),

      // Servicios Básicos
      basicServices: this.fb.group({
        waterService: [false],
        servDrain: [false],
        servLight: [false],
        servCable: [false],
        servGas: [false]
      }),

      // Ambiente Comunitario
      communityEnvironment: this.fb.group({
        area: [''],
        referenceLocation: [''],
        publicLighting: [false],
        security: [false]
      }),

      // Salud Familiar
      familyHealth: this.fb.group({
        familyDisease: [''],
        treatment: [''],
        medicalExam: ['']
      })
    });
  }

  // Getter para familyMembers FormArray
  get familyMembers() {
    return (this.familyForm.get('familyComposition.familyMembers') as FormArray);
  }

  // Añadir miembro familiar
  addFamilyMember() {
    const memberForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      relationship: ['', Validators.required]
    });

    this.familyMembers.push(memberForm);
  }

  // Eliminar miembro familiar
  removeFamilyMember(index: number) {
    this.familyMembers.removeAt(index);
  }

  // Navegación entre pasos
  nextStep() {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Validación del paso actual
  validateCurrentStep(): boolean {
    const currentStepControls = this.getCurrentStepControls();
    
    if (currentStepControls) {
      Object.keys(currentStepControls.controls).forEach(key => {
        const control = currentStepControls.get(key);
        control?.markAsTouched();
      });

      return currentStepControls.valid;
    }
    
    return true;
  }

  // Obtener controles del paso actual
  getCurrentStepControls(): FormGroup | null {
    switch(this.currentStep) {
      case 1: return this.familyForm.get('basicInfo') as FormGroup;
      case 2: return this.familyForm.get('familyComposition') as FormGroup;
      case 3: return this.familyForm.get('basicServices') as FormGroup;
      case 4: return this.familyForm.get('communityEnvironment') as FormGroup;
      case 5: return this.familyForm.get('familyHealth') as FormGroup;
      default: return null;
    }
  }

  // Validar si el paso actual es válido
  isStepValid(): boolean {
    return this.validateCurrentStep();
  }

  // Envío del formulario
  onSubmit() {
    if (this.familyForm.valid) {
      console.log('Formulario completo:', this.familyForm.value);
      this.familyCreated.emit(this.familyForm.value);
      this.closeForm();
    } else {
      // Marcar todos los controles como tocados para mostrar errores
      Object.keys(this.familyForm.controls).forEach(key => {
        const control = this.familyForm.get(key);
        control?.markAllAsTouched();
      });
    }
  }

  // Cerrar formulario
  closeForm() {
    this.formClosed.emit();
  }

  // Limpiar mensaje de error
  clearErrorMessage() {
    this.errorMessage = null;
  }
}
