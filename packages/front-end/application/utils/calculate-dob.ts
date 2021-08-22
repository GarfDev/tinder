const calculateAge = (dob: string) => {
  var diffms = Date.now() - new Date(dob).getTime();
  var age_dt = new Date(diffms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

export default calculateAge;
