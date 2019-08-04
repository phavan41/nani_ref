import {Directive, Attribute} from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[regex][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RegExValidator, multi: true }
  ]
})
export class RegExValidator implements Validator {
	regExMatchValue:RegExp;
	regExFieldName:string = '';
	constructor(@Attribute("regExMatchValue") regExMatchValue: string, @Attribute("regExFieldName") regExFieldName: string) {
    this.regExMatchValue = new RegExp(regExMatchValue);
	this.regExFieldName = regExFieldName;
  }
	
  validate(control: AbstractControl): {[validator: string]: string} {
    if (!control.value){
		return null;
	}
	if (this.regExMatchValue.test(control.value)) {
      return null;
    }

    return {minlengtharray: 'Please enter correct ' + this.regExFieldName + ' value'};
  }
}
