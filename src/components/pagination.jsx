/* eslint-disable react/prop-types */

function Pagination({ cardsPerPage, totalCards, currentPage, paginate }) {
  const pageNumber = [];

  const nextPage = () => {
    if (currentPage !== Math.ceil(totalCards / cardsPerPage))
      paginate(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage !== 1) paginate(currentPage - 1);
  };

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="mt-4 pt-3 border-t-2 border-neutral-500 text-sm flex items-center justify-between">
      <ul className="italic flex items-center ml-auto">
        <p
          onClick={previousPage}
          className={`${
            currentPage === 1
              ? "bg-shades-100 cursor-not-allowed"
              : "bg-white cursor-pointer hover:bg-primary hover:bg-opacity-50"
          } py-2 px-4 border rounded`}
        >
          Previous
        </p>
        {pageNumber.map((number) => {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={`${
                number === currentPage
                  ? "bg-primary text-white bg-opacity-70"
                  : ""
              } py-2 px-4 cursor-pointer font-semibold`}
            >
              {number}
            </li>
          );
        })}
        <p
          onClick={nextPage}
          className={`${
            currentPage === Math.ceil(totalCards / cardsPerPage)
              ? "bg-shades-100 cursor-not-allowed"
              : "bg-white cursor-pointer hover:bg-primary hover:bg-opacity-50"
          } py-2 px-4 border rounded`}
        >
          Next
        </p>
      </ul>
    </nav>
  );
}

export default Pagination;
