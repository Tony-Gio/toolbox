import { Injectable } from '@angular/core';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor() { }

  displayController(myClass: Class): string {
    let methods = this.generateControllerMethods(myClass);
    return `
    <div class="javaCode">

    <p class="jc_annotation margup">@RestController</p>
    <p class="jc_annotation">@RequestMapping("${myClass.javaClassName.toLowerCase()}")</p>
<p>public class <span class="functionName">${myClass.javaClassName}Controller</span> {</p>

<p class="jc_annotation margup">@Autowired</p>
 <p class="indent-2"> ${myClass.javaClassName}Service: ${myClass.javaClassName.toLowerCase()}Service</p>

${methods}
<p>}</p>
</div>
`;
  }

  generateControllerMethods(myClass: Class): string {
    let methods = `
    <p class="jc_annotation margup">@GetMapping()</p>
  <p>public <span class="typeName">List<${myClass.javaClassName}></span> <span class="functionName">getAll${myClass.javaClassName}</span>(){</p>
    <p class="indent-2">return ${myClass.javaClassName.toLowerCase()}.getAll${myClass.javaClassName}()';</p>
  <p>}</p>

  <p class="jc_annotation margup">@GetMapping("/{id}")</p>
	<p>public <span class="typeName">${myClass.javaClassName}</span> <span class="functionName">get${myClass.javaClassName}ById</span>(<span class="jc_annotation">@PathVariable</span> <span class="typeName">long</span> id) {</p>
		<p class="indent-2">return ${myClass.javaClassName.toLowerCase()}Service.get${myClass.javaClassName}ById(id);</p>
	  <p>}</p>
	
	<p class="jc_annotation margup">@PostMapping</p>
	<p>public <span class="typeName">void</span> <span class="functionName">add${myClass.javaClassName}</span>(<span class="jc_annotation">@RequestBody</span> <span class="typeName">${myClass.javaClassName}</span> ${myClass.javaClassName.toLowerCase()}) {</p>
		<p class="indent-2">${myClass.javaClassName.toLowerCase()}Service.create${myClass.javaClassName}(${myClass.javaClassName.toLowerCase()});</p>
    <p>}</p>

	<p class="jc_annotation margup">@DeleteMapping("/{id}")</p>
	<p>public <span class="typeName">void</span> <span class="functionName">delete${myClass.javaClassName}</span>(<span class="jc_annotation">@PathVariable</span> <span class="typeName">long</span> id) {</p>
		<p class="indent-2">${myClass.javaClassName.toLowerCase()}Service.delete${myClass.javaClassName}ById(id);</p>
	  <p>}</p>
	
	<p class="jc_annotation margup">@PutMapping("/{id}")</p>
	<p>public <span class="typeName">void</span> <span class="functionName">edit${myClass.javaClassName}</span>(<span class="jc_annotation">@PathVariable</span> <span class="typeName">long</span> id, <span class="jc_annotation">@RequestBody</span> <span class="typeName">${myClass.javaClassName}</span> ${myClass.javaClassName.toLowerCase()}) {</p>
		<p class="indent-2">${myClass.javaClassName.toLowerCase()}.update${myClass.javaClassName}(id, ${myClass.javaClassName.toLowerCase()});</p>
	  <p>}</p>

`;

    return methods;
  }
}
