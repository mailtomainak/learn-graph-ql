const {graphql,buildSchema} = require('graphql');

const schema = buildSchema(`

type Video{
    id:ID,
    title:String,
    duration:Int,
    watched:Boolean
}

type Query{
    video:Video,
    videos:[Video]
}

type Schema{
    query:Query
}
`)

const video1 = {
    id:12,
    title:'Vid1',
    duration:180,
    watched:false
}
const video2 = {
    id:13,
    title:'Vid2',
    duration:120,
    watched:false
}

const resolvers = {
    video:()=>({
        id:1,
        title:'Bar',
        duration:180,
        watched:false
    }),
    videos:()=>([video1,video2])
}

const query = `
query myFirstQuery {
   videos {
       id,
       title,
       duration,
       watched
   }
}
`

graphql(schema,query,resolvers)
.then(console.log)  
.catch(console.error)