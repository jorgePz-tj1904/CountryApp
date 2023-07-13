const validateForm = (activityName, difficulty, duration, season, selectedCountry) => {
  const newErrors = {};

  if (activityName.trim() === "") {
    newErrors.activityName = "Name is required";
  }

  if (difficulty === 0) {
    newErrors.difficulty = "Difficulty must be between 0 and 10";
  }

  if (duration == 0) {
    newErrors.duration = "Duration must be between 1 and 24";
  }

  if (!season) {
    newErrors.season = "Season is required";
  }

  if (selectedCountry === 0) {
    newErrors.selectedCountry = "Please select a country";
  }

  return newErrors;
};

export default validateForm;