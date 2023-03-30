import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function LoadCourses() {
  return courseApi.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
}

export function DeleteCourse(course) {
  return courseApi.deleteCourse(course.id).then((resp) => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      course: course,
    });
  });
}

export function SortByCategory() {
  dispatcher.dispatch({
    actionType: actionTypes.SORT_COURSES,
    course: null,
  });
}
