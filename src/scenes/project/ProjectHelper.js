
//DAC SECTORS are where vocabulary code === 1
//Service area(at least in this context) are where vocabulary code === 98
//Project type (at least in this context) are where vocabulary code === 99
export function formatSectors(sectors, code) {
  const dacSectors = [];
  sectors.forEach(sector => {

    if(sector.vocabulary.code === code)
    {
      dacSectors.push({
        name: sector.sector.name,
        url: `/services/${sector.sector.code}`
      });
    }
  });

  return dacSectors;
}