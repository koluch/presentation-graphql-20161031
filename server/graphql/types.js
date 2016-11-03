const {
    Schema,
    ObjectType,
    String,
    Int,
    NonNull,
    List,
    } = require('./type-helpers');

const UserType = ObjectType({
    name: 'UserType',
    fields: () => ({
        id: {type: NonNull(Int)},
        name: {type: NonNull(String)},
    }),
});

const CommentType = ObjectType({
    name: 'CommentType',
    fields: () => ({
        id: {type: NonNull(Int)},
        body: {type: NonNull(String)},
        user: {type: NonNull(UserType),},
        post: {type: NonNull(PostType),},
    }),
});

const PostType = ObjectType({
    name: 'PostType',
    fields: () => ({
        id: {type: NonNull(Int),},
        title: {type: String},
        user: {type: NonNull(UserType),},
        body: {type: NonNull(String),},
        comments: {type: NonNull(List(NonNull(CommentType))),},
    }),
});




module.exports = {CommentType, PostType, UserType}
