const express = require("express");
const graphqlHTTP = require("express-graphql");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require("graphql");
const {
    getVideosByID,
    getVideos,
    addVideo
} = require('./data/index');


const PORT = process.env.PORT || 8091;
const server = express();

const videoType = new GraphQLObjectType({
    name: "Video",
    description: "Videos at my site",
    fields: {
        id: {
            type: GraphQLID,
            description: "The id of the video"
        },
        title: {
            type: GraphQLString,
            description: "The description of the video"
        },
        duration: {
            type: GraphQLInt,
            description: "The duration of the video"
        },
        watched: {
            type: GraphQLBoolean,
            description: "If the video is already watched"
        }
    }
});

const queryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Root Query Type",
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: "The ID of the video"
                }
            },
            resolve: (_, args) => getVideosByID(args.id)
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: () => getVideos()
        }
    }

});

const mutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "The root Mutation Type",
    fields: {
        createVideo: {
            type: videoType,
            args: {
                title: {
                    type: GraphQLString,
                    description: "The title of the video"
                },
                duration: {
                    type: GraphQLInt,
                    description: "The duration of the video"
                },
                released: {
                    type: GraphQLBoolean,
                    description: "Has the video been released?"
                }

            },
            resolve: (__, args) => addVideo(args.title, args.duration, args.released)
        }
    }
});
const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

server.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);
server.listen(PORT);