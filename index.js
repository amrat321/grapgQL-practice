const express = require('express')
const graphqlHTTP = require('express-graphql')
const {GraphQLSchema, GraphQLObjectType,GraphQLList, GraphQLInt, GraphQLString}= require('graphql')
const users = [
    {id:1,name:'amar',age:'20'},
    {id:2,name:'kamal',age:'21'},
    {id:1,name:'sager',age:'19'}
]
const userType= new GraphQLObjectType({
   
    name: 'Users',
    descraption: 'jo bhi',
    fields:{
        id:{
            type: GraphQLInt
        },
        name:{
            type: GraphQLString
        },
        age:{
            type: GraphQLString
        }
    }
})
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        
        name: 'query',
        description: 'kuch bhi',
        fields: ()=>({
        users:{
        type: new GraphQLList(userType),
        resolve: (parent, args)=>{
            return users;
        }},
        user:{
            type: userType,
            args:{
                id:{
                    type: GraphQLInt
                }
            },
            resolve: (parent, {id})=>{
                const user = users.filter(user => user.id == id);
                return user[0];
            }
    }
    })
    }),
})

const app = express()
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
    
 }))
app.listen(3000, ()=> console.log('listening at http://localhost:3000'))