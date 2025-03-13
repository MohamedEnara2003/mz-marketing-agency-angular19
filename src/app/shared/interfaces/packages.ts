export interface PackagesType {
    id : number ,
    created_at : string ,
    level : string ,
    price : number ,
    discound : number ,
    package : Array<{item : string , isSupport : boolean}> ;
}