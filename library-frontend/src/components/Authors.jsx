import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors{
    id
    name
    born
    bookCount
    }
  }
`;

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  });

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading authors...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>{`${error.name}: ${error.message}`}</div>
    );
  }

  const authors = data.allAuthors;
  console.log(authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
