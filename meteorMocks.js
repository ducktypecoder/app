export const Meteor = {
  call: () => null,
  // ... more stuff you'd like to mock on the Meteor object
};

export const Mongo = {
  Collection: name => ({
    name,
  }),
  allow: () => null,
};
