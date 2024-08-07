export const ForSaleFilter = ({ forSale, setForSale }) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        checked={forSale}
        onChange={() => setForSale(!forSale)}
      />
      <label className="form-check-label">
        For Sale
      </label>
    </div>
  );
};

