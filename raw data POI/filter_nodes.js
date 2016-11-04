var fs =  require('fs'),
	_ = require('lodash'),
	json2csv = require('json2csv')

var area = 'area4'
var path = 'filtered-poi-'+area+'.json'
var data = JSON.parse(fs.readFileSync(path));

data = data.filter(function(node){
	if(node.tags){ return true }
})

var statistics = {}

var toRemove = []

data.forEach(function(node,i){
	if(node.tags.amenity){
		node.keyType = 'amenity'
		node.keyValue = node.tags.amenity
		if (!statistics.amenity) {
			statistics.amenity = 1
		} else {
			statistics.amenity++
		}
	} else if(node.tags.healthcare) {
		node.keyType = 'healthcare'
		node.keyValue = node.tags.healthcare
		if (!statistics.healthcare) {
			statistics.healthcare = 1
		} else {
			statistics.healthcare++
		}
	} else if(node.tags.barrier) {
		node.keyType = 'barrier'
		node.keyValue = node.tags.barrier
		if (!statistics.barrier) {
			statistics.barrier = 1
		} else {
			statistics.barrier++
		}
	} else if(node.tags.craft) {
		node.keyType = 'craft'
		node.keyValue = node.tags.craft
		if (!statistics.craft) {
			statistics.craft = 1
		} else {
			statistics.craft++
		}
	} else if(node.tags.emergency) {
		node.keyType = 'emergency'
		node.keyValue = node.tags.emergency
		if (!statistics.emergency) {
			statistics.emergency = 1
		} else {
			statistics.emergency++
		}
	} else if(node.tags.highway) {
		node.keyType = 'highway'
		node.keyValue = node.tags.highway
		if (!statistics.highway) {
			statistics.highway = 1
		} else {
			statistics.highway++
		}
	} else if(node.tags.historic) {
		node.keyType = 'historic'
		node.keyValue = node.tags.historic
		if (!statistics.historic) {
			statistics.historic = 1
		} else {
			statistics.historic++
		}
	} else if(node.tags.leisure) {
		node.keyType = 'leisure'
		node.keyValue = node.tags.leisure
		if (!statistics.leisure) {
			statistics.leisure = 1
		} else {
			statistics.leisure++
		}
	} else if(node.tags.man_made) {
		node.keyType = 'man_made'
		node.keyValue = node.tags.man_made
		if (!statistics.man_made) {
			statistics.man_made = 1
		} else {
			statistics.man_made++
		}
	} else if(node.tags.military) {
		node.keyType = 'military'
		node.keyValue = node.tags.military
		if (!statistics.military) {
			statistics.military = 1
		} else {
			statistics.military++
		}
	} else if(node.tags.natural) {
		node.keyType = 'natural'
		node.keyValue = node.tags.natural
		if (!statistics.natural) {
			statistics.natural = 1
		} else {
			statistics.natural++
		}
	} else if(node.tags.office) {
		node.keyType = 'office'
		node.keyValue = node.tags.office
		if (!statistics.office) {
			statistics.office = 1
		} else {
			statistics.office++
		}
	} else if(node.tags.power) {
		node.keyType = 'power'
		node.keyValue = node.tags.power
		if (!statistics.power) {
			statistics.power = 1
		} else {
			statistics.power++
		}
	} else if(node.tags.railway) {
		node.keyType = 'railway'
		node.keyValue = node.tags.railway
		if (!statistics.railway) {
			statistics.railway = 1
		} else {
			statistics.railway++
		}
	} else {
		toRemove.push(i)
	}
	delete node.tags
})


_.forEachRight(toRemove, function(i){
	data.splice(i,1)
})

path = 'tags-'+path

//saving jsons

fs.writeFileSync(path,JSON.stringify(data,null,2))
fs.writeFileSync('statistics-'+area+'.json',JSON.stringify(statistics,null,2))


//saving CSV

var fields = [];

for (var property in data[0]){
	fields.push(property)
}

try {
  var result = json2csv({ data: data, fields: fields });
  fs.writeFileSync(path.replace('json','csv'),result)
} catch (err) {
  // Errors are thrown for bad options, or if the data is empty and no fields are provided.
  // Be sure to provide fields if it is possible that your data array will be empty.
  console.error(err);
}

fields = [];

for (var property in statistics){
	fields.push(property)
}

try {
  var result = json2csv({ data: statistics, fields: fields });
  fs.writeFileSync('statistics-'+area+'.csv',result)
} catch (err) {
  // Errors are thrown for bad options, or if the data is empty and no fields are provided.
  // Be sure to provide fields if it is possible that your data array will be empty.
  console.error(err);
}