## Pagination Hook

### Introduction

This code presents a custom react hook to do pagination in a simple way. This is required for a lot of projects that loads a long list, and presents it on a table or some other custom manner.

The objective is to create a reusable piece of code that can apply to many of the situations.

This is a simple project created using create-react-app, just to serve as a reference. It's free to copy and apply to your own needs.

More details about the code can be found in the article: [Custom React hook for pagination](https://medium.com/@marcos.deaguiar/custom-react-hook-for-pagination-81d55d5b1e75)

### Usage example

```typescript
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
```

This snipet illustrates how to use the hook.
The usePagination function has 2 parameters. The list that will be paged, and a the size of the page (default to 10, this is why it's not there in the code).

Once usePagination is called, it returns the variables:
- isPaginating: Boolean value that is set to true if the number of items in the list exceeds the total items per page. It's useful to hide (or not render) paginator components (as can be seen in the example).
- currentPage: The number of the page that is currently selected.
- setCurrentPage: Function that receives the number of the page. When this function is called, currentPage is updated to the selected page, and the pageItems list is also updated with the data belonging to the selected page.
- pageItems: List of the items belonging to the page. It is the data that will be shown in the page.
- setItemList: Function that is used to update the list that is being paged. The complete list is set on this function, and only a "page" of this list is available on the pageItems.
- totalPages: Total number of pages so this information can be displayed to the user.

## Paginator component

In the code there is also an example of how to do a basic paginator component that is used together with the pagination hook.