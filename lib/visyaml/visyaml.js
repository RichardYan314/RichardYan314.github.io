import '../js-yaml/3.13.1/js-yaml.js';
// vis does not support es6 import
//import '../vis/4.21.0/vis.min.js';

var nextId = 0;

function visyaml (yaml, container) {
  var div = document.createElement("div");
  container.after(div);
  container.parentNode.removeChild(container);
  
  div.style['backgroundColor'] = 'white';
  container = div;
  
  var doc = jsyaml.load(yaml);
  console.log(doc);
  
  var nodes = [], edges = [];
  
  toTree(doc, nodes, edges);
  
  var data = {nodes: nodes, edges: edges};
  console.log(data);

  var options = {
      autoResize: true,
      layout: {
          hierarchical: {
              sortMethod: "directed",
              direction: "UD"
          }
      },
      nodes: {
        borderWidth: 0,
        //this seems to affect edges
        //color: "transparent",
        shape: "box",
        color: {
          border: "black",
          background: "white"
        },
        font: {
          color: "black",
          size: 20
        }
      },
      edges: {
        color: "black",
      },
      interaction: {
        dragNodes: false,
        selectable: false,
		zoomView: false
      }
  };
  var network = new vis.Network(container, data, options);
  
  function setSize () {
    var width = div.currentStyle ?
                div.currentStyle['width'] :
                getComputedStyle(div)['width'];
    network.setSize(width, parseFloat(width)/800*500+"px");
    network.redraw();
  }
  
  setSize();
  window.addEventListener('resize', () => setSize());
}

function toTree(doc, nodes, edges) {
  var thisId;
  if (doc instanceof Array) {
    thisId = []
    for (let idx in doc) {
      thisId.push(toTree(doc[idx], nodes, edges));
    }
  } else if (doc instanceof Object) {
    thisId = nextId++;
    for (let node in doc) {
      var child = doc[node];
      nodes.push({
        id: thisId,
        label: String(node)
      });
      var childIds = toTree(child, nodes, edges);
      
      if (!(childIds instanceof Array)) childIds = [childIds];
      
      for (let idx in childIds) {
        var childId = childIds[idx];
        edges.push({
          from: thisId,
          to: childId
        });
      }
    }
  } else {
    thisId = nextId++;
    nodes.push({
      id: thisId,
      label: String(doc)
    });
  }
    
  return thisId;
}

function renderAll() {
  let viscss=document.createElement("link");
  viscss.setAttribute("rel","stylesheet");
  viscss.setAttribute("href","/lib/vis/4.21.0/vis.min.css");
  document.body.appendChild(viscss);

  // vis does not support es6 import
  let vis=document.createElement("script");
  vis.setAttribute("type","text/javascript");
  vis.setAttribute("src","/lib/vis/4.21.0/vis.min.js");
  document.body.appendChild(vis);
  
  vis.addEventListener('load', () => {
    document.querySelectorAll('pre.visyaml').forEach(block => visyaml(block.firstChild.textContent, block));
  });
}

window.addEventListener("load", renderAll);