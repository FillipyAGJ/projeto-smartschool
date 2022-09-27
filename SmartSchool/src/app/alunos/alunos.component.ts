import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/Aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {

  public modalRef?: BsModalRef;
  public alunoForm!: FormGroup;
  public titulo: string = 'Alunos';
  public alunoSelecionado?: Aluno;

  @Input()
  public modalAluno: boolean = false;

  public alunos!: Aluno[];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private alunoService: AlunoService
  ) {
    this.criarForm()
  }

  ngOnInit(): void {
    this.getAlunos();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  criarForm() {
    this.alunoForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  getAlunos() {
    this.alunoService.getAllAlunos().subscribe({
      next: (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }

  atualizarAluno(aluno: Aluno) {
    this.alunoService.put(aluno.id, aluno).subscribe({
      next: (aluno) => {
        console.log(aluno, " foi pelo atualizar");
        this.getAlunos();
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }

  cadastrarAluno(aluno: Aluno) {
    this.alunoService.post(aluno).subscribe({
      next: (aluno) => {
        console.log(aluno, " foi pelo cadastrar");
        this.getAlunos();
        return HttpStatusCode.Created;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  alunoSubmit(value: number) {
    if(value) {
      this.atualizarAluno(this.alunoForm.value);
    } else if(value === 0 || !value) {
      this.cadastrarAluno(this.alunoForm.value);
    }
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  voltar() {
    this.alunoSelecionado = undefined;
  }

}
