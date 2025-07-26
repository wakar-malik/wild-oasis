import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "./Button";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "true" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.1s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParam, setSearchParam] = useSearchParams();

  function filterHandler(value) {
    setSearchParam({ [filterField]: value });
  }

  const searchTerm = searchParam.get("discount");

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => filterHandler(option.value)}
          active={`${searchTerm === option.value}`}
          key={option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
