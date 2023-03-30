import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import { toast } from "react-toastify";
import * as courseAction from "../actions/courseActions";
import * as authorAction from "../actions/authorActions";

const ManageCoursePage = (props) => {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) {
      courseAction.LoadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
  }, [courseStore.getCourses().length, props.match.params.slug]);

  //preload Authors
  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0) {
      authorAction.LoadAuthors();
    }
  }, [authorStore.getAuthors().length]);

  const onChange = (courses) => {
    setCourses(courseStore.getCourses());
  };

  const onAuthorChange = (authors) => {
    setAuthors(authorStore.getAuthors());
    console.log("authors received");
    console.log(authorStore.getAuthors());
  };

  const handleChange = ({ target }) => {
    const updatedCourse = { ...course };
    updatedCourse[target.name] = target.value;
    setCourse(updatedCourse);
  };

  const formIsValid = () => {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.author = "Author is required";
    if (!course.slug) _errors.slug = "Slug is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;

    courseAction.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("New course saved successfully !!!");
    });
  };

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      ></CourseForm>
    </>
  );
};

export default ManageCoursePage;

{
  /* <Prompt when={true} message="Do you want to leave this page?"></Prompt> */
}
