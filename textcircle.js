this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient) {
// find the first document in the Documents colleciton and send back its id

  Template.editor.helpers({
    docid:function(){
      var doc = Documents.findOne();
      if (doc){
        return doc._id;
      }
      else {
        return undefined;
      }
    }, 
	config:function(){
	   return function(editor){
		editor.on("change",function(cm_editor,info){
			$("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
	    });
	    }
    // template helper that configures the CodeMirror editor
    // you might also want to experiment with the ACE editor
    }, 
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // startup code that creates a document in case there isn't one yet. 
    if (!Documents.findOne()){// no documents yet!
        Documents.insert({title:"my new document"});
    }
  });
}
