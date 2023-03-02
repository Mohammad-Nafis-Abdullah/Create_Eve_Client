import { useState } from "react";

const getStorage = (storageName,storageType=null)=> {
    let storage = localStorage.getItem(storageName);
    if (storage) {
        storage = JSON.parse(storage);
    }
    else{
        storage = storageType;
    }
    return storage;
}

const useLocalStorage = (storageName,storageType=null)=> {
    
    const [storageData,setStorageData] = useState(getStorage(storageName,storageType));

    const setStorage = (data)=>{
        const dataStringify = JSON.stringify(data);
        localStorage.setItem(storageName,dataStringify);
        setStorageData(getStorage(storageName,storageType));
    }

    const clearStorage = (name=storageName)=> {
        localStorage.removeItem(name);
        setStorage(null);
        return 0;
    }
    
    return [storageData,setStorage,clearStorage];
}


export default useLocalStorage;

export { getStorage };