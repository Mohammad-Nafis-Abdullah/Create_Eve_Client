import { useState } from "react";


const getSessionStore = (storageName,storageType=null)=> {
    let storage = sessionStorage.getItem(storageName);
    if (storage) {
        storage = JSON.parse(storage);
    }
    else{
        storage = storageType;
    }
    return storage;
}


const useSessionStorage = (storageName,storageType=null)=> {
    
    const [storageData,setStorageData] = useState(getSessionStore(storageName,storageType));

    const setStorage = (data)=>{
        const dataStringify = JSON.stringify(data);
        sessionStorage.setItem(storageName,dataStringify);
        setStorageData(getSessionStore(storageName,storageType));
    }

    const clearStorage = (name=storageName)=> {
        sessionStorage.removeItem(name);
        setStorage(null);
        return 0;
    }
    
    return [storageData,setStorage,clearStorage];
}


export default useSessionStorage;
export {getSessionStore};