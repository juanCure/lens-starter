var LensNodes = require("lens/article/nodes");
var ListView = LensNodes["list"].View;
var List = LensNodes["list"].Model;

var CustomListView = function(node, viewFactory) {
	ListView.call(this, node, viewFactory);
};

CustomListView.Prototype = function() {
	// Sobreescribiendo la funcionalidad del método render

	this.render = function() {
		console.log("Calling method render of ListView constructor");
    console.log("the typeof object this: " + JSON.stringify(this, null, 4));
    
    /*console.log("Keys of this:" + Object.keys(this));
    console.log("this.el : " + this.el);
    console.log("this.$el : " + this.$el);
    console.log("this.node : " + this.node);
    console.log("this.node : " + JSON.stringify(this.node, null, 4));*/

    var i = 0;
    var children = this.node.getNodes();
    var real_items = []
    for(i; i < children.length; i++) {
      var child = this.node.document.get(children[i]);
      if(child.type == "paragraph"){
        real_items.push(child);
      } else if(child.type == "list") {
        console.log("Estas frente a una lista, con " + child.items.length + " items");
        real_items.push(child);
        i += child.items.length;
      }
    }

    console.log("These are real_items: " + JSON.stringify(real_items, null, 4));

    this.el.innerHTML = "";

    var ltype = (this.node.ordered) ? "OL" : "UL";
    this.content = document.createElement(ltype);
    this.content.classList.add("content");

    i = 0;

    // dispose existing children views if called multiple times
    for (i; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }

    // create children views
    var children = this.node.getNodes();
    //console.log("children: " + JSON.stringify(children, null, 4));
    //console.log("typeof children: " + typeof children);
    for (i = 0; i < real_items.length; i++) {
      //var child = this.node.document.get(children[i]);
      var child = real_items[i];
      //console.log("This is " + this.node.id +  "'s child:  " + JSON.stringify(child, null, 4));
      var childView = this.viewFactory.createView(child);
      //console.log("This is a childView: " + JSON.stringify(childView, null, 4));

      var listEl;
      if (child instanceof List) {
        listEl = childView.render().el;
      } else {
        listEl = document.createElement("LI");
        listEl.appendChild(childView.render().el);
        //console.log(listEl);
      }
      this.content.appendChild(listEl);
      this.childrenViews.push(childView);
    }

    this.el.appendChild(this.content);
    return this;
	}; // Aquí termina la definición del método render de CustomListView
}; // Aquí termina la definición del prototipo para CustomListView 

CustomListView.Prototype.prototype = ListView.prototype;
CustomListView.prototype = new CustomListView.Prototype();
CustomListView.prototype.constructor = CustomListView;

module.exports = CustomListView;