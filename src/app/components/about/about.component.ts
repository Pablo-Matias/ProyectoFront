import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/api-rest/login.service';
import { PersonaService } from 'src/app/services/api-rest/persona.service';
import { Persona } from 'src/app/services/interface/Persona';
import { AboutModalComponent } from '../modales/about-modal/about-modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 constructor(private personaService:PersonaService, private modalService: NgbModal, private loginService:LoginService)  { }
 
  id:number =1
  persona!: Persona ;
  login:any;   
  getById(id: number) {
    this.personaService.getById(id).subscribe (
			data => { this.persona = data;
      //console.log(this.persona)        
      }
		);
  }
  
  update(id: number, profile: any) {
      this.personaService.update(id,this.persona).subscribe (
        data => { this.persona = data; }
      );
    }
    ngOnInit(): void {
      this.getById(this.id) 
      this.loginService.LogState().subscribe((login) => (this.login = login)); 
    }
  
abrirModal(id:any){
  console.log(id)
  const modalRef = this.modalService.open(AboutModalComponent, { centered: true }   );
  modalRef.componentInstance.id = id;   
  modalRef.result.then((data) => {
    console.log("pasa por aca?")
    this.ngOnInit();
  })
}
}
