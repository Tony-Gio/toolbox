import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Type } from 'src/app/models/Type';
import { Relation } from 'src/app/models/Relation';
import { ClassService } from 'src/app/service/class.service';
import { Class } from 'src/app/models/Class';
import { Collection } from 'src/app/models/Collection';

@Component({
  selector: 'app-java',
  templateUrl: './java.component.html',
  styleUrls: ['./java.component.scss']
})
export class JavaComponent {
  javaClassForm: FormGroup;
  isTableClassNameVisible = false; // affiche ou non champ Table
  attributes: any[] = [];
  collections =Object.values(Collection) // récup Enum Collection
  types = Object.values(Type); // récupération Enum Types
  relations = Object.values(Relation); // récupération Enum Relations
  showCustomName: boolean[] = []; //affiche ou non champ nom custom
  display = false; // afficher code quand submit
  classToDisplay = new Class();

  constructor(
    private classService: ClassService,
    private formbuilder: FormBuilder) {

    this.javaClassForm = this.formbuilder.group({
      javaClassName: [''],
      tableClassName: new FormControl({ value: '', disabled: true }),
      hasAnId: [false],
      attributesArray: this.attributes,
      getters: [false],
      setters: [false],
      constructors: [false],
    });
  }

  // Add a row for new attribute
  addAttribute() {
    this.attributes.push({});
  }

  // alow user to enter table name
  addTable() {
    this.isTableClassNameVisible = !this.isTableClassNameVisible;
    if (this.javaClassForm.get('tableClassName')?.disabled) {
      this.javaClassForm.get('tableClassName')?.enable();
    } else {
      this.javaClassForm.get('tableClassName')?.disable();
    }
  }


  // Impact the value of the form according to what is clicked on
  addOutput(choice: string) {
    switch (choice) {
      case 'id':
        this.javaClassForm.value.hasAnId = !this.javaClassForm.value.hasAnId;
        break;
      case 'getters':
        this.javaClassForm.value.getters = !this.javaClassForm.value.getters;
        break;
      case 'setters':
        this.javaClassForm.value.setters = !this.javaClassForm.value.setters;
        break;
      case 'constructors':
        this.javaClassForm.value.constructors = !this.javaClassForm.value.constructors;
        break;
      default:
        console.log("nothing happens")
        break;
    }
  }

  // Check if type is Custom, to display new input
  checkType(selectedType: any, index: number) {
    this.showCustomName[index] = (selectedType.value === 'Other class');
    console.log(selectedType.value)
    console.log(this.showCustomName[index])
  }


  onSubmit() {
    this.createClass();
    console.log("submit :" + this.classToDisplay);
    console.log(this.classToDisplay);
    this.display = true;
  }

  createClass() {
    // check the attributes that have been added
    this.attributes.forEach((attribute, index) => {

      // Name of Attribute
      const attNameElement = document.getElementById('attName-' + index) as HTMLInputElement;
      const attNameValue = attNameElement? attNameElement.value:"";

      // Is the attribute an array 
      const attCollElement = (document.getElementById('attColl-' + index) as HTMLInputElement);
      const attCollValue = attCollElement? attCollElement.value:"";

      // Type of Attribute
      const attTypeElement = (document.getElementById('attType-' + index) as HTMLInputElement);
      const attTypeValue = attTypeElement? attTypeElement.value:"";

      // CustomClass if existing
      const attCustomNameElement = document.getElementById('attCustomName-' + index) as HTMLInputElement;
      const attCustomNameValue = attCustomNameElement ? attCustomNameElement.value : "";

      // Relation between Attributes if existing
      const attRelElement = document.getElementById('attRel-' + index) as HTMLInputElement;
      console.log("1-" + attRelElement);
      console.log("1-" + attNameValue);
      const attRel = attRelElement ? attRelElement.value : "";

      attribute = { attNameValue, attCollValue, attTypeValue, attCustomNameValue, attRel };

      this.attributes[index] = attribute;
      this.javaClassForm.value.attributesArray = this.attributes;
      this.classToDisplay.attributesArray = this.javaClassForm.value.attributesArray;
      this.classToDisplay.constructors = this.javaClassForm.value.constructors;
      this.classToDisplay.getters = this.javaClassForm.value.getters;
      this.classToDisplay.hasAnId = this.javaClassForm.value.hasAnId;
      this.classToDisplay.javaClassName = this.javaClassForm.value.javaClassName;
      this.classToDisplay.setters = this.javaClassForm.value.setters;
      this.classToDisplay.tableClassName = this.javaClassForm.value.tableClassName;

      console.log("1 : " + this.classToDisplay)
    });
  }

}
