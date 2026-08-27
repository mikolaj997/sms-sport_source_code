import translations from "./translations";

export function SelectedSport({
  selectedSport,
  setSelectedSport,
  tenisOptionsExtended,
  setTenisOptionsExtended,
  runningOptionsExtended,
  setRunningOptionsExtended,
  cyclingOptionsExtended,
  setCyclingOptionsExtended,
  language,
}) {
  return (
    
  <>
    <select
      autoFocus
      id="sportSelect"
      value={selectedSport}
      onChange={(e) => setSelectedSport(e.target.value)}
    >
      <option value="">
        {translations[language].selectSport}
      </option>

      <option value="Squash">
        {translations[language].squash}
      </option>

      <option value="Tennis, general">
        {translations[language].tennis}
      </option>

      <option value="Table tennis, ping pong">
        {translations[language].tableTennis}
      </option>

      <option value="Badminton">
        {translations[language].badminton}
      </option>

      <option value="Paddleball, competitive">
        {translations[language].padel}
      </option>

      <option value="Running, general">
        {translations[language].running}
      </option>

      <option value="Cycling, 12-13.9mph, moderate">
        {translations[language].cycling}
      </option>
    </select>

    <>
      {selectedSport === "Tennis, general" && (
        <select
          autoFocus
          id="tennisExtendedOptions"
          value={tenisOptionsExtended}
          onChange={(e) => setTenisOptionsExtended(e.target.value)}
        >
          <option value="Tennis, general">
            {translations[language].tennisGeneral}
          </option>

          <option value="Tennis, singles">
            {translations[language].tennisSingles}
          </option>

          <option value="Tennis, doubles">
            {translations[language].tennisDoubles}
          </option>
        </select>
      )}

      {selectedSport === "Cycling, 12-13.9mph, moderate" && (
        <select
          autoFocus
          id="cyclingExtendedOptions"
          value={cyclingOptionsExtended}
          onChange={(e) => setCyclingOptionsExtended(e.target.value)}
        >
          <option value="Cycling, 12-13.9mph, moderate">
            {translations[language].cyclingModerate}
          </option>

          <option value="Cycling, 10-11.9mph, light">
            {translations[language].cyclingLight}
          </option>

          <option value="Cycling, 14-15.9mph, vigorous">
            {translations[language].cyclingVigorous}
          </option>
        </select>
      )}

      {selectedSport === "Running, general" && (
        <select
          autoFocus
          id="runningExtendedOptions"
          value={runningOptionsExtended}
          onChange={(e) => setRunningOptionsExtended(e.target.value)}
        >
          <option value="Running, general">
            {translations[language].runningGeneral}
          </option>

          <option value="Running, 8 mph (7.5 min/mile)">
            {translations[language].runningSlow}
          </option>

          <option value="Running, 10 mph (6 min/mile)">
            {translations[language].runningFast}
          </option>
        </select>
      )}
    </>
  </>

  );
}
