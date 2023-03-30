import React, { useEffect } from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const CourseForm = (props) => {
  return (
    <form>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        className="form-control"
        value={props.course.title}
        error={props.errors.title}
      ></TextInput>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            onChange={props.onChange}
            className="form-control"
            value={props.course.authorId || ""}
          >
            <option value=""></option>
            {props.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        {props.errors.author && (
          <div className="alert alert-danger">{props.errors.author}</div>
        )}
      </div>

      <TextInput
        id="slug"
        name="slug"
        label="Slug"
        onChange={props.onChange}
        className="form-control"
        value={props.course.slug}
        error={props.errors.slug}
      ></TextInput>

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        className="form-control"
        value={props.course.category}
        error={props.errors.category}
      ></TextInput>

      <button className="btn-primary btn" onClick={props.onSubmit}>
        Add Course
      </button>
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
