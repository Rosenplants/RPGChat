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
    Group.create({ name: 'The Buffalo Zone' }),
    Group.create({ name: 'The Couples Play DnD' }),
  ]);
  return groups;
}

async function createThreads() {}

async function createMessages() {}

async function createScenes() {
  const scenes = await Promise.all([
    Scene.create({
      name: 'A Spooky Cave',
      text:
        'You come across an eerie opening in the cliff wall. The darkness seems almost impenetrable and there is an unsettling quiet around the cave.',
      imageURL:
        'https://media.istockphoto.com/photos/tunnel-picture-id121368045?k=6&m=121368045&s=612x612&w=0&h=LIBNrLa9qBf40uKA6Fihd3UyqrU_o16IzacXsACdXMU=',
      isDefault: true,
      audioURL:
        'https://www.youtube.com/watch?v=kxqJuc1HHbg&ab_channel=TheGuildofAmbience',
    }),
    Scene.create({
      name: 'The Winter Festival',
      text: `It might be freezing cold, but the town square is packed with people. There's ice skating, shaved ice, ice sculptures, and more ice related celebrations.`,
      imageURL:
        'https://korea.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/1212_winter_main.jpg?itok=kzPP8nRS',
      isDefault: true,
      audioURL:
        'https://www.youtube.com/watch?v=x7BCa9Y8Of8&ab_channel=Geytkeypur',
    }),
  ]);
  return scenes;
}

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const users = await createUsers();
  const groups = await createGroups();
  const scenes = await createScenes();

  await users[0].setGroups(groups);
  await users[1].setGroups(groups);
  await users[2].addGroup(groups[0]);

  return { users, groups, scenes };
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
