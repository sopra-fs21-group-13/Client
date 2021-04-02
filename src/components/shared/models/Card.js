
/** 
 * Card model
 */

class Card {
    constructor(data={}){
        this.question = null;
        this.id = null;
        this.answer = null;
        this.starred = null;
        this.clickable = null;
        Object.assign(this, data);
    }
}

export default Card;