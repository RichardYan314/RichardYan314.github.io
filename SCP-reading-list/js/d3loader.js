// For MSIE < 9, forget it
function D3notok() {
  document.getElementById('sidepanel').style.visibility = 'hidden';
  var nocontent = document.getElementById('nocontent');
  nocontent.style.visibility = 'visible';
  nocontent.style.pointerEvents = 'all';
  var t = document.getElementsByTagName('body');
  var body = document.getElementsByTagName('body')[0];
  body.style.backgroundImage = "url('movie-network-screenshot-d.png')";
  body.style.backgroundRepeat = "no-repeat";
}

// -------------------------------------------------------------------

// Do the stuff -- to be called after D3.js has loaded
function D3ok() {
  sidebar.init("#sidebar", "#sidebarExpandButton");
  graph.init("#graph");
  
	function adjustSize() {
		var graphContainer = d3.select("#graph"),
        svg = graphContainer.select("svg"),
        height = window.innerHeight,
        width;

		if (sidebar.visible() == false){
      width = window.innerWidth;
    } else {
      width = window.innerWidth - (window.innerWidth * 0.22);
    }

    graphContainer.style("height", height + "px");
		svg.attr("width", width)
			 .attr("height", height);

		//graph.updateStyle();
	}

  d3.select(window).on("resize", adjustSize);
  adjustSize()

} // end of D3ok()

