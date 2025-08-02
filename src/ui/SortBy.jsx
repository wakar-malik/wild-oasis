import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();

  function HandleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }

  const sortBy = searchParam.get("sortBy");

  return <Select options={options} onChange={HandleChange} value={sortBy} />;
}

export default SortBy;
