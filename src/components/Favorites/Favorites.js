import React, { useEffect, useState } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import {
  removeMovieFromFavoriteList,
  postList,
} from "../../state/actions/dataActions";
import { Link } from "react-router-dom";

function Favorites(props) {
  const [state, setState] = useState({
    isSbm: false,
    title: "",
    disabled: false
  });

  useEffect(() => {
    if (state.disabled === false || (state.title.length) || !(getImdbIDArray().length == 0)) {
      if (!state.title.length || getImdbIDArray().length == 0) {
        setState(prev => ({ ...prev, disabled: true }))
      }
      else {
        setState(prev => ({ ...prev, disabled: false }))
      }
    }
  }, [state.disabled])
  const favoriteChange = (e) => {
    setState({ title: e.target.value });
  };
  const getImdbIDArray = () => {
    let favoritesIDArray = props.favoriteList.map((item) => {
      return item.imdbID;
    });
    return favoritesIDArray;
  };
  const saveListHandler = () => {
    if (!state.title.length || getImdbIDArray().length == 0) {
      setState(prev => ({ ...prev, disabled: true }));

    }
    else if (getImdbIDArray().length >= 0) {
      setState(prev => ({ ...prev, isSbm: true }));
      props.postList(state.title, getImdbIDArray());
    }
  };
  const { title, isSbm } = state;
  return (
    <div className="fav-container">
      <input
        placeholder="Новый список"
        value={title}
        className="fav_name"
        onChange={favoriteChange}
        disabled={state.isSbm}
      />
      <ul className="fav_list">
        {props.favoriteList.map((item) => {
          return (
            <li key={item.imdbID}>
              <div className="block">
                <p className="movie-name">
                  {item.Title} ({item.Year})
                </p>
                <button
                  title="Remove"
                  className="remove-fav-movie"
                  onClick={() => props.removeMovieFromFavoriteList(item.imdbID)}
                >
                  ✖
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {!isSbm ? (
        <button
          type="button"
          className={state.disabled ? "fav_save" : "fav_save black"}
          onClick={saveListHandler}
        >
          Сохранить список
        </button>
      ) : (
        <Link
          target="_blank"
          className="link-to__list"
        >
          <a href={"/list/" + props.listID}> Перейти ко списку</a>
        </Link>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    favoriteList: state.favoriteList,
    favoritesIDArray: state.favoritesIDArray,
    listID: state.listID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovieFromFavoriteList: (id) => {
      dispatch(removeMovieFromFavoriteList(id));
    },
    postList: (title, favoritesIDArray) => {
      dispatch(postList(title, favoritesIDArray));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
