var React = require('react');

var SearchBox = React.createClass({

	searchAll: function(e) {
		var element = document.getElementById('options');
		var selectedValue = element.options[element.selectedIndex].value;
        var that = this;
        var searchQuery = this.refs.inpText.value.toLowerCase().trim();

        function searchingBy(search) {
        	var displayedUsers = that.props.info.filter(function(user) {
	            var searchString = user.props.children[1][search].toLowerCase();
			            return searchString.indexOf(searchQuery) !== -1;
		        });
	        var displayedUsersLi = displayedUsers.map(function(item) {
	            return (<li onClick={that.props.click} key={item.props.children[1].id} id={item.props.children[1].id}> {item.props.children[1].name} </li>)
	        });
	        that.props.changeList(displayedUsersLi);
        }
// ---------------search by Name Block-----------------------------------------------
        if(selectedValue == 'name') searchingBy('name');

// ---------------search by Username Block-----------------------------------------------
        if(selectedValue == 'username') searchingBy('username');
// --------------------------------------------------------------------------------------

// ---------------search by Email Block-----------------------------------------------
        if(selectedValue == 'email') searchingBy('email');
// --------------------------------------------------------------------------------------

// ---------------search by All Block-----------------------------------------------
		if(selectedValue == 'all') {
        	var displayedUsers = this.props.info.filter(function(user) {
	            var searchString = user.props.children[1].name.toLowerCase() + user.props.children[1].username.toLowerCase() + user.props.children[1].email.toLowerCase();
			            return searchString.indexOf(searchQuery) !== -1;
		        });
        	var displayedUsersLi = displayedUsers.map(function(item) {
	            return (<li onClick={that.props.click} key={item.props.children[1].id} id={item.props.children[1].id}> {item.props.children[1].name} </li>)
	        });
	        that.props.changeList(displayedUsersLi);
		}
    },

    sortAZ: function() {
		var element = document.getElementById('sort');
		var selectedValue = element.options[element.selectedIndex].value;
    	var that = this;

		var mapObj = this.props.currentList.map(function(item) {
			var currentId = item.props.id;
			var objId = that.props.info.filter(function(elem) {
					if (currentId == elem.props.children[1].id) {
					return elem.props.children[1];
				};
			});
			return objId;
		});

    	function sortingAZ(sort, dot) {
    		var dots = dot || false;
    		if (dots) {
				var soretedCompany = mapObj.sort(function(a,b) {
					if(a[0].props.children[1][sort][dots] > b[0].props.children[1][sort][dots]) return 1;
				});
    		} else {
				var soretedCompany = mapObj.sort(function(a,b) {
					if(a[0].props.children[1][sort] > b[0].props.children[1][sort]) return 1;
				});
    		}
			var sortedLi = soretedCompany.map(function(item) {
	    		return (<li onClick={that.props.click} key={item[0].props.children[1].id} id={item[0].props.children[1].id}> {item[0].props.children[1].name} </li>)
	    	});
	    	that.props.changeList(sortedLi);
    	}

// -------Sort by Name Block-----------------------------------------------
		if (selectedValue == 'name') sortingAZ('name');

// ---------------Sort by Username Block-----------------------------------------------
		if (selectedValue == 'username') sortingAZ('username');
// ---------------Sort by Email Block-----------------------------------------------
		if (selectedValue == 'email') sortingAZ('email');
// ---------------Sort by Address Block-----------------------------------------------
		if (selectedValue == 'address') sortingAZ('address','street');
// ---------------Sort by Company Block-----------------------------------------------
		if (selectedValue == 'company') sortingAZ('company','name');
    },

    sortZA: function() {
    	var element = document.getElementById('sort');
		var selectedValue = element.options[element.selectedIndex].value;
    	var that = this;

		var mapObj = this.props.currentList.map(function(item) {
			var currentId = item.props.id;
			var objId = that.props.info.filter(function(elem) {
					if (currentId == elem.props.children[1].id) {
					return elem.props.children[1];
				};
			});
			return objId;
		});

    	function sortingZA(sort, dot) {
    		var dots = dot || false;
    		if (dots) {
				var soretedCompany = mapObj.sort(function(a,b) {
					if(a[0].props.children[1][sort][dots] < b[0].props.children[1][sort][dots]) return 1;
				});
    		} else {
				var soretedCompany = mapObj.sort(function(a,b) {
					if(a[0].props.children[1][sort] < b[0].props.children[1][sort]) return 1;
				});
    		}
			var sortedLi = soretedCompany.map(function(item) {
	    		return (<li onClick={that.props.click} key={item[0].props.children[1].id} id={item[0].props.children[1].id}> {item[0].props.children[1].name} </li>)
	    	});
	    	that.props.changeList(sortedLi);
    	}

// ---------------Sort by Name Block-----------------------------------------------
		if (selectedValue == 'name') sortingZA('name');

// ---------------Sort by Username Block-----------------------------------------------
		if (selectedValue == 'username') sortingZA('username');

// ---------------Sort by Email Block-----------------------------------------------
		if (selectedValue == 'email') sortingZA('email');

// ---------------Sort by Address Block-----------------------------------------------
		if (selectedValue == 'address') sortingZA('address', 'street');

// ---------------Sort by Company Block-----------------------------------------------
		if (selectedValue == 'company') sortingZA('company', 'name');
    },

    router: function() {
    	var that = this;
    	if(document.getElementById('az').checked) {
    		that.sortAZ();
    	} else if (document.getElementById('za').checked) {
    		that.sortZA();
    	}
    },



	render: function() {
		var that = this;
		return (<fieldset>
			<legend>Search By:
				<select onChange={this.searchAll} id="options">
					<option value="all">All</option>
					<option value="name">Name</option>
					<option value="username">Username</option>
					<option value="email">Email</option>
				</select>
			</legend>
			<input type="text" ref="inpText" onChange={this.searchAll} placeholder="search by name, username, email"/>
			<legend> Sort By:
					<select id="sort" onChange={this.router}>
						<option value="name">Name</option>
						<option value="username">Username</option>
						<option value="email">Email</option>
						<option value="address">Address(street)</option>
						<option value="company">Company(name)</option>
					</select>
				</legend>
			<div>
				<label><input type="radio" id="az" name='sort' value='a-z' onClick={this.sortAZ}/>A-Z</label>
				<label><input type="radio" id="za" name='sort' value='z-a' onClick={this.sortZA}/>Z-A</label>
				<label><input type="radio" name='sort' value='cancel' onClick={this.searchAll}/>Cancel</label>
			</div>
				</fieldset>);
	}
});

module.exports = SearchBox;
