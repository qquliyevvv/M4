import React, {  useEffect } from "react";
import "./ListPage.css";
import { connect } from "react-redux";
import { getList, getMovieInfoByImdbID } from "../../state/actions/dataActions";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

function ListPage(props) {
 
  useEffect(()=>{
    const id = props.match.params.id
    console.log(id)
    props.getList(id)
  },[])

    console.log(props);
    return (
      <div className="list-page">
        <Link className="Link" to="/">
          <Header />
        </Link>
          {props.movieDetails.map((item) => {
            return (
                <div className="movie-info">
                  
                          <a
                            href={`https://www.imdb.com/title/${item.imdbID}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.Title}
                          </a>
                        </div>
                       )})}
                </div>)}
const mapDispatchToProps = (dispatch) => ({
  getList: (id) => dispatch(getList(id)),
  getMovieInfoByImdbID: (listMovies) =>
    dispatch(getMovieInfoByImdbID(listMovies)),
});

const mapStateToProps = (state) => {
  return {
    title: state.title,
    movieDetails: state.movieDetails,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
