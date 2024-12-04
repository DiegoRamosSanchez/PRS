import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FamilyDTO } from './familiaDto';
import { FamilyService } from '../services/family.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FamiliaFormularioComponent } from './familia-formulario/familia-formulario.component';

@Component({
  selector: 'app-familia',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FamiliaFormularioComponent],
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {
  familias: FamilyDTO[] = [];
  familySelected: FamilyDTO | null = null;
  loading = false;
  error: string | null = null;
  showFamilyForm = false;

  constructor(private familyService: FamilyService) {}

  ngOnInit(): void {
    this.cargarFamiliasActivas();
  }

  cargarFamiliasActivas() {
    this.loading = true;
    this.familyService.getFamiliesActive()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error detallado:', error);
          this.error = this.procesarError(error);
          this.loading = false;
          return of([]); // Devuelve un array vacío en lugar de lanzar un error
        })
      )
      .subscribe({
        next: (data) => {
          this.familias = data;
          this.loading = false;
          this.error = null;
        }
      });
  }

  private procesarError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error: ${error.error.message}` || 'Error desconocido';
    } else {
      return `Código de error ${error.status}: ${error.error?.error || 'Error desconocido'}`;
    }
  }

  seleccionarFamilia(familia: FamilyDTO) {
    this.familySelected = familia;
  }

  openFamilyForm() {
    this.showFamilyForm = true; // Abre el modal del formulario
  }

  onFamilyCreated(familyData: any) {
    console.log('Familia creada:', familyData);
    this.cargarFamiliasActivas(); // Recarga las familias después de crear una nueva
    this.showFamilyForm = false; // Cierra el modal
  }

  editFamily(familia: FamilyDTO) {
    this.familySelected = familia; // Establece la familia seleccionada para editar
    this.showFamilyForm = true; // Abre el formulario para editar
  }

  deleteFamily(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta familia?')) {
      this.familyService.deleteFamily(id).subscribe(
        () => {
          this.cargarFamiliasActivas(); // Recarga las familias después de eliminar
        },
        (error) => {
          this.error = 'Error al eliminar la familia';
        }
      );
    }
  }

  getFamilyTypeColor(type: string): string {
    switch (type) {
      case 'Nuclear': return 'bg-green-100 text-green-800';
      case 'Extendida': return 'bg-blue-100 text-blue-800';
      case 'Monoparental': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}