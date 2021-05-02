const {
  db,
  models: { User, Group, Thread, Message, Scene, Character },
} = require('../server/db');

async function createUsers() {
  return Promise.all([
    User.create({
      email: 'admin@admin.com',
      username: 'admin',
      password: '123',
      isAdmin: true,
    }),
    User.create({
      email: 'eustace@gmail.com',
      username: 'Eustalot',
      password: '123',
    }),
    User.create({
      email: 'test@test.com',
      username: 'testyMcTestFace',
      password: '123',
    }),
  ]);
}

async function createGroups() {
  const groups = await Promise.all([
    Group.create({ name: 'Test1' }),
    Group.create({ name: 'Test2' }),
  ]);
  return groups;
}

async function createThreads() {}

async function createMessages() {}

async function createScenes() {}

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const users = await createUsers();
  const groups = await createGroups();

  await users[0].setGroups(groups);
  await users[1].setGroups(groups);
  await users[2].addGroup(groups[0]);

  return { users, groups };
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
