import { PermissionsModel } from "../models/permissions.model";

export class ActionsListModel{
    id?:number;
	action_name:string;
	description:null;
	display_name:null;
	menu_id:number;
	permissions:PermissionsModel[];

    constructor()
	{
		this.id = null;
		this.action_name = null;
		this.menu_id = null;
		this.permissions = Array<PermissionsModel>();		
	}
}