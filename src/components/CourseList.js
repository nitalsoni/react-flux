import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList({ authors, courses, onDelete }) {
  const getAuthorName = (id) => {
    let match = authors.find((author) => author.id === id);
    debugger;
    return match?.name;
  };

  const renderCourseRow = (c) => {
    return (
      <tr key={c.id}>
        <td>
          <Link to={"/course/" + c.slug}>{c.title}</Link>
        </td>
        <td>{getAuthorName(c.authorId)}</td>
        <td>{c.category}</td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(c)}>
            DELETE
          </button>
        </td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author Name</th>
          <th>Category</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{courses.map(renderCourseRow)}</tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// CourseList.defaultProps = {
//   courses: [],
// };

export default CourseList;
