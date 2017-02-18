var React = require('react');
var ReactDOM = require('react-dom');
var Bootstrap = require('react-bootstrap');
require('./css/index.css');
// require('./css/bootstrap.css');
// var axios = require('axios');

// Module requires
var Info = require('./info');
var SearchBox = require('./searchBox');

// --------------------------------------------------------------------------
var Example = React.createClass({
 	
 	getInitialState: function() {
 		return {
 			listNames: [],
 			userInfo: [],
            info: []
 		}
 	},
 	componentDidMount: function() {
 		// var that = this;
 		// this.serverRequest = axios.get(this.props.source).then(function(result){
 		// 		// var data = JSON.parse(result);
 		// 		that.setState({
 		// 			listNames: result
 		// 		});
 		// 	});
 		var that = this;
 		var request = new XMLHttpRequest();
        request.open('GET', 'https://jsonplaceholder.typicode.com/users', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                var getName = data.map(function(item) {
                    return ( <li onClick={that.clicked} key={item.id} id={item.id}> {item.name} </li>);
                }); 
                var getInfo = data.map(function(item) {
                    return ( <li> {item} </li>);
                });
                that.setState({
                	listNames: getName,
                	info: getInfo
                });
            }
        };
        request.send();
 		
 	},

    clicked: function(e) {
    	var that = this;
        // ---------------visualisation of clicking-------------
            var activeLi = e.target;
            var listLi = document.querySelectorAll(".list ul li");
            listLi.forEach(function(li) {
                if(li.classList.contains('active')) {
                    li.classList.remove('active');
                }
            });
            if (activeLi.classList.contains('active')) {
                return;
            } else {
                activeLi.classList.add('active');
            }
        // ---------------------------------------------------------
    	// filtered array, choosing clicked object---------------
    	var listId = e.target.id;
    	function idFunc(item) {
            if(item.props.children[1].id == listId) {
    			return item;
    		} else {
    			return false;
    		};
    	}
    	var filtArray = this.state.info.filter(idFunc);
    	// ------------------------------------------------------
        var objInfo = filtArray[0].props.children[1];
        function cloneObject(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }
            var temp = obj.constructor(); // give temp the original obj's constructor
            for (var key in obj) {
                temp[key] = cloneObject(obj[key]);
            }
         
            return temp;
        }
        var objInfoCopy = (cloneObject(objInfo));
        delete objInfoCopy.id;
        delete objInfoCopy.name;

        var objRender = function(obj) {
            var nstObj = [];
            var nstObjKeysArray = [];
            for (var prop in obj) {
                    nstObj.push(obj[prop]); 
                    nstObjKeysArray.push(prop); 
                }
             var nstObjProps = nstObj.map(function(elem, i) {
                if(typeof elem === 'object') {
                    return (<li className={'nested-list-'+i}><span>{nstObjKeysArray[i]}</span> : <button onClick={that.clickedButton}>Show details</button><ul>{objRender(elem)}</ul></li>);
                    }
                    return <li><span>{nstObjKeysArray[i]}</span> : {elem}</li>
                }); 
             return nstObjProps;
        }
        
    	this.setState({
                	userInfo: objRender(objInfoCopy)
                });
    },

    clickedButton: function(e) {
    	var button = e.target;
    	var parentLi = button.parentNode;
    	parentLi.childNodes[5].classList.toggle('clicked-ul');
    },

    changeList: function(str) {
        this.setState({
            listNames: str
        });
    },

    render: function() {
        var that = this;
        return (
        	<div>
	        	 <div className = "list">
	        	 	<h1>List of employees</h1>
                    <SearchBox changeList={this.changeList} currentList={this.state.listNames} info={this.state.info} click={this.clicked}/>
	            	<ul>{this.state.listNames}</ul>
	            </div>
            	<Info userInfo={this.state.userInfo}/>
            </div>
        );
    },
});

ReactDOM.render( <Example /> , document.getElementById("app"));
