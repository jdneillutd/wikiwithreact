'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var searchLimit = 10;

/*
class SearchButton extends React.Component {
  render(){
    return(
      <button>Search</button>
    );
  }
}
*/
/*
class SearchField extends React.Component {
  render(){
    return(
      <input></input>
    );
  }
}
*/
/*
class SearchPanel extends React.Component {
  render(){
    return(
      <SearchField /> <SearchButton />
    );
  }
}
*/

var SearchPanel = function (_React$Component) {
  _inherits(SearchPanel, _React$Component);

  function SearchPanel(props) {
    _classCallCheck(this, SearchPanel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleSearch = _this.handleSearch.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = { defaultEntry: 'Search Here!',
      query: ''
    };
    return _this;
  }

  SearchPanel.prototype.render = function render() {
    return React.createElement(
      'div',
      { classname: 'searchPanel', style: {} },
      React.createElement(
        'a',
        { href: 'https://en.wikipedia.org/wiki/Special:Random' },
        'View a Random Article'
      ),
      React.createElement('br', null),
      React.createElement('input', { classname: 'searchField', value: this.state.query, placeholder: 'Search Here!', onKeyPress: this.handleKeyPress, onChange: this.handleChange }),
      React.createElement(
        'button',
        { classname: 'searchButton', onClick: this.handleSearch },
        'Search!'
      ),
      React.createElement(Result, { resultSet: this.state.resultSet })
    );
  };

  SearchPanel.prototype.handleSearch = function handleSearch() {
    var _this2 = this;

    var searchURL;
    this.setState({ resultSet: null });
    console.log('searching');
    console.log(this.state.query);
    console.log('why can i not pass this');
    //get url to query wikipedia
    searchURL = encodeURI("https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=" + searchLimit + "&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + this.state.query);
    console.log(searchURL);
    //get json from wikipedia
    fetch(searchURL).then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      //console.log(responseJson);
      _this2.setState({ resultSet: responseJson });
    }).catch(function (error) {
      console.error(error);
    });
  };

  SearchPanel.prototype.handleKeyPress = function handleKeyPress(target) {
    if (target.charCode == 13) {
      console.log('search entered');
      this.handleSearch();
    }
  };

  SearchPanel.prototype.handleChange = function handleChange(event) {
    this.setState({ query: event.target.value });
  };

  return SearchPanel;
}(React.Component);

function Result(props) {
  var articles;
  var articleDisplay;
  var attempt;
  if (!props.resultSet) {
    return null;
  } else {
    articles = props.resultSet;
    console.log(articles.query.pages);
    var key = Object.keys(articles.query.pages);
    var info = [key.length];
    console.log(key);
    for (var i = 0; i < key.length; i++) {
      var extrct = articles.query.pages[key[i]].extract;
      var title = articles.query.pages[key[i]].title;
      var pageID = articles.query.pages[key[i]].pageid;
      var sURL = "https://en.wikipedia.org/?curid=" + pageID;
      info[i] = React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          null,
          React.createElement(
            'a',
            { href: sURL },
            title
          )
        ),
        React.createElement(
          'span',
          null,
          React.createElement(
            'p',
            null,
            extrct
          )
        )
      );
    };
    /*
    return (
      <div>
        <span><a href="https://en.wikipedia.org/?curid=" + {pageID}>{title}</a></span>
        <span><p>{extrct}</p></span>
      </div>
    );
    */
  };

  //    console.log(props.resultSet[0,0]);
  return React.createElement(
    'div',
    null,
    info.map(function (listing) {
      return listing;
    })
  )
  /*
  <div>
  <p>{this.props.resultSet}</p>
  
   </div>
  */
  ;
}

ReactDOM.render(React.createElement(SearchPanel, null), document.getElementById('root'));