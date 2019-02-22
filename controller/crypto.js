var crypto = require('crypto');

class Security {
  static generate64BytesKey(){
    return crypto.randomBytes(Math.ceil(32)).toString('hex').slice(0,64);
  }
  
  static generateHash(key){
    var pepper = "PoutineVegane";
    var string = pepper + key + pepper;
    return crypto.createHash('sha256').update(string).digest('HEX');
  }
};

module.exports = Security;
