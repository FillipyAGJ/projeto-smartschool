import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';
import { ProfessoresService } from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css'],
})
export class ProfessoresComponent implements OnInit {

  public modalRef?: BsModalRef;
  public professorForm!: FormGroup;
  public titulo: string = 'Professores';
  public professorSelecionado?: Professor;

  @Input()
  public modal: boolean = false;

  public professores!: Professor[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private professorService: ProfessoresService
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.getProfessores();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.professorForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required]
    });
  }

  getProfessores() {
    this.professorService.getAllProfessores().subscribe({
      next: (professores: Professor[]) => {
        this.professores = professores;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  atualizarProfessor(professor: Professor) {
    this.professorService.put(professor.id, professor).subscribe({
      next: (professor) => {
        console.log(professor, "foi pelo atualizar");
        this.getProfessores();
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  cadastrarProfessor(professor: Professor) {
    this.professorService.post(professor).subscribe({
      next: (professor) => {
        console.log(professor, "foi pelo cadastrar");
        this.getProfessores();
        return HttpStatusCode.Created;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  professorSubmit(value: number) {
    if(value) {
      this.atualizarProfessor(this.professorForm.value);
    } else if(value === 0 || !value) {
      this.cadastrarProfessor(this.professorForm.value);
    }
  }

  public professorSelect(professor: Professor) {
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  professorNovo() {
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }

  public voltar() {
    this.professorSelecionado = undefined;
  }
}
