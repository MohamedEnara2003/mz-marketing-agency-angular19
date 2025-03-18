

export interface CategoryBookedType {
    category : string , categoryDetails : string , quantity : number
}
export interface BookingType {
    id? : number ,
    created_at? : string ,
    fullName : string ,
    phone : number ,
    email : string ,
    user_id : string ,
    categories : CategoryBookedType[]
}
