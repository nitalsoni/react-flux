import Dispatcher from "../appDispatcher";
import { EventEmitter } from "events";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((c) => c.slug === slug);
  }

  sortByCategory() {
    _courses = _courses.sort((a, b) => {
      if (a.slug > b.slug) return 1;
      else if (a.slug < b.slug) return -1;
      else return 0;
    });
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((c) => {
        return c.id === action.course.id ? action.course : c;
      });
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(function (c) {
        return c.id !== action.course.id;
      });
      store.emitChange();
      break;
    case actionTypes.SORT_COURSES:
      store.sortByCategory();
      store.emitChange();
      break;
    default:
      break;
  }
});

export default store;
