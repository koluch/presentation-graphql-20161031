const graphqlHTTP = require('express-graphql');
const {graphql} = require('graphql');

const {merge, find} = require('./utils.js')
const {Schema, ObjectType, List,} = require('./type-helpers');

const {CommentType, PostType, UserType,} = require('./types')

const data = {
    users: [
        {id: 100, name: 'Николай'},
        {id: 200, name: 'John'},
        {id: 300, name: 'Anon1'},
        {id: 400, name: 'Anon2'},
        {id: 500, name: 'Anon3'},
    ],
    posts: [
        {id: 421, title: 'Первый пост', body: 'Содержимое первого поста', userId: 100},
        {id: 523, title: 'First post', body: 'First post body', userId: 200},
    ],
    comments: [
        {id: 78952, body: '+1', postId: 421, userId: 300},
        {id: 15232, body: 'Согласен', postId: 421, userId: 400},
        {id: 15232, body: 'True', postId: 523, userId: 500},
        {id: 23662, body: 'No comments', postId: 523, userId: 400},
    ]
};


const QueryType = ObjectType({
    name: 'QueryType',
    fields: {
        posts: {
            type: List(PostType),
            resolve() {
                const {posts, users, comments} = data
                return posts.map((post) => Object.assign({}, post, {
                    user: users.filter((x) => x.id === post.userId)[0],
                    comments: comments.filter((x) => x.postId === post.id)
                }))
            }
        },
        users: {
            type: List(UserType),
            resolve() {
                return data.users
            }
        },
        comments: {
            type: List(CommentType),
            resolve() {
                const {posts, users, comments} = data
                return comments.map((comment) => merge(comment, {
                    user: find(users, (user) => user.id === comment.userId ),
                    post: find(posts, (post) => post.id === comment.postId ),
                }))
            }
        },
    }
});

module.exports = graphqlHTTP({
    schema: Schema({
        query: QueryType
    }),
    graphiql: true
});
