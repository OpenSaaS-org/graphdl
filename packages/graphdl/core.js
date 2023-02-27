// ∵ GraphDL: GraphDL is a graph-based data language for describing data models and data relationships.

// 🜉 Graph:
//   nouns:          [Noun.graph]

// ■ Noun:
//   _id:            string = slugify(_name)
//   _icon:          string | url = ■
//   _name:          string = titleCase(_id)
//   _type:          string = Noun
//   _description:   markdown | html
//   _source:        url | [string] | [object]
//   _seed:          url | [string] | [object]
//   _visibility:    anonymous | public | tenant | user | admin = tenant
//   _graph:         Graph.nouns
//   ${property}:    Properties | `[${Properties}]` | `${Properties}!` | `${Nouns}` | `[${Nouns}]` | `${Nouns}.${property}` | `[${Nouns}.${property}]`

// ∷ Properties:     string | markdown | url | email | phone | date | time | datetime | timestamp | number | integer | currency | boolean | object

export const init = graphdl => {
  const graph = { 
    nouns: { },
    verbs: { },
  }
  Object.entries(graph).map(([key, val]) => {
    // Get Graph-level properties
    if (key.startsWith('_')) {
      graph[key] = val

    // Get ID, Icon, Noun, & Description from Abbreviated Syntax like:
    // ∵ GraphDL: GraphDL is a graph-based data language for describing data models and data relationships.
    } else if (typeof obj === 'string') {
      graph._id = slugify(getNoun(key))
      graph._name = getNoun(key)
      graph._icon = getIcon(key)
      graph._description = val

    // Otherwise get the Noun and its properties
    // 🜉 Graph:
    //   _description:   A [Graph] consists of [Noun]s and the [Verb]s that connect them.
    //   nouns:          [Noun.graph]
    //   verbs:          [Verb]
    } else if (typeof val === 'object') {
      const noun = getNoun(key)
      graph.nouns[noun] = { }
      graph.nouns[noun]._id = slugify(noun)
      graph.nouns[noun]._icon = getIcon(key)
      Object.entries(val).map(([property, value]) => {
        nouns[noun][property] = value
      })

      // TODO: Identify Noun relationships and add to graph.verbs
    
    // TODO: identify edge cases and define default behavior
    } else {

    }
  })
  return graph
}

export const generateJavascript = graph => `// Generated by GraphDL
${graph.nouns.map(noun => `export const ${noun._id} = { }`)}
`
const getNoun = str => str.match(/[A-Za-z]/g) ? str : str.slice(str.indexOf(' '))
const getIcon = str => str.match(/[A-Za-z]/g) ? str : str.slice(0, str.indexOf(' '))

const isString = str => typeof str === 'string'
const isObject = obj => typeof obj === 'object'

const slugify = str => str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text  
