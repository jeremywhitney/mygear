export const getConditions = async () => {
    const response = await fetch(`http://localhost:8088/conditions`);
    return await response.json();
  };