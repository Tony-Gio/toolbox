import { Injectable } from '@angular/core';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }


  displayService(myClass: Class): string {
    let methods = this.generateServiceMethods(myClass);
    return `
    <div class="javaCode">

    <p class="jc_annotation margup">@Service</p>
    <p>public class <span class="functionName">${myClass.javaClassName}Service</span> {</p>

    <p class="jc_annotation margup">@Autowired</p>
    <p class="indent-2">${myClass.javaClassName}Repository: ${myClass.javaClassName.toLowerCase()}Repository</p>

${methods}
<p>}</p>
</div>
`;
  }

  generateServiceMethods(myClass: Class): string {
    let methods = `
    <p class="margup">public <span class="typeName">List<${myClass.javaClassName}></span> <span class="functionName">getAll${myClass.javaClassName}</span>() {</p>
    <p>return ${myClass.javaClassName}Repository.findAll();</p>
      <p>}</p>
  
      <p class="margup">public <span class="typeName">${myClass.javaClassName}</span> <span class="functionName">get${myClass.javaClassName}ById</span>(<span class="typeName">long</span> id) {</p>
      <p>Optional<${myClass.javaClassName}> opt = ${myClass.javaClassName}Repository.findById(id);</p>
      <p>if (opt.isPresent()) {</p>
      <p>System.out.println('${myClass.javaClassName} with id "+id +" found, with name: '+opt.get().getName());</p>
        <p>return opt.get();</p>
        <p>} else {</p>
      <p>System.out.println('${myClass.javaClassName} with id "+id +" deleted');</p>
        <p>return new ${myClass.javaClassName}();</p>
        <p>}</p>
        <p>}</p>
  
        <p class="margup">public <span class="typeName">void</span> <span class="functionName">delete${myClass.javaClassName}ById</span>(<span class="typeName">long</span> id) {</p>
        <p>Optional<${myClass.javaClassName}> opt = ${myClass.javaClassName}Repository.findById(id);</p>
      <p>if (opt.isPresent()) {</p>
      <p>${myClass.javaClassName}Repository.deleteById(id);</p>
        <p>System.out.println('${myClass.javaClassName} with id "+id +" deleted');</p>
        <p>} else {</p>
      <p>System.out.println('${myClass.javaClassName} not found');</p>
        <p>}</p>
        <p>}</p>
    
        <p class="margup">public <span class="typeName">void</span> <span class="functionName">create${myClass.javaClassName}</span>(<span class="typeName">String</span> name) {</p>
        <p>if (name!="") {</p>
      <p>${myClass.javaClassName} new${myClass.javaClassName} = new ${myClass.javaClassName}();</p>
        <p>new${myClass.javaClassName}.setName(name);</p>
        <p> ${myClass.javaClassName}Repository.save(new${myClass.javaClassName});</p>
        <p>System.out.println('${myClass.javaClassName} with name "+name +" added');</p>
        <p>}</p>
        <p>}</p>
    
        <p class="margup">public <span class="typeName">void</span> <span class="functionName">update${myClass.javaClassName}</span>(<span class="typeName">long</span> id, <span class="typeName">String</span> name) {</p>
      <p>Optional<${myClass.javaClassName}> opt = ${myClass.javaClassName}Repository.findById(id);</p>
      <p>if (opt.isPresent()) {</p>
      <p>if (name!="") {</p>
      <p>${myClass.javaClassName} update${myClass.javaClassName} = new ${myClass.javaClassName}();</p>
      <p>update${myClass.javaClassName}.setId(opt.get().getId());</p>
      <p>update${myClass.javaClassName}.setName(name);</p>
      <p>${myClass.javaClassName}Repository.save(update${myClass.javaClassName});</p>
      <p>System.out.println('${myClass.javaClassName} with id "+id +" updated : new name :"+name +"');</p>
          <p>}</p>
          <p>}</p>
     <p></p> 
     <p>}</p>
`;

    return methods;
  }
}
