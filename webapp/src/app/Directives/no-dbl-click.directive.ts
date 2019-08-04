import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appNoDblClick]'
})

export class NoDblClickDirective {
	isPressed:boolean = false;
	constructor() { }
	
	@HostBinding('class.disabled') // <== Does not work
	get press() { return this.isPressed; }
	
	@HostListener('click', ['$event'])
	clickEvent(event) {
		//console.log('No Double Click Event');
		if (this.isPressed){
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
		
		this.isPressed = true;
		let _this = this;
		setTimeout(
			function(){
				_this.isPressed = false;
			},
		500);
	}
}