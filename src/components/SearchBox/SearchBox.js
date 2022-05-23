import React, { Component } from "react";
import "./SearchBox.css";
import { addMovies } from "../../redux/actions";
import { connect } from "react-redux";

class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };

  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    let searchText = this.state.searchLine;
    const key = "d3496eed";
    fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=${key}`)
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch(addMovies(data.Search));
      });
  };

  render() {
    const { searchLine } = this.state;
    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Filmin Adını Daxil edin
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
          >
            Axtar
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(SearchBox);
