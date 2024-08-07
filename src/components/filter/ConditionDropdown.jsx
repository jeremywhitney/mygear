export const ConditionDropdown = ({
  conditions = [],
  selectedCondition,
  setSelectedCondition,
}) => {
  return (
    <select
      className="form-select"
      value={selectedCondition}
      onChange={(e) => setSelectedCondition(e.target.value)}
    >
      <option value="">Select a Condition</option>
      {conditions.map((condition) => (
        <option key={condition.id} value={condition.id}>
          {condition.grade}
        </option>
      ))}
    </select>
  );
};

