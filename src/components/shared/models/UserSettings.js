/**
 * UserSettings model
 */

class UserSettings {
  constructor(data = {}) {
    this.settingsId = null;
    this.userID = null;
    this.setID = null;
    this.cardsShuffled = null;
    this.studyStarred = null;
    this.lastCard = null;
    this.markedCards = null;
    this.savedOrder = null;
    
    Object.assign(this, data);
  }
}
export default UserSettings;
