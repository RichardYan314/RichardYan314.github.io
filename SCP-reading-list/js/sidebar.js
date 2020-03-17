var sidebar = {};

(function () {
  /* Compose the content for the panel with movie details.
     Parameters: the node data, and the array containing all nodes
  */
  function getMovieInfo( n, nodeArray ) {
    info = "";
    
    info += "<div>";
    if (n.clazz === "scp" || n.clazz === "doc") {
      info += "<a href=\"http://www.scp-wiki.net/" + n.label +"\">"
      info += n.label + (n.name ? (" - " + n.name) : "");
      info += "</a>";
    } else {
      info += n.label;
    }
    info += "</div>";
    
    if (n.refer && n.refer.length) {
      info += "<div>";
      info += "<p>Refers to</p>";
      info += "<ol>"
      n.refer.forEach((item, _) => {
        info += "<li onclick=\"graph.clearAndSelect(\'" + item + "\')\">" + item + "</li>";
      })
      info += "</ol>"
      info += "</div>";
    }
    
    if (n.seeAlso && n.seeAlso.length) {
      info += "<div>";
      info += "<p>See Also</p>";
      info += "<ol>"
      n.seeAlso.forEach((item, _) => {
        info += "<li onclick=\"graph.clearAndSelect(\'" + item + "\')\">" + item + "</li>";
      })
      info += "</ol>"
      info += "</div>";
    }
    
    if (n.personnel && n.personnel.length) {
      info += "<div>";
      info += "<p>Personnel</p>";
      info += "<ol>"
      n.personnel.forEach((item, _) => {
        info += "<li onclick=\"graph.clearAndSelect(\'" + item + "\')\">" + item + "</li>";
      })
      info += "</ol>"
      info += "</div>";
    }
    return info;
  }

  var canvasArea;
  
  sidebar.show = function (show) {
    sidebar.expandButton.node().innerHTML= show ? ">" : "<";
    sidebar.sidebar.classed("hidden", !show);
    canvasArea.style("width", show ? "78%" : "100%");
  }

  /* --------------------------------------------------------------------- */
  /* Show the movie details panel for a given node
   */
  sidebar.showNode = function ( node ) {
    // Fill it and display the panel
    sidebar.sidebar
      .html( getMovieInfo(node ) )
      .attr("class","panel_on");
    sidebar.show(true);
  }
  
  sidebar.visible = function() {
    return sidebar.sidebar.classed("hidden") === false;
  }
  
  sidebar.init = function (sidebarSelector, sidebarExpandButtonSelector) {
    canvasArea = d3.select("#canvasArea");
    
    // Movie panel: the div into which the movie details info will be written
    sidebar.sidebar = d3.select(sidebarSelector);
    sidebar.expandButton = d3.select(sidebarExpandButtonSelector);
    
    sidebar.expandButton.on("click",function(){
      var visible = sidebar.visible();
      if (visible) sidebar.show(false);
      else         sidebar.show(true);
    });
    
    sidebar.show(false);
  }
})();