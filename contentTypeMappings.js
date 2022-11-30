const contentTypeMappings = {
  building: {},
  property: {
    extraFields: [
      { name: 'locations', type: 'geopoint[]' }
    ],
    fieldMappings: {
      locations: (document, allEntities, locale) => {
        console.log(document, allEntities, locale)
        const { fields } = document
        const { propertyBuilding: buildings } = fields
        const buildingEntities = allEntities['building']
        if (buildings === undefined) return []
        return buildings[locale].filter(ref => {
          const building = buildingEntities[ref.sys.id]
          if (building === undefined) return false
          const { fields: { buildingLocation } } = building
          if (buildingLocation === undefined) return false
          return true
        }).map(ref => {
          const building = buildingEntities[ref.sys.id]
          const { fields: { buildingLocation } } = building
          return Object.values(buildingLocation[locale]).reverse()
        })
      }
    }
  }
}

module.exports = contentTypeMappings
