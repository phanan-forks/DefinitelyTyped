// Type definitions for factoria 3
// Project: https://github.com/phanan/factoria
// Definitions by: Phan An <https://phanan.net>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import Faker from 'faker'

declare namespace Factoria {
    type RecursivePartial<T> = {
        [P in keyof T]?:
          T[P] extends (infer U)[] ? RecursivePartial<U>[] :
          T[P] extends object ? RecursivePartial<T[P]> :
          T[P]
      }

    type FactoryFunction = (<T>(model: string) => T)
        & (<T>(model: string, overrides?: RecursivePartial<T>) => T)
        & (<T>(model: string, count: number, overrides?: RecursivePartial<T>) => T[])

    type Factoria = FactoryFunction & {
        define (model: string, handler: (faker: Faker.FakerStatic) => object): Factoria
    }

    const factory: Factoria
}

export default Factoria.factory
