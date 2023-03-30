import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import * as courseAction from "../actions/courseActions";
import * as authorAction from "../actions/authorActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    if (courseStore.getCourses().length === 0) courseAction.LoadCourses();
    return () => courseStore.removeChangeListener(onChange); //unmount the component
  }, []);

  //preload Authors
  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0) {
      authorAction.LoadAuthors();
    }
  }, [authorStore.getAuthors().length]);

  function onChange() {
    setCourses([...courseStore.getCourses()]);
  }

  const onAuthorChange = (authors) => {
    setAuthors([...authorStore.getAuthors()]);
  };

  const onDelete = (course) => {
    courseAction.DeleteCourse(course);
  };

  function sortByCategory() {
    courseAction.SortByCategory();
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course/">
        Add Course
      </Link>
      <button className="btn btn-info" onClick={sortByCategory}>
        Sort by category
      </button>

      <CourseList
        courses={courses}
        authors={authors}
        onDelete={onDelete}
      ></CourseList>
    </>
  );
}
export default CoursesPage;
