
const Storage = {
    getUserWithId: async function (key) {
        try{
            const response = await fetch(`http://localhost:8500/users/${key}`,{
            method : 'GET',
                headers : {'content-type': 'application/json'},
    })
        if(response.ok){
            return response.json();   
        }
        else{
            throw new Error("Failed to fetch data");
        }
        }catch(e){
            console.log(e);
        }
    },

    getContacts: async function (key) {
        try{
            const response = await fetch(`http://localhost:8500/users/${key}/contacts`,{
            method : 'GET',
                headers : {'content-type': 'application/json'},
    })
        if(response.ok){
            return response.json();   
        }
        else{
            throw new Error("Failed to fetch data");
        }
        }catch(e){
            console.log(e);
        }

    },
    setContact: async function (key, value) {
        try{
            const response = await fetch(`http://localhost:8500/users/${key}/contacts`,{
            method : 'POST',
                headers : {'content-type': 'application/json'},
                body: JSON.stringify(value)
        })
        if(response.ok){
            return true;   
        }
        else{
            throw new Error("Failed to send data");
        }}catch(e){
            console.log(e);
        }
},
    getContact: async function (userId,key) {
        try{
            const response = await fetch(`http://localhost:8500/users/${userId}/contacts/${key}`,{
            method : 'GET',
                headers : {'content-type': 'application/json'},
    })
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error("Failed to fetch data");
        }
        }catch(e){
            console.log(e);
        }
    },
    
    updateContact : async function (userId,key,value) {
    const url = `http://localhost:8500/users/${userId}/contacts/${key}`;
    try{
        const response = await fetch(url,{
            method : 'PUT',
                headers : {'content-type': 'application/json'},
                body: JSON.stringify(value)
    })
        if(response.ok){
            return true;   
        }
        else{
            throw new Error("Failed to update data");
        }
        }catch(e){
            console.log(e);
        }
    },

    deleteContact: async function (userId,key) {
    const url = `http://localhost:8500/users/${userId}/contacts/${key}`;
    try{
        const response = await fetch(url,{
            method : 'DELETE',
                headers : {'content-type': 'application/json'},
    })
        if(response.ok){
            return true;   
        }
        else{
            throw new Error("Failed to delete data");
        }
        }catch(e){
            console.log(e);
        }


},
    getUser: async function (key) {
        try{
            const response = await fetch(`http://localhost:8500/user?username=${key}`,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                    },
                    });
            if(response.ok){
                return true
            }
        }catch(e){
            console.log(e);
        }
    },

    setUser: async function (value) {
        try{
            const response = await fetch('http://localhost:8500/newUser',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
                
                body: JSON.stringify(value),
        })
        
        if(response.ok){
            
            console.log("Data sent successfully");
            return true;   
        }
        else{
            throw new Error("Failed to send data");
        }
    }catch(e){
            console.log(e);
        }
},
    getLogin: async function (item) {
        try{
            const response = await fetch("http://localhost:8500/login",{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(item),
                    });
            if(response.ok){
                return true;
            }else{
                return false;
            }
        }catch(e){
            console.log(e);
        }
    },
    doAuth: async function() {
        try{
            const response = await fetch("http://localhost:8500/checkToken",{
                method : 'GET',
                headers : {'content-type': 'application/json'},
                credentials: 'include'
            })
            if(response.ok){
                const userId = await response.text();
                return userId;
            }
            
        }catch(e){
            console.log(e);
        }
    },
    doLogout: async function() {
        try{
            const response = await fetch("http://localhost:8500/logout",{
                method : 'GET',
                headers : {'content-type': 'application/json'},
                credentials: 'include'
            })
            if(response.ok){
                return true;
            }
            else{
                return false;
            }
            
        }catch(e){
            console.log(e);
        }
    }
}
export default Storage;