import { Things, SchemaActions, Prepositions, ThingProperties,  } from './schema'
import type { NounFields, NounProperties } from './properties'
import type { BSON, Document, ObjectId, Collection as MongoCollection } from 'mongodb'
import { App, Docs, Site } from './ui'
import { API, Data } from './api'
import { G } from 'vitest/dist/reporters-5f784f42.js'

export const createGraph = <G extends Graph<G>>(graph: G): G => {
  return graph
}

export type Graph<G extends Graph<G> = { nouns: {}}> = {
  nouns: Nouns<G>
  verbs?: Partial<Verbs<G>>
  actions?: Actions<G>
  triggers?: Triggers<G>
  events?: Events<G>
  plurals?: Plurals<G>
  properties?: NounProperties<G>
  fields?: NounFields<G>
  app?: App<G>
  api?: API<G>
  site?: Site<G>
  admin?: App<G>
  docs?: Docs<G>
  db?: Data<G>
}

export type Noun<G extends Graph<G>> = Things | keyof G['nouns']
export type NounModule<G extends Graph<G>> = {
  [P in 'is' & (Prepositions)]: OptionalNouns<G>
}
export type Nouns<G extends Graph<G>> = {
  [N in keyof G['nouns']]: G['nouns'][N]
}

export type Verb<G extends Graph<G>> = {
  [V in PresentTense]: keyof G['nouns'] | Partial<DirectObject<G>>
}

export type DirectObject<G extends Graph<G>> = {
  [N in keyof G['nouns']]:  Partial<{
    [P in Prepositions]: OptionalNouns<G>
  }>
}

export type Verbs<G extends Graph<G>> = {
  [N in keyof G['nouns']]: Partial<Verb<G>>
}

export type IsPlural<K> = K extends `${infer Base}s` ? K : never
export type Pluralize<K> = K extends `${infer Base}s` ? K : never
export type Plurals<G extends Graph<G>> = Record<keyof G['nouns'], string>

export type OptionalNoun<G extends Graph<G>> =  Noun<G> extends string ? Noun<G> | `${Noun<G>}?` : never
export type OptionalNouns<G extends Graph<G>> = OptionalNoun<G> | `[${OptionalNoun<G>}]` | OptionalNoun<G>[]
export type PastTense = `${string}ed`
export type PresentTense = `${string}s`
export type ActiveTense = `${string}ing`
export type IsPresentTense<K> = K extends `${infer Base}s` ? K : never
export type IsPastTense<K> = K extends `${infer Base}ed` ? K : never
export type IsActiveTense<K> = K extends `${infer Base}ing` ? K : never
export type ToAction<V extends string> = V extends `${infer A}s` ? A : never
export type ToActivity<V extends string> = V extends `${infer A}s` ? `${A}ing` : never
export type ToEvent<V extends string> = V extends `${infer A}s` ? `${A}ed` : never

export type Trigger<G extends Graph<G>, S extends Noun<G>, V extends `${string}ing`, N extends Noun<G>> = ($: $Context<G>) => any
export type Action<G extends Graph<G>, S extends Noun<G>, V extends PresentTense, O extends Noun<G>> = ($: $Context<G>) => any
export type Event<G extends Graph<G>, S extends Noun<G>, V extends PastTense, O extends Noun<G>> = ($: $Context<G>) => any

export type Triggers<G extends Graph<G>> = {
  [S in keyof G['nouns']]: {
    [V in keyof G['verbs'][S] as ToActivity<Extract<V, string>>]: {
      [O in keyof G['nouns']]: Trigger<G, S, ToActivity<Extract<V, string>>, O>
    }
  }
}

export type Actions<G extends Graph<G>> = {
  [S in keyof G['nouns']]: {
    [K in keyof G['verbs'][S]]: K extends IsPresentTense<K> ? {
      [O in keyof G['nouns']]: Action<G, S, K, O>
    } : never
  }
}

export type Events<G extends Graph<G>> = {
  [S in keyof G['nouns']]: {
    [K in keyof G['verbs'][S] as IsPastTense<ToEvent<Extract<K, string>>>]: {
      [O in keyof G['nouns']]: Event<G, S, ToEvent<Extract<K, string>>, O>
    }
  }
}





export type $Context<G extends Graph<G>> = G & {
  // db: Database<G>
  // user: User<G>
  // resource: Resource<G>
  // property: Property<G>
  // 巛: Actions<G> | Events<G> | Stream<G>
  // 彡: Database<G>
  // 入: Actions<G> | Triggers<G> | Activities<G> | Events<G>
  // 只: User<G>
  // 口?: Resource<G>
  // _?: Property<G>
}