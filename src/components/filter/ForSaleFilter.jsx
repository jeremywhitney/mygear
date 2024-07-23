export const ForSaleFilter = ({ showForSale, setShowForSale }) => {
  return (
    <div>
      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={showForSale}
          onChange={() => setShowForSale(!showForSale)}
        />
        For Sale
      </label>
    </div>
  );
};
