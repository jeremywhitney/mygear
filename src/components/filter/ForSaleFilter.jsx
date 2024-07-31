export const ForSaleFilter = ({ forSale, setForSale }) => {
  return (
    <div>
      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={forSale}
          onChange={() => setForSale(!forSale)}
        />
        For Sale
      </label>
    </div>
  );
};
