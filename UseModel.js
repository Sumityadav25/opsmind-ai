const newUser = new User({
  username: 'johndoe',
  email: 'john@example.com',
  password: 'securepassword',
});

newUser.save()
  .then(() => console.log('User saved successfully'))
  .catch(err => console.error(err));
