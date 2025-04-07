export interface ChatType {
    id ? : number ,
    created_at ? : string ,
    user_id : string ,
    admin_id : string ,
    userName : string ,
    email : string ,
    avatar_url : string,
}

export interface MessageType {
    id ? : number ,
    created_at ? : string ,
    isSender? : boolean , 
    sender_id : string,
    receiver_id : string ,
    chat_id : number ,
    message : string ,
    image_url? : string ,
}

export interface ImagesFilesType {
imageName : string ,
imagePath : string ,
}