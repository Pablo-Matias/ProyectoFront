import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaService } from 'src/app/services/api-rest/experiencia.service';
import { LoginService } from 'src/app/services/api-rest/login.service';
import { Laboral } from 'src/app/services/interface/Laboral';
import { ExperienciaModalComponent } from '../modales/experiencia-modal/experiencia-modal.component';

@Component({
    selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  constructor(private experienciaService:ExperienciaService, private modalService: NgbModal, private loginService:LoginService)  { }

  login:any;
  experiencia!: Laboral [] ;
  
  expNueva:boolean = true;

  getById(id: number) {
    this.experienciaService.getById(id).subscribe (
			data => { this.experiencia = data; }
		);
  }

  getAll() {
    this.experienciaService.getAll().subscribe (
			data => { this.experiencia = data; }
		);
  }
  delete(id: number) {
    this.experienciaService.delete(id).subscribe (
			data => { this.experiencia = data; }
		);
  }

  save(laboral:any) {
    this.experienciaService.save(laboral).subscribe (
			data => { this.experiencia = data; }
		);
  }

  update(id: number, laboral: any) {
    this.experienciaService.update(id,laboral).subscribe (
			data => { this.experiencia = data; }
		);
  }

  ngOnInit(): void {
    this.loginService.LogState().subscribe((login) => (this.login = login)); 
    this.getAll()
    console.log(this.login)
   }


  abrirModal(id:any){
    const modalRef = this.modalService.open(ExperienciaModalComponent, { centered: true }   );
    modalRef.componentInstance.id = id;  
    
    modalRef.result.then((data) => {
      this.ngOnInit();
    })
  }

  abrirModalAgregar(){
    const modalRef = this.modalService.open(ExperienciaModalComponent, { centered: true }   );   
   modalRef.componentInstance.expNueva = this.expNueva;   
    modalRef.result.then((data) => {
      this.ngOnInit();
    } )   
    
  }
  
  borrarExperiencia(id:any){
   console.log("ponel1")
    this.experienciaService.delete(id).subscribe (
      data => { this.ngOnInit() }
    );
  }
}