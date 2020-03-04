import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { usePagination } from "./paginationhook";
import "bootstrap/dist/css/bootstrap.min.css";
import Paginator from "./Paginator";

function App() {

  const [isInitialized, setIsInitialized] = useState(false);
  const {
    isPaginating,
    currentPage,
    setCurrentPage,
    pageItems,
    setItemList,
    totalPages
  } = usePagination([]);

  const numbers = [];

  if (!isInitialized) {
    for (let i = 0; i < 100; i++)
    {
      numbers.push(i);
    }

    setItemList(numbers);

    setIsInitialized(true);
  }

  let content = pageItems.map( (val) => {
    return (
      <Row className="justify-content-md-center" style={{marginTop : "10px"}}>
        <Col>{val}</Col>
      </Row>
    );
  });
  

  return (
    <Container>
      {content}
      {isPaginating &&
      <Paginator totalPages={totalPages}
                 currentPage={currentPage}
                 changePageHandler={setCurrentPage}/>
      }
    </Container>
  );
}

export default App;
