import { faker } from '@faker-js/faker'
import _ from 'underscore'

const images = []
for (let i=1; i<=14; i++) {
    images.push(`kids-playground-${i}.png`)
}

export default {
    generator: function() {
        return {
            name: faker.company.name(),
            description: faker.lorem.paragraph(),
            opening_hours: faker.word.words(3),
            open_on_weekends: true,
            position: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
            },
            image: _.sample(images)
        }
    }
}