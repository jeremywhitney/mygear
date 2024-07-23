export const ConditionDropdown = ({
  conditions,
  selectedCondition,
  setSelectedCondition,
}) => {
  return (
    <select
      className="filter-dropdown"
      value={selectedCondition}
      onChange={(e) => setSelectedCondition(e.target.value)}
    >
      <option value="">Select a Condition</option>
      {conditions.map((condition, index) => (
        <option key={index} value={condition}>
          {condition}
        </option>
      ))}
    </select>
  );
};
