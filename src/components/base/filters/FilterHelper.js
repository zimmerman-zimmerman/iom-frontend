import find from 'lodash/find';
import sortBy from 'lodash/sortBy';

//Returns sectors, of the specified sectorTypeCode string, where there might be several
//codes seperated by ,
export function getSectors(sectors, sectorTypeCodes){
    const typedSectors = [];

    const codeArray = sectorTypeCodes.split(',');

    codeArray.forEach(code => {
        const sector = find(sectors, sector => sector.sector.code === code);
        if(sector)
        {
            typedSectors.push(sector);
        }
    });

    return typedSectors;
}