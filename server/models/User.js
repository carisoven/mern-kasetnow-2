const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== 'email' ? false : true;
    }
  },
  fullname: {
    type: String
  },
  password: {	  
    type: String	 
  },	 
  provider: {	  
    type: String,	    
    required: true,	   
    default: 'email'
  },
  googleId: {
    type: String,
  },	
  facebookId: {
    type: String,
  },
  avatar: {
    type: String
  },	 
  role: {
    type: String,
    enum: ['ROLE_SUPERADMIN', 'ROLE_ADMIN', 'ROLE_USER'],
    default: 'ROLE_USER'
},
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('User', UserSchema);
