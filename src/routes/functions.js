const fs = require('fs');
const members = JSON.parse(fs.readFileSync('../data/members.json', 'utf8'));
module.exports={
    memberIndexByEmail:function(email)
    {
        var i;
        for (i=0; i<members.length; i++)
        {
            if (members[i]["email"]==email)
            {
                return i;
            }
        }
        return (-1);
    },
    memberIndexByUsername:function(username)
    {
        var i;
        for (i=0; i<members.length; i++)
        {
            if (members[i]["username"]==username)
            {
                return i;
            }
        }
        return (-1);
    }
    addMember:function(username,password,email)
    {
        members.push({
            "username" : username,
            "password" : password,
            "email"    : email
        });
        fs.writeFileSync('../data/members.json',JSON.stringify(members));

    }

    verifyUserByUsername:function(users,uername) {
        var i;
        for(i=0; i<users.length; i++) {
            if(users[i].username == username) return false ;
        }
        return true;

    }

    verifyUserByemail:function(users,email) {
        var i;
        for(i=0; i<users.length; i++) {
            if(users[i].email == email) return false ;
        }
        return true;

    }


};

