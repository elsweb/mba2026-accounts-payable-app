
export class StorageService {
  constructor(prefix='ap_'){this.prefix=prefix;}

  _key(k){return this.prefix+k;}

  save(key,value){
    localStorage.setItem(this._key(key),JSON.stringify(value));
    return value;
  }

  find(key){
    const v=localStorage.getItem(this._key(key));
    return v?JSON.parse(v):null;
  }

  findAll(){
    const items=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k.startsWith(this.prefix)){
        items.push(JSON.parse(localStorage.getItem(k)));
      }
    }
    return items;
  }

  delete(key){
    localStorage.removeItem(this._key(key));
  }

  clear(){
    Object.keys(localStorage).forEach(k=>{
      if(k.startsWith(this.prefix)) localStorage.removeItem(k);
    });
  }
}
