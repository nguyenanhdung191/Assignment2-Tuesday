const loadJSON = require( "load-json-file" );
const writeJSON = require( "write-json-file" );

const transform = feature => {
	return {
		id : feature.id,
		name : feature.properties.name,
		code : feature.properties.code,
		level : feature.properties.level,
		parent : feature.properties.parent,
		coordinates : JSON.stringify(feature.geometry.coordinates)
	}
};

const regions = [{name: "north", id: "JzKStMojAGA"},
                 {name: "central",id : "SgkhNupCR4x"},
                 {name: "highland", id: "bJ55F4lb3WJ"},
                 {name: "south", id: "T6shP0GyRuQ"}];
                 
loadJSON("./data/vnProv.json")
	.then(json => {
		regions.forEach(region => {
			let filtered = {orgunits : []};
			filtered.orgunits = json.features.filter(feature => {
					if(feature.properties.parent === region.id){
						return true;
					}else{ return false };
			}).map(orgUnit => {
				return transform(orgUnit);
			});
			writeJSON.sync(`./data/${region.name}region.json`,filtered,null);
		});
	})