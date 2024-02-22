import { Injectable } from '@angular/core';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor() { }
  
  displayRepository(myClass: Class): string {

    return `
    <div class="javaCode">
    <p class="jc_annotation margup">@Repository</p>
    <p>public interface <span class="typeName">${myClass.javaClassName}Repository</span> 
    extends <span class="typeName">JpaRepository</span>
    &#x3C${myClass.javaClassName}, ${this.defineType(myClass)}&#62;{<p>
    <p>}<p>
    </div>`

  }

  defineType(myClass: Class): string{
    if (myClass.hasAnId){
      return "Long";
    }else{
      return myClass.attributesArray[0].attTypeValue;
    }
  }
}
