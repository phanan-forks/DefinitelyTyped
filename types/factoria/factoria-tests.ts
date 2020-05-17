import factory from 'factoria'

interface User {
    email: string
    name: string
    age: number
}

interface Company {
    name: string
    private: boolean
    users: User[]
}

factory.define('user', (faker: Faker.FakerStatic): User => {
    return {
        email: faker.internet.email(),
        name: faker.name.findName(),
        age: faker.random.number({ min: 18, max: 120})
    }
})

factory.define('company', (faker: Faker.FakerStatic): Company => {
    return {
        name: faker.company.companyName(),
        private: faker.random.boolean(),
        users: []
    }
})

// Simple one-model usecase
factory<User>('user').email

// One-model usecase with overrides
factory<User>('user', {
    age: 18
}).email

// Multiple-model usecase
factory<User>('user', 5)[0].age

// Multiple-model usecase with overrides
factory<User>('user', 5, {
    age: 28
})[0].email

// Nested model usecase
factory<Company>('company', {
    users: factory<User>('user', 12)
}).users[0].name
