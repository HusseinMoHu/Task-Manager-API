const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Hussein',
      email: 'hussein@example.com',
      password: 'MyPass777!',
    })
    .expect(201)

  // Assert that the database it changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()
  // Check that the password is hashed in database
  expect(user.password).not.toBe('MyPass777!')

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Hussein',
      email: 'hussein@example.com',
    },
    token: user.tokens[0].token,
  })
})

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)

  // Assert that when user login the token is added to database tokens
  const user = await User.findById(userOneId)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'wrongPass!!',
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200)

  // Assert that the user is deleted from database
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
  await request(app).delete('/users/me').expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/profile-pic.jpg')
    .expect(200)

  // assert that the user is updated with the new avatar
  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Mike',
    })
    .expect(200)

  // Assert that the user is updated with a new name in database
  const user = await User.findById(userOneId)
  expect(user.name).toBe('Mike')
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'Cairo, Egypt',
    })
    .expect(400)
})
