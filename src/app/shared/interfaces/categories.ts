
export interface  Comments {
    id? : number ,
    created_at? : string ,
    category_id: number ,
    user_id : string,
    email : string ,
    picture : string,
    userName : string ,
    comment : string ,
}

export interface CategoriesType {
    id : number ,
    created_at : string ,
    url : string ,
    title : string ,
    category : string ,
    type : string
    views : number ,
    likes : number,
    dislikes : number,
    comments : Comments[]
}