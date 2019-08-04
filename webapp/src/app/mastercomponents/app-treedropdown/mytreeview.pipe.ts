import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewItem } from 'ngx-treeview';

@Pipe({
    name: 'myNgxTreeview'
})
export class MytreeviewPipe implements PipeTransform {
    transform(objects: any[], textField: string, valueField: string, childrenField: string): TreeviewItem[] {
        if (isNil(objects)) {
            return undefined;
        }
		
		if (childrenField == undefined || childrenField == null || childrenField.length == 0){
			childrenField = 'children';
		}

        let objs = objects.map(object => new TreeviewItem({ text: object[textField], value: {
            text: object[textField], value: object[valueField]
        }, children: this.transform(object[childrenField],textField,valueField,childrenField),checked:false}));
		
		//console.log(objs);
		
		return objs;
    }
}