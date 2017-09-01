import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Random } from 'meteor/random';
import editProfile from './edit-profile';
import rateLimit from '../../../modules/rate-limit';

Meteor.methods({
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      emailAddress: String,
      password: Match.Optional(Object),
      profile: {
        name: {
          first: String,
          last: String
        }
      }
    });

    return editProfile({ userId: this.userId, profile })
      .then(response => response)
      .catch(exception => {
        throw new Meteor.Error('500', exception);
      });
  },
  'users.resetToken': function usersResetToken() {
    const newToken = Random.id(); // TODO: generate random api token
    Meteor.users.update(
      { _id: this.userId },
      {
        $set: { token: newToken }
      }
    );
  },
  // TODO: method to seed an admin user
  // 'users.seedAdmin': function seedAdmin() {
  //   let admin;
  //
  //   admin = Meteor.users.findOne({'emails.address': 'admin@test.com'});
  //
  //   if (admin) return;
  //
  //   Meteor.
  // }
  'users.getJwtAccessToken': async function loginFromCommandLine() {
    if (!this.userId) {
      throw new Meteor.Error(
        'You need to be logged in on the web app to get an access token.'
      );
    }

    const jwt = await import('jsonwebtoken');
    const getJwtAccessToken = await import('./get-jwt-secret-key');
    const JWT_SECRET_KEY = getJwtAccessToken.default;
    const userDoc = await Meteor.users.rawCollection().findOne(
      { _id: this.userId },
      {
        fields: { _id: 1, emails: 1, profile: 1 }
      }
    );
    const userData = { _id: userDoc._id };
    if (userDoc.emails) userData.email = userDoc.emails[0].address;
    if (userDoc.profile && userDoc.profile.name)
      userData.name = userDoc.profile.name;

    const token = jwt.sign({ user: userData }, JWT_SECRET_KEY);

    return token;
  }
});

rateLimit({
  methods: ['users.editProfile'],
  limit: 5,
  timeRange: 1000
});
