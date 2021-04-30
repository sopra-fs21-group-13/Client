/** 
 * Set model
 */

 class Set {
    constructor(data={}){ 

        //name of the set
        this.title = null; 
        
       
        this.id = null;  //set id
        this.owner=null; //set owner of the set
        
        this.owner = null;
        this.liked=null;

        Object.assign(this, data);  
    }
    

}

export default Set; 