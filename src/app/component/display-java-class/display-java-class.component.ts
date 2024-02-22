import { Component, Input, OnInit } from '@angular/core';
import { Class } from 'src/app/models/Class';
import { ClassService } from 'src/app/service/class.service';
import { ControllerService } from 'src/app/service/controller.service';
import { RepositoryService } from 'src/app/service/repository.service';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-display-java-class',
  templateUrl: './display-java-class.component.html',
  styleUrls: ['./display-java-class.component.scss']
})
export class DisplayJavaClassComponent implements OnInit {

  @Input() classToDisplay !: Class;
  myClass = new Class();
  optionActivated = 1;

  constructor(
    private repositoryService: RepositoryService,
    private controllerService: ControllerService,
    private serviceService: ServiceService,
    private classService: ClassService) { }

  ngOnInit() {
    // const myClass = new Class();
    const displayCode = document.getElementById('displayCode');

    if (this.classToDisplay) {
      console.log("2 : " + this.classToDisplay)
      this.myClass.javaClassName = this.classToDisplay.javaClassName;
      this.myClass.hasAnId = this.classToDisplay.hasAnId;
      this.myClass.tableClassName = this.classToDisplay.tableClassName;
      this.myClass.attributesArray = this.classToDisplay.attributesArray;
      this.myClass.constructors = this.classToDisplay.constructors;
      this.myClass.getters = this.classToDisplay.getters;
      this.myClass.setters = this.classToDisplay.setters;
      // console.log(this.classService.displayClass(this.myClass));
      if (displayCode != null) {
        displayCode.innerHTML = this.classService.displayClass(this.myClass);
      }
    } else {
      console.log("Error")
    }
  }

  displayFile(str: String) {
    const displayCode = document.getElementById('displayCode');
    if (displayCode !== null) {
      switch (str) {
        case 'class':
          displayCode.innerHTML = this.classService.displayClass(this.myClass);
          this.optionActivated = 1;
          break;
        case 'repository':
          displayCode.innerHTML = this.repositoryService.displayRepository(this.myClass);
          this.optionActivated = 2;
          break;
        case 'service':
          displayCode.innerHTML = this.serviceService.displayService(this.myClass);
          this.optionActivated = 3;
          break;
        case 'controller':
          displayCode.innerHTML = this.controllerService.displayController(this.myClass);
          this.optionActivated = 4;
          break;
        default:
          displayCode.innerHTML = "Error";
          break;
      }

    }

  }
}
