const allDates = Array.from({ length: 31 }, (_, i) => new Date(2023, 6, i + 1));

function disableDates(datesData) {
  return allDates.filter(
    (date) =>
      !datesData.some(
        (departureDate) =>
          new Date(departureDate).toDateString() === date.toDateString()
      )
  );
}

export default disableDates;
