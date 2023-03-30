import * as authorApi from "../api/authorApi";
import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

export function LoadAuthors() {
  return authorApi.getAuthors().then((authors) => {
    dispatcher.dispatch({
      actionTypes: actionTypes.LOAD_AUTHORS,
      authors: authors,
    });
  });
}
