import { Injectable } from '@angular/core';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor() { }

  displayClass(myClass: Class): string {

    return `
    <div class="javaCode">
    <p class="jc_annotation margup">@Entity</p>
    <p class="jc_annotation">@Table(name = "${myClass.tableClassName !== "" ? myClass.tableClassName : myClass.javaClassName.toLowerCase()}")</p>
    <p>public class <span class="typeName">${myClass.javaClassName}</span> {<p>
      `+
      this.displayId(myClass) +
      this.displayAttributes(myClass) +
      this.displayConstructors(myClass) +
      this.displayGetters(myClass) +
      this.displaySetters(myClass) +
      `</div>`

  }

  displayId(myClass: Class): string {
    if (myClass.hasAnId) {
      return `<p class="jc_annotation margup">@Id<p>
      <p class="jc_annotation">@GeneratedValue(strategy = GenerationType.IDENTITY)<p>
      <p class="jc_annotation">@Column(name = "id")<p>
      <p>private <span class="typeName">Long</span> id;</p>`;
    } else {
      return ``
    }
  }

  displayAttributes(myClass: Class): string {
    let output = '';

    for (let attribute of myClass.attributesArray) {
      // si l'attribut est simple (pas de Type personnalisé ou complexe)
      if (attribute.attCustomNameValue === "") {
        output += `
    <p class="jc_annotation margup">@Column(name = "${attribute.attColNameValue ? attribute.attColNameValue : attribute.attNameValue}")<p>
    <p>private <span class="typeName">${attribute.attTypeValue}</span> ${attribute.attNameValue};</p>
    <p></p>`}

      // si l'attribut est complexe
      else {
        output += this.displaySpecialAttribute(myClass, attribute);
      }
    }
    return output;
  }

  displaySpecialAttribute(myClass: Class, attribute: any) {
    let output = ""
    console.log("a : " + attribute);
    console.log(attribute);
    const relation = attribute.attRel;
    const typeArray = attribute.attCollValue;
    console.log("typeArray : ", typeArray);
    output += `<p class="jc_annotation margup">@${relation}</p>`;
    switch (relation) {
      case "One To Many":
        output += `
        <p>private <span class="typeName">${typeArray === "None" ? "" : typeArray}&#60;${attribute.attCustomNameValue}&#62;</span> ${attribute.attNameValue.toLowerCase()};</p>
        `;
        break;
      case "Many To One":
        output += `
        <p class="jc_annotation">@Column(name = "${attribute.attNameValue}_id")</p>
        <p>private <span class="typeName">${attribute.attCustomNameValue}</span> ${attribute.attNameValue.toLowerCase()};</p>
        `;
        break;
      case "Many To Many":
        output += `
<p class="jc_annotation">@JoinTable(name = "table_association", joinColumns = @JoinColumn(name = "${myClass.javaClassName.toLowerCase()}_id"), inverseJoinColumns = @JoinColumn(name = "${attribute.attNameValue.toLowerCase()}_id") )</p>
<p>private <span class="typeName">>${typeArray === "none" ? "" : typeArray}<${attribute.attNameValue}></span> ${attribute.attNameValue.toLowerCase};</p>
        `;
        break;
      case "One To One":
        output += `<p>private <span class="typeName"><${attribute.attNameValue}></span> ${attribute.attNameValue.toLowerCase};</p>`;
        break;
      default:
        output += ``;
        break;
    }
    return output;
  }


  displayConstructors(myClass: Class): string {
    if (myClass.constructors) {
      let output = `
    <p  class="margup comment">/* CONSTRUCTORS */</p>
    <p class="margup">public <span class="functionName">${myClass.javaClassName}</span>(){</p><p>}</p>
    <p class="margup">	public <span class="functionName">${myClass.javaClassName}</span>(`;
      // on ajoute le nom et type des attributs
      for (let attribute of myClass.attributesArray) {
        output += `<span class="typeName">${attribute.attCustomNameValue ? attribute.attCustomNameValue : attribute.attTypeValue}</span> ${attribute.attNameValue}, `;
      }
      output += `) { </p>
  <p class="indent-2">super();</p>`;
      // on ajoute l'initialisation de tous les attributs
      for (let attribute of myClass.attributesArray) {
        output += `<p  class="indent-2">this.${attribute.attNameValue} = ${attribute.attNameValue} ;</p>`
      }
      output += `<p>}</p>`

      return output;
    } else {
      return '';
    }
  }


  displayGetters(myclass: Class): string {
    if (myclass.getters) {
      let output = `<p  class="margup comment">/* GETTERS */</p>`;
      for (let attribute of myclass.attributesArray) {
        let formattedAttName = attribute.attNameValue.charAt(0).toUpperCase() + attribute.attNameValue.slice(1);
        output += `
    <p  class="margup">public <span class="typeName">${attribute.attCustomNameValue ? attribute.attCustomNameValue : attribute.attTypeValue}</span> <span class="functionName">get${formattedAttName}</span>(){</p>
    <p  class="indent-2">return ${attribute.attNameValue} ;</p>
    <p>}</p>`
      }
      return output;
    } else {
      return '';
    }
  }

  displaySetters(myclass: Class): string {
    if (myclass.setters) {
      let output = `<p  class="margup comment">/* SETTERS */</p>`;
      for (let attribute of myclass.attributesArray) {
        let formattedAttName = attribute.attNameValue.charAt(0).toUpperCase() + attribute.attNameValue.slice(1);
        output += `
    <p  class="margup">public void <span class="functionName">set${formattedAttName}</span>(<span class="typeName">${attribute.attCustomNameValue ? attribute.attCustomNameValue : attribute.attTypeValue}</span> ${attribute.attNameValue}){</p>
    <p  class="indent-2">this.${attribute.attNameValue} = ${attribute.attNameValue} ;</p>
    <p>}</p>`
      }
      return output;
    } else {
      return '';
    }
  }
}
