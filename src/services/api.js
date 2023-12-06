import axios from "axios";
import {Buffer} from 'buffer';

const API_BASE_URL_ACCOUNT = 'https://localhost:7063/api';
const API_RANDOM_AVATAR="https://api.multiavatar.com";
// Giriş yapma
export async function login(data) {
    try {
    
      const response = await axios.post(`${API_BASE_URL_ACCOUNT}/login`, data, {
        headers: {
          "Content-Type": "application/json",
          
        },
      
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.title || 'Giriş yapılamadı.');
    }
  }
  
  // Oturumu sonlandırma
  export async function logout() {
    try {
      const response = await axios.post(`${API_BASE_URL_ACCOUNT}/logout`, null, {
        headers: {
          "Content-Type": "application/json", 
          
        },
        
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.title || 'Çıkış yapılamadı.');
    }
  }

  // User kayıt
export async function register(data) {
    try {
      const response = await axios.post(`${API_BASE_URL_ACCOUNT}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
         
        },
       
      });
      debugger;
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.title || 'Kayıt yapılamadı.');
    }
  }

  //Avatar seçimi
export async function selectAvatar() {
  try {
    const data=[];
    for(let i=0;i<4;i++){
      const image=await axios.get(`${API_RANDOM_AVATAR}/${Math.round(Math.random()*1000)}`);
      const buffer=new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    return data;
  } catch (error) {
    throw new Error("Bağlantı yapılamadı");
  }
}


// User id ye göre user getirme
export async function getUserById(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/Chat/GetUserById/${userId}`,userId,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Kullanıcı alınamadı');
  }
}
//Avatar güncelleme
export async function setAvatar(id,data) {
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/setAvatar/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Kayıt yapılamadı.');
  }
}
//Mesaj Gönderme
export async function sendMessage(data) {
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/Chat/${data}`, {
      params:{
        message:data
      },
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Mesaj Gönderilemedi.');
  }
}
//Giriş logu yaratma
export async function connectingLog(data) {
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/Chat`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Kayıt yapılamadı.');
  }
}

// Bütün kullanıcıları göstermex  
export async function getAllContacts(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/Chat/GetAllContacts`,{
      params: {
        userid:userId,
      },
      headers: {
        'Content-Type': 'application/json',
      } 
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Liste alınamadı');
  }
}
