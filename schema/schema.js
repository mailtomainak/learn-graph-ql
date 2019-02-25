const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");

const { getUsersById, getCompanyById } = require("../data/index");

const CompanyType = new GraphQLObjectType({
  name: "CompanySchema",
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    business: {
      type: GraphQLString
    }
  }
});

const UserType = new GraphQLObjectType({
  name: "UserSchema",
  description: "User Schema Description",
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    company: {
      type: CompanyType,
      resolve(parent, _) {
        return getCompanyById(parent.companyId);
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(_, args) {
        return getUsersById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
