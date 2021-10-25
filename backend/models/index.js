const Comments = require("./Comments");
const Posts = require("./Posts");
const UserCredentials = require("./UserCredentials");
const UserProfils = require("./UserProfils");

UserCredentials.hasOne(UserProfils, { onDelete: 'CASCADE', as: 'Profil', foreignKey: 'fk_user_credential' });
UserProfils.belongsTo(UserCredentials, { as: 'Profil', foreignKey: 'fk_user_credential' });

UserProfils.hasMany(Posts, { onDelete: 'CASCADE', as: 'Post', foreignKey: 'fk_users_profil' });
Posts.belongsTo(UserProfils, { as: 'Post', foreignKey: 'fk_users_profil' });

UserProfils.hasMany(Comments, { onDelete: 'CASCADE', as: 'UserComment', foreignKey: 'fk_users_comments' });
Comments.belongsTo(UserProfils, { as: 'UserComment', foreignKey: 'fk_users_comments' });

Posts.hasMany(Comments, { onDelete: 'CASCADE', as: 'PostComment', foreignKey: 'fk_posts_comments' });
Comments.belongsTo(Posts, { as: 'PostComment', foreignKey: 'fk_posts_comments' });