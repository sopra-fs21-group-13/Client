/** 
 * Set model
 */

 class Set {
    constructor(data={}){ //이 문법은 무엇임.

        //name of the set
        this.title = null; //where can these vars be set as private or public..?
        
       
        this.id = null;  //set id
        this.owner=null; //set owner of the set
        
        this.owner = null;
        this.liked=null;

        /*
        this.playback = null; //Q) what is this for?
        this.type=public;     //public or private
        */
        Object.assign(this, data);  //Q) what is this for?
    }
    
    /* Q) 최종버전 변수/ 함수들인지 확인하기
    Card createFlashcard(String q, String a){
        ;
    }
    editFlashcard(Flashcard): void
    removeFlashcard(FlashcardID): void
    shuffle(Playback): List<Flashcard>
    search(Topic): List<Flashcard>
    */
}

export default Set; //Q) what is this cor?