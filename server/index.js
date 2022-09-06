const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    credentials: true,
  },
});

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'chat.sqlite'
});

const init = () => {
  const groupModel = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    explain: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  });

  const chatModel = sequelize.define('Chat', {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    msg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    freezeTableName: true,
  });  

  (async () => {
    await sequelize.sync()
  })()

  return {groupModel, chatModel};
}
const { groupModel, chatModel } = init();

const chat = io.of('/chat');

chat.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error('invalid nickname'));
  }
  socket.nickname = nickname;
  next();
});

chat.on('connection', async socket => {
  console.log(socket.nickname + ' connected!');

  const groups = (await groupModel.findAll()).map(obj => obj.dataValues);
  console.log(groups);
  socket.emit('groups', groups);

  socket.on('create-group', ({ groupName, groupExplain }) => {
    const group = {
      name: groupName,
      explain: groupExplain,
    }
    groupModel
      .create(group)
      .then(() => {
        chat.emit('group-created', group);
      })
      .catch((err) => {
        chat.emit('error', err);
      });
  });

  socket.on('disconnect', () => {
    console.log(socket.nickname + ' disconnected');
  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');


});