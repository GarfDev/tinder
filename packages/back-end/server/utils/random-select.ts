const randomSelect = <T = any>(arr: T[]): T => {
  const randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
};

export default randomSelect;
