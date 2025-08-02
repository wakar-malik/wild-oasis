import Filter from "../../ui/Filter";
import SortBy from "../../ui/sortBy";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No Discount" },
  { value: "with-discount", label: "With Discount" },
];

const sortOptions = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-des", label: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price (low- first)" },
  { value: "regularPrice-des", label: "Sort by price (high first)" },
  { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { value: "maxCapacity-des", label: "Sort by capacity (high first)" },
];

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={filterOptions} />

      <SortBy filterField="sort" options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
