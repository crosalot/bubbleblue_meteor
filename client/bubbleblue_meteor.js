


Bubble = new Meteor.Collection('bubble');

Meteor.subscribe("Bubble");

Meteor.autosubscribe(function(){
  Bubble.find().observe({
    added: function(item){
      $('.bubble:hidden').remove();
      setTimeout("$('#"+item._id+"').show()",10);
    }
  });
});


Template.bubble_container.bubble_list = function () {
  return Bubble.find({}, {sort: {created: -1}});
}

Template.bubble_item.rendered = function() {
  animation = new BubbleAnimation(this.data._id);
  animation.init();
};


Template.bubble_form.events({
  
  'submit #message-form' : function (e) {
    e.preventDefault();
    var message = $('#message').val();
    $('#message').val('');
        
    //Meteor.call('newBubble', message);
    Bubble.insert({'message': message, 'created': Date.now()});
  }
  
});
