import axios from "axios";
import {Buffer} from 'buffer';

const API_BASE_URL_ACCOUNT = 'http://localhost:5189/api';
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
export async function sendMessageToBinaryGroup(data) {

  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/chat/SendMessageToBinaryGroup`, data,{
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Apiden Mesaj Gönderilemedi.');
  }
}
//Bütün mesajların listelenmesi
export async function getAllChatMessage(ChatGroupId) {
  
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/chat/getAllChatMessage`,{
      params:{
        ChatGroupId:ChatGroupId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Apiden Mesaj Gönderilemedi.');
  }
}
//Bütün okunmamış mesajları listelenmesi
export async function getUnreadedMessagesCount(messagesCountDto) {
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/chat/GetUnreadedMessagesCount`,messagesCountDto,{
      
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Apiden Mesaj Gönderilemedi.');
  }
}

//ChatGroup oluşturma
export async function createGroup(data) {
  debugger;
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/chat/createGroup`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
     
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Grup oluşturulamadı.');
  }
}
//createGroupForStarting
export async function createGroupForStarting(memberInfo) {
  debugger;
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/chat/CreateGroupForStarting`, memberInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Grup member oluşturulamadı.');
  }
}

//Group members oluşturma
export async function createGroupMembers(memberInfo) {
  debugger;
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/chat/createGroupMembers`, memberInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Grup member oluşturulamadı.');
  }
}
//Giriş logu yaratma
export async function connectingLog(data) {
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/Chat/ConnectingLog`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Kayıt yapılamadı.');
  }
}
//ConnectionId güncelleme;
export async function updateConnectionLog(data){
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/Chat/UpdateConnectionLog`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
     
    });

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.title || 'Kayıt yapılamadı.');
  }
}
//Connection kapama güncellemesi;
export async function closedConnectionLog(data){
  try {
    const response = await axios.post(`${API_BASE_URL_ACCOUNT}/Chat/ClosedConnectionLog`, data, {
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
export async function getAllContacts(userid) {
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/Chat/GetAllContacts`,{
      params: {
        userId:userid,
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
// Bütün kullanıcıları göstermex  
export async function groupExistingControl(ChatGroupId) {
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/Chat/GroupsExistingControl`,{
      params: {
        ChatGroupId:ChatGroupId,
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
// Chat geçmişini getirir  
export async function getAllGroupChats(filteredId) {
  try {
    const response = await axios.get(`${API_BASE_URL_ACCOUNT}/Chat/GetAllGroupChats`,{
      params:{
        filteredId:filteredId,
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