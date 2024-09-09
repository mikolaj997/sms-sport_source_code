export function SelectedSport({selectedSport, setSelectedSport, tenisOptionsExtended, setTenisOptionsExtended, runningOptionsExtended, setRunningOptionsExtended, cyclingOptionsExtended, setCyclingOptionsExtended}){ 
    return(
        <>
         <select autoFocus id="sportSelect" value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
            <option value="">Wybierz sport</option>
            <option value="Squash">Squash</option>
            <option value="Tennis, general">Tenis</option>
            <option value="Table tennis, ping pong">Tenis stolowy</option>
            <option value="Badminton">Badminton</option>
            <option value="Paddleball, competitive">Padel</option>
            <option value="Running, general">bieganie</option>
            <option value="Cycling, 12-13.9mph, moderate">rower</option>
          </select>
          <>
            {selectedSport === 'Tennis, general' && (
              <select autoFocus id="tennisExtendedOptions" value={tenisOptionsExtended} onChange={(e) => setTenisOptionsExtended(e.target.value)}>
                <option value="Tennis, general">Tennis, ogólnie</option>
                <option value="Tennis, singles">Tennis, singiel</option>
                <option value="Tennis, doubles">Tennis, debel</option>
              </select>)}
            {selectedSport === 'Cycling, 12-13.9mph, moderate' && (
              <select autoFocus id="cyclingExtendedOptions" value={cyclingOptionsExtended} onChange={(e) => setCyclingOptionsExtended(e.target.value)}>
                <option value="Cycling, 12-13.9mph, moderate">Jazda na rowerze, 19.3-22.4km/h</option>
                <option value="Cycling, 10-11.9mph, light">Jazda na rowerze, 16.1-19.2km/h</option>
                <option value="Cycling, 14-15.9mph, vigorous">Jazda na rowerze, 22.5-25.6km/h</option>
              </select>)}
            {selectedSport === 'Running, general' && (
              <select autoFocus id="runningExtendedOptions" value={runningOptionsExtended} onChange={(e) => setRunningOptionsExtended(e.target.value)}>
                <option value="Running, general">Bieganie, ogólnie</option>
                <option value="Running, 8 mph (7.5 min/mile)">Bieganie, 12,9 km/h</option>
                <option value="Running, 10 mph (6 min/mile)">Bieganie, 16,1 km/h</option>
              </select>
            )}
          </>
        </>
    )
}