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
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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

const currentUsers = new Set();
const chat = io.of('/chat');
chat.use((socket, next) => {
  const nickname = socket.handshake.auth.nickname;
  if (!nickname) {
    return next(new Error('invalid nickname'));
  }
  if (currentUsers.has(nickname)) {
    return next(new Error('duplicated nickname'));
  }
  socket.nickname = nickname;
  currentUsers.add(nickname);
  next();
});

chat.on('connection', async socket => {
  console.log(socket.nickname + ' connected!');

  const groups = (await groupModel.findAll()).map(obj => obj.dataValues);
  groups.forEach(({name}) => {
    socket.join(name);
  });
  socket.emit('groups', groups);

  socket.on('create-group', ({ groupName, groupExplain }) => {
    const group = {
      name: groupName,
      explain: groupExplain,
    }
    groupModel
      .create(group)
      .then(() => {
        // eslint-disable-next-line no-unused-vars
        for (const [_, socket] of chat.sockets) {
          socket.join(groupName);
        }
        chat.emit('group-created', group);
      })
      .catch((err) => {
        socket.emit('db_error', err);
      });
  });

  socket.on('chat', ({ nickname, groupName, message }) => {
    const log = {
      sender: nickname,
      group: groupName,
      message: message,
    };

    chatModel
      .create(log)
      .then((query) => {
        chat.to(groupName).emit('chat', query.dataValues);
      })
      .catch((err) => {
        socket.emit('db_error', err);
      });
    
  })

  socket.on('disconnect', () => {
    console.log(socket.nickname + ' disconnected');
    currentUsers.delete(socket.nickname);
  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');


});