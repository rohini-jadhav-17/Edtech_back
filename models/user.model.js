// define model schema

module.exports = mongoose => {
    let userSchema = mongoose.Schema(
        {
            firstName : { type: String, require: true},
            lastName: String,
            email: { type: String, unique: true},
            password: { type: String, require: true},
            token: { type: String},
            role: { type: String, default: 'user'},
            isLoggedIn: Boolean
        },
        { timestamps: true}
    );
    userSchema.method("toJSON", function(){
        const {__v, _id, ...object } =this.toObject();
        object.v = __v;
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", userSchema);
    return User;
}