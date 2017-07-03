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
          last: String,
        },
      },
    });

    return editProfile({ userId: this.userId, profile })
      .then(response => response)
      .catch((exception) => {
        throw new Meteor.Error('500', exception);
      });
  },
  'users.resetToken': function usersResetToken() {
    const newToken = Random.id(); // TODO: generate random api token
    Meteor.users.update(
      { _id: this.userId },
      {
        $set: { token: newToken },
      },
    );
  },
});

rateLimit({
  methods: ['users.editProfile'],
  limit: 5,
  timeRange: 1000,
});
