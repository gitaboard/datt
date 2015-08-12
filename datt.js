if (Meteor.isClient) {
  var userName = "leefaus";

  Template.hello.helpers({
    prettyDate: function(dateString) {
      return moment(new Date(dateString)).fromNow();
    }
  });

  Template.hello.events({
    'click button': function () {
      Meteor.call('getUserInfo', 'leefaus', function(error, result) {
        console.log(result);
        Session.set('events', result);
      });
    }
  });

  Template.hello.recentEvents = function() {
    return Session.get('events') || []
  }

  Template.hello.userName = function() {
    return userName;
  }

}

if (Meteor.isServer) {
  Meteor.methods({
    getUserInfo: function(userName) {
      var github = new GitHub({
        version: "3.0.0",
        debug: true,
        protocol: "https",
        // host: "faushouse.vm",
        // pathPrefix: "/api/v3",
        timeout: 5000,
        headers: {
          "user-agent": "do-all-the-things-io"
        }
      });

      var result = github.events.getFromUser({
        user: "leefaus"
      });

      return result;
    }
  })

  Meteor.startup(function () {
  });


}
