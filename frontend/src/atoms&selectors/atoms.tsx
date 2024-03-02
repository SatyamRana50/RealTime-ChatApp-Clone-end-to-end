import { atom } from "recoil";
import { Message } from "../data";

export const name = atom({
    key: 'name', 
    default: '', 
  });

 export const newMessage = atom({
    key: 'newMessage', 
    default: 0
  }); 

export const messagesList=atom({
    key: 'messagesList',
    default: [] as Message[]
    });  

    