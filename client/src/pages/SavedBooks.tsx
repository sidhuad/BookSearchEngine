import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { REMOVE_BOOK } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import type { User } from "../models/User";
import { useMutation, useQuery } from "@apollo/client";

const SavedBooks = () => {
  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    password: "",
    saveBooks: [],
  });

  const [removeBook] = useMutation(REMOVE_BOOK);

  const { data} = useQuery(QUERY_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${Auth.loggedIn() ? Auth.getToken() : ""}`,
      },
    },
  });

  // if (loading) return <h2>Loading ...</h2>; add loading to query and uncomment this and see your books will stop working

 
  useEffect(()=>{
    if (data && data.me) {
      setUserData(data.me);
    }
  },[data])

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({ variables: { bookId },
      refetchQueries: [
        {
          query: QUERY_ME,
          context: {
            headers: {
              Authorization: `Bearer ${Auth.loggedIn()? Auth.getToken():""}`,
            }
          }
        }
      ]
      });

      if (data) {
        removeBookId(bookId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.saveBooks.length
            ? `Viewing ${userData.saveBooks.length} saved ${
                userData.saveBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.saveBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
